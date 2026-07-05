'use client';

// components/Hero.tsx — Açılış Bölümü
// ──────────────────────────────────────

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from './LocaleProvider';
import { ThreatRadar } from './ThreatRadar';
import { AnimatedCounter } from './AnimatedCounter';
import { CocoMark } from './CocoMark';

export function Hero() {
  const { t } = useLocale();

  const stats = [
    { value: 44, suffix: '', label: t('hero.stat1') },
    { value: 180286, suffix: '', label: t('hero.stat2') },
    { value: 3182, suffix: '', label: t('hero.stat3') },
    { value: 161, suffix: 'ms', label: t('hero.stat4') },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden dot-grid">
      {/* Arka planda devasa, yarı saydam Coco işareti */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.06] dark:opacity-[0.08] pointer-events-none">
        <CocoMark className="w-full h-full" />
      </div>

      <ThreatRadar />

      {/* Üstten alta koyulaşan gradient — okunabilirlik için */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/0 to-void pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-void-border text-xs font-medium text-mist-dim mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse-slow" />
          {t('hero.badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-mist-dim max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://discord.com/oauth2/authorize"
            className="group flex items-center gap-2 px-6 h-12 rounded-full bg-signal-blue hover:bg-signal-blue/90 text-white font-medium transition-all active:scale-[0.98] w-full sm:w-auto justify-center"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/commands"
            className="flex items-center gap-2 px-6 h-12 rounded-full glass-card border border-void-border hover:border-white/20 font-medium transition-all active:scale-[0.98] w-full sm:w-auto justify-center"
          >
            <Terminal className="w-4 h-4" />
            {t('hero.ctaSecondary')}
          </Link>
        </motion.div>

        {/* İstatistik şeridi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-semibold text-2xl md:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-mist-dim">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
