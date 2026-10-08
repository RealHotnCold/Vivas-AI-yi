'use client';

import React from 'react';
import { useI18n } from '../../i18n';

export type TabType = 'home' | 'risk' | 'actions' | 'stress-test' | 'profile';

interface NavItem {
  id: TabType;
  labelEn: string;
  labelTa: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelTa: 'முகப்பு', icon: 'home' },
  { id: 'risk', labelEn: 'Risk', labelTa: 'அபாயம்', icon: 'shield' },
  { id: 'actions', labelEn: 'Actions', labelTa: 'நடவடிக்கை', icon: 'psychiatry' },
  { id: 'stress-test', labelEn: 'Stress Test', labelTa: 'சோதனை', icon: 'bolt' },
  { id: 'profile', labelEn: 'Profile', labelTa: 'சுயவிவரம்', icon: 'person' },
];

interface BottomNavProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  const { language } = useI18n();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#f2fcf2]/95 backdrop-blur-xl border-t border-[#bec8d2]/30 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (onTabChange) {
                  onTabChange(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all rounded-lg active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#006591] font-bold'
                  : 'text-[#3e4850] hover:text-[#151e18]'
              }`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-semibold mt-0.5 leading-none">
                {language === 'en' ? item.labelEn : item.labelTa}
              </span>
              <span className="text-[9px] opacity-75 -mt-0.5 leading-tight">
                {language === 'en' ? item.labelTa : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
