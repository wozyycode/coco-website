// app/api/search/route.ts — Yapay Zekâ Destekli Komut Arama
// ─────────────────────────────────────────────────────────────
// Kullanıcı "sunucuyu kilitlemek istiyorum" gibi doğal dilde bir
// şey yazdığında, klasik string arama /panic komutunu bulamaz.
// Bu endpoint Gemini'ye sorguyu + komut listesini verir, en
// alakalı komutları JSON olarak geri döndürür. Hangi dilde
// yazılırsa yazılsın çalışır — ayrıca çeviriye gerek kalmadan.

import { NextRequest, NextResponse } from 'next/server';
import { commands } from '@/lib/commands';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are a search assistant for a Discord bot's command documentation website.
The user will type a query in ANY language, describing what they want to do in natural language
(not necessarily the exact command name).

Given the query and the list of available commands (with name + description), return the commands
that best match the user's intent, ranked by relevance.

Respond ONLY with raw JSON, no markdown:
{"matches": ["command-name-1", "command-name-2", ...]}

Return at most 5 matches. If nothing is relevant, return an empty array.
Understand abbreviations, typos, and cross-language queries (e.g. a Turkish query should still
match an English command description if the meaning matches).`;

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ matches: commands.map(c => c.name) });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // API anahtarı yoksa basit metin araması ile devam et (site çökmesin)
    if (!apiKey) {
      const q = query.toLowerCase();
      const fallbackMatches = commands
        .filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q))
        .map(c => c.name);
      return NextResponse.json({ matches: fallbackMatches, fallback: true });
    }

    const commandList = commands.map(c => `${c.name}: ${c.description}`).join('\n');

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: `Query: "${query}"\n\nCommands:\n${commandList}` }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: 150,
            temperature: 0.1,
          },
        }),
      },
    );

    if (!res.ok) throw new Error(`Gemini ${res.status}`);

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{"matches":[]}';
    const parsed = JSON.parse(text);

    return NextResponse.json({ matches: parsed.matches ?? [] });
  } catch (err) {
    console.error('[Search API] Hata:', err);
    // Hata durumunda basit arama ile devam et
    const q = (await req.json().catch(() => ({ query: '' }))).query?.toLowerCase() ?? '';
    const fallbackMatches = commands
      .filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q))
      .map(c => c.name);
    return NextResponse.json({ matches: fallbackMatches, fallback: true });
  }
}
