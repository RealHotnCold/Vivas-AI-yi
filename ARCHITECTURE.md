# Architecture

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
