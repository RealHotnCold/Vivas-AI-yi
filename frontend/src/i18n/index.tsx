'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './locales/en';
import { ta } from './locales/ta';

export type Language = 'en' | 'ta';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof en;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ta'); // Default to Tamil as farmer-first

  useEffect(() => {
    const saved = localStorage.getItem('vivasaiyi_lang') as Language;
    if (saved === 'en' || saved === 'ta') {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vivasaiyi_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ta' : 'en';
    handleSetLanguage(next);
  };

  const dictionary = language === 'en' ? en : ta;

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage, t: dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
