# API Contract

This document is the boundary between frontend and backend.

## GET /api/v1/farm/risk

Inputs:
- latitude
- longitude
- crop
- sowing_date (optional)

Example response shape:

{
  "region": "Thanjavur",
  "crop": "paddy",
  "risk_level": "high",
  "rainfall_anomaly": null,
  "temperature_anomaly": null,
  "water_stress": null,
  "crop_stress": null,
  "yield_anomaly": null,
  "data_sources": []
}

Nulls are acceptable during early integration. Do not replace missing values with fabricated numbers.

## POST /api/v1/stress-test

Inputs:
- region
- crop
- scenario
- intervention (optional)

Returns:
- scenario metadata
- climate anomalies
- water stress
- crop/yield impact
- economic impact
- provenance
- model version

## POST /api/v1/optimize

Inputs:
- region
- crop(s)
- scenario
- budget
- water availability
- land constraints
- minimum production requirement
- allowed interventions

Returns:
- selected interventions
- estimated cost
- resource use
- baseline loss
- optimized loss
- avoided loss
- solver/model metadata
- assumptions

## POST /api/v1/voice/query

Inputs:
- language
- transcript
- farm context

Returns:
- intent
- verified backend result/reference
- explanation payload
- suggested follow-up

The LLM explanation layer must receive verified outputs rather than independently generating agricultural decisions.
