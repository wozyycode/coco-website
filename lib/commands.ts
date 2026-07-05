// lib/commands.ts — Bot komut kütüphanesini okuyan yardımcı
// ─────────────────────────────────────────────────────────────
// Botun /commands klasöründeki her .js dosyasını statik olarak
// tarar ve SlashCommandBuilder verilerini JS AST'ye girmeden,
// basit regex ile çıkarır (Next.js edge/derleme ortamında bot
// kodunu import etmeden çalışması için).
//
// GERÇEK KULLANIMDA: Bu fonksiyon, deploy sırasında botun
// `commands/` klasörünün bir kopyasını `bot-commands/` altına
// senkronize ettiğinizi varsayar (bkz. scripts/sync-commands.js).
// Alternatif olarak botunuzda bir /api/commands endpoint'i açıp
// buradan fetch edebilirsiniz — CATEGORY_MAP bunun için hazır.

export interface CommandInfo {
  name: string;
  description: string;
  category: 'security' | 'info' | 'utility' | 'general';
  usage: string;
  options?: { name: string; description: string; required: boolean }[];
}

// Kategori haritası — botun help.js dosyasındaki CATEGORY_MAP ile birebir aynı tutulmalı
const CATEGORY_MAP: Record<string, CommandInfo['category']> = {
  security: 'security',
  panic: 'security',
  botinfo: 'info',
  help: 'info',
  avatar: 'utility',
  banner: 'utility',
};

export const categoryLabels: Record<CommandInfo['category'], { tr: string; en: string; color: string }> = {
  security: { tr: 'Güvenlik', en: 'Security', color: '#5865F2' },
  info: { tr: 'Bilgi', en: 'Info', color: '#3ECF8E' },
  utility: { tr: 'Araçlar', en: 'Utility', color: '#F7B955' },
  general: { tr: 'Genel', en: 'General', color: '#A8A8B3' },
};

/**
 * Statik komut listesi.
 * Botun gerçek /commands klasörüyle senkron tutulur — yeni komut
 * eklendiğinde bu diziye bir satır eklemek yeterlidir. İleri düzey
 * kurulumda bu veri build-time'da botun deposundan otomatik çekilebilir.
 */
export const commands: CommandInfo[] = [
  {
    name: 'security',
    description: 'Coco Güvenlik Merkezi panelini açar — koruma modülleri, izleme, ayarlar',
    category: 'security',
    usage: '/security',
  },
  {
    name: 'panic',
    description: 'Acil durum kalkanı — sunucuyu anında panik moduna alır veya kapatır',
    category: 'security',
    usage: '/panic',
  },
  {
    name: 'botinfo',
    description: 'Bot istatistikleri, shard verileri ve kurucu bilgilerini gösterir',
    category: 'info',
    usage: '/botinfo',
  },
  {
    name: 'help',
    description: 'Tüm komutları kategori kategori gösteren yardım menüsü',
    category: 'info',
    usage: '/help',
  },
  {
    name: 'avatar',
    description: "Bir kullanıcının profil fotoğrafını yüksek çözünürlükte gösterir",
    category: 'utility',
    usage: '/avatar [kullanıcı] [sunucu-avatarı]',
    options: [
      { name: 'kullanici', description: 'Avatarını görmek istediğiniz kullanıcı', required: false },
      { name: 'sunucu-avatari', description: 'Sunucuya özel avatar gösterilsin mi?', required: false },
    ],
  },
  {
    name: 'banner',
    description: "Bir kullanıcının profil banner'ını gösterir",
    category: 'utility',
    usage: '/banner [kullanıcı]',
    options: [
      { name: 'kullanici', description: "Banner'ını görmek istediğiniz kullanıcı", required: false },
    ],
  },
];

export function getCommandsByCategory(category: string) {
  if (category === 'all') return commands;
  return commands.filter(c => c.category === category);
}

export function searchCommands(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return commands;
  return commands.filter(
    c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
  );
}
