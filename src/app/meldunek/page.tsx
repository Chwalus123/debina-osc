'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ArrowLeft } from 'lucide-react'

export default function MeldunekPage() {
  return (
    <>
      {/* NAGŁÓWEK */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: '#f0f9fd' }}>
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
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#0d2f45',
            }}
          >
            Formularz — Meldunek Pobytu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-sm"
            style={{ color: '#64748b' }}
          >
            Formularz należy wypełnić po wpłacie zadatku, do 7 dni przed pobytem.<br/>
            Pobierz i wydrukuj przed przyjazdem.
          </motion.p>

          {/* Przyciski */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
          >
            <a
              href="/meldunek.pdf"
              download="karta-meldunek-pobytu.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: '#124f74', color: '#fff' }}
            >
              <Download size={16} />
              Pobierz PDF
            </a>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all"
              style={{ border: '1.5px solid #cbd5e1', color: '#0d2f45' }}
            >
              <ArrowLeft size={16} />
              Wróć do Regulaminu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PODGLĄD PDF */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' as const }}
            className="overflow-hidden rounded-3xl"
            style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 16px rgba(10,31,46,0.07)' }}
          >
            <iframe
              src="/meldunek.pdf"
              className="w-full"
              style={{ height: '80vh', border: 'none' }}
              title="Formularz meldunkowy"
            />
          </motion.div>

          <p className="mt-4 text-xs text-center" style={{ color: '#94a3b8' }}>
            Jeśli formularz nie wyświetla się poprawnie,{' '}
            <a
              href="/meldunek.pdf"
              download="karta-meldunek-pobytu.pdf"
              className="underline hover:text-slate-600"
            >
              pobierz PDF bezpośrednio
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
