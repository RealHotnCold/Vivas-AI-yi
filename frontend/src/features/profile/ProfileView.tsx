'use client';

import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { MOCK_FARM_CONTEXT, MOCK_VOICE_QUERY_RESPONSE } from '../../services/api/mock';

interface ProfileViewProps {
  onNavigate?: (tab: any) => void;
  onOpenVoice?: () => void;
}

export function ProfileView({ onNavigate, onOpenVoice }: ProfileViewProps = {}) {
  const { t, language, toggleLanguage } = useI18n();
  const [activeTab, setActiveTab] = useState<'profile' | 'voice'>('profile');
  const [isListening, setIsListening] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  // Editable form state for farmer
  const [name, setName] = useState(MOCK_FARM_CONTEXT.farmerName);
  const [district, setDistrict] = useState(MOCK_FARM_CONTEXT.district);
  const [crop, setCrop] = useState(MOCK_FARM_CONTEXT.crop);
  const [variety, setVariety] = useState(MOCK_FARM_CONTEXT.variety);
  const [acres, setAcres] = useState(MOCK_FARM_CONTEXT.landAreaAcres);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* 1. Profile Header with Avatar & Language Selector */}
      <section className="flex flex-col bg-white rounded-xl p-4 shadow-xs border border-[#bec8d2]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#14532d] to-[#0ea5e9] text-white flex items-center justify-center text-xl font-bold shadow-sm ring-4 ring-[#b1f2be]/40">
              M
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-[#151e18] leading-tight">
                {name} ({MOCK_FARM_CONTEXT.farmerNameTa})
              </h1>
              <span className="text-xs text-[#2e6a41] font-semibold">
                Samba Paddy Cultivator
              </span>
              <span className="text-[11px] text-[#6e7881]">
                {district}
              </span>
            </div>
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

        {/* Profile / Voice Sub-Tab Pill Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#ecf6ec] rounded-lg">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 text-xs font-bold rounded-md transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-[#14532d] shadow-xs'
                : 'text-[#6e7881] hover:text-[#151e18]'
            }`}
            type="button"
          >
            {language === 'en' ? 'Farm & Settings' : 'பண்ணை சுயவிவரம்'}
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
              activeTab === 'voice'
                ? 'bg-white text-[#006591] shadow-xs'
                : 'text-[#6e7881] hover:text-[#151e18]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">mic</span>
            <span>{language === 'en' ? 'Voice Advisor' : 'குரல் வழிகாட்டி'}</span>
          </button>
        </div>
      </section>

      {/* 2. SUB-TAB 1: Farmer & Farm Settings Profile */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          {/* Farm Details Card */}
          <form onSubmit={handleSave} className="bg-white rounded-xl p-4 shadow-xs border border-[#bec8d2]/30 space-y-3">
            <div className="flex items-center justify-between border-b border-[#bec8d2]/20 pb-2">
              <span className="text-sm font-bold text-[#151e18]">
                {language === 'en' ? 'Farm Parameters' : 'பண்ணை விபரங்கள்'}
              </span>
              <span className="text-[10px] text-[#006591] font-bold uppercase tracking-wider">
                GPS Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#6e7881]">
                  {language === 'en' ? 'Farmer Name' : 'விவசாயி பெயர்'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-[#ecf6ec] border border-[#bec8d2]/40 text-[#151e18] font-medium text-xs focus:outline-[#0ea5e9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#6e7881]">
                  {language === 'en' ? 'Land Size (Acres)' : 'நில பரப்பளவு (ஏக்கர்)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={acres}
                  onChange={(e) => setAcres(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-2.5 rounded-lg bg-[#ecf6ec] border border-[#bec8d2]/40 text-[#151e18] font-medium text-xs focus:outline-[#0ea5e9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#6e7881]">
                  {language === 'en' ? 'Crop' : 'பயிர்'}
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-[#ecf6ec] border border-[#bec8d2]/40 text-[#151e18] font-medium text-xs focus:outline-[#0ea5e9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#6e7881]">
                  {language === 'en' ? 'Variety' : 'ரகம்'}
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-[#ecf6ec] border border-[#bec8d2]/40 text-[#151e18] font-medium text-xs focus:outline-[#0ea5e9]"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label className="text-[10px] font-bold uppercase text-[#6e7881]">
                  {language === 'en' ? 'Location / Basin' : 'இருப்பிடம் / பாசன பகுதி'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-[#ecf6ec] border border-[#bec8d2]/40 text-[#151e18] font-medium text-xs focus:outline-[#0ea5e9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-lg bg-[#14532d] hover:bg-[#2e6a41] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] mt-2 flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>{saved ? '✓ Saved Successfully' : (language === 'en' ? 'Save Profile' : 'சேமிக்கவும்')}</span>
            </button>
          </form>

          {/* Preferences & Telemetry Toggles */}
          <section className="bg-white rounded-xl p-4 shadow-xs border border-[#bec8d2]/30 space-y-3">
            <span className="text-xs font-bold text-[#151e18] block uppercase tracking-wider">
              {language === 'en' ? 'App & Advisory Preferences' : 'செயலி அமைப்புகள்'}
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#ecf6ec]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#151e18]">
                    {language === 'en' ? 'High Risk SMS / WhatsApp Alerts' : 'அபாய எச்சரிக்கை அறிவிப்புகள்'}
                  </span>
                  <span className="text-[10px] text-[#6e7881]">Daily at 06:30 AM IST</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationEnabled}
                  onChange={(e) => setNotificationEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#14532d]"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#ecf6ec]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#151e18]">
                    {language === 'en' ? 'Offline Data Cache' : 'ஆஃப்லைன் தரவு சேமிப்பு'}
                  </span>
                  <span className="text-[10px] text-[#6e7881]">Works without 4G cellular</span>
                </div>
                <input
                  type="checkbox"
                  checked={offlineSync}
                  onChange={(e) => setOfflineSync(e.target.checked)}
                  className="w-4 h-4 accent-[#14532d]"
                />
              </div>
            </div>
          </section>

          {/* Institutional Credits */}
          <footer className="rounded-xl bg-[#e6f1e7] p-3 text-xs text-[#3e4850] space-y-1 border border-[#bec8d2]/30">
            <span className="font-bold text-[#14532d] block">
              VivasAIyi Agronomic Partners:
            </span>
            <p className="text-[11px] leading-relaxed">
              TNAU Tamil Nadu Agricultural University, IMD Agro-AWS Thanjavur, ICAR-NRRI, European Space Agency Copernicus.
            </p>
          </footer>
        </div>
      )}

      {/* 3. SUB-TAB 2: Voice Climate Advisor Interface */}
      {activeTab === 'voice' && (
        <div className="space-y-4">
          {/* Tactile Voice Orb */}
          <div className="relative w-full rounded-2xl bg-white p-5 flex flex-col items-center justify-center shadow-xs border border-[#bec8d2]/30 overflow-hidden">
            <div className="relative flex items-center justify-center my-3">
              {isListening && (
                <>
                  <div className="absolute w-32 h-32 rounded-full bg-[#14532d]/10 animate-ping opacity-60"></div>
                  <div className="absolute w-24 h-24 rounded-full bg-[#14532d]/20 animate-pulse"></div>
                </>
              )}
              <button
                onClick={() => setIsListening(!isListening)}
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
              <span className="text-sm font-bold text-[#151e18] block">
                {isListening ? (language === 'en' ? 'Listening actively...' : 'கேட்கிறேன்...') : (language === 'en' ? 'Tap to speak' : 'பேச மைக்ரோஃபோனைத் தொடவும்')}
              </span>
              <span className="text-xs text-[#3e4850]">
                {language === 'en' ? 'Tamil and English speech recognized' : 'தமிழ் மற்றும் ஆங்கில குரல் ஆதரவு'}
              </span>
            </div>
          </div>

          {/* Conversational Sample Advisory */}
          <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec8d2]/30 space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#006591]">record_voice_over</span>
              <span className="text-xs font-bold text-[#151e18]">விவசாயி கேள்வி (Query)</span>
            </div>
            <p className="text-xs text-[#3e4850] bg-[#ecf6ec] p-2.5 rounded-lg leading-relaxed">
              &quot;{MOCK_VOICE_QUERY_RESPONSE.farmerQuery.raw}&quot;
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="material-symbols-outlined text-[18px] text-[#14532d]">psychiatry</span>
              <span className="text-xs font-bold text-[#14532d]">VivasAIyi வழிகாட்டி (Advisor)</span>
            </div>
            <p className="text-xs text-[#151e18] leading-relaxed">
              {MOCK_VOICE_QUERY_RESPONSE.advisorResponse.ta}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
