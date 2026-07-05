# Coco — Website

Discord güvenlik botu **Coco** için resmi web sitesi. Next.js 14 (App Router) + Tailwind CSS + Framer Motion ile inşa edilmiştir.

## Özellikler

- **Çok dilli** — Türkçe, İngilizce, Almanca, İspanyolca, Arapça (RTL destekli). Tarayıcı dilini otomatik algılar.
- **Yapay zekâ destekli arama** — `/commands` sayfasında doğal dilde yazılan aramalar Gemini ile en alakalı komuta eşlenir.
- **Açık/Karanlık tema** — sistem tercihini algılar, `localStorage`'da saklar.
- **Discord ile giriş** — NextAuth + Discord OAuth2.
- **Canlı istatistikler** — `/statistics` sayfası botun kendi API'sinden saniyede bir veri çeker.
- **Ayrı mobil/masaüstü navigasyon** — mobilde alt sekme çubuğu, masaüstünde üst navbar.

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local dosyasını doldurun (aşağıya bakın)
npm run dev
```

## Ortam Değişkenleri

`.env.example` dosyasındaki tüm değişkenleri doldurun:

1. **Discord OAuth** — [Discord Developer Portal](https://discord.com/developers/applications)'dan `DISCORD_CLIENT_ID` ve `DISCORD_CLIENT_SECRET` alın. Redirect URL: `https://coco.vercel.app/api/auth/callback/discord`
2. **NEXTAUTH_SECRET** — `openssl rand -base64 32` ile üretin.
3. **BOT_STATS_URL** — Botunuzun çalıştığı sunucuda küçük bir HTTP endpoint açıp buraya adresini yazın (aşağıda örnek var).
4. **GEMINI_API_KEY** — [Google AI Studio](https://aistudio.google.com/app/apikey)'dan ücretsiz alın (opsiyonel — boş bırakılırsa arama basit metin eşleşmesine düşer).

## Botunuzda İstatistik Endpoint'i Açma

Discord botunuzun çalıştığı Node.js projesine küçük bir Express sunucusu ekleyin:

```js
// bot tarafında: stats-server.js
const express = require('express');
const app = express();

app.get('/internal/stats', (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.STATS_TOKEN}`) {
    return res.status(401).json({ error: 'Yetkisiz' });
  }
  res.json({
    servers: client.guilds.cache.size,
    users: client.guilds.cache.reduce((t, g) => t + g.memberCount, 0),
    channels: client.channels.cache.size,
    commandsRun: botStats.get().totalCommands,
    uptimeMs: client.uptime,
    ping: client.ws.ping,
    threatsBlocked: /* antiNuke sayaçlarınızdan */ 0,
    messagesScanned: /* aiScanner sayaçlarınızdan */ 0,
    memoryUsedMB: process.memoryUsage().rss / 1024 / 1024,
    memoryTotalMB: require('os').totalmem() / 1024 / 1024,
    shards: [{ id: 0, servers: client.guilds.cache.size, ping: client.ws.ping }],
  });
});

app.listen(3001);
```

Bu sunucuyu herkese açık bir adrese (Railway, Fly.io, kendi VPS'iniz vb.) koyup `BOT_STATS_URL` değişkenine yazın.

## Komut Listesini Güncelleme

`lib/commands.ts` içindeki `commands` dizisi, botun `commands/` klasöründeki gerçek komutlarla senkron tutulmalıdır. Yeni bir slash komutu eklediğinizde bu diziye bir satır eklemeniz yeterlidir — hem `/commands` sayfası hem de arama otomatik günceller.

## Vercel'e Deploy

```bash
npm install -g vercel
vercel
```

Ortam değişkenlerini Vercel dashboard'unda **Settings → Environment Variables** kısmından ekleyin, ardından `vercel --prod` ile yayınlayın.

## Klasör Yapısı

```
app/
  page.tsx                 → Ana sayfa
  commands/page.tsx        → Komut kütüphanesi + AI arama
  statistics/page.tsx      → Canlı istatistikler
  dashboard/page.tsx       → "Yakında" sayfası
  api/
    search/route.ts        → Gemini destekli semantik arama
    stats/route.ts         → Bot istatistik proxy'si
    auth/[...nextauth]/    → Discord OAuth
components/                → Tüm UI bileşenleri
lib/
  i18n.ts                  → Dil sistemi
  commands.ts              → Komut kütüphanesi verisi
messages/                  → Çeviri JSON dosyaları (tr, en, de, es, ar)
```
