'use client';

// components/LanguageSwitcher.tsx — Dil Seçici
// ────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLocale } from './LocaleProvider';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import clsx from 'clsx';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Dil seç"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-medium text-mist-dim hover:text-mist hover:bg-white/5 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs tracking-wide">{locale}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-2xl glass-card border border-void-border shadow-xl overflow-hidden z-50"
          >
            {locales.map((l: Locale) => (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                  l === locale ? 'text-mist bg-white/5' : 'text-mist-dim hover:text-mist hover:bg-white/[0.03]',
                )}
              >
                {localeNames[l]}
                {l === locale && <Check className="w-4 h-4 text-signal-blue" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
