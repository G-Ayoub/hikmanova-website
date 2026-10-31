import React, { createContext, useContext, useEffect, useState } from 'react';
import { BASE } from '@/lib/asset';
import { splitLangPath, withLang } from '@/lib/langPath';

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

/** Current site path without the base, e.g. "/ar/solutions". */
const currentPath = () => window.location.pathname.slice(BASE.length) || '/';

/**
 * The language comes from the URL: English pages at /…, Arabic pages at /ar/…, so each language has its
 * own indexable address. Switching language moves to the same page in the other language.
 */
export function LanguageProvider({ children, initial }: { children: React.ReactNode; initial?: Language }) {
  const [language, setLanguageState] = useState<Language>(
    () => initial ?? (typeof window === 'undefined' ? 'en' : splitLangPath(currentPath()).language),
  );
  const isRTL = LANGUAGES.find((l) => l.code === language)?.rtl ?? false;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  // Back/forward (and any other history change) can cross languages: follow the URL.
  useEffect(() => {
    const sync = () => setLanguageState(splitLangPath(currentPath()).language);
    const events = ['popstate', 'pushState', 'replaceState'];
    events.forEach((e) => window.addEventListener(e, sync));
    return () => events.forEach((e) => window.removeEventListener(e, sync));
  }, []);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* storage unavailable */
    }
    const { path } = splitLangPath(currentPath());
    const target = BASE + withLang(path, lang) + window.location.search + window.location.hash;
    if (target !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.pushState(null, '', target);
    }
    setLanguageState(lang);
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
