import React, { createContext, useContext, useEffect, useState } from 'react';

/** To add French: add 'fr' here and to LANGUAGES, then fill the `fr` fields in content. */
export type Language = 'en' | 'ar';

export const LANGUAGES: { code: Language; label: string; name: string; rtl: boolean }[] = [
  { code: 'en', label: 'EN', name: 'English', rtl: false },
  { code: 'ar', label: 'AR', name: 'العربية', rtl: true },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isSupported = (value: string | null): value is Language =>
  LANGUAGES.some((l) => l.code === value);

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'; // pre-rendering at build time
  try {
    const saved = localStorage.getItem('language');
    if (isSupported(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const browser = navigator.language.slice(0, 2);
  return isSupported(browser) ? browser : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const isRTL = LANGUAGES.find((l) => l.code === language)?.rtl ?? false;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
