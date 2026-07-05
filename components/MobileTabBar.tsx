'use client';

// components/MobileTabBar.tsx — Mobil İçin Alt Sekme Çubuğu
// ─────────────────────────────────────────────────────────────
// Sadece mobilde görünür (md:hidden). Parmakla en kolay erişilen
// bölge ekranın altı olduğu için, ana navigasyon burada yaşar.
// PC'de bu bileşen hiç render edilmez — Navbar üstteki yatay
// menüyü zaten sağlıyor.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Terminal, Activity, LayoutGrid } from 'lucide-react';
import { useLocale } from './LocaleProvider';
import clsx from 'clsx';

export function MobileTabBar() {
  const pathname = usePathname();
  const { t } = useLocale();

  const tabs = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/commands', label: t('nav.commands'), icon: Terminal },
    { href: '/statistics', label: t('nav.statistics'), icon: Activity },
    { href: '/dashboard', label: t('nav.dashboard'), icon: LayoutGrid },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobil gezinme"
    >
      <div className="glass-card border-t border-void-border">
        <div className="grid grid-cols-4 h-16">
          {tabs.map(tab => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center gap-1"
              >
                {active && (
                  <motion.div
                    layoutId="mobile-tab-active"
                    className="absolute top-1.5 w-8 h-1 rounded-full bg-signal-blue"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={clsx('w-5 h-5 transition-colors', active ? 'text-signal-blue' : 'text-mist-dim')}
                  strokeWidth={active ? 2.4 : 2}
                />
                <span
                  className={clsx(
                    'text-[10px] font-medium transition-colors',
                    active ? 'text-mist' : 'text-mist-dim',
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
