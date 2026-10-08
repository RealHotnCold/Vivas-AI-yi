'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n';

interface HeaderProps {
  currentRouteTitle?: string;
}

export function Header({ currentRouteTitle }: HeaderProps) {
  const { language, toggleLanguage, t } = useI18n();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f2fcf2]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#bec8d2]/30">
      <div className="max-w-md mx-auto h-28 px-4 flex flex-col justify-between py-2">
        {/* Brand & Action Bar */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 min-w-0 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#14532d] to-[#0ea5e9] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              V
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xl tracking-tight leading-none truncate font-bold text-[#14532d]">
                Vivas<span className="text-[#0ea5e9] font-extrabold">AI</span>yi
              </span>
              <span className="text-[11px] text-[#2e6a41] truncate mt-0.5 font-medium">
                {t.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Lang Switcher & Avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              aria-label="Language Toggle"
              className="h-9 px-3 rounded-lg bg-[#dbe5db] text-[#151e18] flex items-center justify-center text-xs font-semibold transition-colors hover:bg-[#bec8d2] shadow-xs active:scale-95"
              type="button"
            >
              <span className={language === 'en' ? 'font-bold text-[#006591]' : 'text-[#3e4850]'}>EN</span>
              <span className="mx-1 text-[#6e7881]">|</span>
              <span className={language === 'ta' ? 'font-bold text-[#14532d]' : 'text-[#3e4850]'}>தமிழ்</span>
            </button>

            <Link href="/profile" className="relative flex items-center justify-center" aria-label="Profile">
              <div className="w-8 h-8 rounded-full bg-[#14532d] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#2e6a41]/20">
                M
              </div>
            </Link>
          </div>
        </div>

        {/* Location & Context Ribbon */}
        <div className="flex items-center justify-between gap-2 pb-1 text-xs">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf6ec] text-[#2e6a41] font-medium truncate">
            <span className="material-symbols-outlined text-[15px] text-[#006591]">location_on</span>
            <span className="truncate">{t.header.location}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-[11px] font-semibold text-[#6e7881] uppercase tracking-wider">
              {currentRouteTitle || t.header.dashboard}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
