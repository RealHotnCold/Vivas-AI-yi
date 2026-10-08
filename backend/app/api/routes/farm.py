from __future__ import annotations
from functools import lru_cache
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from ...config import get_settings
from ...data.geography import resolve_location
from ...schemas.risk import FarmRiskResponse
from ...services.open_meteo import UpstreamDataError
from ...services.risk import RiskService

router = APIRouter(prefix="/farm", tags=["farm"])


@lru_cache
def get_risk_service() -> RiskService:
    return RiskService(get_settings())


@router.get("/risk", response_model=FarmRiskResponse)
async def farm_risk(
    crop: str = Query("paddy", pattern="^(paddy|groundnut)$"),
    latitude: Optional[float] = Query(None, ge=-90, le=90),
    longitude: Optional[float] = Query(None, ge=-180, le=180),
    service: RiskService = Depends(get_risk_service),
) -> FarmRiskResponse:
    try:
        location = resolve_location(latitude, longitude)
        return await service.assess(location, crop)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    except UpstreamDataError as error:
        raise HTTPException(status_code=503, detail={"message": str(error), "fallback": "No mock data is returned."}) from error
