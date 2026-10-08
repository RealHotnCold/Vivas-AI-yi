"""Phase 4 feature and inference boundary; no unvalidated crop model is run."""
from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional

from ..schemas.risk import (ClimateIndicators, CropIntelligence,
    CropStressAssessment, EnsoIndicator, WaterIndicators, YieldImpactAssessment)

FEATURE_SET_VERSION = "phase4-climate-water-v1"


@dataclass(frozen=True)
class CropFeatureSet:
    crop: str
    precipitation_anomaly_mm: float
    precipitation_anomaly_pct: Optional[float]
    temperature_anomaly_c: float
    climate_water_balance_proxy_mm: Optional[float]
    surface_soil_moisture_m3_m3: Optional[float]
    oni: Optional[float]
    availability: List[str]


def build_crop_features(crop: str, climate: ClimateIndicators, water: WaterIndicators, enso: EnsoIndicator) -> CropFeatureSet:
    """Assemble only variables available on or before the assessment date."""
    availability = ["30-day precipitation anomaly", "30-day mean temperature anomaly"]
    if water.climate_water_balance_proxy_mm is not None:
        availability.append("30-day precipitation minus reference ET₀ proxy")
    if water.mean_surface_soil_moisture_m3_m3 is not None:
        availability.append("30-day mean 0–7 cm surface soil moisture")
    if enso.oni is not None:
        availability.append("latest raw NOAA ONI")
    return CropFeatureSet(crop, climate.precipitation_anomaly_mm, climate.precipitation_anomaly_pct,
        climate.temperature_anomaly_c, water.climate_water_balance_proxy_mm,
        water.mean_surface_soil_moisture_m3_m3, enso.oni, availability)


def assess_crop_intelligence(features: CropFeatureSet) -> CropIntelligence:
    """Return an honest contract until crop-specific targets and validation exist."""
    stress_gap = (f"No validated {features.crop} crop-stress target, authoritative local crop calendar, "
                  "or historical Thanjavur crop-condition series is available. No stress level or score is inferred.")
    yield_gap = (f"No historical Thanjavur {features.crop} yield-per-area series linked to this feature set is available; "
                 "no yield direction or estimate is produced.")
    drivers = [f"30-day precipitation anomaly is available: {features.precipitation_anomaly_mm} mm.",
               f"30-day mean temperature anomaly is available: {features.temperature_anomaly_c} °C."]
    return CropIntelligence(feature_set_version=FEATURE_SET_VERSION, crop=features.crop,
        feature_availability=features.availability,
        crop_stress=CropStressAssessment(status="insufficient_evidence", drivers=drivers, uncertainty=stress_gap),
        yield_impact=YieldImpactAssessment(status="insufficient_evidence", uncertainty=yield_gap))
