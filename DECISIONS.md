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
