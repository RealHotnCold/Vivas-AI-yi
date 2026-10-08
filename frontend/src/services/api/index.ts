import { FarmRiskResponse, ActionsResponse, StressTestResponse, ScenarioType, VoiceQueryRequest, VoiceQueryResponse } from '../../types';
import { MOCK_FARM_RISK, MOCK_ACTIONS_RESPONSE, MOCK_STRESS_TEST_DATA, MOCK_VOICE_QUERY_RESPONSE } from './mock';

/**
 * VivasAIyi Centralized API Client
 *
 * Current: Returns typed responses from the isolated mock data layer.
 * Future (Phase 3+): Connects to FastAPI backend (/api/v1/...) via fetch without changing caller components.
 */
class ApiService {
  private useMock: boolean = true;
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

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
