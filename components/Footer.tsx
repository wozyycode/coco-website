'use client';

// components/Footer.tsx — Alt Bilgi
// ─────────────────────────────────────

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useLocale } from './LocaleProvider';
import { CocoMark } from './CocoMark';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative border-t border-void-border px-6 py-16 pb-24 md:pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal-blue to-signal-violet flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-semibold">Coco</span>
            </div>
            <p className="text-sm text-mist-dim leading-relaxed max-w-[220px]">{t('footer.tagline')}</p>
          </div>

          <div>
            <div className="text-xs font-medium text-mist-dim uppercase tracking-wider mb-4">
              {t('footer.product')}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/commands" className="text-mist-dim hover:text-mist transition-colors">{t('nav.commands')}</Link></li>
              <li><Link href="/statistics" className="text-mist-dim hover:text-mist transition-colors">{t('nav.statistics')}</Link></li>
              <li><Link href="/dashboard" className="text-mist-dim hover:text-mist transition-colors">{t('nav.dashboard')}</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium text-mist-dim uppercase tracking-wider mb-4">
              {t('footer.legal')}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy" className="text-mist-dim hover:text-mist transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/terms" className="text-mist-dim hover:text-mist transition-colors">{t('footer.terms')}</Link></li>
              <li><a href="https://discord.gg/coco" className="text-mist-dim hover:text-mist transition-colors">{t('footer.support')}</a></li>
            </ul>
          </div>

          <div className="hidden md:block opacity-[0.05]">
            <CocoMark className="w-20 h-20" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-void-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist-dim">
          <span>© {new Date().getFullYear()} Coco. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
