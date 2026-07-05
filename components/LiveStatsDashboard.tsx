'use client';

// components/LiveStatsDashboard.tsx — Canlı İstatistik Panosu
// ─────────────────────────────────────────────────────────────
// /api/stats endpoint'inden her saniye veri çeker (botun kendisinden
// gelen gerçek zamanlı veri). Bağlantı koparsa kullanıcıya net bir
// "bota ulaşılamıyor" durumu gösterilir — sessizce eski veriyi
// göstermeye devam etmez.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Users, Hash, Terminal, Clock, Wifi, ShieldCheck, MessageSquareWarning, Cpu, WifiOff } from 'lucide-react';
import { useLocale } from './LocaleProvider';
import { AnimatedCounter } from './AnimatedCounter';

interface Stats {
  servers: number;
  users: number;
  channels: number;
  commandsRun: number;
  uptimeMs: number;
  ping: number;
  threatsBlocked: number;
  messagesScanned: number;
  memoryUsedMB: number;
  memoryTotalMB: number;
  shards: { id: number; servers: number; ping: number }[];
  connected: boolean;
}

function formatUptime(ms: number): string {
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  if (days > 0) return `${days}g ${hours}s`;
  if (hours > 0) return `${hours}s ${mins}d`;
  return `${mins}d`;
}

export function LiveStatsDashboard() {
  const { t } = useLocale();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' });
        const data = await res.json();
        if (active) setStats(data);
      } catch {
        if (active) setStats(prev => (prev ? { ...prev, connected: false } : null));
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const cards = stats
    ? [
        { icon: Server, label: t('statistics.servers'), value: stats.servers, color: 'text-signal-blue' },
        { icon: Users, label: t('statistics.users'), value: stats.users, color: 'text-signal-violet' },
        { icon: Hash, label: t('statistics.channels'), value: stats.channels, color: 'text-pulse' },
        { icon: Terminal, label: t('statistics.commandsRun'), value: stats.commandsRun, color: 'text-signal-blue' },
        { icon: ShieldCheck, label: t('statistics.threatsBlocked'), value: stats.threatsBlocked, color: 'text-alert' },
        { icon: MessageSquareWarning, label: t('statistics.messagesScanned'), value: stats.messagesScanned, color: 'text-signal-violet' },
      ]
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6 pb-24">
      {/* Bağlantı durumu göstergesi */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {loading ? (
          <span className="text-sm text-mist-dim">Bağlanıyor...</span>
        ) : stats?.connected ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-pulse/20">
            <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse-slow" />
            <span className="text-xs font-medium text-pulse tracking-wide">{t('statistics.liveIndicator')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-alert/20">
            <WifiOff className="w-3.5 h-3.5 text-alert" />
            <span className="text-xs font-medium text-alert">Bota şu anda ulaşılamıyor</span>
          </div>
        )}
      </div>

      {/* Ana istatistik kartları */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {(loading ? Array.from({ length: 6 }) : cards).map((card: any, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="p-5 rounded-2xl glass-card border border-void-border"
          >
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white/5" />
                <div className="w-16 h-6 rounded bg-white/5" />
                <div className="w-20 h-3 rounded bg-white/5" />
              </div>
            ) : (
              <>
                <card.icon className={`w-5 h-5 mb-3 ${card.color}`} strokeWidth={2} />
                <div className="font-display font-semibold text-2xl mb-1">
                  <AnimatedCounter value={card.value} />
                </div>
                <div className="text-xs text-mist-dim">{card.label}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sistem detayları */}
      {!loading && stats && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-void-border">
            <div className="flex items-center gap-2 mb-3 text-mist-dim">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">{t('statistics.uptime')}</span>
            </div>
            <div className="font-mono text-xl font-medium">{formatUptime(stats.uptimeMs)}</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-void-border">
            <div className="flex items-center gap-2 mb-3 text-mist-dim">
              <Wifi className="w-4 h-4" />
              <span className="text-xs font-medium">{t('statistics.ping')}</span>
            </div>
            <div className="font-mono text-xl font-medium">{stats.ping}ms</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-void-border">
            <div className="flex items-center gap-2 mb-3 text-mist-dim">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-medium">{t('statistics.memory')}</span>
            </div>
            <div className="font-mono text-xl font-medium mb-2">
              {stats.memoryUsedMB.toFixed(0)} / {stats.memoryTotalMB.toFixed(0)} MB
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-signal-blue rounded-full transition-all duration-500"
                style={{ width: `${Math.min((stats.memoryUsedMB / stats.memoryTotalMB) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Shard dağılımı */}
      {!loading && stats && stats.shards.length > 0 && (
        <div className="mt-6 p-5 rounded-2xl glass-card border border-void-border">
          <div className="text-xs font-medium text-mist-dim mb-4">{t('statistics.shardsTitle')}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.shards.map(shard => (
              <div key={shard.id} className="p-3 rounded-xl bg-white/[0.03]">
                <div className="text-xs text-mist-faint mb-1">Shard {shard.id}</div>
                <div className="text-sm font-medium">{shard.servers} sunucu</div>
                <div className="text-xs text-pulse">{shard.ping}ms</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
