'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';
import { MOCK_VOICE_QUERY_RESPONSE, MOCK_FARM_CONTEXT } from '../../services/api/mock';

export function ProfileVoiceView() {
  const { t, language, toggleLanguage } = useI18n();
  const [isListening, setIsListening] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeQuery, setActiveQuery] = useState(MOCK_VOICE_QUERY_RESPONSE.farmerQuery.raw);
  const [activeResponse, setActiveResponse] = useState(MOCK_VOICE_QUERY_RESPONSE.advisorResponse.ta);

  const handleSelectQuery = (queryTa: string, reply: string) => {
    setActiveQuery(queryTa);
    setActiveResponse(reply);
    setIsListening(false);
  };

  const handleMicToggle = () => {
    setIsListening(!isListening);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* 1. Header & Live Audio Status Pill */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#151e18] tracking-tight">
              {t.profile.title}
            </h1>
            <span className="text-xs text-[#2e6a41] font-medium">
              Voice Climate Advisor • AI Telemetry
            </span>
          </div>

          <button
            onClick={toggleLanguage}
            className="h-8 px-3 rounded-full bg-[#b1f2be] text-[#12512c] flex items-center gap-1 shadow-xs transition-transform active:scale-95 text-xs font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            <span>{language === 'en' ? 'தமிழ் • TA' : 'English • EN'}</span>
          </button>
        </div>

        {/* Live Listening Status Banner */}
        <div className="w-full bg-[#e6f1e7] rounded-xl p-3 flex items-center justify-between shadow-xs border border-[#bec8d2]/30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {isListening && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5e9] opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isListening ? 'bg-[#006591]' : 'bg-[#6e7881]'}`}></span>
            </span>
            <span className="text-xs font-semibold text-[#151e18]">
              {isListening ? t.profile.listeningStatus : t.profile.listeningPaused}
            </span>
          </div>
          <div className="flex items-center gap-1 h-5 px-1">
            <span className={`w-1 rounded-full ${isListening ? 'bg-[#006591] animate-bounce h-3' : 'bg-[#bec8d2] h-2'}`}></span>
            <span className={`w-1 rounded-full ${isListening ? 'bg-[#0ea5e9] animate-bounce h-5' : 'bg-[#bec8d2] h-3'}`}></span>
            <span className={`w-1 rounded-full ${isListening ? 'bg-[#14532d] animate-bounce h-4' : 'bg-[#bec8d2] h-2'}`}></span>
            <span className={`w-1 rounded-full ${isListening ? 'bg-[#006591] animate-bounce h-2' : 'bg-[#bec8d2] h-3'}`}></span>
            <span className={`w-1 rounded-full ${isListening ? 'bg-[#0ea5e9] animate-bounce h-5' : 'bg-[#bec8d2] h-2'}`}></span>
          </div>
        </div>
      </section>

      {/* 2. Tactile Voice Orb Section */}
      <section className="relative w-full rounded-2xl bg-white p-5 flex flex-col items-center justify-center shadow-xs border border-[#bec8d2]/30 overflow-hidden">
        <div className="relative flex items-center justify-center my-3">
          {isListening && (
            <>
              <div className="absolute w-32 h-32 rounded-full bg-[#14532d]/10 animate-ping opacity-60"></div>
              <div className="absolute w-24 h-24 rounded-full bg-[#14532d]/20 animate-pulse"></div>
            </>
          )}
          <button
            onClick={handleMicToggle}
            aria-label="Microphone Trigger"
            className={`relative z-10 w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
              isListening ? 'bg-[#14532d] text-white' : 'bg-[#dbe5db] text-[#3e4850]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
          </button>
        </div>

        <div className="text-center z-10 mt-1">
          <span className="text-sm font-bold text-[#151e18] block">{t.profile.micPrompt}</span>
          <span className="text-xs text-[#3e4850]">{t.profile.micSubtext}</span>
        </div>

        {/* Live Audio Telemetry Bars */}
        <div className="flex items-center gap-1.5 mt-3 h-7 z-10 px-3 py-1 bg-[#ecf6ec] rounded-full">
          <span className="w-1 h-3 rounded-full bg-[#14532d]/40 animate-pulse"></span>
          <span className="w-1 h-5 rounded-full bg-[#14532d] animate-pulse"></span>
          <span className="w-1.5 h-6 rounded-full bg-[#006591] animate-pulse"></span>
          <span className="w-1 h-4 rounded-full bg-[#14532d] animate-pulse"></span>
          <span className="w-1.5 h-6 rounded-full bg-[#0ea5e9] animate-pulse"></span>
          <span className="w-1 h-5 rounded-full bg-[#14532d] animate-pulse"></span>
          <span className="w-1 h-3 rounded-full bg-[#14532d]/40 animate-pulse"></span>
        </div>
      </section>

      {/* 3. Live Advisory Transcript (Farmer vs Agronomist) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#151e18] uppercase tracking-wider">
            {t.profile.liveAdvisoryTitle}
          </span>
          <span className="text-[10px] text-[#6e7881]">தஞ்சாவூர் மையம் • AI V4.2</span>
        </div>

        {/* Farmer Bubble */}
        <div className="bg-[#e6f1e7] rounded-xl p-3.5 shadow-xs ml-4 border border-[#bec8d2]/30">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[18px] text-[#006591]">record_voice_over</span>
            <span className="text-xs font-bold text-[#151e18]">{t.profile.farmerQueryHeader}</span>
            <span className="ml-auto text-[10px] text-[#6e7881]">இப்போது</span>
          </div>
          <p className="text-xs text-[#151e18] leading-relaxed">
            &quot;{activeQuery}&quot;
          </p>
          <div className="mt-1.5 pt-1.5 border-t border-[#bec8d2]/20 text-[11px] text-[#3e4850] italic">
            &quot;Canal water is low this week. What should I do for my vegetative paddy?&quot;
          </div>
        </div>

        {/* Agronomist Bubble */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm mr-1 border border-[#bec8d2]/30 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#14532d] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[15px]">psychiatry</span>
            </div>
            <span className="text-xs font-bold text-[#14532d]">{t.profile.advisorResponseHeader}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#b1f2be] text-[#12512c] text-[9px] font-bold ml-auto">
              {t.profile.verifiedAgronomist}
            </span>
          </div>

          <p className="text-xs text-[#151e18] leading-relaxed">
            {activeResponse}
          </p>

          <div className="bg-[#ecf6ec] rounded-lg p-2.5 text-[11px] text-[#3e4850]">
            <span className="font-bold text-[#151e18]">English Summary: </span>
            {MOCK_VOICE_QUERY_RESPONSE.advisorResponse.enSummary}
          </div>

          {/* Quick Action Shortcuts */}
          <div className="grid grid-cols-1 gap-2 pt-1">
            {MOCK_VOICE_QUERY_RESPONSE.suggestedActions.map((act) => (
              <Link
                key={act.id}
                href={act.route}
                className="bg-[#e6f1e7] rounded-lg p-2 flex items-center justify-between hover:bg-[#dbe5db] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded bg-[#0ea5e9] text-white flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#151e18] truncate">
                      {language === 'en' ? act.title : act.titleTa}
                    </span>
                    <span className="text-[10px] text-[#3e4850] truncate">{act.subtitle}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#6e7881] text-[18px]">chevron_right</span>
              </Link>
            ))}
          </div>

          {/* Audio Controls Bar */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#bec8d2]/20">
            <button
              onClick={handlePlayToggle}
              className="h-9 px-3 rounded-lg bg-[#006591] text-white flex items-center gap-1.5 text-xs font-bold shadow-xs active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlaying ? 'pause' : 'volume_up'}
              </span>
              <span>{isPlaying ? t.profile.pauseAudio : t.profile.replayAudio}</span>
            </button>

            <button
              onClick={() => alert('Audio recording saved to farm log.')}
              className="h-9 px-3 rounded-lg bg-[#dbe5db] text-[#151e18] flex items-center gap-1 text-xs font-medium hover:bg-[#bec8d2] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>{t.profile.shareAudio}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. One-Tap Frequently Asked Questions */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#006591] text-[18px]">quick_phrases</span>
          <span className="text-xs font-bold text-[#151e18] uppercase tracking-wider">
            {t.profile.faqTitle}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {MOCK_VOICE_QUERY_RESPONSE.quickQuestions.map((q) => (
            <button
              key={q.queryEn}
              onClick={() => handleSelectQuery(
                q.queryTa,
                'அடுத்த 7 நாட்களில் தஞ்சாவூரில் வறண்ட வானிலையே நிலவும். காய்ச்சலும் பாய்ச்சலும் முறையில் பாசனம் மேற்கொள்ளவும்.'
              )}
              className="w-full text-left bg-white rounded-xl p-3 shadow-xs border border-[#bec8d2]/30 flex items-center justify-between group active:scale-[0.99] transition-all"
              type="button"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#006591] text-[20px] flex-shrink-0">
                  {q.icon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#151e18] group-hover:text-[#006591] transition-colors truncate">
                    {language === 'en' ? q.queryEn : q.queryTa}
                  </span>
                  <span className="text-[10px] text-[#3e4850] truncate">
                    {language === 'en' ? q.queryTa : q.queryEn}
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#e6f1e7] flex items-center justify-center text-[#006591] flex-shrink-0 ml-2">
                <span className="material-symbols-outlined text-[16px]">mic</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Farm Profile & Telemetry Card */}
      <section className="rounded-xl bg-white p-3.5 shadow-xs border border-[#bec8d2]/30 space-y-2">
        <span className="text-xs font-bold text-[#151e18] block">{t.profile.farmDetails}</span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#ecf6ec] rounded-lg">
            <span className="text-[10px] text-[#6e7881] block">Farmer</span>
            <span className="font-bold text-[#151e18]">{MOCK_FARM_CONTEXT.farmerName} ({MOCK_FARM_CONTEXT.farmerNameTa})</span>
          </div>
          <div className="p-2 bg-[#ecf6ec] rounded-lg">
            <span className="text-[10px] text-[#6e7881] block">Location</span>
            <span className="font-bold text-[#151e18]">{MOCK_FARM_CONTEXT.district}</span>
          </div>
          <div className="p-2 bg-[#ecf6ec] rounded-lg">
            <span className="text-[10px] text-[#6e7881] block">Land Area</span>
            <span className="font-bold text-[#151e18]">{MOCK_FARM_CONTEXT.landAreaAcres} Acres</span>
          </div>
          <div className="p-2 bg-[#ecf6ec] rounded-lg">
            <span className="text-[10px] text-[#6e7881] block">Soil Type</span>
            <span className="font-bold text-[#151e18]">{MOCK_FARM_CONTEXT.soilType}</span>
          </div>
        </div>
      </section>

      {/* 6. Offline Ready Notice */}
      <footer className="rounded-xl bg-[#ecf6ec] p-3 flex items-center gap-2.5 shadow-xs border border-[#bec8d2]/30 text-xs">
        <div className="w-8 h-8 rounded-full bg-[#dbe5db] flex items-center justify-center text-[#3e4850] flex-shrink-0">
          <span className="material-symbols-outlined text-[18px]">network_ping</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[#151e18]">ஆஃப்லைன் குரல் ஆதரவு இயங்குகிறது (Offline Ready)</span>
          <span className="text-[11px] text-[#3e4850]">{t.profile.offlineStatus}</span>
        </div>
      </footer>
    </div>
  );
}
