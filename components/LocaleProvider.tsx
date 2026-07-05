'use client';

// components/LocaleProvider.tsx — Dil Sistemi
// ──────────────────────────────────────────────
// Sayfa ilk açıldığında tarayıcı dilini otomatik algılar (navigator.languages).
// Kullanıcı elle bir dil seçerse bu tercih localStorage'a yazılır ve
// bundan sonra otomatik algılamanın önüne geçer.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dictionaries, defaultLocale, detectLocaleFromBrowser, getMessage, rtlLocales, type Locale } from '@/lib/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string) => key,
  dir: 'ltr',
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('coco-locale') as Locale | null;
    if (stored && dictionaries[stored]) {
      setLocaleState(stored);
    } else {
      // Kullanıcı hiç seçim yapmamışsa tarayıcı dilini otomatik algıla
      const detected = detectLocaleFromBrowser(navigator.languages);
      setLocaleState(detected);
    }
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('coco-locale', l);
  };

  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = (key: string) => getMessage(dictionaries[locale], key);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>{children}</div>
    </LocaleContext.Provider>
  );
}
