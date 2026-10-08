# Phase 3 — real-data risk foundation

## Scope and boundary

Phase 3 provides measured climate and water-related indicators for a documented
Thanjavur analysis point. It does **not** provide crop-water stress, a categorical
crop-risk score, yield impact, an ENSO causal effect, recommendations, simulation,
or optimization. The API marks its risk object `unvalidated` so callers cannot
mistake indicators for a validated agronomic model.

## Geography

The default point is `10.7870, 79.1378`, labelled **Thanjavur district, Tamil
Nadu, India**. This is the fixed district-level analysis point carried from Phase
2. It is neither Thanjavur city, a farm boundary, nor a district polygon average.
Calls may supply a point in Tamil Nadu, which is labelled as user-supplied and not
validated as a farm location. A future phase must add an authoritative district
polygon and area-weighted aggregation before making district-wide claims.

## Sources and variables

| Source | Product/variable | Native/use resolution and unit | Why / limitation |
| --- | --- | --- | --- |
| Open-Meteo archive | provider-selected ERA5 / ERA5-Land: `precipitation_sum`, `temperature_2m_mean`, `et0_fao_evapotranspiration`, `soil_moisture_0_to_7cm_mean` | daily UTC at one analysis point; mm, °C, mm, m³/m³ | Accessible reproducible reanalysis path. It is modelled/reanalysis data, not a field station or district mean. See https://open-meteo.com/en/docs/historical-weather-api |
| NOAA CPC | Oceanic Niño Index (ONI), ERSSTv6 | published overlapping three-month index; °C | Raw context only. No local causal/crop transformation is made. https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v6/ |

Open-Meteo is requested only by the backend. It is time-limited, validates source
units, and caches successful responses in process for six hours. Failed source
calls are surfaced as HTTP 503 and are never replaced by demo data.

## Assessment and baseline method

The current assessment is the latest completed 30 daily UTC observations available
from the archive (the service deliberately leaves a six-day lag). The baseline is
1991–2020. For every baseline year, the service aggregates the same month/day
window (precipitation and ET₀ summed; temperature and soil moisture averaged),
then takes the arithmetic mean across available years. The anomaly is current
minus that baseline; precipitation percent anomaly is only emitted when the
baseline is nonzero. Invalid source values (negative precipitation/ET₀, implausible
Celsius values, soil moisture outside 0–1) reject the response rather than being
silently converted.

`precipitation − reference ET₀` is a climate water-balance **proxy**, not crop
water stress. Crop calendars, soil profile, irrigation, canal supply, cultivar and
field management are not represented.

## Run locally

```text
cd backend
python -m venv .venv
.venv\\Scripts\\pip install -r requirements.txt
.venv\\Scripts\\uvicorn app.main:app --reload --port 8000
```

Set `NEXT_PUBLIC_API_URL=http://localhost:8000` before starting the frontend.
The first request can be slower because it obtains the baseline archive series;
later requests use the in-process cache.
