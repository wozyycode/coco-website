'use client';

// components/PageHeader.tsx — İç Sayfalar İçin Ortak Başlık
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { useLocale } from './LocaleProvider';

interface Props {
  eyebrowKey: string;
  titleKey: string;
  subtitleKey: string;
}

export function PageHeader({ eyebrowKey, titleKey, subtitleKey }: Props) {
  const { t } = useLocale();

  return (
    <section className="dot-grid px-6 pt-16 pb-14 md:pt-24 md:pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs font-medium text-signal-blue uppercase tracking-wider mb-3">
          {t(eyebrowKey)}
        </div>
        <h1 className="font-display font-semibold text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto">
          {t(titleKey)}
        </h1>
        <p className="mt-4 text-mist-dim max-w-xl mx-auto leading-relaxed">{t(subtitleKey)}</p>
      </motion.div>
    </section>
  );
}
