# Product Requirements

## Must-have

### Farmer
1. Select/confirm farm location.
2. Select crop.
3. See current climate/crop risk.
4. See why risk is elevated.
5. See recommended adaptation actions.
6. Compare baseline vs adapted outcome.
7. Ask questions by voice.
8. Receive Tamil/English explanation.

### Expert
1. Select region.
2. Select crop.
3. Select climate/ENSO scenario.
4. View climate anomaly.
5. View crop stress.
6. Run stress test.
7. Select constraints: budget, water, land, minimum food output.
8. Run optimizer.
9. Compare intervention combinations.
10. Inspect data sources and assumptions.

## Killer interaction

User chooses a scenario such as a strong historical El Niño analog.

System shows:

Baseline:
- expected climate anomaly
- water stress
- yield anomaly
- production impact
- income/economic impact

Then:

Adaptation:
- intervention combination
- expected resource cost
- recalculated yield/economic impact
- avoided loss
- resilience gain

## Resilience metric

A resilience score may be introduced, but only after defining a transparent formula. Do not invent a scientifically authoritative score. If used, label it as a project metric and document its calculation.

## UX principles

- Mobile first for farmers.
- Large controls.
- High contrast.
- Minimal text.
- Tamil + English.
- Technical detail hidden behind expert mode.
- Every recommendation should have a "why" explanation.
- Data provenance should be accessible.
