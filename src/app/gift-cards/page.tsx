'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gift, Percent, CheckCircle, Mail, Phone, ArrowRight, Info } from 'lucide-react'

/* ─── Dane bonów ─────────────────────────────────────────────── */

const bonPodarunkowy = {
  icon: Gift,
  badge: 'Bon Podarunkowy',
  title: 'Podaruj wypoczynek',
  desc: 'Idealny prezent dla bliskich — na pobyt w apartamencie w Dębinie, w otoczeniu lasu, klifu i morza.',
  gradient: 'linear-gradient(135deg, #0a1f2e 0%, #124f74 60%, #2280b8 100%)',
  accent: '#7cc2e4',
  points: [
    'Bon na pobyt w wybranym apartamencie',
    'Elegancka forma — gotowy do wręczenia',
    'Dedykowane życzenia dla obdarowanego',
  ],
}

const bonRabatowy = {
  icon: Percent,
  badge: 'Bon Rabatowy',
  title: 'Zniżka na pobyt',
  desc: 'Uprawnia posiadacza do zniżki w wysokości zapisanej na bonie — na dłuższy, spokojny wypoczynek poza sezonem.',
  gradient: 'linear-gradient(135deg, #1a3028 0%, #2d6651 60%, #3a8067 100%)',
  accent: '#9fd6c2',
  points: [
    'Zniżka w wysokości zapisanej na bonie',
    'Minimum 5 dób noclegowych',
    'Ważny rok od daty wydania',
  ],
}

/* Reguły z rewersu bonu rabatowego */
const reguly = [
  'Realizacja bonu jest możliwa przez osobę obdarowaną (do 4 osób w apartamencie).',
  'Uprawnia posiadacza do zniżki w wysokości zapisanej na bonie.',
  'Rezerwacja apartamentu na minimum 5 dób noclegowych.',
  'Dotyczy rezerwacji w miesiącach: od 01.01 do 30.05 oraz od 01.09 do 31.10.',
  'Bon ważny rok od jego wydania.',
  'Nie ma możliwości wymiany bonu na gotówkę.',
  'Bonu rabatowego nie można łączyć z innymi promocjami rabatowymi — jest on integralny z regulaminem najmu krótkoterminowego.',
]

/* ─── Karta bonu ─────────────────────────────────────────────── */

function BonCard({ bon, delay }: { bon: typeof bonPodarunkowy; delay: number }) {
  const Icon = bon.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className="flex flex-col"
    >
      {/* Wizualizacja bonu */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white"
        style={{ background: bon.gradient, minHeight: '230px' }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${bon.accent}, transparent)`, transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffffff, transparent)', transform: 'translate(-30%, 30%)' }}
        />

        <div className="relative z-10 flex flex-col h-full gap-3">
          <div className="flex items-center gap-2">
            <Icon size={20} style={{ color: bon.accent }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: bon.accent }}>
              {bon.badge}
            </span>
          </div>

          <h3
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            {bon.title}
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {bon.desc}
          </p>

          <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <p
              className="text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}
            >
              Ciesz się wypoczynkiem!
            </p>
            <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Dębina, ul. Modrzewiowa 29 · Wybrzeże Słowińskie
            </p>
          </div>
        </div>
      </div>

      {/* Punkty */}
      <ul className="mt-4 space-y-2 px-1">
        {bon.points.map(p => (
          <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: '#4a5568' }}>
            <CheckCircle size={15} style={{ color: '#3a8067', flexShrink: 0, marginTop: '2px' }} />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ─── Strona Bonów ───────────────────────────────────────────── */

export default function GiftCardPage() {
  return (
    <>
      {/* Nagłówek */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#f0faf6' }}>
        <div className="container mx-auto max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#3a8067' }}
          >
            Baza dla Odpoczynku
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
            Bony
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-base"
            style={{ color: '#64748b' }}
          >
            Oferujemy dwa rodzaje bonów — <strong style={{ color: '#3a8067' }}>podarunkowy</strong> oraz{' '}
            <strong style={{ color: '#3a8067' }}>rabatowy</strong> — na pobyt w Dębinie nad Bałtykiem.
          </motion.p>
        </div>
      </section>

      {/* Dwa rodzaje bonów */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <BonCard bon={bonPodarunkowy} delay={0} />
            <BonCard bon={bonRabatowy} delay={0.1} />
          </div>
        </div>
      </section>

      {/* Reguły realizacji bonu rabatowego */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="p-7 rounded-3xl"
            style={{ backgroundColor: '#f0faf6', border: '1px solid #b3d6cd' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} style={{ color: '#2d6651' }} />
              <h2 className="font-semibold text-base" style={{ color: '#1a3028' }}>
                Reguły realizacji bonu rabatowego
              </h2>
            </div>

            <ul className="space-y-2.5">
              {reguly.map(r => (
                <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: '#3a5045' }}>
                  <CheckCircle size={15} style={{ color: '#2d6651', flexShrink: 0, marginTop: '3px' }} />
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs" style={{ color: '#64748b' }}>
              Bon jest integralny z{' '}
              <Link href="/terms" className="underline hover:opacity-80" style={{ color: '#2d6651' }}>
                regulaminem najmu krótkoterminowego
              </Link>
              , dostępnym na naszej stronie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA — Zainteresowany? Napisz do nas */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: '#0a1f2e' }}>
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            <h2
              className="text-3xl md:text-4xl text-white mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
            >
              Zainteresowany?
            </h2>
            <p className="mb-8 text-base" style={{ color: '#7cc2e4' }}>
              Napisz do nas — a podamy wszystkie szczegóły dotyczące bonów.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#2280b8', color: '#fff' }}
              >
                Napisz do nas
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:odpocznijspokojnie@gmail.com?subject=Zapytanie%20o%20bon%20—%20Baza%20dla%20Odpoczynku"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: '#b3ddf0' }}
              >
                <Mail size={15} />
                odpocznijspokojnie@gmail.com
              </a>
            </div>

            <a
              href="tel:+48501601881"
              className="mt-5 inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <Phone size={14} />
              501 601 881 · 501 013 931
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
