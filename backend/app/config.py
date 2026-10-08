from functools import lru_cache
import os
from pydantic import BaseModel, Field


class Settings(BaseModel):
    """Runtime settings. No credentials are required for the Phase 3 sources."""

    app_name: str = "VivasAIyi API"
    allowed_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    http_timeout_seconds: float = 20.0
    cache_ttl_seconds: int = 21_600
    baseline_start_year: int = 1991
    baseline_end_year: int = 2020


@lru_cache
def get_settings() -> Settings:
    origins = os.getenv("VIVASAIYI_ALLOWED_ORIGINS", "http://localhost:3000")
    return Settings(allowed_origins=[origin.strip() for origin in origins.split(",") if origin.strip()])
