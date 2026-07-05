import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LocaleProvider } from '@/components/LocaleProvider';
import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coco — Sunucunu Karanlıkta Bile Koruyan Bot',
  description:
    'Coco; nuke saldırılarını saniyeler içinde durdurur, dolandırıcılık mesajlarını yapay zekâ ile anında algılar ve tek komutla sunucunu tam izolasyona alır.',
  metadataBase: new URL('https://coco.vercel.app'),
  openGraph: {
    title: 'Coco — Discord Güvenlik Botu',
    description: 'Sunucunu gece de gündüz de koruyan bot.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <AuthProvider>
          <ThemeProvider>
            <LocaleProvider>{children}</LocaleProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
