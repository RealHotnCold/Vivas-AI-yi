import { FarmContext, FarmRiskResponse, ActionsResponse, StressTestResponse, VoiceQueryResponse } from '../../../types';

export const MOCK_FARM_CONTEXT: FarmContext = {
  region: 'Cauvery Delta',
  district: 'Thanjavur, Tamil Nadu',
  crop: 'Samba Paddy',
  variety: 'CR 1009 Sub 1',
  sowingDate: '2026-08-14',
  cropAgeDays: 54,
  totalDurationDays: 135,
  growthStage: 'Panicle Initiation Stage',
  growthStageTa: 'கதிர் உருவாகும் தருணம்',
  landAreaAcres: 2.4,
  soilType: 'Deep Deltaic Silt Clay',
  farmerName: 'Murugan',
  farmerNameTa: 'முருகன்',
};

export const MOCK_FARM_RISK: FarmRiskResponse = {
  region: 'Thanjavur',
  crop: 'paddy',
  risk_level: 'high',
  risk_score: 78,
  rainfall_anomaly: -21,
  temperature_anomaly: 1.6,
  water_stress: 'critical_deficit',
  crop_stress: 'moisture_depletion',
  yield_anomaly: '-18% to -24%',
  observed_rainfall_mm: 34,
  normal_rainfall_mm: 110,
  peak_temperature_c: 34.8,
  critical_rationale: {
    en: 'Panicle initiation in CR 1009 Sub 1 requires continuous standing water (2.5–5 cm). The joint convergence of late canal rotational cycles and localized afternoon thermal spikes pushes root suction tension past critical threshold (18 kPa).',
    ta: 'தஞ்சாவூர் வெண்ணாறு பாசன பகுதியில் சுழற்சி முறை நீர் வழங்கல் தாமதமாவதால் பயிரின் கதிர் வெளித்தள்ளும் திறன் குறைய வாய்ப்புள்ளது.'
  },
  causal_chain: [
    {
      step: 1,
      title: 'Rainfall Deficit',
      titleTa: 'குறைந்த மழைப்பொழிவு',
      category: 'Macro Trend',
      description: 'Delayed local convective monsoon showers reduce topsoil water buffer.',
      severity: 'moderate'
    },
    {
      step: 2,
      title: 'Canal Flow Stress',
      titleTa: 'நீர் கிடைப்பில் குறைவு',
      category: 'Delta Inflow',
      description: 'Lower storage levels in primary Thanjavur distributaries slow rotational flooding.',
      severity: 'moderate'
    },
    {
      step: 3,
      title: 'Crop Tension Spike',
      titleTa: 'பயிரில் தீவிர அழுத்தம்',
      category: 'Root Zone',
      description: 'Panicle exertion is arrested due to moisture stress during cell division.',
      severity: 'high'
    },
    {
      step: 4,
      title: 'Yield Reduction Risk',
      titleTa: 'மகசூல் இழப்பு அபாயம்',
      category: 'Harvest Impact',
      description: 'Unchecked dry spell risks up to 24% chaffy grain formation if unmitigated.',
      severity: 'critical'
    }
  ],
  timeline_projection: [
    { label: 'Now', tag: 'Moderate', tagClass: 'bg-amber-100 text-amber-800', colorClass: 'bg-amber-400' },
    { label: '+1 Wk', tag: 'High', tagClass: 'bg-red-100 text-red-800', colorClass: 'bg-red-500' },
    { label: '+2 Wks', tag: 'Peak Risk', tagClass: 'bg-red-200 text-red-950 font-bold', colorClass: 'bg-red-700' },
    { label: '+1 Mo', tag: 'Adaptive Normal', tagClass: 'bg-[#b1f2be] text-[#12512c]', colorClass: 'bg-[#b1f2be]' },
  ],
  potential_impacts: {
    projected_yield: '-18% to -24%',
    projected_yield_detail: 'Estimated ~420 kg/acre deficit vs potential.',
    water_deficit: '+22% Deficit',
    water_deficit_detail: 'Evapotranspiration gap requiring AWD cycling.',
    stress_window: 'Critical 9 Days',
    stress_window_detail: 'Coincides with floral meristem emergence.',
    revenue_at_risk: '-₹18,200',
    revenue_at_risk_detail: 'Per acre gross realization impact window.'
  },
  telemetry_vectors: [
    {
      id: 'rain',
      label: 'Rainfall',
      labelTa: 'மழைப்பொழிவு',
      subtitle: 'NE Monsoon Micro-deficit',
      badge: '-21% Below Normal',
      badgeType: 'warning',
      description: 'Dry spell projected for next 6 days. Expected convective precipitation is suppressed under stable atmospheric ridge.',
      detail: 'Observed: 34mm | Seasonal Normal: 110mm',
      icon: 'water_drop',
    },
    {
      id: 'temp',
      label: 'Temperature',
      labelTa: 'வெப்பநிலை',
      subtitle: 'Daytime Peak Anomaly',
      badge: '+1.6°C Thermal Spike',
      badgeType: 'error',
      description: 'Afternoon maximum reaching 34.8°C at 13:30 IST. Accelerated leaf desiccation potential during panicle emergence.',
      detail: 'Peak heat envelope: 11:30 AM – 03:00 PM (மதிய நேர வெப்ப அழுத்தம்)',
      icon: 'thermostat',
    },
    {
      id: 'canal',
      label: 'Canal Discharge',
      labelTa: 'பாசன நீர்',
      subtitle: 'Mettur Lower Vennar Tail-End',
      badge: 'Rotation Strain (சுழற்சி)',
      badgeType: 'error',
      description: 'Supply delayed by 48 hours at tail distributary #4. Next rotational gate opening confirmed for Tuesday evening.',
      detail: 'Tail Distributary Pressure: Critical Deficit (1.2 cusecs)',
      icon: 'waves',
    },
    {
      id: 'root',
      label: 'Root-Zone Tension',
      labelTa: 'பயிர் மன அழுத்தம்',
      subtitle: 'Upper 15cm Active Silt Clay',
      badge: 'Moisture Depletion',
      badgeType: 'warning',
      description: 'Crop evapotranspiration rate (ETc) exceeds inflow by 3.8 mm/day. Hair-line cracking observed in field quadrant 2.',
      detail: 'Actionable: Micro-irrigation or AWD wetting scheduled',
      icon: 'psychiatry',
      actionHint: 'AWD Wetting Recommended'
    }
  ],
  data_sources: [
    { name: 'Sentinel-2 MSI (NDVI/NDWI)', agency: 'Copernicus / ESA', updated: 'Today, 06:00 IST' },
    { name: 'Agro-AWS Thanjavur', agency: 'IMD', updated: 'Today, 07:15 IST' },
    { name: 'Crop Phenology DSSAT v4.8', agency: 'TNAU', updated: 'Yesterday' },
    { name: 'Cauvery Distributary Inflow', agency: 'TN PWD Water Resources', updated: '12m ago' },
  ],
  provenance: {
    model_version: 'TN-Delta-HydroCrop v2.4',
    confidence_pct: 94.2,
    notes: 'Risk severity index is generated by weighing 10-day trailing canal releases, topsoil microwave moisture readings, and hourly thermal thresholds calibrated against CR 1009 Sub 1 phenological response curves.'
  }
};

