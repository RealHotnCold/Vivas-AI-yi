# Velsathon — Phase 0 Project Brain

This folder is the shared source of truth for the Agricultural Climate Stress-Test Engine.

## Purpose

Build a working, real-data prototype that stress-tests an agricultural region against El Niño/climate scenarios and identifies cost-effective adaptation strategies.

## Initial MVP

- Geography: Thanjavur, Tamil Nadu, India
- Initial crops: Paddy + Groundnut
- Primary user: Farmer
- Secondary user: Agricultural officer / policy maker
- UI: Stitch-generated designs, implemented as a web/mobile-first frontend
- Backend: Python + FastAPI
- ML: scikit-learn/XGBoost initially, only where justified by available data
- Optimization: OR-Tools / SciPy / PuLP
- Geospatial: GeoPandas/Rasterio/PostGIS as needed
- Voice: Tamil + English first
- Database: PostgreSQL + PostGIS
- Deployment: Docker + cloud

## Non-negotiable principles

1. No fabricated agricultural numbers.
2. Every important displayed number must have a traceable source or documented model/assumption.
3. LLMs explain verified model outputs; they do not independently decide agricultural interventions.
4. Start narrow and working before expanding geography/crops.
5. Keep frontend/backend contracts explicit.
6. All important technical decisions must be documented in docs/decisions/.
