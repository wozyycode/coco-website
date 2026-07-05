// lib/i18n.ts — Dil sistemi: statik sözlükler + AI destekli tarayıcı dili tespiti
// ─────────────────────────────────────────────────────────────────────────────

import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import de from '@/messages/de.json';
import es from '@/messages/es.json';
import ar from '@/messages/ar.json';

export const dictionaries = { tr, en, de, es, ar } as const;

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ['tr', 'en', 'de', 'es', 'ar'];

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  ar: 'العربية',
};

export const rtlLocales: Locale[] = ['ar'];

export const defaultLocale: Locale = 'en';

// Basit iç içe anahtar erişimi: t(dict, 'nav.home')
export function getMessage(dict: Record<string, any>, key: string): string {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : key), dict as any);
}

/**
 * Tarayıcı dilini algılar ve desteklenen bir locale'e eşler.
 * Desteklenmeyen bir dil geldiğinde en yakın eşleşmeyi bulmaya çalışır
 * (ör. "pt-BR" → İngilizce'ye düşer, "tr-TR" → "tr").
 */
export function detectLocaleFromBrowser(navigatorLanguages: readonly string[]): Locale {
  for (const lang of navigatorLanguages) {
    const short = lang.split('-')[0].toLowerCase();
    if (locales.includes(short as Locale)) return short as Locale;
  }
  return defaultLocale;
}