export const MOCK_ACTIONS_RESPONSE: ActionsResponse = {
  topPriorityAction: {
    id: 'awd',
    title: 'Adjust Irrigation: Alternate Wetting and Drying (AWD)',
    titleTa: 'பாசன முறையை மாற்றி AWD முறையைப் பின்பற்றவும்',
    category: 'WATER MANAGEMENT',
    categoryTa: 'பாசன மேலாண்மை',
    priority: 'top',
    impactScore: '9.4/10',
    whyReason: {
      en: 'Maintains root hydration while cutting crop water requirement by 25–30% during canal rotation deficits.',
      ta: 'கால்வாய் நீர் பற்றாக்குறை உள்ளபோது வேர் ஈரப்பதத்தை பாதுகாத்து 25% தண்ணீரை சேமிக்கிறது.'
    },
    metrics: {
      benefit: 'Avoid -14%',
      benefitDesc: 'Yield crash saved',
      cost: '₹120',
      costDesc: 'PVC Pani Pipe',
      evidence: 'TNAU',
      evidenceDesc: 'High Protocol'
    },
    actionSteps: [
      {
        step: 1,
        title: 'Install 15cm perforated PVC tube',
        detail: 'Insert water pipe 10-15cm into root zone between tillers, leaving 5cm above soil surface.',
        detailTa: 'வயலில் 15 செ.மீ துளையிட்ட குழாயை நடவும்'
      },
      {
        step: 2,
        title: 'Monitor water drop',
        detail: 'Only re-irrigate when the water table falls 15cm below the soil line.',
        detailTa: 'குழாயில் நீர் 15 செ.மீ ஆழத்திற்கு குறையும் வரை நீர் பாய்ச்ச வேண்டாம்'
      },
      {
        step: 3,
        title: 'Pond to 5cm max depth',
        detail: 'Re-flood field gently to 5cm and allow gradual seepage.',
        detailTa: 'மறுபடி 5 செ.மீ நீர் மட்டும் தேங்குமாறு பாய்ச்சவும்'
      },
      {
        step: 4,
        title: 'Flowering Phase Exception',
        detail: 'Keep continuous shallow water during flowering & panicle emergence.',
        detailTa: 'பூக்கும் பருவத்தில் மட்டும் நீர் பற்றாக்குறை இன்றி பார்த்துக்கொள்ளவும்'
      }
    ],
    timing: 'Immediate Field Setup',
    estimatedCostPerAcre: '₹120 / acre',
    themeColor: 'primary'
  },
  sequentialInterventions: [
    {
      id: 'kcl',
      title: 'Foliar Spray of 1% KCl (Potassium Chloride)',
      titleTa: '1% பொட்டாசியம் குளோரைடு (KCl) இலைவழி தெளித்தல்',
      category: 'HEAT STRESS SHIELD',
      categoryTa: 'வெப்ப தணிப்பு',
      priority: 'sequential',
      impactScore: '8.6/10',
      whyReason: {
        en: 'Regulates stomatal aperture during 36°C afternoon surges. Prevents cellular wilting and sustains photosynthesis during moisture deficits.',
        ta: 'இலைத்துளைகளை ஒழுங்குபடுத்தி வெயிலில் பயிர் வாடாமல் காக்கும்.'
      },
      metrics: {
        benefit: '+8% Resistance',
        benefitDesc: 'Stomatal resilience',
        cost: '₹240',
        costDesc: 'Potash salt per acre',
        evidence: 'TNAU Aduthurai',
        evidenceDesc: 'Verified'
      },
      actionSteps: [
        {
          step: 1,
          title: 'Mix 1kg KCl per 100L water',
          detail: 'Dissolve standard agricultural grade muriate of potash cleanly.',
          detailTa: '100 லிட்டர் நீரில் 1 கிலோ பொட்டாஷ் கரைக்கவும்'
        },
        {
          step: 2,
          title: 'Spray before 10:00 AM',
          detail: 'Spray during open stomata window before peak heat midday.',
          detailTa: 'காலை 10 மணிக்கு முன் இலைகளில் நன்கு படிய தெளிக்கவும்'
        }
      ],
      timing: 'Apply before 10 AM',
      estimatedCostPerAcre: '₹240 / acre',
      themeColor: 'amber'
    },
    {
      id: 'silicon',
      title: 'Silicon Fertilizer Soil Amendment',
      titleTa: 'சிலிக்கான் உரமிடுதல் (தண்டு பலப்படுத்துதல்)',
      category: 'TRANSPIRATION CONTROL',
      categoryTa: 'நீரிழப்பு குறைப்பு',
      priority: 'sequential',
      impactScore: '8.2/10',
      whyReason: {
        en: 'Deposits silica in the leaf epidermis, forming a thick cuticle barrier that suppresses unneeded leaf evaporation and repels sucking pests.',
        ta: 'இலைகளில் சிலிக்கா படலம் அமைத்து அதிகப்படியான நீராவி போக்கை தடுக்கும்.'
      },
      metrics: {
        benefit: 'Cut 12% Transpiration',
        benefitDesc: 'Cuticular protection',
        cost: '₹480',
        costDesc: 'Granular amendment',
        evidence: 'ICAR-NRRI',
        evidenceDesc: 'Recommended'
      },
      actionSteps: [
        {
          step: 1,
          title: 'Broadcast at Mid-Tillering',
          detail: 'Broadcast evenly during active root uptake window.',
          detailTa: 'தூர்வை பருவத்தில் சீராக வயலில் தூவவும்'
        }
      ],
      timing: 'Mid-Tillering Stage',
      estimatedCostPerAcre: '₹480 / acre',
      themeColor: 'sky'
    },
    {
      id: 'bunding',
      title: 'Adjust Canal Sluice Water Bunding',
      titleTa: 'வரப்பு மற்றும் மடை சீரமைப்பு (கசிவு தடுத்தல்)',
      category: 'BUND REINFORCEMENT',
      categoryTa: 'வரப்பு மேலாண்மை',
      priority: 'sequential',
      impactScore: '7.9/10',
      whyReason: {
        en: 'Pack perimeter mud dikes and seal crab burrows to eliminate peripheral seepage. Fix spillover threshold at exactly 5cm above soil bed.',
        ta: 'வயல் வரப்பு நண்டு பொந்துகளை அடைத்து நீர் கசிவை முற்றிலும் தடுத்தல்.'
      },
      metrics: {
        benefit: 'Save 15% Seepage',
        benefitDesc: 'Zero perimeter loss',
        cost: '₹0',
        costDesc: 'Manual labor',
        evidence: 'Delta Field Best Practice',
        evidenceDesc: 'Standard'
      },
      actionSteps: [
        {
          step: 1,
          title: 'Field inspection walk',
          detail: 'Check bund cracks and pack fresh mud clay firmly.',
          detailTa: 'வரப்புகளை ஆய்வு செய்து களிமண் கொண்டு அடைக்கவும்'
        }
      ],
      timing: 'Immediate Field Walk',
      estimatedCostPerAcre: 'Zero Cost (Manual)',
      themeColor: 'emerald'
    },
    {
      id: 'nutrient_mix',
      title: 'Contingency Short Dry-Spell Foliar Nutrient Mix',
      titleTa: 'வறட்சி கால நுண்ணூட்ட தெளிப்பு (யூரியா + துத்தநாகம்)',
      category: 'CONTINGENCY RESCUE',
      categoryTa: 'அவசர கால சத்து தெளிப்பு',
      priority: 'sequential',
      impactScore: '7.5/10',
      whyReason: {
        en: 'Spray 1% Urea + 0.5% Zinc Sulphate to restore leaf greenness and halt nitrogen immobilization caused by soil moisture retreat.',
        ta: 'மண் வறட்சியால் நைட்ரஜன் சத்து குறைவதை தடுத்து பயிரை பசுமையாக வைக்கிறது.'
      },
      metrics: {
        benefit: 'Halt Nitrogen Shock',
        benefitDesc: 'Quick absorption',
        cost: '₹310',
        costDesc: 'Urea + Zinc mix',
        evidence: 'KVK Thanjavur',
        evidenceDesc: 'Contingency'
      },
      actionSteps: [
        {
          step: 1,
          title: 'Spray when rain gap > 7 days',
          detail: 'Dissolve 1kg Urea + 500g ZnSO4 in 100L water and mist lightly.',
          detailTa: 'மழை 7 நாட்களுக்கு மேல் இல்லாத போது தெளிக்கவும்'
        }
      ],
      timing: 'If dry spell > 7 days',
      estimatedCostPerAcre: '₹310 / acre',
      themeColor: 'amber'
    }
  ],
  comparisonVisualizer: {
    yieldRiskCollapse: {
      current: '-21% Current',
      adapted: '-6% Adapted',
      currentWidthPct: 70,
      adaptedWidthPct: 20
    },
    waterDepletionRate: {
      currentDemand: '100% Demand',
      adaptedSaved: '72% Saved',
      currentWidthPct: 72,
      adaptedWidthPct: 28
    },
    netProtectionRupees: '₹15,200'
  },
  disclaimer: {
    en: 'Intervention simulations generated based on CR 1009 Sub 1 crop phenotype models. Values represent indicative potential until local extension officer (VAO / KVK Thanjavur) field assessment.',
    ta: 'விவசாயிகளுக்கான வழிகாட்டுதல் மட்டுமே; கள அலுவலரின் ஆலோசனையும் தேவை.'
  }
};

