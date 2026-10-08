from datetime import date
import pytest
from app.services.open_meteo import DailyClimate, validate_daily
from app.services.risk import aggregate, calendar_window_baseline


def row(day: str, rain: float, temp: float, et0: float = 2, soil: float = .2) -> DailyClimate:
    return DailyClimate(date.fromisoformat(day), rain, temp, et0, soil)


def test_aggregate_preserves_documented_units() -> None:
    result = aggregate([row("2024-01-01", 2, 25, 3, .2), row("2024-01-02", 3, 27, 4, .4)])
    assert result.precipitation_mm == 5
    assert result.temperature_c == 26
    assert result.et0_mm == 7
    assert result.soil_moisture == pytest.approx(.3)


def test_calendar_window_baseline_averages_each_year_before_years() -> None:
    records = [row("1991-01-01", 2, 20), row("1991-01-02", 4, 22), row("1992-01-01", 6, 24), row("1992-01-02", 8, 26)]
    baseline = calendar_window_baseline(records, date(2024, 1, 1), date(2024, 1, 2))
    assert baseline.precipitation_mm == 10
    assert baseline.temperature_c == 23


def test_missing_optional_water_values_remain_missing() -> None:
    result = aggregate([DailyClimate(date(2024, 1, 1), 1, 25, None, None)])
    assert result.et0_mm is None
    assert result.soil_moisture is None


@pytest.mark.parametrize("invalid", [DailyClimate(date.today(), -1, 25, 1, .2), DailyClimate(date.today(), 1, 25, 1, 1.1), DailyClimate(date.today(), 1, 90, 1, .2)])
def test_unit_validation_rejects_invalid_source_values(invalid: DailyClimate) -> None:
    with pytest.raises(ValueError):
        validate_daily(invalid)
