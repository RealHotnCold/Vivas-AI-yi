from __future__ import annotations
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from statistics import fmean
from ..config import Settings
from ..data.geography import AnalysisLocation
from ..schemas.risk import (ClimateIndicators, EnsoIndicator, FarmRiskResponse,
    ProvenanceRecord, RiskFoundation, WaterIndicators)
from .cache import AsyncTTLCache
from .enso import NoaaOniClient
from .open_meteo import DailyClimate, OpenMeteoArchiveClient, UpstreamDataError


@dataclass(frozen=True)
class Aggregate:
    precipitation_mm: float
    temperature_c: float
    et0_mm: float | None
    soil_moisture: float | None


def aggregate(records: list[DailyClimate]) -> Aggregate:
    if not records:
        raise ValueError("cannot aggregate an empty climate series")
    et0 = [row.et0_mm for row in records if row.et0_mm is not None]
    soil = [row.soil_moisture_m3_m3 for row in records if row.soil_moisture_m3_m3 is not None]
    return Aggregate(
        precipitation_mm=sum(row.precipitation_mm for row in records),
        temperature_c=fmean(row.temperature_c for row in records),
        et0_mm=sum(et0) if et0 else None,
        soil_moisture=fmean(soil) if soil else None,
    )


def calendar_window_baseline(records: list[DailyClimate], start: date, end: date) -> Aggregate:
    """Mean same calendar-day window per baseline year; leap day is excluded."""
    target_days = {(start + timedelta(days=i)).strftime("%m-%d") for i in range((end - start).days + 1)}
    by_year: dict[int, list[DailyClimate]] = {}
    for row in records:
        if row.day.strftime("%m-%d") in target_days:
            by_year.setdefault(row.day.year, []).append(row)
    annual = [aggregate(values) for values in by_year.values() if values]
    if not annual:
        raise ValueError("baseline has no matching calendar-day observations")
    return Aggregate(
        precipitation_mm=fmean(value.precipitation_mm for value in annual),
        temperature_c=fmean(value.temperature_c for value in annual),
        et0_mm=fmean([value.et0_mm for value in annual if value.et0_mm is not None]) if any(value.et0_mm is not None for value in annual) else None,
        soil_moisture=fmean([value.soil_moisture for value in annual if value.soil_moisture is not None]) if any(value.soil_moisture is not None for value in annual) else None,
    )