export const MOCK_STRESS_TEST_DATA: Record<string, StressTestResponse> = {
  normal: {
    scenario: 'normal',
    metadata: {
      analogYears: '2019, 2021 Historical Normal',
      crop: 'Samba Paddy (CR 1009 Sub 1)',
      region: 'Thanjavur Basin'
    },
    result: {
      lossAvoided: '₹4,100',
      waterSaved: '14%',
      roi: '2.1x',
      unadapted: {
        yieldLoss: '-3%',
        yieldKg: '-140 kg / acre',
        barYield: '12%',
        finLoss: '-₹3,100',
        waterDays: '2 Days',
        bioThreat: 'Nominal Risk',
        badge: 'Baseline'
      },
      adapted: {
        yieldAdapted: '0%',
        yieldAdaptedKg: '0 kg / acre',
        barYieldAdapted: '3%',
        finAdapted: '₹0',
        finPrevented: '₹3,100 Preserved',
        adaptedDays: '0 Days',
        adaptedThreat: 'Optimum',
        plan: 'Standard System of Rice Intensification (SRI) + Organic Mulch'
      }
    },
    modelLineage: 'Simulated Model: DSSAT/CERES-Rice v4.8 Calibrated for Cauvery Delta',
    provenanceNotice: 'Conceptual simulation based on historical climate analogs (1997, 2015, 2023).'
  },
  moderate: {
    scenario: 'moderate',
    metadata: {
      analogYears: '2015, 2023 Moderate El Niño Analog',
      crop: 'Samba Paddy (CR 1009 Sub 1)',
      region: 'Thanjavur Basin'
    },
    result: {
      lossAvoided: '₹15,200',
      waterSaved: '28%',
      roi: '4.8x',
      unadapted: {
        yieldLoss: '-18%',
        yieldKg: '-850 kg / acre',
        barYield: '65%',
        finLoss: '-₹18,400',
        waterDays: '14 Days',
        bioThreat: 'High Risk',
        badge: 'Vulnerable'
      },
      adapted: {
        yieldAdapted: '-5%',
        yieldAdaptedKg: '-220 kg / acre',
        barYieldAdapted: '18%',
        finAdapted: '-₹3,200',
        finPrevented: '₹15,200 Loss Prevented',
        adaptedDays: '3 Days',
        adaptedThreat: 'Buffered',
        plan: 'AWD Irrigation + Foliar Potassium/Silicon Spray + Short Dry-spell Variety Sowing'
      }
    },
    modelLineage: 'Simulated Model: DSSAT/CERES-Rice v4.8 Calibrated for Cauvery Delta',
    provenanceNotice: 'Values represent simulated projections for decision support under projected agro-climatic stress. Consult local VAO or KVK Sikkal/Needamangalam agronomists prior to chemical interventions.'
  },
  severe: {
    scenario: 'severe',
    metadata: {
      analogYears: '1997 Super El Niño Analog',
      crop: 'Samba Paddy (CR 1009 Sub 1)',
      region: 'Thanjavur Basin'
    },
    result: {
      lossAvoided: '₹26,800',
      waterSaved: '39%',
      roi: '5.9x',
      unadapted: {
        yieldLoss: '-36%',
        yieldKg: '-1,720 kg / acre',
        barYield: '92%',
        finLoss: '-₹37,800',
        waterDays: '24 Days',
        bioThreat: 'Severe Failure',
        badge: 'Critical Risk'
      },
      adapted: {
        yieldAdapted: '-11%',
        yieldAdaptedKg: '-510 kg / acre',
        barYieldAdapted: '32%',
        finAdapted: '-₹11,000',
        finPrevented: '₹26,800 Loss Prevented',
        adaptedDays: '7 Days',
        adaptedThreat: 'Protected',
        plan: 'Emergency AWD + Humic/Fulvic Foliar Drench + Direct Seeded Rice (DSR) Transition'
      }
    },
    modelLineage: 'Simulated Model: DSSAT/CERES-Rice v4.8 Calibrated for Cauvery Delta',
    provenanceNotice: 'Extreme scenario indicates critical canal tail-end shortfall. Immediate contingency agronomic package activated.'
  }
};

