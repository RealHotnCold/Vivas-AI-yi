# Data Sources & Provenance

## Rule

Every production number shown in the UI must be traceable to:
1. a source dataset,
2. a model output,
3. a simulation assumption,
or 4. an explicitly labelled project calculation.

Never silently fabricate a value.

## Candidate sources

### Climate
- NOAA / authoritative ENSO indices
- ERA5 / ERA5-Land
- Open-Meteo for accessible weather retrieval
- IMD where access permits

### Satellite
- Copernicus Sentinel-2
- Microsoft Planetary Computer / STAC where useful
- Google Earth Engine / Dynamic World where appropriate

### Agricultural
- FAO ASIS
- Google Agricultural Understanding API where available
- Government of India / Tamil Nadu agricultural statistics
- crop calendars and official agronomic sources

### Economic
Use authoritative market/price datasets where possible. If an economic relationship is modelled from historical data, label it as a model estimate rather than an observed fact.

## Data provenance record

For each dataset record:
- source
- URL/API
- dataset/product name
- spatial resolution
- temporal resolution
- date accessed
- variables
- license/usage constraints
- preprocessing
- missing-data treatment

## MVP principle

Prefer fewer high-quality real datasets over many weak sources.
