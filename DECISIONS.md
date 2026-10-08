# Architecture & Product Decisions

Record important decisions here.

## Decision template

### Decision
Date:
Status:
Decision:
Reason:
Alternatives considered:
Impact:
Owner:

## Initial decisions

### D005 — Phase 3 exposes indicators, not a categorical crop-risk result
Status: accepted
Decision: Return climate anomalies and water-related indicators with an
`unvalidated` risk status.
Reason: No project-specific, validated crop-risk threshold or crop-water-stress
model is available. This avoids fabricated risk/yield/recommendation claims.
Impact: Phase 4 must validate and document any crop-risk model before a level or
score is displayed.

### D006 — Archive reanalysis baseline with documented point geometry
Status: accepted
Decision: Use Open-Meteo archive data at a fixed documented Thanjavur analysis
point, with a 1991–2020 same-calendar-window baseline; expose NOAA ONI raw data.
Reason: It is reproducible and keyless while avoiding a claim that the point is a
district average or a farm observation.
Impact: Polygon aggregation, ground observations and local crop calendars remain
required before local advisory use.

### D001 — Narrow MVP geography
Status: accepted
Decision: Start with Thanjavur, Tamil Nadu.
Reason: Manageable scope and strong agricultural relevance.

### D002 — Real data requirement
Status: accepted
Decision: No fabricated agricultural outputs.
Reason: Prototype must be technically credible and defensible.

### D003 — LLM safety boundary
Status: accepted
Decision: LLM explains verified outputs but does not independently choose interventions.
Reason: Agricultural recommendations must be grounded in the simulation/optimization engine.

### D004 — Initial ML approach
Status: provisional
Decision: Start with interpretable tabular ML such as XGBoost/Random Forest.
Reason: Faster iteration and suitable for structured climate/agriculture features.
