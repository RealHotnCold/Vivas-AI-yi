<div align="center">

<img src="assets/vivasaiyi-logo.png" alt="VivasAIyi logo" width="520">

# VivasAIyi

### Climate Intelligence for Agriculture

**Data-driven climate risk, crop stress, stress testing, and adaptation intelligence for farmers.**

</div>

---

## What is VivasAIyi?

**VivasAIyi** is a climate-intelligence and agricultural decision-support platform designed to help farmers understand how climate conditions can affect their crops, explore adaptation strategies, and test decisions before acting.

The core idea is:

> **Don't just tell a farmer that the climate is changing. Show what it means for the crop, what could happen next, and which actions can reduce the risk.**

VivasAIyi initially focuses on **Thanjavur district, Tamil Nadu, India**, with **paddy and groundnut** as the first crop focus.

```text
Climate & Weather
       ↓
Environmental / Water Conditions
       ↓
Crop Stress
       ↓
Yield & Production Impact
       ↓
Climate Stress Test
       ↓
Adaptation Options
       ↓
Optimization
       ↓
Farmer-Friendly Recommendation
```

---

## The Problem

Traditional agricultural monitoring can be labor-intensive, spatially limited, and reactive. Farmers need more than a weather forecast or a generic AI chatbot.

The important questions are:

- How serious is the climate risk to my crop?
- Why is my crop under stress?
- What happens if rainfall is lower than normal?
- What can I do with the water and resources I have?
- Which adaptation strategy can reduce the most risk?

VivasAIyi is designed around these questions.

---

## Core Product Experience

| Experience | Farmer's Question |
|---|---|
| **Home** | What is happening? |
| **Risk** | How serious is it, and why? |
| **Actions** | What can I do? |
| **Stress Test** | What happens if I do it? |

### Home
A simple overview of the farm's climate situation, crop context, key indicators, and current risk.

### Risk
Explains climate and crop conditions through a causal chain:

```text
Climate Conditions
       ↓
Rainfall / Temperature
       ↓
Water Availability
       ↓
Crop Stress
       ↓
Yield Risk
```

### Actions
Presents potential adaptation options with the reason each action is being considered.

### Stress Test
The signature VivasAIyi capability:

```text
Climate Scenario
      +
Adaptation Action
      ↓
Simulated Outcome
      ↓
Compare Baseline vs Adapted
```

---

## Current MVP

**Geography:** Thanjavur District, Tamil Nadu, India

**Initial crops:**
- Paddy
- Groundnut

**Primary user:** Farmer

**Secondary user:** Agricultural officer / policy maker

**Languages:**
- English
- Tamil

The farmer interface is mobile-first, with voice interaction planned as a core accessibility feature.

---

## Technology

```text
┌─────────────────────────────┐
│      VivasAIyi PWA          │
│       Next.js / React       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│           FastAPI           │
│        Backend / APIs       │
└──────────────┬──────────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
    Climate  Weather  Satellite
      Data     Data      Data
       │       │        │
       └───────┼────────┘
               ▼
        Data Processing
               │
               ▼
        Crop Stress Model
               │
               ▼
       Yield Impact Model
               │
               ▼
       Climate Stress Test
               │
               ▼
        Optimization Engine
               │
               ▼
      Farmer-Friendly Output
```

### Stack

- **Frontend:** Next.js / React / TypeScript
- **Backend:** FastAPI / Python
- **ML:** Python, scikit-learn / gradient boosting as appropriate
- **Geospatial:** Python geospatial tooling
- **Optimization:** OR-Tools / SciPy / PuLP as appropriate
- **PWA:** Progressive Web App
- **Android path:** Capacitor when required
- **AI / Voice:** speech-to-text, agricultural backend, LLM explanation, text-to-speech
- **Source control:** GitHub

---

## Data & Scientific Foundation

VivasAIyi is designed around **real data rather than fabricated demonstration values**.

Potential data sources include:

- NOAA / ENSO datasets
- ERA5 / ERA5-Land
- Open-Meteo
- Sentinel-2 / Copernicus
- Dynamic World / Google Earth Engine
- FAO ASIS
- FAO agricultural datasets
- IMD and relevant Indian government datasets
- Tamil Nadu agricultural statistics and authoritative crop information

The exact dataset used for a specific output must be documented.

### Data Provenance

Important outputs should be traceable to:

```text
Source
Dataset
Variable
Location
Time Period
Units
Processing Method
Model / Assumption
```

---

## Scientific Integrity

VivasAIyi must not become:

> **"An LLM that guesses what farmers should do."**

Instead:

```text
REAL DATA
   ↓
SCIENTIFIC / EMPIRICAL MODEL
   ↓
CROP STRESS
   ↓
YIELD IMPACT
   ↓
STRESS TEST
   ↓
OPTIMIZED ACTION
   ↓
FARMER-FRIENDLY EXPLANATION
```

The LLM is an **explanation and language interface**, not the source of agricultural truth.

### No Fabricated Numbers

We do not fabricate:

- rainfall measurements
- temperature measurements
- yield values
- crop-stress percentages
- climate probabilities
- economic losses
- avoided losses
- model accuracy
- confidence values

If evidence is insufficient, the system should communicate uncertainty or lack of evidence.

---

## Repository Structure

