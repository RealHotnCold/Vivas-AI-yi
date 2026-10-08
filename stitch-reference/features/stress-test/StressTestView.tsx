'use client';

import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { ScenarioType } from '../../types';
import { MOCK_STRESS_TEST_DATA } from '../../services/api/mock';

export function StressTestView() {
  const { t, language } = useI18n();
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('moderate');
  const [adopted, setAdopted] = useState(false);
  const [exported, setExported] = useState(false);

  const currentData = MOCK_STRESS_TEST_DATA[activeScenario] || MOCK_STRESS_TEST_DATA.moderate;
  const { result, metadata, modelLineage, provenanceNotice } = currentData;

  const handleAdopt = () => {
    setAdopted(true);
    setTimeout(() => setAdopted(false), 3000);
  };

  const handleExport = () => {
    setExported(true);
    const text = `VivasAIyi Stress Test Advisory for Thanjavur Samba Paddy (CR 1009 Sub 1):\nScenario: ${activeScenario}\nLoss Avoided: ${result.lossAvoided}/acre\nWater Saved: ${result.waterSaved}\nPlan: ${result.adapted.plan}`;
    navigator.clipboard?.writeText(text);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* 1. Header & Engine Banner */}
      <section className="flex flex-col bg-[#ecf6ec] rounded-xl p-4 shadow-xs border border-[#bec8d2]/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#006591]/10 text-[#006591] w-fit mb-1">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Predictive Telemetry Engine</span>
            </div>
            <h1 className="text-xl font-bold text-[#151e18] tracking-tight">
              {t.stressTest.title}
            </h1>
            <p className="text-xs text-[#2e6a41] mt-0.5 font-medium">
              காலநிலை இடர் சோதனை உருவகப்படுத்துதல்
            </p>
          </div>
          <div className="p-2 rounded-xl bg-[#e6f1e7] flex items-center justify-center flex-shrink-0 text-[#006591]">
            <span className="material-symbols-outlined text-[24px]">query_stats</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[#3e4850] bg-white rounded-lg p-2.5 shadow-xs border border-[#bec8d2]/20">
          <span className="material-symbols-outlined text-[18px] text-[#1d6d24] flex-shrink-0">grass</span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#151e18] truncate">{metadata.crop} • {metadata.region}</span>
            <span className="text-[11px] text-[#3e4850] truncate">தஞ்சாவூர் சம்பா நெல் பயிருக்கான தீவிர காலநிலை தாக்க மாதிரி</span>
          </div>
        </div>
      </section>

      {/* 2. Scenario Archetype Selector */}
      <section className="flex flex-col bg-white rounded-xl p-4 shadow-xs space-y-3 border border-[#bec8d2]/30">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase text-[#6e7881] font-bold tracking-wider">
              {t.stressTest.selectScenario}
            </label>
            <span className="text-sm font-bold text-[#151e18]">Simulate Stress Severity</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#e6f1e7] text-[#151e18] text-[10px] font-semibold">
            3 Archetypes
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Normal */}
          <button
            onClick={() => setActiveScenario('normal')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between border ${
              activeScenario === 'normal'
                ? 'bg-[#e1ebe1] text-[#151e18] border-[#0ea5e9] shadow-xs'
                : 'bg-[#ecf6ec] text-[#3e4850] border-transparent'
            }`}
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeScenario === 'normal' ? 'bg-[#0ea5e9] text-white' : 'bg-[#dbe5db] text-[#6e7881]'
              }`}>
                <span className="material-symbols-outlined text-[16px]">routine</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#151e18] truncate">Normal Seasonal</span>
                <span className="text-[11px] text-[#3e4850] truncate">சாதாரண நிலை (Cauvery canal supply adequate)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px]">
              {activeScenario === 'normal' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </button>

          {/* Moderate */}
          <button
            onClick={() => setActiveScenario('moderate')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between border ${
              activeScenario === 'moderate'
                ? 'bg-[#e1ebe1] text-[#151e18] border-[#0ea5e9] shadow-xs'
                : 'bg-[#ecf6ec] text-[#3e4850] border-transparent'
            }`}
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeScenario === 'moderate' ? 'bg-[#0ea5e9] text-white' : 'bg-[#dbe5db] text-[#6e7881]'
              }`}>
                <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#151e18] truncate">Moderate El Niño</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#0ea5e9] text-white text-[9px] uppercase font-bold">Active</span>
                </div>
                <span className="text-[11px] text-[#3e4850] truncate">மிதமான எல் நினோ (+1.2°C, -18% NEM rain)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px]">
              {activeScenario === 'moderate' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </button>

          {/* Severe */}
          <button
            onClick={() => setActiveScenario('severe')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between border ${
              activeScenario === 'severe'
                ? 'bg-[#e1ebe1] text-[#151e18] border-[#0ea5e9] shadow-xs'
                : 'bg-[#ecf6ec] text-[#3e4850] border-transparent'
            }`}
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeScenario === 'severe' ? 'bg-[#0ea5e9] text-white' : 'bg-[#dbe5db] text-[#6e7881]'
              }`}>
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#151e18] truncate">Severe El Niño (+2.4°C / -35% Rain)</span>
                <span className="text-[11px] text-[#3e4850] truncate">தீவிர எல் நினோ (Critical delta deficit)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px]">
              {activeScenario === 'severe' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#6e7881]">
          <span className="material-symbols-outlined text-[15px]">history</span>
          <span>{provenanceNotice}</span>
        </div>
      </section>

      {/* 3. Dynamic Stress Comparison */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-bold text-[#151e18]">Dynamic Stress Comparison</span>
          <span className="text-xs text-[#2e6a41] font-bold">நேரடி விளைவு ஒப்பீடு</span>
        </div>

        {/* Without Adaptation */}
        <div className="flex flex-col rounded-xl bg-[#ffdad6]/40 p-4 shadow-xs relative overflow-hidden border border-[#dc2626]/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#dc2626]"></div>
          <div className="flex items-center justify-between pb-2 mb-2 bg-[#ffdad6]/60 -mx-4 -mt-4 px-4 pt-3 border-b border-[#dc2626]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#dc2626] text-[18px]">warning</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#93000a] uppercase font-bold tracking-tight">
                  {t.stressTest.unadaptedHeading}
                </span>
                <span className="text-[10px] text-[#dc2626]">தழுவல் நடவடிக்கை இல்லாமல்</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#dc2626] text-white text-[10px] font-bold uppercase">
              {result.unadapted.badge}
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="bg-white/90 rounded-lg p-2.5 shadow-xs">
              <span className="text-[10px] text-[#6e7881] uppercase font-bold block">{t.stressTest.expectedYieldLoss}</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xl text-[#dc2626] font-bold">{result.unadapted.yieldLoss}</span>
                <span className="text-xs text-[#3e4850] font-medium">{result.unadapted.yieldKg}</span>
              </div>
              <div className="w-full bg-[#dbe5db] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#dc2626] h-full rounded-full transition-all duration-500" style={{ width: result.unadapted.barYield }}></div>
              </div>
            </div>

            <div className="bg-white/90 rounded-lg p-2.5 shadow-xs">
              <span className="text-[10px] text-[#6e7881] uppercase font-bold block">{t.stressTest.financialLoss}</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base text-[#dc2626] font-bold">{result.unadapted.finLoss}</span>
                <span className="text-[11px] text-[#3e4850]">net income / acre</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/90 rounded-lg p-2 shadow-xs">
                <span className="text-[10px] text-[#6e7881] block">{t.stressTest.waterStressDays}</span>
                <span className="text-sm font-bold text-[#dc2626] mt-0.5 block">{result.unadapted.waterDays}</span>
                <span className="text-[10px] text-[#3e4850] leading-tight block mt-0.5">During panicle initiation</span>
              </div>
              <div className="bg-white/90 rounded-lg p-2 shadow-xs">
                <span className="text-[10px] text-[#6e7881] block">{t.stressTest.biologicalThreat}</span>
                <span className="text-sm font-bold text-[#dc2626] mt-0.5 block">{result.unadapted.bioThreat}</span>
                <span className="text-[10px] text-[#3e4850] leading-tight block mt-0.5">Spikelet sterility spike</span>
              </div>
            </div>
          </div>
        </div>

        {/* With Adaptation Package */}
        <div className="flex flex-col rounded-xl bg-[#b1f2be]/40 p-4 shadow-xs relative overflow-hidden border border-[#14532d]/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14532d]"></div>
          <div className="flex items-center justify-between pb-2 mb-2 bg-[#b1f2be]/60 -mx-4 -mt-4 px-4 pt-3 border-b border-[#14532d]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#14532d] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#12512c] uppercase font-bold tracking-tight">
                  {t.stressTest.adaptedHeading}
                </span>
                <span className="text-[10px] text-[#14532d]">பரிந்துரைக்கப்பட்ட நடவடிக்கையுடன்</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#14532d] text-white text-[10px] font-bold uppercase">
              Protected
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="bg-white/90 rounded-lg p-2.5 shadow-xs">
              <span className="text-[10px] text-[#6e7881] uppercase font-bold block">{t.stressTest.managedYieldDrop}</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xl text-[#14532d] font-bold">{result.adapted.yieldAdapted}</span>
                <span className="text-xs text-[#2e6a41] font-medium">{result.adapted.yieldAdaptedKg}</span>
              </div>
              <div className="w-full bg-[#dbe5db] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#14532d] h-full rounded-full transition-all duration-500" style={{ width: result.adapted.barYieldAdapted }}></div>
              </div>
            </div>

            <div className="bg-white/90 rounded-lg p-2.5 shadow-xs">
              <span className="text-[10px] text-[#6e7881] uppercase font-bold block">{t.stressTest.preservedMargin}</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base text-[#14532d] font-bold">{result.adapted.finAdapted}</span>
                <span className="text-xs text-[#1d6d24] font-bold">{result.adapted.finPrevented}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/90 rounded-lg p-2 shadow-xs">
                <span className="text-[10px] text-[#6e7881] block">{t.stressTest.waterStressDays}</span>
                <span className="text-sm font-bold text-[#14532d] mt-0.5 block">{result.adapted.adaptedDays}</span>
                <span className="text-[10px] text-[#3e4850] leading-tight block mt-0.5">Mitigated by AWD</span>
              </div>
              <div className="bg-white/90 rounded-lg p-2 shadow-xs">
                <span className="text-[10px] text-[#6e7881] block">Pollen Viability</span>
                <span className="text-sm font-bold text-[#14532d] mt-0.5 block">{result.adapted.adaptedThreat}</span>
                <span className="text-[10px] text-[#3e4850] leading-tight block mt-0.5">Silicon + K cushion</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#ecf6ec] flex flex-col space-y-1">
              <span className="text-[10px] text-[#006591] uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">task_alt</span> Bundle Components
              </span>
              <span className="text-xs text-[#151e18] leading-tight">
                {result.adapted.plan}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Value Realization Engine Banner */}
      <section className="flex flex-col bg-[#151e18] text-white rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0ea5e9] text-[22px]">savings</span>
            <span className="text-xs text-[#89ceff] uppercase tracking-wider font-bold">
              Value Realization Engine
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#14532d] text-white text-[10px] font-bold">
            Delta Validated
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm flex flex-col">
            <span className="text-[10px] text-[#89ceff] uppercase tracking-wide">
              {t.stressTest.lossAvoidedTitle} / தவிர்க்கப்பட்ட இழப்பு
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl text-[#b1f2be] font-bold">
                {result.lossAvoided}
              </span>
              <span className="text-xs text-white/80">/ acre saved</span>
            </div>
            <span className="text-[11px] text-white/70 mt-0.5">
              Based on MSP ₹2,300/quintal for grade-A Samba paddy.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-white/10 flex flex-col">
              <span className="text-[10px] text-[#89ceff] uppercase">{t.stressTest.waterSavedTitle} / நீர்</span>
              <span className="text-lg text-[#0ea5e9] mt-0.5 font-bold">{result.waterSaved}</span>
              <span className="text-[10px] text-white/70 mt-0.5">≈ 4.2 Lakh L/acre</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/10 flex flex-col">
              <span className="text-[10px] text-[#89ceff] uppercase">{t.stressTest.netRoiTitle} / பலன்</span>
              <span className="text-lg text-[#b1f2be] mt-0.5 font-bold">{result.roi}</span>
              <span className="text-[10px] text-white/70 mt-0.5">Package return</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-1">
          <button
            onClick={handleAdopt}
            className="w-full h-11 px-4 rounded-lg bg-[#0ea5e9] hover:bg-[#006591] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>{adopted ? '✓ Plan Adopted & Saved' : t.stressTest.adoptPlanBtn}</span>
          </button>
          <span className="text-[10px] text-center text-[#89ceff] -mt-1">
            இந்த திட்டத்தை செயல்படுத்தவும்
          </span>

          <button
            onClick={handleExport}
            className="w-full h-10 px-4 rounded-lg bg-white text-[#151e18] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:bg-slate-100 active:scale-[0.99]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#14532d]">share</span>
            <span>{exported ? '✓ Advisory Copied for WhatsApp' : t.stressTest.exportWhatsappBtn}</span>
          </button>
          <span className="text-[10px] text-center text-white/70 -mt-1">
            வாட்ஸ்அப்பில் உடனடியாக அனுப்பவும்
          </span>
        </div>
      </section>

      {/* 5. Scientific Lineage */}
      <section className="rounded-xl bg-[#ecf6ec] p-3.5 flex flex-col space-y-1.5 border border-[#bec8d2]/30 text-xs text-[#3e4850]">
        <div className="flex items-center gap-1.5 text-[#6e7881]">
          <span className="material-symbols-outlined text-[16px]">biotech</span>
          <span className="text-[10px] uppercase tracking-wider font-bold">
            Simulation Parameters & Scientific Lineage
          </span>
        </div>
        <p className="font-semibold text-[#151e18]">{modelLineage}</p>
        <p className="text-[11px] leading-relaxed text-[#3e4850]">
          Values represent simulated projections for decision support under projected agro-climatic stress. Actual field yield hinges on local canal release timing, soil salinity gradations, and localized micro-climates. Consult local VAO or KVK Sikkal/Needamangalam agronomists.
        </p>
      </section>
    </div>
  );
}
