from __future__ import annotations
from datetime import date, datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class ProvenanceRecord(BaseModel):
    source: str
    dataset: str
    variable: str
    unit: str
    period: str
    location: str
    retrieval_time: datetime
    processing: str
    spatial_aggregation: str


class ClimateIndicators(BaseModel):
    assessment_period_start: date
    assessment_period_end: date
    precipitation_mm: float = Field(ge=0)
    baseline_precipitation_mm: float = Field(ge=0)
    precipitation_anomaly_mm: float
    precipitation_anomaly_pct: Optional[float]
    mean_temperature_c: float
    baseline_mean_temperature_c: float
    temperature_anomaly_c: float


class WaterIndicators(BaseModel):
    reference_evapotranspiration_mm: Optional[float] = Field(default=None, ge=0)
    climate_water_balance_proxy_mm: Optional[float]
    mean_surface_soil_moisture_m3_m3: Optional[float] = Field(default=None, ge=0, le=1)
    status: Literal["indicator_only"] = "indicator_only"
    limitation: str


class EnsoIndicator(BaseModel):
    oni: Optional[float]
    season: Optional[str]
    status: Literal["raw_index_only", "unavailable"]
    limitation: str


class RiskFoundation(BaseModel):
    status: Literal["unvalidated"] = "unvalidated"
    level: None = None
    explanation: str
    drivers: List[str]


class FarmRiskResponse(BaseModel):
    location: str
    latitude: float
    longitude: float
    geographic_definition: str
    crop: Literal["paddy", "groundnut"]
    assessment_period: str
    baseline_period: str
    climate_indicators: ClimateIndicators
    water_indicators: WaterIndicators
    enso: EnsoIndicator
    risk: RiskFoundation
    data_sources: List[ProvenanceRecord]
    provenance: List[ProvenanceRecord]
