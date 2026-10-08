from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
import re
import httpx
from .open_meteo import UpstreamDataError

ONI_URL = "https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v6/"
SEASONS = ("DJF", "JFM", "FMA", "MAM", "AMJ", "MJJ", "JJA", "JAS", "ASO", "SON", "OND", "NDJ")


@dataclass(frozen=True)
class OniValue:
    value: float
    season: str
    retrieved_at: datetime


class NoaaOniClient:
    async def latest(self, timeout_seconds: float) -> OniValue:
        try:
            async with httpx.AsyncClient(timeout=timeout_seconds) as client:
                response = await client.get(ONI_URL)
                response.raise_for_status()
        except httpx.HTTPError as error:
            raise UpstreamDataError("NOAA ONI data is unavailable") from error
        rows = []
        for row_html in re.findall(r"<tr[^>]*>(.*?)</tr>", response.text, flags=re.IGNORECASE | re.DOTALL):
            text = unescape(re.sub(r"<[^>]+>", " ", row_html))
            values = re.findall(r"(?<![\w.])-?\d+(?:\.\d+)?(?![\w.])", text)
            if not values or len(values) < 2:
                continue
            try:
                year = int(values[0])
            except ValueError:
                continue
            if not 1950 <= year <= 2100:
                continue
            for index, value in enumerate(values[1:13]):
                rows.append((SEASONS[index], year, float(value)))
        if not rows:
            raise UpstreamDataError("NOAA ONI response could not be parsed")
        season, year, value = max(rows, key=lambda row: (row[1], SEASONS.index(row[0])))
        return OniValue(value=value, season=f"{season} {year}", retrieved_at=datetime.now(timezone.utc))
