# Project Context

## Problem

Agricultural systems are vulnerable to uncertain and cascading climate impacts associated with El Niño and related climate variability. Existing monitoring can tell users that risk exists, but the project should go further: quantify how a plausible climate shock propagates through water availability, crop stress, yield, production and economic outcomes, then test adaptation strategies.

## Product concept

**Agricultural Climate Stress-Test Engine**

A digital simulation and optimization engine that:

1. Ingests real climate/weather/satellite/agricultural data.
2. Characterizes regional climate anomalies and crop stress.
3. Simulates plausible El Niño/climate stress scenarios.
4. Estimates crop/yield and economic consequences.
5. Tests interventions.
6. Finds cost-effective intervention combinations under budget/water/land constraints.
7. Communicates verified recommendations simply to farmers and experts.

## Core causal chain

Climate signal / historical analog
→ rainfall & temperature anomaly
→ water availability
→ crop stress
→ yield anomaly
→ production impact
→ economic / food-supply impact
→ adaptation intervention
→ recalculated outcome

## Core differentiator

The product is not just an ENSO predictor or crop-risk dashboard.

The central feature is:

> "What happens if the shock occurs, and which adaptation strategy reduces the most expected loss for the available budget and water?"

## Users

### Farmer mode
Needs:
- simple risk
- clear explanation
- actionable recommendation
- voice interaction
- Tamil + English
- minimal technical jargon

### Expert/policy mode
Needs:
- maps
- scenario controls
- model outputs
- intervention comparison
- optimization
- provenance
- assumptions
- regional aggregation

## MVP scope

Start with Thanjavur and two crops. If data/model quality is insufficient, reduce to paddy only rather than using fake or weak data.

## Safety/quality boundary

The LLM may:
- translate
- simplify
- explain
- answer questions using verified outputs

The LLM must not independently invent:
- irrigation prescriptions
- crop switching recommendations
- yield-loss numbers
- climate anomalies
- economic impacts

Those must originate from data/model/simulation/optimization layers.

## Candidate data sources

- ENSO / NOAA or other authoritative climate indices
- ERA5 / ERA5-Land
- Open-Meteo for accessible weather workflows
- Sentinel-2 / Copernicus Data Space
- Dynamic World / Google Earth Engine where appropriate
- FAO ASIS
- Google Agricultural Understanding API where available
- IMD where accessible
- agricultural/crop statistics from authoritative Indian/Tamil Nadu sources

The exact source used for each feature must be recorded in DATA_SOURCES.md.

## Research basis

The project is informed by research showing:
- ENSO impacts crop yields differently by crop and geography.
- Useful ENSO-related crop-yield predictability can exist months ahead in sensitive regions.
- Satellite observations can monitor agricultural drought/crop condition.
- ENSO-related agricultural shocks can propagate into commodity/food prices.
- Early warnings can influence farmer adaptation.

Important research sources are listed in DATA_SOURCES.md.
