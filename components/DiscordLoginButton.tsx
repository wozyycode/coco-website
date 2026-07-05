'use client';

// components/DiscordLoginButton.tsx — Discord ile Giriş / Kullanıcı Menüsü
// ───────────────────────────────────────────────────────────────────────

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from './LocaleProvider';
import clsx from 'clsx';

export function DiscordLoginButton({ compact = false }: { compact?: boolean }) {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (status === 'loading') {
    return <div className={clsx('rounded-full bg-white/5 animate-pulse', compact ? 'w-9 h-9' : 'w-full h-10')} />;
  }

  if (session?.user) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setMenuOpen(v => !v)}
          className={clsx(
            'flex items-center gap-2 rounded-full transition-colors',
            compact ? 'p-1 hover:bg-white/5' : 'w-full p-2 bg-white/5 hover:bg-white/[0.08]',
          )}
        >
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? 'Kullanıcı'}
              width={compact ? 28 : 32}
              height={compact ? 28 : 32}
              className="rounded-full"
            />
          )}
          {!compact && <span className="text-sm font-medium">{session.user.name}</span>}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={clsx(
                'absolute mt-2 w-48 rounded-2xl glass-card border border-void-border shadow-xl overflow-hidden z-50',
                compact ? 'right-0' : 'left-0',
              )}
            >
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-alert hover:bg-alert/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('discord')}
      className={clsx(
        'flex items-center justify-center gap-2 rounded-full font-medium transition-all',
        'bg-signal-blue hover:bg-signal-blue/90 text-white active:scale-[0.98]',
        compact ? 'px-4 h-9 text-sm' : 'w-full h-11 text-sm',
      )}
    >
      <DiscordMark className="w-4 h-4" />
      {t('nav.login')}
    </button>
  );
}

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
