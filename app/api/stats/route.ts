// app/api/stats/route.ts — Botun Canlı İstatistiklerini Vercel Üzerinden Sunar
// ─────────────────────────────────────────────────────────────────────────────
// Discord botu kendi tarafında küçük bir HTTP sunucusu açar (ör. Express veya
// Next API), oradan /internal/stats endpoint'iyle JSON döner. Bu route o
// endpoint'i sunucu tarafında proxy'ler; böylece:
//   - Bot sunucusunun gerçek adresi tarayıcıya sızmaz
//   - CORS sorunu yaşanmaz
//   - Bot API'si aşırı istekten korunur (burada cache eklenebilir)
//
// BOT_STATS_URL ve BOT_STATS_TOKEN, Vercel ortam değişkenlerinde saklanır.

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0; // Her istekte taze veri

interface BotStats {
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
}

// Bot çevrimdışıyken veya henüz bağlanmamışken gösterilecek yer tutucu
const FALLBACK_STATS: BotStats = {
  servers: 0,
  users: 0,
  channels: 0,
  commandsRun: 0,
  uptimeMs: 0,
  ping: 0,
  threatsBlocked: 0,
  messagesScanned: 0,
  memoryUsedMB: 0,
  memoryTotalMB: 0,
  shards: [],
};

export async function GET() {
  const botStatsUrl = process.env.BOT_STATS_URL;
  const botStatsToken = process.env.BOT_STATS_TOKEN;

  if (!botStatsUrl) {
    return NextResponse.json(
      { ...FALLBACK_STATS, connected: false, error: 'BOT_STATS_URL ayarlanmamış' },
      { status: 200 },
    );
  }

  try {
    const res = await fetch(botStatsUrl, {
      headers: botStatsToken ? { Authorization: `Bearer ${botStatsToken}` } : {},
      // Vercel edge'de cache'i devre dışı bırak — her zaman taze veri
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Bot API ${res.status}`);

    const data: BotStats = await res.json();
    return NextResponse.json({ ...data, connected: true });
  } catch (err) {
    console.error('[Stats API] Bota ulaşılamadı:', err);
    return NextResponse.json(
      { ...FALLBACK_STATS, connected: false, error: 'Bot şu anda ulaşılamıyor' },
      { status: 200 },
    );
  }
}
