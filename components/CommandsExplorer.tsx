'use client';

// components/CommandsExplorer.tsx — Komut Arama ve Listeleme
// ──────────────────────────────────────────────────────────────
// Arama kutusu iki modda çalışır:
//   1. Yazarken anlık olarak yerel (client-side) string eşleşmesi yapılır
//   2. 500ms durakladıktan sonra AI destekli /api/search çağrılır ve
//      sonuçlar semantik eşleşmeyle güncellenir (doğal dil desteği için)

import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Sparkles, Loader2 } from 'lucide-react';
import { commands, categoryLabels, type CommandInfo } from '@/lib/commands';
import { useLocale } from './LocaleProvider';
import clsx from 'clsx';

export function CommandsExplorer() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | CommandInfo['category']>('all');
  const [aiMatches, setAiMatches] = useState<string[] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const deferredQuery = useDeferredValue(query);

  // Anlık yerel filtre — AI sonucu gelene kadar bu gösterilir
  const localFiltered = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim();
    let list = category === 'all' ? commands : commands.filter(c => c.category === category);
    if (q) list = list.filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q));
    return list;
  }, [deferredQuery, category]);

  // AI destekli semantik arama — kullanıcı yazmayı durdurunca tetiklenir
  useEffect(() => {
    if (!deferredQuery.trim()) {
      setAiMatches(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setAiLoading(true);
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: deferredQuery }),
        });
        const data = await res.json();
        setAiMatches(data.matches ?? null);
      } catch {
        setAiMatches(null);
      } finally {
        setAiLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [deferredQuery]);

  // Gösterilecek liste: AI sonucu varsa onu, yoksa yerel filtreyi kullan
  const displayed = useMemo(() => {
    if (!deferredQuery.trim()) {
      return category === 'all' ? commands : commands.filter(c => c.category === category);
    }
    if (aiMatches && aiMatches.length > 0) {
      const ordered = aiMatches
        .map(name => commands.find(c => c.name === name.replace('/', '')))
        .filter((c): c is CommandInfo => !!c);
      return category === 'all' ? ordered : ordered.filter(c => c.category === category);
    }
    return localFiltered;
  }, [deferredQuery, aiMatches, localFiltered, category]);

  const categories: Array<'all' | CommandInfo['category']> = ['all', 'security', 'info', 'utility', 'general'];

  return (
    <div>
      {/* Arama kutusu */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mist-dim" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('commands.searchPlaceholder')}
          className="w-full h-12 pl-11 pr-11 rounded-full glass-card border border-void-border focus:border-signal-blue/50 outline-none text-sm placeholder:text-mist-faint transition-colors"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {aiLoading ? (
            <Loader2 className="w-4 h-4 text-signal-violet animate-spin" />
          ) : query.trim() ? (
            <Sparkles className="w-4 h-4 text-signal-violet" title="Yapay zekâ destekli arama aktif" />
          ) : null}
        </div>
      </div>

      {/* Kategori filtreleri */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              'px-4 h-9 rounded-full text-sm font-medium transition-colors border',
              category === cat
                ? 'bg-signal-blue text-white border-signal-blue'
                : 'glass-card border-void-border text-mist-dim hover:text-mist',
            )}
          >
            {cat === 'all' ? t('commands.categoryAll') : categoryLabels[cat][locale === 'tr' ? 'tr' : 'en']}
          </button>
        ))}
      </div>

      {/* Komut listesi */}
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <AnimatePresence mode="popLayout">
          {displayed.map(cmd => (
            <motion.div
              key={cmd.name}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl glass-card border border-void-border hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-signal-blue shrink-0" />
                  <code className="font-mono text-sm font-medium">/{cmd.name}</code>
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    color: categoryLabels[cmd.category].color,
                    backgroundColor: `${categoryLabels[cmd.category].color}1A`,
                  }}
                >
                  {categoryLabels[cmd.category][locale === 'tr' ? 'tr' : 'en']}
                </span>
              </div>
              <p className="text-sm text-mist-dim leading-relaxed mb-3">{cmd.description}</p>
              <div className="text-xs text-mist-faint font-mono bg-white/[0.03] rounded-lg px-3 py-2">
                {cmd.usage}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-16 text-mist-dim">{t('commands.noResults')}</div>
      )}
    </div>
  );
}
