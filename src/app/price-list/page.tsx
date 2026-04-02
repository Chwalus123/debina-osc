'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'

/* ─── Dane cennika ───────────────────────────────────────────── */

const MONTHS = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień',
]

const PRICES_A = [350, 350, 350, 360, 400, 440, 480, 480, 440, 400, 350, 350]
const PRICES_B = [390, 390, 390, 430, 470, 510, 550, 550, 510, 470, 390, 390]

/* Kolorystyka sezonowa — zgodna ze screenshotem klienta */
type Season = 'off' | 'spring' | 'summer' | 'peak' | 'autumn'

const SEASON: Season[] = [
  'off','off','off',           // sty, lut, mar
  'spring','spring',           // kwi, maj
  'summer',                    // cze
  'peak','peak',               // lip, sie
  'autumn',                    // wrz
  'summer',                    // paź
  'off','off',                 // lis, gru
]

const SEASON_STYLE: Record<Season, { bg: string; text: string; border: string }> = {
  off:    { bg: '#f0f9fd', text: '#2280b8', border: '#b3ddf0' },   // najjaśniejszy błękit
  spring: { bg: '#daf0ea', text: '#2d6651', border: '#b3d6cd' },   // szałwiowy zielony
  summer: { bg: '#ddf0f9', text: '#124f74', border: '#7cc2e4' },   // średni błękit
  peak:   { bg: '#124f74', text: '#ffffff', border: '#0d2f45' },   // ciemny ocean (szczyt)
  autumn: { bg: '#e8f4f0', text: '#3a8067', border: '#b3d6cd' },   // delikatny szałwia
}

const LEGEND: { season: Season; label: string }[] = [
  { season: 'off',    label: 'Poza sezonem (I–III, XI–XII)' },
  { season: 'spring', label: 'Wiosna (IV–V)'                },
  { season: 'summer', label: 'Lato / Jesień (VI, X)'        },
  { season: 'peak',   label: 'Sezon szczytowy (VII–VIII)'    },
  { season: 'autumn', label: 'Wrzesień'                     },
]

/* ─── Komponent komórki ceny ─────────────────────────────────── */

function PriceCell({ price, season }: { price: number; season: Season }) {
  const s = SEASON_STYLE[season]
  return (
    <td
      className="text-center font-semibold text-sm whitespace-nowrap px-2 py-3"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        borderBottom: `2px solid ${s.border}`,
        minWidth: '76px',
      }}
    >
      {price.toLocaleString('pl-PL')}&nbsp;zł
    </td>
  )
}

/* ─── Strona ─────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      {/* NAGŁÓWEK */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#f0f9fd' }}>
        <div className="container mx-auto max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#3a8067' }}
          >
            Apartamenty nad morzem Dębina
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className="mt-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#0d2f45',
            }}
          >
            Cennik {new Date().getFullYear()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-sm"
            style={{ color: '#64748b' }}
          >
            Ceny za dobę · opłata klimatyczna pobierana osobno przy zameldowaniu
          </motion.p>
        </div>
      </section>

      {/* TABELA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
          >
            {/* Legenda sezonów */}
            <div className="flex flex-wrap gap-2 mb-6">
              {LEGEND.map(({ season, label }) => {
                const s = SEASON_STYLE[season]
                return (
                  <div
                    key={season}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: s.bg,
                      color: s.text,
                      border: `1px solid ${s.border}`,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: s.border }}
                    />
                    {label}
                  </div>
                )
              })}
            </div>

            {/* Tabela — przewijalna na mobile */}
            <div
              className="overflow-x-auto rounded-2xl"
              style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 16px rgba(10,31,46,0.07)' }}
            >
              <table className="w-full border-collapse bg-white" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th
                      className="text-left text-xs font-bold uppercase tracking-wide px-4 py-4 sticky left-0 z-10"
                      style={{
                        backgroundColor: '#0d2f45',
                        color: '#ffffff',
                        minWidth: '150px',
                        borderRight: '1px solid #1e4a6a',
                      }}
                    >
                      Apartament
                    </th>
                    {MONTHS.map((m, i) => (
                      <th
                        key={m}
                        className="text-center text-xs font-bold px-2 py-4"
                        style={{
                          backgroundColor: SEASON_STYLE[SEASON[i]].bg,
                          color: SEASON_STYLE[SEASON[i]].text,
                          borderBottom: `2px solid ${SEASON_STYLE[SEASON[i]].border}`,
                          borderRight: i < 11 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                        }}
                      >
                        {m.slice(0, 3).toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Apartament A */}
                  <tr className="border-b" style={{ borderColor: '#f1f5f9' }}>
                    <td
                      className="px-4 py-4 sticky left-0 z-10"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRight: '1px solid #e2e8f0',
                      }}
                    >
                      <p className="font-bold text-sm" style={{ color: '#0d2f45' }}>
                        Apartament A
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                        ul. Modrzewiowa 29/44/A
                      </p>
                    </td>
                    {PRICES_A.map((price, i) => (
                      <PriceCell key={i} price={price} season={SEASON[i]} />
                    ))}
                  </tr>
                  {/* Apartament B */}
                  <tr>
                    <td
                      className="px-4 py-4 sticky left-0 z-10"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRight: '1px solid #e2e8f0',
                      }}
                    >
                      <p className="font-bold text-sm" style={{ color: '#0d2f45' }}>
                        Apartament B
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                        ul. Modrzewiowa 29/44/B
                      </p>
                    </td>
                    {PRICES_B.map((price, i) => (
                      <PriceCell key={i} price={price} season={SEASON[i]} />
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Informacje dodatkowe */}
            <div
              className="flex items-start gap-3 mt-5 p-4 rounded-2xl text-sm"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' }}
            >
              <Info size={16} style={{ color: '#2280b8', flexShrink: 0, marginTop: '2px' }} />
              <div className="space-y-1 text-xs leading-relaxed">
                <p>Podane ceny dotyczą jednej doby noclegowej (check-in 14:00, check-out 10:00).</p>
                <p>Minimalny czas najmu: <strong>3 doby noclegowe</strong>. Zadatek: 25% wartości pobytu w ciągu 3 dni od rezerwacji.</p>
                <p>Opłata klimatyczna pobierana jest gotówką przy zameldowaniu (wg stawki gminy Ustka).</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#124f74', color: '#fff' }}
              >
                Zapytaj o termin
                <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:odpocznijspokojnie@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all"
                style={{ border: '1.5px solid #b3ddf0', color: '#124f74' }}
              >
                Napisz bezpośrednio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
