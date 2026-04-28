import type { Metadata, Viewport } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nello Ocean Beach — Dove il Mare Incontra l'Anima",
  description: "Nello Ocean Beach: il beach club premium di Battipaglia. Spiaggia attrezzata per famiglie di giorno, aperitivi e musica al tramonto.",
  keywords: "beach club Battipaglia, spiaggia Eboli, lido, discoteca sulla spiaggia, aperitivo mare, eventi Salerno",
  openGraph: {
    title: "Nello Ocean Beach — Dove il Mare Incontra l'Anima",
    description: "Beach club premium a Battipaglia. Relax in famiglia di giorno, musica e drink al tramonto.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5EFE6' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1622' },
  ],
  viewportFit: 'cover',
};

import { ScrollReveal } from '@/components/ScrollReveal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable} font-sans`}>
        <ThemeProvider>
          {children}
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  );
}
