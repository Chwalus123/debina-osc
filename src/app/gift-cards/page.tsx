'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Send, CheckCircle, Loader2, Sparkles } from 'lucide-react'

export default function GiftCardPage() {
  const [email, setEmail]   = useState('')
  const [name, setName]     = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    /* Wyślij zapytanie przez API kontaktu */
    try {
      await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          apartment: 'any',
          message: 'Zapytanie o bon podarunkowy — Baza dla Odpoczynku.',
        }),
      })
    } catch { /* ignoruj błąd sieciowy */ }
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      {/* Header */}
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
            Bon Podarunkowy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-base"
            style={{ color: '#64748b' }}
          >
            Podaruj komuś bliskiemu niezapomniany wypoczynek nad Bałtykiem.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Karta bonu — wizualizacja */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="relative overflow-hidden rounded-3xl p-8 text-white"
              style={{
                background: 'linear-gradient(135deg, #0a1f2e 0%, #124f74 60%, #2280b8 100%)',
                minHeight: '260px',
              }}
            >
              {/* dekoracyjne kółka */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
                   style={{ background: 'radial-gradient(circle, #7cc2e4, transparent)', transform: 'translate(30%, -30%)' }} />
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-10"
                   style={{ background: 'radial-gradient(circle, #3a8067, transparent)', transform: 'translate(-30%, 30%)' }} />

              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex items-center gap-2">
                  <Gift size={22} style={{ color: '#7cc2e4' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#7cc2e4' }}>
                    Bon Podarunkowy
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  Baza dla odpoczynku
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Podaruj wypoczynek nad Morzem Bałtyckim — las, morze i&nbsp;cisza
                  dla Twoich bliskich.
                </p>
                <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Dębina · Wybrzeże Słowińskie · Pomorskie
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info + formularz */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
              className="flex flex-col gap-5"
            >
              {/* Info */}
              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#f0faf6', border: '1px solid #b3d6cd' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} style={{ color: '#2d6651' }} />
                  <h3 className="font-semibold text-sm" style={{ color: '#1a3028' }}>
                    Wkrótce dostępny!
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#3a5045' }}>
                  Pracujemy nad wdrożeniem systemu bonów podarunkowych. Bon będzie dostępny
                  w formie eleganckiego certyfikatu elektronicznego lub papierowego,
                  w dowolnym nominale.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    'Bon na określoną liczbę noclegów',
                    'Bon o określonej wartości',
                    'Dedykowane życzenia dla obdarowanego',
                    'Ważność 12 miesięcy od zakupu',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#2d6651' }}>
                      <CheckCircle size={12} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formularz zapytania */}
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 p-7 text-center rounded-2xl"
                  style={{ backgroundColor: '#f0faf6', border: '1px solid #b3d6cd' }}
                >
                  <CheckCircle size={36} style={{ color: '#3a8067' }} />
                  <p className="font-semibold text-sm" style={{ color: '#1a3028' }}>
                    Dziękujemy! Skontaktujemy się wkrótce.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 rounded-2xl space-y-4"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(10,31,46,0.06)' }}
                >
                  <h4 className="font-semibold text-sm" style={{ color: '#0d2f45' }}>
                    Zostaw dane — powiadomimy Cię, gdy bon będzie dostępny
                  </h4>
                  <input
                    type="text"
                    placeholder="Twoje imię"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                    onBlur={e  => e.currentTarget.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                    onBlur={e  => e.currentTarget.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#2d6651', color: '#fff' }}
                  >
                    {loading ? (
                      <><Loader2 size={15} className="animate-spin" /> Wysyłanie...</>
                    ) : (
                      <><Send size={14} /> Powiadom mnie</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
