export type RiskLevel = 'low' | 'moderate' | 'high';

export interface FarmContext {
  region: string;
  district: string;
  crop: string;
  variety: string;
  sowingDate: string;
  cropAgeDays: number;
  totalDurationDays: number;
  growthStage: string;
  growthStageTa: string;
  landAreaAcres: number;
  soilType: string;
  farmerName: string;
  farmerNameTa: string;
}

export interface TelemetryVector {
  id: string;
  label: string;
  labelTa: string;
  subtitle: string;
  badge: string;
  badgeType: 'warning' | 'error' | 'success' | 'info';
  description: string;
  detail: string;
  observed?: string;
  normal?: string;
  icon: string;
  actionHint?: string;
}

export interface FarmRiskResponse {
  region: string;
  crop: string;
  risk_level: RiskLevel;
  risk_score: number;
  rainfall_anomaly: number | null;
  temperature_anomaly: number | null;
  water_stress: string | null;
  crop_stress: string | null;
  yield_anomaly: string | null;
  observed_rainfall_mm: number;
  normal_rainfall_mm: number;
  peak_temperature_c: number;
  critical_rationale: {
    en: string;
    ta: string;
  };
  causal_chain: Array<{
    step: number;
    title: string;
    titleTa: string;
    category: string;
    description: string;
    severity?: 'normal' | 'moderate' | 'high' | 'critical';
  }>;
  timeline_projection: Array<{
    label: string;
    tag: string;
    tagClass: string;
    colorClass: string;
  }>;
  potential_impacts: {
    projected_yield: string;
    projected_yield_detail: string;
    water_deficit: string;
    water_deficit_detail: string;
    stress_window: string;
    stress_window_detail: string;
    revenue_at_risk: string;
    revenue_at_risk_detail: string;
  };
  telemetry_vectors: TelemetryVector[];
  data_sources: Array<{
    name: string;
    agency: string;
    updated: string;
  }>;
  provenance: {
    model_version: string;
    confidence_pct: number;
    notes: string;
  };
}

export interface RecommendedAction {
  id: string;
  title: string;
  titleTa: string;
  category: string;
  categoryTa: string;
  priority: 'top' | 'sequential';
  impactScore: string;
  whyReason: {
    en: string;
    ta: string;
  };
  metrics: {
    benefit: string;
    benefitDesc: string;
    cost: string;
    costDesc: string;
    evidence: string;
    evidenceDesc: string;
  };
  actionSteps: Array<{
    step: number;
    title: string;
    detail: string;
    detailTa: string;
  }>;
  timing: string;
  estimatedCostPerAcre: string;
  themeColor: 'primary' | 'amber' | 'sky' | 'emerald';
}

export interface ActionsResponse {
  topPriorityAction: RecommendedAction;
  sequentialInterventions: RecommendedAction[];
  comparisonVisualizer: {
    yieldRiskCollapse: {
      current: string;
      adapted: string;
      currentWidthPct: number;
      adaptedWidthPct: number;
    };
    waterDepletionRate: {
      currentDemand: string;
      adaptedSaved: string;
      currentWidthPct: number;
      adaptedWidthPct: number;
    };
    netProtectionRupees: string;
  };
  disclaimer: {
    en: string;
    ta: string;
  };
}

export type ScenarioType = 'normal' | 'moderate' | 'severe';

export interface ScenarioResult {
  lossAvoided: string;
  waterSaved: string;
  roi: string;
  unadapted: {
    yieldLoss: string;
    yieldKg: string;
    barYield: string;
    finLoss: string;
    waterDays: string;
    bioThreat: string;
    badge: string;
  };
  adapted: {
    yieldAdapted: string;
    yieldAdaptedKg: string;
    barYieldAdapted: string;
    finAdapted: string;
    finPrevented: string;
    adaptedDays: string;
    adaptedThreat: string;
    plan: string;
  };
}

export interface StressTestResponse {
  scenario: ScenarioType;
  metadata: {
    analogYears: string;
    crop: string;
    region: string;
  };
  result: ScenarioResult;
  modelLineage: string;
  provenanceNotice: string;
}

export interface VoiceQueryRequest {
  language: 'en' | 'ta';
  transcript: string;
  farmContext: Partial<FarmContext>;
}

export interface VoiceQueryResponse {
  intent: string;
  audioDurationSeconds?: number;
  farmerQuery: {
    raw: string;
    translationEn?: string;
  };
  advisorResponse: {
    ta: string;
    enSummary: string;
  };
  suggestedActions: Array<{
    id: string;
    title: string;
    titleTa: string;
    subtitle: string;
    icon: string;
    route: string;
  }>;
  quickQuestions: Array<{
    queryTa: string;
    queryEn: string;
    icon: string;
  }>;
}