```text
vivasaiyi/
│
├── README.md
├── PROJECT_CONTEXT.md
├── PRODUCT_REQUIREMENTS.md
├── ARCHITECTURE.md
├── UI_SPEC.md
├── API_CONTRACT.md
├── DATA_SOURCES.md
├── ML_SPEC.md
├── SIMULATION_SPEC.md
├── OPTIMIZATION_SPEC.md
├── DECISIONS.md
│
├── frontend/
├── backend/
├── ml/
├── simulation/
├── optimization/
├── data/
├── tests/
└── docs/
    ├── agent_tasks/
    └── research/
```

---

## API Contract

Core API concepts:

```http
GET  /api/v1/farm/risk
POST /api/v1/stress-test
POST /api/v1/optimize
POST /api/v1/voice/query
```

The frontend communicates through service abstractions so mock implementations can be replaced by real backend services without rebuilding the UI.

---

## Language & Accessibility

VivasAIyi supports:

**English | தமிழ்**

Tamil should be natural and farmer-friendly rather than literal machine translation.

| English | Tamil |
|---|---|
| Climate Risk | காலநிலை அபாயம் |
| High Risk | அதிக அபாயம் |
| Moderate Risk | மிதமான அபாயம் |
| Low Risk | குறைந்த அபாயம் |
| Rainfall | மழைப்பொழிவு |
| Temperature | வெப்பநிலை |
| Water Availability | நீர் கிடைப்புநிலை |
| Crop Stress | பயிர் அழுத்தம் |
| Expected Yield | எதிர்பார்க்கப்படும் மகசூல் |
| Yield Loss | மகசூல் இழப்பு |
| Adaptation | தழுவல் நடவடிக்கை |
| Recommendation | பரிந்துரை |
| Stress Test | இடர் சோதனை |
| Ask by Voice | குரல் மூலம் கேளுங்கள் |

---

## Development Roadmap

- [x] **Phase 0 — Project Brain**
- [x] **Phase 1 — UI / Stitch**
- [x] **Phase 2 — Working Frontend / PWA**
- [ ] **Phase 3 — Real Data Pipeline**
- [ ] **Phase 4 — Crop Stress + Yield Impact**
- [ ] **Phase 5 — Climate Stress-Test Engine**
- [ ] **Phase 6 — Adaptation Optimization**
- [ ] **Phase 7 — Tamil Voice + AI**
- [ ] **Phase 8 — PWA / Android Integration**
- [ ] **Phase 9 — Validation + Hackathon Demo**

### Phase 3
Real climate/weather data, historical baselines, anomalies, water indicators, provenance, and the first real risk API.

### Phase 4
Crop-specific stress and yield-impact models with historical validation, uncertainty, and explainability.

### Phase 5
Stress-test climate scenarios and cascading effects:

```text
Climate
→ Water
→ Crop Stress
→ Yield
→ Production
→ Economic Impact
```

### Phase 6
Optimize adaptation strategies under constraints such as budget, water, land, and minimum production.

### Phase 7
Tamil/English voice interaction:

```text
Farmer Voice
   ↓
Speech-to-Text
   ↓
Intent
   ↓
Agricultural Backend
   ↓
Verified Recommendation
   ↓
LLM Explanation
   ↓
Text-to-Speech
```

### Phase 8
PWA refinement, Capacitor integration where required, and Android packaging/testing.

### Phase 9
Final data, model, UX, Tamil, performance, and hackathon validation.

---

## Development Principles

1. **Real data over impressive mockups**
2. **Explainability over black-box output**
3. **Model first, LLM second**
4. **Mobile first**
5. **Tamil as a first-class language**
6. **Reproducibility**
7. **Clear phase boundaries**
8. **GitHub as the shared source of truth**

---

## Agent Workflow

```text
Stitch
  ↓
UI / Design
  ↓
GitHub
  ↓
Antigravity
  ↓
Frontend / PWA
  ↓
GitHub
  ↓
Codex
  ↓
Backend / Data / ML / Simulation / Optimization
  ↓
GitHub
```

Google AI Studio is used for rapid experimentation with conversational and voice experiences before integration into the production architecture.

---

## Project Status

**Active development**

Current milestone:

**Phase 2 — Working Frontend / PWA completed**

Next milestone:

**Phase 3 — Real Data Pipeline**

---

## Research

Research notes and references are maintained under:

```text
docs/research/
```

The research foundation covers:

- ENSO and crop-yield relationships
- climate variability and agricultural production
- Earth observation for agricultural monitoring
- drought and vegetation monitoring
- agricultural adaptation
- climate early-warning systems
- economic impacts of climate variability

---

## Contributing

When contributing:

1. Read the project documentation first.
2. Preserve existing architecture.
3. Never fabricate data or evaluation results.
4. Keep UI, APIs, data, ML, simulation, and optimization separated.
5. Document important assumptions.
6. Add tests for new model/data functionality.
7. Use meaningful Git commits.
8. Never commit secrets or API keys.
9. Update relevant documentation when architecture changes.

---

## License

License information will be added when the project license is finalized.

---

<div align="center">

### VivasAIyi

**Climate Intelligence for Agriculture**

விவசாயத்திற்கான காலநிலை நுண்ணறிவு

*From climate signals to actionable agricultural decisions.*

</div>
