from __future__ import annotations
from dataclasses import dataclass
from datetime import date
import httpx

ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive"
DAILY_VARIABLES = (
    "precipitation_sum,temperature_2m_mean,et0_fao_evapotranspiration,"
    "soil_moisture_0_to_7cm_mean"
)


class UpstreamDataError(RuntimeError):
    pass


@dataclass(frozen=True)
class DailyClimate:
    day: date
    precipitation_mm: float
    temperature_c: float
    et0_mm: float | None
    soil_moisture_m3_m3: float | None


def _optional_number(value: object) -> float | None:
    return None if value is None else float(value)


def validate_daily(value: DailyClimate) -> DailyClimate:
    if value.precipitation_mm < 0:
        raise ValueError("precipitation cannot be negative")
    if not -90 <= value.temperature_c <= 60:
        raise ValueError("temperature is outside plausible Celsius bounds")
    if value.et0_mm is not None and value.et0_mm < 0:
        raise ValueError("reference evapotranspiration cannot be negative")
    if value.soil_moisture_m3_m3 is not None and not 0 <= value.soil_moisture_m3_m3 <= 1:
        raise ValueError("soil moisture must be volumetric m3/m3")
    return value


class OpenMeteoArchiveClient:
    def __init__(self, timeout_seconds: float) -> None:
        self.timeout_seconds = timeout_seconds

    async def daily(self, latitude: float, longitude: float, start: date, end: date) -> list[DailyClimate]:
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "start_date": start.isoformat(),
            "end_date": end.isoformat(),
            "daily": DAILY_VARIABLES,
            "timezone": "UTC",
        }
        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.get(ARCHIVE_URL, params=params)
                response.raise_for_status()
                payload = response.json()
        except (httpx.HTTPError, ValueError) as error:
            raise UpstreamDataError("Open-Meteo archive data is unavailable") from error
        daily = payload.get("daily")
        if not isinstance(daily, dict) or not daily.get("time"):
            raise UpstreamDataError("Open-Meteo returned no daily observations")
        try:
            records = [
                validate_daily(DailyClimate(
                    day=date.fromisoformat(day), precipitation_mm=float(precip),
                    temperature_c=float(temp), et0_mm=_optional_number(et0),
                    soil_moisture_m3_m3=_optional_number(soil),
                ))
                for day, precip, temp, et0, soil in zip(
                    daily["time"], daily["precipitation_sum"], daily["temperature_2m_mean"],
                    daily.get("et0_fao_evapotranspiration", [None] * len(daily["time"])),
                    daily.get("soil_moisture_0_to_7cm_mean", [None] * len(daily["time"])),
                )
            ]
        except (KeyError, TypeError, ValueError) as error:
            raise UpstreamDataError("Open-Meteo returned malformed or invalid-unit data") from error
        if not records:
            raise UpstreamDataError("Open-Meteo returned an empty daily series")
        return records
