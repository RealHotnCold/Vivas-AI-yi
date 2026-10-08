# ML Specification

## Goal

Estimate climate/crop stress or yield anomaly from real features.

## Initial candidate

XGBoost or Random Forest for tabular baseline.

Features may include:
- rainfall anomaly
- temperature anomaly
- soil moisture
- vegetation index
- crop
- season
- sowing period
- historical climate/ENSO state
- irrigation proxy where available

## Validation

Avoid random train/test splitting when temporal leakage is possible.

Prefer:
- temporal holdout
- geographically aware validation where possible
- comparison to simple baselines

Track:
- MAE/RMSE for continuous targets
- calibration/error by region/crop
- feature importance
- data coverage

## Rule

Do not use deep learning simply because it sounds advanced. Upgrade model complexity only when data volume and validation justify it.

## Model provenance

Every prediction response should identify:
- model name
- model version
- training data period
- feature set
- prediction timestamp
