'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';
import { MOCK_FARM_CONTEXT, MOCK_FARM_RISK } from '../../services/api/mock';

interface HomeViewProps {
  onNavigate?: (tab: any) => void;
}

export function HomeView({ onNavigate }: HomeViewProps = {}) {
  const { t, language } = useI18n();
  const [causalExpanded, setCausalExpanded] = useState(false);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* 1. GREETING & CONTEXT HEADER */}
      <section className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-[#151e18]">
              {t.home.greeting}
            </h1>
            <p className="text-sm text-[#2e6a41] -mt-0.5 font-medium">
              {language === 'en' ? 'வணக்கம், முருகன்' : 'Good morning, Murugan'}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#e6f1e7] rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-[#0ea5e9]" style={{ fontVariationSettings: "'FILL' 1" }}>
                wb_sunny
              </span>
              <span className="text-xs font-semibold text-[#151e18]">31°C</span>
            </div>
            <span className="text-[10px] text-[#6e7881] mt-0.5">RH 68% • Cauvery Delta</span>
          </div>
        </div>

        {/* Active Crop Status Pill-Deck */}
        <div className="p-3 rounded-xl bg-[#ecf6ec] shadow-xs flex items-center justify-between gap-2 border border-[#bec8d2]/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#dbe5db] flex items-center justify-center flex-shrink-0 text-xl shadow-inner">
              🌾
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-sm font-bold text-[#151e18] truncate">
                  {t.home.cropStatus}
                </span>
                <span className="text-xs text-[#2e6a41] truncate font-semibold">
                  ({MOCK_FARM_CONTEXT.variety})
                </span>
              </div>
              <p className="text-xs text-[#3e4850] truncate">
                <span className="text-[#1d6d24] font-semibold">{t.home.stage}</span>
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#b1f2be] text-[#12512c] text-[10px] font-bold whitespace-nowrap">
            {t.home.plantedDate}
          </span>
        </div>
      </section>

      {/* 2. CLIMATE RISK ALERT CARD */}
      <section className="rounded-xl bg-white p-4 shadow-sm relative overflow-hidden border border-[#bec8d2]/30">
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#dc2626]"></div>
        <div className="flex flex-col space-y-2 pl-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
              </span>
              <span>{t.risk.highRisk}</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#dc2626]">warning</span>
          </div>

          <div className="space-y-1">
            <p className="text-base font-bold text-[#151e18] leading-snug">
              {t.home.alertDesc}
            </p>
            <p className="text-xs text-[#3e4850] leading-relaxed">
              {language === 'en'
                ? 'அடுத்த 21 நாட்களில் எல் நினோ காலநிலை மாற்றத்தால் உங்கள் நெல் பயிரில் அழுத்தம் அதிகரிக்கக்கூடும்.'
                : 'Elevated climate stress anticipated in next 21 days due to El Niño anomalies.'}
            </p>
          </div>

          {/* 3 Key Telemetry Indicators */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-[#ecf6ec] flex flex-col justify-between">
              <div className="flex items-center gap-1 text-[#006591]">
                <span className="material-symbols-outlined text-[16px]">rainy</span>
                <span className="text-[11px] font-semibold truncate">{t.home.rainfall}</span>
              </div>
              <div className="mt-1">
                <span className="text-base font-bold text-[#006591]">↓ 18%</span>
                <p className="text-[10px] text-[#3e4850] leading-tight mt-0.5">{t.home.rainfallSub}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#ecf6ec] flex flex-col justify-between">
              <div className="flex items-center gap-1 text-[#dc2626]">
                <span className="material-symbols-outlined text-[16px]">thermostat</span>
                <span className="text-[11px] font-semibold truncate">{t.home.temp}</span>
              </div>
              <div className="mt-1">
                <span className="text-base font-bold text-[#dc2626]">↑ 1.2°</span>
                <p className="text-[10px] text-[#3e4850] leading-tight mt-0.5">{t.home.tempSub}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#ecf6ec] flex flex-col justify-between">
              <div className="flex items-center gap-1 text-[#2e6a41]">
                <span className="material-symbols-outlined text-[16px]">water_damage</span>
                <span className="text-[11px] font-semibold truncate">{t.home.canal}</span>
              </div>
              <div className="mt-1">
                <span className="text-base font-bold text-[#2e6a41]">Mod.</span>
                <p className="text-[10px] text-[#3e4850] leading-tight mt-0.5">{t.home.canalSub}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-[#6e7881]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">update</span>
              Simulated 06:30 AM today
            </span>
            <span className="font-semibold text-[#14532d]">Confidence: 94.2%</span>
          </div>
        </div>
      </section>

      {/* 3. HERO STRESS TEST CTA */}
      <section className="relative rounded-xl overflow-hidden shadow-lg bg-[#151e18] text-white p-4">
        <div className="relative z-10 flex flex-col space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0ea5e9] text-white w-fit">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {language === 'en' ? 'Simulate Climate Scenarios' : 'காலநிலை இடர் சோதனை'}
            </span>
          </div>
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold leading-tight text-white">
              {t.home.heroSimTitle}
            </h2>
            <p className="text-xs text-[#89ceff] leading-tight">
              {language === 'en' ? 'எல் நினோ நிலைமை தீவிரமானால் என்ன நடக்கும்?' : 'What happens if El Niño conditions intensify?'}
            </p>
          </div>
          <p className="text-xs text-[#dbe5db] leading-relaxed">
            {t.home.heroSimSubtitle}
          </p>

          <div className="p-2.5 rounded-lg bg-white/10 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b1f2be] text-[18px]">verified_user</span>
              <span className="text-xs text-white">Potential Protection</span>
            </div>
            <span className="text-xs font-bold text-[#b1f2be]">
              {t.home.heroSimStat}
            </span>
          </div>

          <Link
            href="/stress-test"
            className="w-full h-11 bg-[#0ea5e9] hover:bg-[#006591] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <span>{t.home.heroSimBtn}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 4. CAUSAL CHAIN */}
      <section className="rounded-xl bg-white p-4 shadow-sm space-y-2 border border-[#bec8d2]/30">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-[#151e18]">
              {t.home.whyTitle}
            </h3>
            <span className="text-xs text-[#2e6a41] font-medium">
              {t.home.whySubtitle}
            </span>
          </div>
          <button
            onClick={() => setCausalExpanded(!causalExpanded)}
            className="px-2.5 py-1 rounded-lg bg-[#e6f1e7] text-[#151e18] text-xs font-semibold flex items-center gap-1 hover:bg-[#dbe5db] transition-colors"
            type="button"
          >
            <span>{causalExpanded ? t.common.close : t.common.viewDetails}</span>
            <span className={`material-symbols-outlined text-[16px] transition-transform ${causalExpanded ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>

        {/* Stepper Chain */}
        <div className="flex flex-col space-y-2 pt-1">
          {MOCK_FARM_RISK.causal_chain.map((c, i) => (
            <div key={c.step} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                  c.severity === 'critical' ? 'bg-[#dc2626]' : 'bg-[#006591]'
                }`}>
                  {c.step}
                </div>
                {i < MOCK_FARM_RISK.causal_chain.length - 1 && (
                  <div className="w-0.5 h-6 bg-[#dbe5db] my-0.5"></div>
                )}
              </div>
              <div className="flex flex-col flex-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#151e18]">
                    {language === 'en' ? c.title : c.titleTa}
                  </span>
                  <span className="text-[10px] text-[#6e7881]">{c.category}</span>
                </div>
                <span className="text-[11px] text-[#3e4850]">{c.description}</span>
              </div>
            </div>
          ))}
        </div>

        {causalExpanded && (
          <div className="mt-2 pt-2 border-t border-[#bec8d2]/30 bg-[#ecf6ec] rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[#006591]">
              <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
              <span className="text-xs font-bold">Delta Agro-climatic Logic</span>
            </div>
            <p className="text-xs text-[#3e4850] leading-relaxed">
              {MOCK_FARM_RISK.critical_rationale[language === 'en' ? 'en' : 'ta']}
            </p>
          </div>
        )}
      </section>

      {/* 5. ACTION RECOMMENDATION TEASERS */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#151e18]">
              {t.home.actionsSectionTitle}
            </h3>
            <p className="text-xs text-[#2e6a41]">
              {t.home.tailoredPlans}
            </p>
          </div>
          <Link href="/actions" className="text-xs font-bold text-[#006591] flex items-center gap-0.5">
            See all →
          </Link>
        </div>

        {/* Action 1 */}
        <div className="rounded-xl bg-white p-3.5 shadow-sm border-l-4 border-[#0ea5e9] border border-[#bec8d2]/30 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-[#c9e6ff] text-[#003751] text-[10px] font-bold">
              High Impact • அதிக பலன்
            </span>
            <span className="text-[11px] text-[#006591] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">water_drop</span>
              Saves 25-30% Water
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#151e18]">
              {t.home.action1Title}
            </h4>
            <p className="text-xs text-[#2e6a41] mt-0.5">
              பாசன முறையை மாற்றி AWD முறையைப் பின்பற்றவும்
            </p>
          </div>
          <p className="text-xs text-[#3e4850]">
            {t.home.action1Desc}
          </p>
          <Link
            href="/actions"
            className="w-full h-9 rounded-lg bg-[#e6f1e7] text-[#151e18] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#dbe5db] transition-colors"
          >
            <span>See Action Steps (விவரம்)</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        {/* Action 2 */}
        <div className="rounded-xl bg-white p-3.5 shadow-sm border-l-4 border-amber-500 border border-[#bec8d2]/30 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
              Heat Stress Shield • வெப்ப தணிப்பு
            </span>
            <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">eco</span>
              Prevents Wilting
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#151e18]">
              {t.home.action2Title}
            </h4>
            <p className="text-xs text-[#2e6a41] mt-0.5">
              வறட்சி தாங்க 1% பொட்டாசியம் குளோரைடு (KCl) தெளித்தல்
            </p>
          </div>
          <p className="text-xs text-[#3e4850]">
            {t.home.action2Desc}
          </p>
          <Link
            href="/actions"
            className="w-full h-9 rounded-lg bg-[#e6f1e7] text-[#151e18] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#dbe5db] transition-colors"
          >
            <span>View Dosage & Mix Guide</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
      </section>

      {/* Floating Voice Button */}
      <aside className="sticky bottom-24 self-end z-40 -mt-2">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#14532d] text-white shadow-2xl active:scale-95 transition-all"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b1f2be] opacity-60"></span>
            <span className="material-symbols-outlined text-[22px] relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">{t.home.askByVoice}</span>
            <span className="text-[10px] text-[#b1f2be] leading-none">
              {language === 'en' ? 'குரல் மூலம் கேளுங்கள்' : 'Ask by Voice'}
            </span>
          </div>
        </Link>
      </aside>
    </div>
  );
}
