'use client';

// components/Navbar.tsx — Masaüstü Üst Navigasyon (mobilde gizli)
// ───────────────────────────────────────────────────────────────
// Mobil cihazlarda bu bileşen tamamen gizlenir; onun yerine
// MobileTabBar.tsx altta sabit bir sekme çubuğu gösterir.
// İki ayrı bileşen kullanmamızın sebebi: mobil ve masaüstü
// navigasyon paternleri kullanıcı davranışı açısından temelden
// farklıdır (üstte yatay menü vs. altta parmak erişimli sekmeler).

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Shield } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLocale } from './LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DiscordLoginButton } from './DiscordLoginButton';
import clsx from 'clsx';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/commands', label: t('nav.commands') },
    { href: '/statistics', label: t('nav.statistics') },
    { href: '/dashboard', label: t('nav.dashboard') },
  ];

  return (
    <>
      {/* ── Masaüstü Navbar — mobilde tamamen gizli ── */}
      <header className="hidden md:block sticky top-0 z-50">
        <div className="absolute inset-0 glass-card border-b border-void-border dark:border-void-border" />
        <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-signal-blue to-signal-violet flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">Coco</span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative px-4 py-2 text-sm font-medium rounded-full transition-colors',
                    active ? 'text-mist dark:text-mist' : 'text-mist-dim hover:text-mist',
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/[0.06] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-mist-dim hover:text-mist hover:bg-white/5 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <DiscordLoginButton compact />
          </div>
        </nav>
      </header>

      {/* ── Mobil Üst Bar — sadece logo + hamburger, sekmeler alt barda ── */}
      <header className="md:hidden sticky top-0 z-50">
        <div className="absolute inset-0 glass-card border-b border-void-border" />
        <div className="relative px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal-blue to-signal-violet flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold">Coco</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Menü"
            className="w-9 h-9 flex items-center justify-center text-mist-dim"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden glass-card border-b border-void-border"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-mist-dim bg-white/5"
                  >
                    {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                  </button>
                </div>
                <DiscordLoginButton />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
