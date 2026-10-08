# Architecture

## Phase 3 implementation

`frontend Risk screen → GET /api/v1/farm/risk → FastAPI risk service → cached
Open-Meteo archive / NOAA CPC ONI`. Acquisition, validation, aggregation and API
schemas are separate under `backend/app`. The frontend never calculates anomaly
values and does not fall back to mock risk data when the backend is unavailable.

Phase 4 adds `backend/app/services/crop_intelligence.py` as a pure feature and
inference boundary. It is invoked after Phase 3 indicators are assembled; it does
not acquire duplicate data or train during requests. A future offline training
pipeline can register validated crop-specific artifacts behind this boundary.

## High-level

Stitch UI
→ frontend application
→ FastAPI
→ domain services
→ data/model/optimization layers
→ database and external data sources

## Components

### Frontend
- Stitch designs
- React/Next.js or equivalent
- API client
- maps
- charts
- voice UI

### Backend
- FastAPI
- validation
- domain services
- scenario orchestration
- recommendation API
- provenance API

### Data
- PostgreSQL/PostGIS
- object storage for raw files if needed
- reproducible ingestion scripts

### ML
- feature engineering
- baseline models
- crop-stress/yield anomaly model
- model registry/versioning only if useful for MVP

### Simulation
- climate scenario/analog selection
- water stress
- crop response
- yield
- economic propagation

### Optimization
- intervention variables
- objective function
- constraints
- solver
- explanation of selected solution

## Principle

The UI never calculates agricultural outcomes.

The backend never depends on visual UI state.

The API contract is the boundary between them.

## Suggested repository structure

frontend/
backend/
ml/
simulation/
optimization/
data/
tests/
docs/
docker/

docs/
  research/
  decisions/
  agent_tasks/
