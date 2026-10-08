'use client';

import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { MOCK_VOICE_QUERY_RESPONSE } from '../../services/api/mock';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceModal({ isOpen, onClose }: VoiceModalProps) {
  const { language } = useI18n();
  const [isListening, setIsListening] = useState(true);
  const [activeQuery, setActiveQuery] = useState(MOCK_VOICE_QUERY_RESPONSE.farmerQuery.raw);
  const [activeResponse, setActiveResponse] = useState(MOCK_VOICE_QUERY_RESPONSE.advisorResponse.ta);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#f2fcf2] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#bec8d2]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-[#bec8d2]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0ea5e9] text-[24px]">mic</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#151e18]">Voice Climate Advisor</span>
              <span className="text-[11px] text-[#2e6a41] font-medium">குரல் காலநிலை ஆலோசகர்</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6ec] hover:bg-[#dbe5db] flex items-center justify-center text-[#3e4850] transition-colors"
            type="button"
            aria-label="Close Voice Assistant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Central Voice Orb */}
          <div className="relative w-full rounded-2xl bg-white p-5 flex flex-col items-center justify-center shadow-xs border border-[#bec8d2]/30 overflow-hidden">
            <div className="relative flex items-center justify-center my-2">
              {isListening && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-[#14532d]/10 animate-ping opacity-60"></div>
                  <div className="absolute w-20 h-20 rounded-full bg-[#14532d]/20 animate-pulse"></div>
                </>
              )}
              <button
                onClick={() => setIsListening(!isListening)}
                className={`relative z-10 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all ${
                  isListening ? 'bg-[#14532d] text-white' : 'bg-[#dbe5db] text-[#3e4850]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mic
                </span>
              </button>
            </div>
            <span className="text-xs font-bold text-[#151e18] mt-1">
              {isListening ? (language === 'en' ? 'Listening actively...' : 'கேட்கிறேன்...') : (language === 'en' ? 'Tap microphone to speak' : 'பேச மைக்ரோஃபோனைத் தொடவும்')}
            </span>
            <span className="text-[10px] text-[#6e7881]">
              {language === 'en' ? 'Ask in Tamil or English' : 'தமிழ் அல்லது ஆங்கிலத்தில் கேட்கலாம்'}
            </span>
          </div>

          {/* Transcript Dialogue */}
          <div className="space-y-2 text-xs">
            {/* Farmer */}
            <div className="bg-[#e6f1e7] rounded-xl p-3 border border-[#bec8d2]/30 ml-3">
              <span className="text-[10px] font-bold text-[#006591] block mb-0.5">Farmer Query / விவசாயி</span>
              <p className="text-[#151e18] leading-relaxed">&quot;{activeQuery}&quot;</p>
            </div>

            {/* Advisor */}
            <div className="bg-white rounded-xl p-3 border border-[#bec8d2]/30 mr-3 shadow-xs">
              <span className="text-[10px] font-bold text-[#14532d] block mb-0.5">VivasAIyi Agronomist Guide</span>
              <p className="text-[#151e18] leading-relaxed">{activeResponse}</p>
            </div>
          </div>

          {/* Quick Query Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#3e4850] block">
              {language === 'en' ? 'Try asking:' : 'கேட்டுப் பாருங்கள்:'}
            </span>
            <div className="flex flex-col gap-1.5">
              {MOCK_VOICE_QUERY_RESPONSE.quickQuestions.map((q) => (
                <button
                  key={q.queryEn}
                  onClick={() => {
                    setActiveQuery(q.queryTa);
                    setActiveResponse('தஞ்சாவூரில் அடுத்த 7 நாட்கள் மழை வாய்ப்பு குறைவு. காய்ச்சலும் பாய்ச்சலும் (AWD) முறையில் பாசனம் மேற்கொள்ளவும்.');
                    setIsListening(false);
                  }}
                  className="w-full text-left bg-white p-2.5 rounded-lg border border-[#bec8d2]/30 text-xs text-[#151e18] hover:bg-[#ecf6ec] transition-colors flex items-center justify-between"
                  type="button"
                >
                  <span className="truncate">{language === 'en' ? q.queryEn : q.queryTa}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#006591]">mic</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-[#bec8d2]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14532d] hover:bg-[#2e6a41] text-white text-xs font-bold rounded-lg transition-colors"
            type="button"
          >
            {language === 'en' ? 'Done' : 'முடிந்தது'}
          </button>
        </div>
      </div>
    </div>
  );
}
