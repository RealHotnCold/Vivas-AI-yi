'use client';

import React from 'react';
import { useI18n } from '../../i18n';

interface FloatingMicProps {
  onClick: () => void;
}

export function FloatingMic({ onClick }: FloatingMicProps) {
  const { language } = useI18n();

  return (
    <div className="fixed bottom-24 z-40 w-full max-w-[430px] flex justify-end px-4 pointer-events-none">
      <button
        onClick={onClick}
        aria-label="Speak with VivasAIyi"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#14532d] text-white shadow-2xl active:scale-95 transition-all hover:bg-[#1e6b3b] ring-2 ring-white/60 cursor-pointer"
        type="button"
      >
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b1f2be] opacity-60"></span>
          <span className="material-symbols-outlined text-[22px] relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
            mic
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">
            {language === 'en' ? 'Speak' : 'பேசுக'}
          </span>
          <span className="text-[10px] text-[#b1f2be] leading-none">
            {language === 'en' ? 'Voice AI' : 'குரல் AI'}
          </span>
        </div>
      </button>
    </div>
  );
}
