'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';
import { MOCK_ACTIONS_RESPONSE } from '../../services/api/mock';

interface ActionsViewProps {
  onNavigate?: (tab: any) => void;
  onOpenVoice?: () => void;
}

export function ActionsView({ onNavigate, onOpenVoice }: ActionsViewProps = {}) {
  const { t, language } = useI18n();
  const [planDetailOpen, setPlanDetailOpen] = useState(false);
  const { topPriorityAction, sequentialInterventions, comparisonVisualizer, disclaimer } = MOCK_ACTIONS_RESPONSE;

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* 1. Header & Live Advisory Info */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6f1e7] text-[#006591] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>{t.brand.advisoryVersion}</span>
          </span>
          <span className="text-[11px] text-[#3e4850] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1d6d24] animate-pulse"></span>
            {t.brand.liveSync}
          </span>
        </div>
        <h1 className="text-xl font-bold text-[#151e18] tracking-tight mt-1">
          {t.actions.title}
          <span className="block text-[#2e6a41] text-sm font-normal">
            {language === 'en' ? 'நான் என்ன செய்ய வேண்டும்?' : 'What Should I Do?'}
          </span>
        </h1>
        <p className="text-xs text-[#3e4850]">
          {t.actions.subtitle}
        </p>
      </section>

      {/* 2. Interactive Tactile Voice Advisory Card */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#006591] via-[#006591] to-[#003751] p-4 text-white shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold mb-1 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[13px]">mic</span>
              <span>Voice Intelligence • குரல் வழிகாட்டி</span>
            </div>
            <h2 className="text-base font-bold text-white leading-tight">
              {t.actions.voiceHeroTitle}
            </h2>
            <p className="text-xs text-[#c9e6ff] mt-0.5 font-medium">
              குரல் மூலம் என்ன செய்ய வேண்டும் என்று கேளுங்கள்
            </p>
            <p className="text-xs text-white/80 mt-1 line-clamp-1">
              {t.actions.voiceHeroDesc}
            </p>
          </div>

          <button
            onClick={() => onOpenVoice && onOpenVoice()}
            aria-label="Start voice advisory"
            className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-[#006591] shadow-lg flex items-center justify-center transition-transform active:scale-95 hover:bg-slate-50 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </button>
        </div>

        {/* Live Animated Waveform & Quick Query Chips */}
        <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-2">
          <div className="flex items-center justify-between text-white/90 text-[11px]">
            <span>{t.actions.tryAsking}</span>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-1 h-2 bg-[#b1f2be] rounded-full animate-bounce"></span>
              <span className="w-1 h-3.5 bg-[#b1f2be] rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 h-1.5 bg-[#b1f2be] rounded-full animate-bounce [animation-delay:0.3s]"></span>
              <span className="w-1 h-4 bg-[#b1f2be] rounded-full animate-bounce [animation-delay:0.45s]"></span>
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
            <button
              onClick={() => onOpenVoice && onOpenVoice()}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer"
              type="button"
            >
              &quot;மழை குறைவாக இருந்தால் நான் என்ன செய்ய வேண்டும்?&quot;
            </button>
            <button
              onClick={() => onOpenVoice && onOpenVoice()}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer"
              type="button"
            >
              &quot;AWD குழாய் வைப்பது எப்படி?&quot;
            </button>
          </div>
        </div>
      </section>

      {/* 3. Dominant Hero Card: Top Priority Action (AWD) */}
      <section className="rounded-xl bg-white shadow-sm border border-[#bec8d2]/30 overflow-hidden flex flex-col">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0ea5e9] via-[#006591] to-[#14532d]"></div>
        <div className="p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-xs font-bold">
              <span className="material-symbols-outlined text-[15px]">priority_high</span>
              <span>{t.actions.topPriority}</span>
            </span>
            <div className="flex items-center gap-1 bg-[#e6f1e7] px-2 py-0.5 rounded text-xs text-[#14532d] font-bold">
              <span className="material-symbols-outlined text-[14px]">offline_bolt</span>
              <span>{t.actions.impact} {topPriorityAction.impactScore}</span>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#151e18] leading-tight">
              {language === 'en' ? topPriorityAction.title : topPriorityAction.titleTa}
            </h2>
            <p className="text-xs text-[#2e6a41] mt-0.5 font-medium">
              {language === 'en' ? topPriorityAction.titleTa : topPriorityAction.title}
            </p>
          </div>

          {/* Why Section */}
          <div className="rounded-lg bg-[#ecf6ec] p-3 text-[#151e18]">
            <div className="flex items-center gap-1 text-[#006591] text-[11px] uppercase font-bold">
              <span className="material-symbols-outlined text-[15px]">psychology_alt</span>
              <span>Why? • ஏன் செய்ய வேண்டும்?</span>
            </div>
            <p className="text-xs text-[#151e18] mt-1 leading-relaxed">
              {topPriorityAction.whyReason[language === 'en' ? 'en' : 'ta']}
            </p>
          </div>

          {/* Key Telemetry 3-Tile Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="rounded-lg bg-[#e6f1e7] p-2 flex flex-col justify-between">
              <span className="text-[10px] text-[#6e7881] uppercase font-semibold">Benefit / பயன்</span>
              <span className="text-sm font-bold text-[#2e6a41] mt-1">{topPriorityAction.metrics.benefit}</span>
              <span className="text-[10px] text-[#3e4850]">{topPriorityAction.metrics.benefitDesc}</span>
            </div>
            <div className="rounded-lg bg-[#e6f1e7] p-2 flex flex-col justify-between">
              <span className="text-[10px] text-[#6e7881] uppercase font-semibold">Cost / தேவை</span>
              <span className="text-sm font-bold text-[#151e18] mt-1">{topPriorityAction.metrics.cost}</span>
              <span className="text-[10px] text-[#3e4850]">{topPriorityAction.metrics.costDesc}</span>
            </div>
            <div className="rounded-lg bg-[#e6f1e7] p-2 flex flex-col justify-between">
              <span className="text-[10px] text-[#6e7881] uppercase font-semibold">Evidence / ஆதாரம்</span>
              <span className="text-sm font-bold text-[#006591] mt-1">{topPriorityAction.metrics.evidence}</span>
              <span className="text-[10px] text-[#3e4850]">{topPriorityAction.metrics.evidenceDesc}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => setPlanDetailOpen(!planDetailOpen)}
              className="w-full h-11 px-4 rounded-lg bg-[#0ea5e9] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
              type="button"
            >
              <span>{t.actions.seePlanBtn}</span>
              <span className="material-symbols-outlined text-[16px]">checklist</span>
            </button>
            <Link
              href="/stress-test"
              className="w-full h-10 px-4 rounded-lg bg-[#dbe5db] text-[#006591] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#bec8d2] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006591]">bolt</span>
              <span>{t.actions.testSimulatorBtn} (இடர் சோதனையில் பார்)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Expandable Drawer / Step Sequence for AWD */}
      {planDetailOpen && (
        <section className="rounded-xl bg-[#ecf6ec] p-4 shadow-inner space-y-3 border border-[#bec8d2]/30 transition-all">
          <div className="flex items-center justify-between pb-1 border-b border-[#bec8d2]/40">
            <div className="flex items-center gap-1.5 text-[#006591] text-xs font-bold">
              <span className="material-symbols-outlined text-[18px]">water_drop</span>
              <span>AWD Execution Protocol (கள செய்முறை)</span>
            </div>
            <button
              onClick={() => setPlanDetailOpen(false)}
              className="p-1 rounded text-[#6e7881] hover:text-[#151e18]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <ol className="space-y-2.5">
            {topPriorityAction.actionSteps.map((step) => (
              <li key={step.step} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#006591] text-white text-xs flex items-center justify-center font-bold">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#151e18]">{step.title}</p>
                  <p className="text-[11px] text-[#3e4850]">{step.detail}</p>
                  <p className="text-[10px] text-[#2e6a41] italic mt-0.5">{step.detailTa}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 5. Impact Comparison Visualizer */}
      <section className="rounded-xl bg-white p-4 shadow-xs space-y-3 border border-[#bec8d2]/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#151e18]">
              {t.actions.comparisonTitle}
            </h3>
            <p className="text-xs text-[#3e4850]">
              {t.actions.currentVsAdapted}
            </p>
          </div>
          <span className="p-1 rounded bg-[#b1f2be] text-[#12512c] text-[10px] font-bold px-2">
            {t.actions.gainBadge}
          </span>
        </div>

        {/* Metric 1: Yield Risk */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#3e4850]">{t.actions.yieldRiskCollapse}</span>
            <div className="flex gap-2">
              <span className="text-[#dc2626] font-semibold">{comparisonVisualizer.yieldRiskCollapse.current}</span>
              <span className="text-[#6e7881]">vs</span>
              <span className="text-[#14532d] font-bold">{comparisonVisualizer.yieldRiskCollapse.adapted}</span>
            </div>
          </div>
          <div className="flex gap-1 h-3 rounded-full bg-[#e6f1e7] overflow-hidden p-0.5">
            <div className="bg-[#dc2626] rounded-full" style={{ width: `${comparisonVisualizer.yieldRiskCollapse.currentWidthPct}%` }}></div>
            <div className="bg-[#14532d] rounded-full" style={{ width: `${comparisonVisualizer.yieldRiskCollapse.adaptedWidthPct}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#6e7881]">
            <span>Current (High Risk)</span>
            <span>Adapted (-15% damage mitigated)</span>
          </div>
        </div>

        {/* Metric 2: Water Depletion */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#3e4850]">{t.actions.waterDepletionRate}</span>
            <div className="flex gap-2">
              <span className="text-[#151e18] font-semibold">{comparisonVisualizer.waterDepletionRate.currentDemand}</span>
              <span className="text-[#6e7881]">vs</span>
              <span className="text-[#006591] font-bold">{comparisonVisualizer.waterDepletionRate.adaptedSaved}</span>
            </div>
          </div>
          <div className="flex gap-1 h-3 rounded-full bg-[#e6f1e7] overflow-hidden p-0.5">
            <div className="bg-[#0ea5e9] rounded-full" style={{ width: `${comparisonVisualizer.waterDepletionRate.currentWidthPct}%` }}></div>
            <div className="bg-[#dbe5db] rounded-full" style={{ width: `${comparisonVisualizer.waterDepletionRate.adaptedWidthPct}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#6e7881]">
            <span>Canal Stress Peak</span>
            <span>28% Total Fresh Water Saved</span>
          </div>
        </div>

        {/* Protection Callout */}
        <div className="rounded-lg bg-[#e6f1e7] p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#14532d]">savings</span>
            <span className="text-xs font-medium text-[#151e18]">{t.actions.netProtection}</span>
          </div>
          <span className="text-base font-bold text-[#14532d]">
            {comparisonVisualizer.netProtectionRupees} <span className="text-[10px] font-normal text-[#3e4850]">/ ஏக்கர்</span>
          </span>
        </div>
      </section>

      {/* 6. Sequential Interventions (Cards 2 to 5) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-[#151e18]">
              {t.actions.sequentialTitle}
            </h3>
            <span className="text-xs text-[#2e6a41]">வரிசைப்படுத்தப்பட்ட பிற பாதுகாப்பு முறைகள்</span>
          </div>
          <span className="text-xs text-[#6e7881]">4 Recommended</span>
        </div>

        {sequentialInterventions.map((action) => (
          <article
            key={action.id}
            className={`rounded-xl bg-white p-3.5 shadow-xs border border-[#bec8d2]/30 border-l-4 flex flex-col space-y-2 ${
              action.themeColor === 'amber'
                ? 'border-amber-500'
                : action.themeColor === 'sky'
                ? 'border-sky-500'
                : 'border-emerald-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                action.themeColor === 'amber'
                  ? 'bg-amber-50 text-amber-800'
                  : action.themeColor === 'sky'
                  ? 'bg-sky-50 text-[#006591]'
                  : 'bg-emerald-50 text-[#14532d]'
              }`}>
                {action.category} • {action.categoryTa}
              </span>
              <span className="text-[11px] text-[#6e7881] font-medium">{action.estimatedCostPerAcre}</span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#151e18] leading-snug">
                {language === 'en' ? action.title : action.titleTa}
              </h4>
              <p className="text-[11px] text-[#2e6a41] mt-0.5">
                {language === 'en' ? action.titleTa : action.title}
              </p>
            </div>

            <p className="text-xs text-[#3e4850]">
              {action.whyReason[language === 'en' ? 'en' : 'ta']}
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-1 text-[11px] text-[#3e4850]">
                <span className="material-symbols-outlined text-[14px] text-[#1d6d24]">check_circle</span>
                <span>{action.timing}</span>
              </div>
              <Link
                href="/stress-test"
                className="px-2.5 py-1 rounded bg-[#e6f1e7] text-[#006591] text-xs font-bold hover:bg-[#dbe5db] transition-colors"
              >
                {t.actions.simulateImpact}
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* 7. Agronomic Integrity Disclaimer */}
      <footer className="rounded-xl bg-[#e6f1e7] p-3 flex items-start gap-2 text-[#3e4850]">
        <span className="material-symbols-outlined text-[18px] text-[#6e7881] flex-shrink-0 mt-0.5">info</span>
        <div className="space-y-0.5 text-[11px] leading-relaxed">
          <p className="font-bold text-[#151e18]">Scientific Advisory Integrity (அறிவுறுத்தல் தகவல்):</p>
          <p>{disclaimer.en}</p>
          <p className="text-[#2e6a41] italic">{disclaimer.ta}</p>
        </div>
      </footer>
    </div>
  );
}
