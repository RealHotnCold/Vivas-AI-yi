import { FarmRiskResponse, ActionsResponse, StressTestResponse, ScenarioType, VoiceQueryRequest, VoiceQueryResponse } from '../../types';
import { MOCK_FARM_RISK, MOCK_ACTIONS_RESPONSE, MOCK_STRESS_TEST_DATA, MOCK_VOICE_QUERY_RESPONSE } from './mock';

export interface Phase3FarmRiskResponse {
  location: string;
  latitude: number;
  longitude: number;
  geographic_definition: string;
  crop: 'paddy' | 'groundnut';
  assessment_period: string;
  baseline_period: string;
  climate_indicators: { precipitation_mm: number; baseline_precipitation_mm: number; precipitation_anomaly_mm: number; precipitation_anomaly_pct: number | null; mean_temperature_c: number; baseline_mean_temperature_c: number; temperature_anomaly_c: number; };
  water_indicators: { reference_evapotranspiration_mm: number | null; climate_water_balance_proxy_mm: number | null; mean_surface_soil_moisture_m3_m3: number | null; limitation: string; };
  enso: { oni: number | null; season: string | null; status: string; limitation: string };
  risk: { status: 'unvalidated'; explanation: string; drivers: string[] };
  crop_intelligence: {
    feature_set_version: string;
    crop: 'paddy' | 'groundnut';
    feature_availability: string[];
    crop_stress: { status: 'insufficient_evidence'; level: null; score: null; growth_stage: null; drivers: string[]; uncertainty: string; };
    yield_impact: { status: 'insufficient_evidence'; direction: null; estimate: null; uncertainty: string; };
  };
  data_sources: Array<{ source: string; dataset: string; variable: string; period: string }>;
}

/**
 * VivasAIyi Centralized API Client
 *
 * Current: Returns typed responses from the isolated mock data layer.
 * Future (Phase 3+): Connects to FastAPI backend (/api/v1/...) via fetch without changing caller components.
 */
class ApiService {
  private useMock: boolean = true;
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Phase 3 intentionally does not fall back to a mock: an unavailable source must be visible.
  async getPhase3FarmRisk(latitude = 10.787, longitude = 79.1378, crop: 'paddy' | 'groundnut' = 'paddy'): Promise<Phase3FarmRiskResponse> {
    const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), crop });
    const res = await fetch(`${this.baseUrl}/api/v1/farm/risk?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.detail?.message || 'Real climate data is currently unavailable.');
    }
    return res.json();
  }

  // GET /api/v1/farm/risk
  async getFarmRisk(latitude = 10.787, longitude = 79.1378, crop = 'paddy'): Promise<FarmRiskResponse> {
    if (this.useMock) {
      await this.simulateLatency();
      return { ...MOCK_FARM_RISK };
    }
    const res = await fetch(`${this.baseUrl}/api/v1/farm/risk?latitude=${latitude}&longitude=${longitude}&crop=${crop}`);
    if (!res.ok) throw new Error('Failed to fetch farm risk');
    return res.json();
  }

  // GET /api/v1/actions
  async getRecommendedActions(): Promise<ActionsResponse> {
    if (this.useMock) {
      await this.simulateLatency();
      return { ...MOCK_ACTIONS_RESPONSE };
    }
    const res = await fetch(`${this.baseUrl}/api/v1/actions`);
    if (!res.ok) throw new Error('Failed to fetch recommended actions');
    return res.json();
  }

  // POST /api/v1/stress-test
  async runStressTest(scenario: ScenarioType = 'moderate', intervention?: string): Promise<StressTestResponse> {
    if (this.useMock) {
      await this.simulateLatency(300);
      const data = MOCK_STRESS_TEST_DATA[scenario] || MOCK_STRESS_TEST_DATA.moderate;
      return { ...data };
    }
    const res = await fetch(`${this.baseUrl}/api/v1/stress-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, intervention, region: 'Thanjavur', crop: 'paddy' }),
    });
    if (!res.ok) throw new Error('Failed to run stress test simulation');
    return res.json();
  }

  // POST /api/v1/voice/query
  async queryVoice(req: VoiceQueryRequest): Promise<VoiceQueryResponse> {
    if (this.useMock) {
      await this.simulateLatency(400);
      return {
        ...MOCK_VOICE_QUERY_RESPONSE,
        farmerQuery: {
          raw: req.transcript || MOCK_VOICE_QUERY_RESPONSE.farmerQuery.raw,
          translationEn: req.language === 'en' ? req.transcript : MOCK_VOICE_QUERY_RESPONSE.farmerQuery.translationEn
        }
      };
    }
    const res = await fetch(`${this.baseUrl}/api/v1/voice/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error('Voice query service error');
    return res.json();
  }

  private simulateLatency(ms = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const api = new ApiService();
