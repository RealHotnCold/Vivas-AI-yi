'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';
import { api, Phase3FarmRiskResponse } from '../../services/api';
import { TabType } from '../../components/layout/BottomNav';

const number = (value: number | null, digits = 1) => value === null ? 'Unavailable' : value.toFixed(digits);

interface RiskViewProps {
  onNavigate?: (tab: TabType) => void;
}

export function RiskView({ onNavigate: _onNavigate }: RiskViewProps = {}) {
  void _onNavigate; // Preserve the Phase 2 navigation contract while this screen has no tab action.
  const { t } = useI18n();
  const [data, setData] = useState<Phase3FarmRiskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  useEffect(() => {
    api.getPhase3FarmRisk().then(setData).catch((reason: Error) => setError(reason.message));
  }, []);

  if (error) return <div className="rounded-xl border border-[#ffdad6] bg-[#fff8f7] p-4 text-sm text-[#93000a]">{error}<p className="mt-2 text-xs">No mock risk values are shown. Start the Phase 3 backend and try again.</p></div>;
  if (!data) return <div className="rounded-xl border border-[#bec8d2]/30 bg-white p-4 text-sm text-[#3e4850]">Loading verified climate observations…</div>;

  const c = data.climate_indicators;
  const w = data.water_indicators;
  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0"><span className="material-symbols-outlined text-[#006591] text-[20px]">radar</span><h1 className="text-xl font-bold text-[#151e18] truncate">{t.risk.title}</h1></div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f1e7] text-[#14532d] text-[10px] font-semibold">REAL DATA</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30"><p className="text-sm font-bold text-[#151e18]">{data.location}</p><p className="text-xs text-[#3e4850] mt-1">{data.assessment_period}</p><p className="text-[10px] text-[#6e7881] mt-1">{data.geographic_definition}</p></div>
      </section>
      <section className="bg-[#e6f1e7] text-[#14532d] rounded-xl p-4 shadow-sm flex flex-col gap-2"><span className="text-[10px] font-bold uppercase tracking-wider">Phase 3 climate-risk foundation</span><h2 className="text-lg font-bold">Indicators only — not a validated crop-risk score</h2><p className="text-xs">{data.risk.explanation}</p></section>
      <section className="flex flex-col gap-2"><h3 className="px-1 text-sm font-bold text-[#151e18] uppercase tracking-wider">Climate indicators</h3><div className="grid grid-cols-1 gap-2.5">
        <Indicator icon="water_drop" title="Precipitation" value={`${number(c.precipitation_mm)} mm`} detail={`Baseline ${number(c.baseline_precipitation_mm)} mm • anomaly ${number(c.precipitation_anomaly_mm)} mm${c.precipitation_anomaly_pct === null ? '' : ` (${number(c.precipitation_anomaly_pct)}%)`}`} />
        <Indicator icon="thermostat" title="Mean temperature" value={`${number(c.mean_temperature_c)} °C`} detail={`Baseline ${number(c.baseline_mean_temperature_c)} °C • anomaly ${number(c.temperature_anomaly_c)} °C`} />
        <Indicator icon="water" title="Water-related indicators" value={w.climate_water_balance_proxy_mm === null ? 'Unavailable' : `${number(w.climate_water_balance_proxy_mm)} mm`} detail={`P − reference ET₀; surface soil moisture ${number(w.mean_surface_soil_moisture_m3_m3, 3)} m³/m³`} />
        <Indicator icon="public" title="ENSO foundation" value={data.enso.oni === null ? 'Unavailable' : `ONI ${number(data.enso.oni, 2)} °C`} detail={data.enso.season || data.enso.limitation} />
      </div></section>
      <section className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30"><h3 className="text-xs font-bold text-[#151e18] uppercase tracking-wider">Measured drivers</h3><ul className="mt-2 space-y-1 text-xs text-[#3e4850]">{data.risk.drivers.map((driver) => <li key={driver}>• {driver}</li>)}</ul><p className="mt-3 text-[10px] text-[#6e7881]">{w.limitation}</p></section>
      <section className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30"><h3 className="text-xs font-bold text-[#151e18] uppercase tracking-wider">Crop intelligence</h3><p className="mt-2 text-xs text-[#3e4850]">Crop stress: insufficient evidence</p><p className="mt-1 text-[10px] text-[#6e7881]">{data.crop_intelligence.crop_stress.uncertainty}</p><p className="mt-2 text-xs text-[#3e4850]">Yield impact: insufficient evidence</p><p className="mt-1 text-[10px] text-[#6e7881]">{data.crop_intelligence.yield_impact.uncertainty}</p></section>
      <section className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec8d2]/30"><button onClick={() => setSourcesOpen(!sourcesOpen)} className="w-full flex items-center justify-between text-left text-xs font-bold text-[#3e4850]" type="button"><span>Data provenance</span><span className="material-symbols-outlined text-[18px]">expand_more</span></button>{sourcesOpen && <div className="mt-3 pt-3 border-t border-[#bec8d2]/20 text-xs text-[#3e4850] space-y-2">{data.data_sources.map((source, index) => <p key={`${source.source}-${index}`}><strong>{source.source}</strong> — {source.dataset}<br/><span className="text-[10px]">{source.variable}; {source.period}</span></p>)}</div>}</section>
      <Link href="/actions" className="w-full h-11 bg-[#0ea5e9] hover:bg-[#006591] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">{t.risk.exploreActionsBtn}<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
    </div>
  );
}

function Indicator({ icon, title, value, detail }: { icon: string; title: string; value: string; detail: string }) {
  return <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#bec8d2]/30"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[#006591] text-[18px]">{icon}</span><h4 className="text-xs font-bold text-[#151e18]">{title}</h4></div><p className="mt-2 text-base font-bold text-[#151e18]">{value}</p><p className="mt-1 text-[10px] text-[#6e7881]">{detail}</p></div>;
}
