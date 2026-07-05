'use client';

// components/Features.tsx — Özellikler Bölümü
// ───────────────────────────────────────────────

import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, Siren, History, SlidersHorizontal, Languages } from 'lucide-react';
import { useLocale } from './LocaleProvider';

export function Features() {
  const { t } = useLocale();

  const features = [
    { icon: ShieldAlert, title: t('features.f1title'), desc: t('features.f1desc'), accent: 'text-alert' },
    { icon: Sparkles, title: t('features.f2title'), desc: t('features.f2desc'), accent: 'text-signal-violet' },
    { icon: Siren, title: t('features.f3title'), desc: t('features.f3desc'), accent: 'text-alert' },
    { icon: History, title: t('features.f4title'), desc: t('features.f4desc'), accent: 'text-pulse' },
    { icon: SlidersHorizontal, title: t('features.f5title'), desc: t('features.f5desc'), accent: 'text-signal-blue' },
    { icon: Languages, title: t('features.f6title'), desc: t('features.f6desc'), accent: 'text-signal-violet' },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-medium text-signal-blue uppercase tracking-wider mb-3">
            {t('features.eyebrow')}
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
            {t('features.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group p-6 rounded-2xl glass-card border border-void-border hover:border-white/[0.12] transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${f.accent}`}>
                <f.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-mist-dim leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
