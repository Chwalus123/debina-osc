import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Layout from '@/components/layout'

/* ─── Czcionki (next/font — self-hosted, bez @import do Google) ── */

const inter = Inter({
  subsets:  ['latin', 'latin-ext'],
  variable: '--font-sans',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets:  ['latin', 'latin-ext'],
  variable: '--font-display',
  display:  'swap',
  style:    ['normal', 'italic'],
  weight:   ['400', '600', '700'],
})

/* ─── Metadata SEO ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL('https://bazadlaodpoczynku.pl'),
  title: {
    default:  'Baza dla Odpoczynku — Apartamenty nad Morzem Bałtyckim w Dębinie',
    template: '%s | Baza dla Odpoczynku',
  },
  description:
    'Dwa komfortowe apartamenty w Dębinie nad Morzem Bałtyckim. Las, plaża i cisza — idealne miejsce na wypoczynek w Pobrzeżu Słowińskim. Rezerwuj online.',
  keywords: [
    'apartamenty Dębina', 'noclegi Dębina', 'Morze Bałtyckie wynajem', 'Pobrzeże Słowińskie',
    'apartamenty na wynajem Bałtyk', 'Ustka okolice', 'wypoczynek nad morzem',
  ],
  authors: [{ name: 'Baza dla Odpoczynku' }],
  openGraph: {
    type:        'website',
    locale:      'pl_PL',
    siteName:    'Baza dla Odpoczynku',
    title:       'Baza dla Odpoczynku — Apartamenty nad Morzem Bałtyckim w Dębinie',
    description: 'Dwa komfortowe apartamenty w Dębinie nad Morzem Bałtyckim. Las, plaża i cisza.',
    images: [
      {
        url:    '/img/1000002722.jpg',
        width:  1200,
        height: 630,
        alt:    'Leśna ścieżka ku Morzu Bałtyckiemu w Dębinie',
      },
    ],
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#124f74',
  width:      'device-width',
  initialScale: 1,
}

/* ─── Root Layout ──────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
