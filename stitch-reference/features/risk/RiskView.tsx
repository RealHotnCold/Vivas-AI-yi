'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';
import { MOCK_FARM_RISK } from '../../services/api/mock';

export function RiskView() {
  const { t, language } = useI18n();
  const [whyOpen, setWhyOpen] = useState(false);
  const [modelTrustOpen, setModelTrustOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* 1. Crop Context Header */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[#006591] text-[20px]">radar</span>
            <h1 className="text-xl font-bold text-[#151e18] truncate">
              {t.risk.title}
            </h1>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f1e7] text-[#14532d] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping"></span>
            {t.risk.liveSyncReady}
          </span>
        </div>

        {/* Active Crop & Phenology Banner */}
        <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl">🌾</span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#151e18] truncate">
                  Samba Paddy • CR 1009 Sub 1
                </span>
                <span className="text-xs text-[#2e6a41] truncate font-medium">
                  சம்பா நெல் • தஞ்சை டெல்டா மண்டலம்
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#e6f1e7] text-[#151e18] text-xs font-semibold">
              Day 54 / 135
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#bec8d2]/20 text-xs">
            <div className="flex items-center gap-1 text-[#3e4850]">
              <span className="material-symbols-outlined text-[15px] text-[#006591]">eco</span>
              <span>Panicle Initiation Stage (கதிர் உருவாகும் தருணம்)</span>
            </div>
            <span className="text-[10px] text-[#6e7881]">Telemetry: 12m ago</span>
          </div>
        </div>
      </section>

      {/* 2. Primary Climate Risk Gauge Card */}
      <section className="bg-[#ffdad6] text-[#93000a] rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-wider w-fit">
              <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
              <span>{t.risk.highRisk}</span>
            </div>
            <h2 className="text-lg font-bold text-[#93000a] mt-1 leading-tight">
              {t.risk.microDeficit}
            </h2>
            <p className="text-xs text-[#93000a]/90">
              {language === 'en'
                ? 'Severe micro-climatic deficit during critical panicle initiation window.'
                : 'பயிர் வளர்ச்சி மற்றும் கதிர் உருவாகும் தருணத்தில் தீவிர காலநிலை அழுத்தம் நிலவுகிறது.'}
            </p>
          </div>

          {/* Circular SVG Radial Risk Gauge */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#dc2626]/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#dc2626] stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeDasharray="78, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold leading-none text-[#dc2626]">78</span>
              <span className="text-[9px] text-[#93000a]/80 font-bold">/100</span>
            </div>
          </div>
        </div>

        {/* Explanatory Accordion Toggle */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-[#151e18]">
          <button
            onClick={() => setWhyOpen(!whyOpen)}
            className="w-full flex items-center justify-between text-left text-xs font-bold text-[#006591]"
            type="button"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">help_outline</span>
              <span>{t.risk.whyCriticalBtn}</span>
            </span>
            <span className={`material-symbols-outlined text-[18px] transition-transform ${whyOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          {whyOpen && (
            <div className="mt-2 pt-2 border-t border-[#bec8d2]/30 text-xs text-[#3e4850] flex flex-col gap-1.5">
              <p>{t.risk.whyCriticalContent}</p>
              <p className="text-[#14532d] font-semibold">
                தஞ்சாவூர் வெண்ணாறு பாசன பகுதியில் சுழற்சி முறை நீர் தாமதமாவதால் கதிர் வெளித்தள்ளும் திறன் குறைய வாய்ப்புள்ளது.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Four-Point Agronomic Telemetry Breakdown Grid */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#151e18] uppercase tracking-wider">
            {t.risk.vectorsTitle}
          </h3>
          <span className="text-[10px] text-[#6e7881] font-bold">AWS ENSEMBLE</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {MOCK_FARM_RISK.telemetry_vectors.map((vec) => (
            <div key={vec.id} className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    vec.badgeType === 'error' ? 'bg-[#ffdad6] text-[#dc2626]' : 'bg-[#e6f1e7] text-[#006591]'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">{vec.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151e18]">
                      {language === 'en' ? vec.label : vec.labelTa}
                    </h4>
                    <span className="text-[10px] text-[#6e7881]">{vec.subtitle}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  vec.badgeType === 'error' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-amber-100 text-amber-900'
                }`}>
                  {vec.badge}
                </span>
              </div>
              <p className="text-xs text-[#3e4850] mt-1">{vec.description}</p>
              <div className="text-[10px] text-[#6e7881] mt-0.5">{vec.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Timeline Projection Segmented Bar */}
      <section className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006591] text-[18px]">calendar_month</span>
            <h3 className="text-xs font-bold text-[#151e18] uppercase tracking-wider">
              {t.risk.timelineTitle}
            </h3>
          </div>
          <span className="text-[10px] text-[#6e7881]">IMD/ECMWF</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mt-1">
          {MOCK_FARM_RISK.timeline_projection.map((tp) => (
            <div key={tp.label} className="flex flex-col items-center gap-1 text-center">
              <div className={`w-full h-2.5 rounded-md ${tp.colorClass}`}></div>
              <span className="text-xs font-bold text-[#151e18]">{tp.label}</span>
              <span className={`text-[9px] px-1 py-0.5 rounded ${tp.tagClass}`}>
                {tp.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Potential Agronomic Impact Bento Grid */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#151e18] uppercase tracking-wider">
            {t.risk.potentialImpactTitle}
          </h3>
          <span className="text-[10px] text-[#14532d] font-bold">UNMITIGATED</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#6e7881] uppercase font-bold">{t.risk.yieldImpact}</span>
              <div className="text-base font-bold text-[#dc2626] mt-0.5">-18% to -24%</div>
            </div>
            <span className="text-[11px] text-[#3e4850] mt-1 leading-tight">
              {MOCK_FARM_RISK.potential_impacts.projected_yield_detail}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#6e7881] uppercase font-bold">{t.risk.waterImpact}</span>
              <div className="text-base font-bold text-[#006591] mt-0.5">+22% Deficit</div>
            </div>
            <span className="text-[11px] text-[#3e4850] mt-1 leading-tight">
              {MOCK_FARM_RISK.potential_impacts.water_deficit_detail}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#6e7881] uppercase font-bold">{t.risk.stressWindow}</span>
              <div className="text-base font-bold text-amber-700 mt-0.5">Critical 9 Days</div>
            </div>
            <span className="text-[11px] text-[#3e4850] mt-1 leading-tight">
              {MOCK_FARM_RISK.potential_impacts.stress_window_detail}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#bec8d2]/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#6e7881] uppercase font-bold">{t.risk.revenueAtRisk}</span>
              <div className="text-base font-bold text-[#151e18] mt-0.5">-₹18,200</div>
            </div>
            <span className="text-[11px] text-[#3e4850] mt-1 leading-tight">
              {MOCK_FARM_RISK.potential_impacts.revenue_at_risk_detail}
            </span>
          </div>
        </div>
      </section>

      {/* 6. Primary Forwarding Action CTA */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-[#bec8d2]/30 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#b1f2be] text-[#12512c] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">psychiatry</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#151e18]">What should you do today?</h4>
            <p className="text-xs text-[#2e6a41]">தற்காப்பு நடவடிக்கைகளை உடனே தொடங்கவும்</p>
          </div>
        </div>
        <p className="text-xs text-[#3e4850]">
          4 agronomic interventions available (Alternative Wetting & Drying + Foliar Potash Spray to preserve panicle moisture).
        </p>
        <Link
          href="/actions"
          className="w-full h-11 bg-[#0ea5e9] hover:bg-[#006591] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
        >
          <span>{t.risk.exploreActionsBtn}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </section>

      {/* 7. Provenance & Scientific Trust Drawer */}
      <section className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec8d2]/30">
        <button
          onClick={() => setModelTrustOpen(!modelTrustOpen)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-[#3e4850]"
          type="button"
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#14532d]">verified_user</span>
            <span>{t.risk.howCalculatedBtn}</span>
          </span>
          <span className={`material-symbols-outlined text-[18px] transition-transform ${modelTrustOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
        {modelTrustOpen && (
          <div className="mt-3 pt-3 border-t border-[#bec8d2]/20 text-xs text-[#3e4850] flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {MOCK_FARM_RISK.data_sources.map(s => (
                <span key={s.name} className="px-2 py-0.5 rounded bg-[#e6f1e7] text-[#151e18] text-[10px] font-medium">
                  {s.name}
                </span>
              ))}
            </div>
            <p className="leading-relaxed text-[11px] text-[#3e4850]">
              {MOCK_FARM_RISK.provenance.notes}
            </p>
            <div className="text-[10px] text-[#6e7881]">
              Model: {MOCK_FARM_RISK.provenance.model_version} • Calibration confidence: {MOCK_FARM_RISK.provenance.confidence_pct}%
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
