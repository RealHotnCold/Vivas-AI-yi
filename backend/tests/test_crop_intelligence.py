from datetime import date
import pytest

from app.schemas.risk import ClimateIndicators, EnsoIndicator, WaterIndicators
from app.services.crop_intelligence import assess_crop_intelligence, build_crop_features


def inputs():
    return (
        ClimateIndicators(assessment_period_start=date(2026, 1, 1), assessment_period_end=date(2026, 1, 30), precipitation_mm=10, baseline_precipitation_mm=20, precipitation_anomaly_mm=-10, precipitation_anomaly_pct=-50, mean_temperature_c=30, baseline_mean_temperature_c=29, temperature_anomaly_c=1),
        WaterIndicators(reference_evapotranspiration_mm=15, climate_water_balance_proxy_mm=-5, mean_surface_soil_moisture_m3_m3=.2, limitation="indicator only"),
        EnsoIndicator(oni=None, season=None, status="unavailable", limitation="unavailable"),
    )


@pytest.mark.parametrize("crop", ["paddy", "groundnut"])
def test_crop_specific_feature_contract_preserves_only_available_information(crop):
    features = build_crop_features(crop, *inputs())
    assert features.crop == crop
    assert "30-day precipitation anomaly" in features.availability
    assert "latest raw NOAA ONI" not in features.availability


@pytest.mark.parametrize("crop", ["paddy", "groundnut"])
def test_untrained_models_return_no_score_or_yield_claim(crop):
    result = assess_crop_intelligence(build_crop_features(crop, *inputs()))
    assert result.crop_stress.status == "insufficient_evidence"
    assert result.crop_stress.level is None
    assert result.crop_stress.score is None
    assert result.yield_impact.estimate is None
