'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Bell, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Footer } from '@/components/Footer';
import { useLocale } from '@/components/LocaleProvider';
import { CocoMark } from '@/components/CocoMark';

export default function DashboardPage() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 pb-16 md:pb-0">
        <div className="relative max-w-lg w-full text-center py-24">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-64 h-64 opacity-[0.06] animate-float">
            <CocoMark className="w-full h-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-void-border text-xs font-medium text-signal-violet mb-6"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {t('dashboard.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative font-display font-semibold text-3xl md:text-4xl tracking-tight mb-4"
          >
            {t('dashboard.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative text-mist-dim mb-10 leading-relaxed"
          >
            {t('dashboard.subtitle')}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="relative flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            {submitted ? (
              <div className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-pulse/10 border border-pulse/20 text-pulse text-sm font-medium">
                <Check className="w-4 h-4" />
                Kaydedildi
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="flex-1 h-12 px-4 rounded-full glass-card border border-void-border focus:border-signal-blue/50 outline-none text-sm placeholder:text-mist-faint"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-signal-blue hover:bg-signal-blue/90 text-white text-sm font-medium transition-colors shrink-0"
                >
                  <Bell className="w-4 h-4" />
                  {t('dashboard.notify')}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