export const MOCK_VOICE_QUERY_RESPONSE: VoiceQueryResponse = {
  intent: 'water_management_advisory',
  audioDurationSeconds: 14,
  farmerQuery: {
    raw: 'இந்த வாரம் மேட்டூர் கால்வாய் தண்ணீர் குறைவாக இருக்கிறது. தூர்வையில் உள்ள நெல்லுக்கு நான் என்ன செய்ய வேண்டும்?',
    translationEn: 'Canal water is low this week. What should I do for my vegetative paddy?'
  },
  advisorResponse: {
    ta: 'உங்கள் வயலில் பயிர் தூர்வை பருவத்தில் உள்ளதால், நிலத்தில் தொடர்ந்து தண்ணீர் தேக்க வேண்டியதில்லை. VivasAIyi வழிகாட்டி 5 செ.மீ நீர் பாய்ச்சி 3 நாட்கள் உலர விடலாம். மேலும், மதிய வெயிலின் தாக்கத்தை குறைக்க 1% பொட்டாசியம் குளோரைடு (KCl) கரைசல் தெளிக்கவும்.',
    enSummary: 'Tillering stage does not need continuous water ponding. Use Alternate Wetting & Drying (AWD) with 5cm height, drying for 3 days. Foliar spray 1% KCl to prevent drought wilting.'
  },
  suggestedActions: [
    {
      id: 'awd_guide',
      title: 'Step-by-step AWD Water Management',
      titleTa: 'காய்ச்சலும் பாய்ச்சலும் வழிகாட்டி',
      subtitle: 'Water Management',
      icon: 'water_drop',
      route: '/actions'
    },
    {
      id: 'kcl_calc',
      title: '1% KCl Dosage for your 2.4 Acres',
      titleTa: 'தெளிப்பு மருந்து விகித கால்குலேட்டர்',
      subtitle: 'Spray Dosage',
      icon: 'calculate',
      route: '/actions'
    }
  ],
  quickQuestions: [
    {
      queryTa: 'அடுத்த 7 நாட்கள் மழை வருமா?',
      queryEn: 'Will it rain in next 7 days in Thanjavur?',
      icon: 'cloudy_snowing'
    },
    {
      queryTa: 'எல் நினோ என் மகசூலை எப்படி பாதிக்கும்?',
      queryEn: 'How will El Niño affect my harvest yield?',
      icon: 'thermostat'
    },
    {
      queryTa: 'பயிர் காப்பீடு PMFBY பதிவு செய்வது எப்படி?',
      queryEn: 'How to enroll and claim PMFBY crop insurance?',
      icon: 'verified_user'
    }
  ]
};

