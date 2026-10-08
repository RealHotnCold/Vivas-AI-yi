from __future__ import annotations
from dataclasses import dataclass


@dataclass(frozen=True)
class AnalysisLocation:
    name: str
    latitude: float
    longitude: float
    definition: str


# This is an explicitly documented district-level analysis point, not a farm point
# or a district polygon. It is kept constant so calls are reproducible.
THANJAVUR_ANALYSIS_POINT = AnalysisLocation(
    name="Thanjavur district, Tamil Nadu, India",
    latitude=10.7870,
    longitude=79.1378,
    definition=(
        "Fixed district-level analysis point inherited from the Phase 2 farm context; "
        "it is a spatial approximation and must not be interpreted as the city, a field, "
        "or a district-area average."
    ),
)


def resolve_location(latitude: float | None, longitude: float | None) -> AnalysisLocation:
    """Only the Phase 3 MVP geography is supported; coordinates may refine its point."""
    if latitude is None and longitude is None:
        return THANJAVUR_ANALYSIS_POINT
    if latitude is None or longitude is None:
        raise ValueError("latitude and longitude must be supplied together")
    if not (6.0 <= latitude <= 14.0 and 76.0 <= longitude <= 82.0):
        raise ValueError("Phase 3 accepts only a point within Tamil Nadu")
    return AnalysisLocation(
        name="Thanjavur district, Tamil Nadu, India (user-supplied analysis point)",
        latitude=latitude,
        longitude=longitude,
        definition="User-supplied point within Tamil Nadu; not validated as a farm boundary.",
    )