class RiskService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.weather = OpenMeteoArchiveClient(settings.http_timeout_seconds)
        self.enso = NoaaOniClient()
        self.cache = AsyncTTLCache(settings.cache_ttl_seconds)

    async def assess(self, location: AnalysisLocation, crop: str) -> FarmRiskResponse:
        # Archive data normally has a latency; use a fully observed, completed 30-day window.
        end = date.today() - timedelta(days=6)
        start = end - timedelta(days=29)
        current_key = f"current:{location.latitude}:{location.longitude}:{start}:{end}"
        baseline_key = f"baseline:{location.latitude}:{location.longitude}:{self.settings.baseline_start_year}:{self.settings.baseline_end_year}"
        current_records = await self.cache.get_or_load(current_key, lambda: self.weather.daily(location.latitude, location.longitude, start, end))
        baseline_records = await self.cache.get_or_load(
            baseline_key,
            lambda: self.weather.daily(location.latitude, location.longitude,
                date(self.settings.baseline_start_year, 1, 1), date(self.settings.baseline_end_year, 12, 31)),
        )
        current = aggregate(current_records)
        baseline = calendar_window_baseline(baseline_records, start, end)
        retrieved = datetime.now(timezone.utc)
        precip_pct = ((current.precipitation_mm - baseline.precipitation_mm) / baseline.precipitation_mm * 100) if baseline.precipitation_mm else None
        climate = ClimateIndicators(
            assessment_period_start=start, assessment_period_end=end,
            precipitation_mm=round(current.precipitation_mm, 2), baseline_precipitation_mm=round(baseline.precipitation_mm, 2),
            precipitation_anomaly_mm=round(current.precipitation_mm - baseline.precipitation_mm, 2),
            precipitation_anomaly_pct=round(precip_pct, 2) if precip_pct is not None else None,
            mean_temperature_c=round(current.temperature_c, 2), baseline_mean_temperature_c=round(baseline.temperature_c, 2),
            temperature_anomaly_c=round(current.temperature_c - baseline.temperature_c, 2),
        )
        water = WaterIndicators(
            reference_evapotranspiration_mm=round(current.et0_mm, 2) if current.et0_mm is not None else None,
            climate_water_balance_proxy_mm=round(current.precipitation_mm - current.et0_mm, 2) if current.et0_mm is not None else None,
            mean_surface_soil_moisture_m3_m3=round(current.soil_moisture, 4) if current.soil_moisture is not None else None,
            limitation="These are climate and surface-soil indicators, not a crop-water-stress model or irrigation recommendation.",
        )
        try:
            oni = await self.cache.get_or_load("noaa:oni", lambda: self.enso.latest(self.settings.http_timeout_seconds))
            enso = EnsoIndicator(oni=oni.value, season=oni.season, status="raw_index_only", limitation="ONI is exposed as a raw NOAA index; no Thanjavur crop-impact or causal claim is made in Phase 3.")
        except UpstreamDataError:
            enso = EnsoIndicator(oni=None, season=None, status="unavailable", limitation="NOAA ONI retrieval failed; the response does not substitute or infer an ENSO state.")
        source = ProvenanceRecord(source="Open-Meteo", dataset="ERA5 / ERA5-Land archive (provider-selected model data)", variable="precipitation_sum; temperature_2m_mean; et0_fao_evapotranspiration; soil_moisture_0_to_7cm_mean", unit="mm; °C; mm; m³/m³", period=f"{start.isoformat()} to {end.isoformat()} (UTC daily)", location=location.name, retrieval_time=retrieved, processing="Validated daily units; 30-day sum for precipitation/ET0 and arithmetic mean for temperature/soil moisture.", spatial_aggregation="Single documented analysis point; no district polygon aggregation.")
        baseline_source = source.model_copy(update={"period": f"{self.settings.baseline_start_year}-01-01 to {self.settings.baseline_end_year}-12-31; same calendar-day window", "processing": "For each baseline year, aggregate the matching 30 calendar days; then take the arithmetic mean across available years."})
        provenance = [source, baseline_source]
        if enso.status == "raw_index_only":
            provenance.append(ProvenanceRecord(source="NOAA Climate Prediction Center", dataset="Oceanic Niño Index (ONI)", variable="ONI anomaly", unit="°C", period=enso.season or "unknown", location="Niño 3.4 region", retrieval_time=retrieved, processing="Raw latest published index; no local impact transformation.", spatial_aggregation="Not applicable; ocean index."))
        drivers = [
            f"30-day precipitation anomaly: {climate.precipitation_anomaly_mm} mm" + (f" ({climate.precipitation_anomaly_pct}%)" if climate.precipitation_anomaly_pct is not None else ""),
            f"30-day mean temperature anomaly: {climate.temperature_anomaly_c} °C",
        ]
        return FarmRiskResponse(location=location.name, latitude=location.latitude, longitude=location.longitude, geographic_definition=location.definition, crop=crop, assessment_period=f"{start.isoformat()} to {end.isoformat()} (completed daily observations; UTC)", baseline_period=f"{self.settings.baseline_start_year}-{self.settings.baseline_end_year}", climate_indicators=climate, water_indicators=water, enso=enso, risk=RiskFoundation(explanation="Phase 3 reports measured climate indicators and anomalies only. No validated crop-risk threshold, crop-stress score, yield loss, or recommendation is asserted.", drivers=drivers), data_sources=provenance, provenance=provenance)
