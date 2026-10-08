# Phase 4 — crop intelligence foundation

## Implemented

The risk API now assembles a versioned `phase4-climate-water-v1` feature set for
both `paddy` and `groundnut` from Phase 3 observations available at assessment
time: 30-day precipitation anomaly, temperature anomaly, precipitation-minus-ET₀
proxy, surface soil moisture when available, and raw ONI when available. This
prevents future-weather and post-harvest yield leakage.

The API returns structured `crop_intelligence` with separate `crop_stress` and
`yield_impact` objects. Both are deliberately `insufficient_evidence`, with null
levels, scores, directions, estimates, and model metadata. This is a model
interface, not a trained crop model.

## Why no trained model is served

The repository provides neither an authoritative local crop calendar nor a
historical Thanjavur crop-condition/vegetation target nor crop-specific
yield-per-area data linked to the Phase 3 feature timeline. Therefore no
scientifically defensible crop-stress threshold, yield model, baseline metric,
model metric, uncertainty interval, feature importance, ENSO comparison, or
satellite relationship can be reported. No numerical proxy is substituted.

## Required data before training

An offline, versioned dataset needs a season/year, crop, documented stage or
calendar source, Thanjavur spatial unit, features available before the prediction
date, and an observed crop-condition or yield target. Training must use earlier
years for fitting and later years for validation/test, compare a seasonal-mean
baseline with one interpretable candidate, record metrics and failure cases, and
only then register a model artifact for inference.

## Scope boundary

This phase does not add a stress-test simulator, ENSO analog simulation,
recommendation engine, optimization, economic loss model, or voice decision
system.
