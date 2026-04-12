'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function RodoPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const prevent = (e: Event) => e.preventDefault()
    el.addEventListener('copy', prevent)
    el.addEventListener('cut', prevent)
    el.addEventListener('contextmenu', prevent)
    return () => {
      el.removeEventListener('copy', prevent)
      el.removeEventListener('cut', prevent)
      el.removeEventListener('contextmenu', prevent)
    }
  }, [])

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
            Klauzula informacyjna Ochrony Danych Osobowych (RODO)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: '#64748b' }}
          >
            Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
            z dnia 27.04.2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
            danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia
            dyrektywy 95/46/WE (RODO) informujemy:
          </motion.p>
        </div>
      </section>

      {/* TREŚĆ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="p-8 md:p-12 rounded-3xl space-y-8"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 16px rgba(10,31,46,0.06)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            {/* Zastrzeżenie */}
            <p className="text-xs text-center italic pb-4 border-b" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
              *dokument zastrzeżony — wszelkie prawa zastrzeżone © Baza dla Odpoczynku
            </p>

            {/* 1 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                1. Administrator danych osobowych
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                <strong>Administratorem</strong> Pani/Pana danych osobowych jest Placówka Szkoleniowa „FILAR"
                R. Szarłowski, biuro: Gniezno ul. Roosevelta 120, p. II, 206, 62-200 Gniezno,
                NIP: 784-101-79-36
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                2. Inspektor danych osobowych
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Administrator danych osobowych nie wyznaczył Inspektora danych osobowych.
                Przejmuje jego obowiązki umożliwiając kontakt tel: 501-013-931 i e-mail:{' '}
                <span style={{ color: '#124f74' }}>odpocznijspokojnie@gmail.com</span>
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                3. Cele i podstawy prawne przetwarzania
              </h2>
              <ul className="space-y-2.5">
                {[
                  { base: 'Art. 6 ust. 1 lit. b RODO', desc: 'Przetwarzanie niezbędne do wykonania umowy najmu krótkoterminowego: realizacja rezerwacji, rozliczenia pobytu.' },
                  { base: 'Art. 6 ust. 1 lit. c RODO', desc: 'Obowiązek prawny — prowadzenie ewidencji gości zgodnie z wymogami prawa.' },
                  { base: 'Art. 6 ust. 1 lit. f RODO', desc: 'Prawnie uzasadniony interes Administratora — bezpieczeństwo mienia, dochodzenie roszczeń bądź obrony praw. Monitoring obejmuje wyłącznie przestrzeń wspólną dla apartamentów – tj. korytarz.' },
                  { base: 'Art. 6 ust. 1 lit. a RODO', desc: 'Zgoda osoby — w celach informacyjnych lub marketingowych np. powiadamianie o ofercie.' },
                ].map(({ base, desc }) => (
                  <li key={base} className="flex gap-3 text-sm">
                    <span className="shrink-0 font-semibold text-xs px-2 py-0.5 rounded-md h-fit mt-0.5" style={{ backgroundColor: '#f0f9fd', color: '#124f74' }}>
                      {base}
                    </span>
                    <span style={{ color: '#4a5568' }}>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                4. Zakres przetwarzanych danych
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Przetwarzamy dane niezbędne do realizacji usług zostały wskazane w formularzu
                zakwaterowania. Monitorowanie wizyjne korytarza - wyłączona część zewnętrzna
                z przestrzeni dla apartamentów.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                5. Okres przechowywania danych
              </h2>
              <ul className="space-y-2 list-disc list-outside pl-5">
                {[
                  'Dane przetwarzane w celu realizacji wynajmu przechowywane są przez 5 lat od zakończenia pobytu - wymogi podatkowe i rachunkowe.',
                  'Dane przetwarzane na podstawie zgody do czasu jej cofnięcia.',
                  'Ewidencja meldunkowa — zgodnie z przepisami prawa.',
                  'Okres przechowywania danych z monitoringu wizyjnego nagrań obrazu — maksymalnie do 3 miesięcy od dnia nagrania. Po upływie okresu przechowywania nagrania zostają trwale usunięte, tak aby ich odzyskanie nie było możliwe.',
                ].map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                6. Odbiorcy danych
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Odbiorcami Pani/Pana danych osobowych będą podmioty i dostawcy uprawnieni
                do uzyskania danych osobowych na podstawie przepisów prawa, umów współpracy
                w zakresie wynikającym z korzystania z naszych usług, a także organy publiczne —
                wyłącznie gdy wymagają tego przepisy prawa.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                7. Prawa osób, których dane dotyczą
              </h2>
              <ul className="space-y-2.5">
                {[
                  { base: 'Dostęp',           desc: 'Prawo do uzyskania informacji o przetwarzanych danych i kopii danych (art. 15 RODO).' },
                  { base: 'Sprostowanie',     desc: 'Prawo do żądania poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych (art. 16 RODO).' },
                  { base: 'Usunięcie',        desc: 'Prawo do żądania usunięcia danych („prawo do bycia zapomnianym") w określonych okolicznościach (art. 17 RODO).' },
                  { base: 'Ograniczenie',     desc: 'Prawo do żądania ograniczenia przetwarzania w określonych sytuacjach (art. 18 RODO).' },
                  { base: 'Przenoszenie',     desc: 'Prawo do otrzymania danych w ustrukturyzowanym formacie (art. 20 RODO).' },
                  { base: 'Sprzeciw',         desc: 'Prawo do wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie Administratora (art. 21 RODO).' },
                  { base: 'Cofnięcie zgody',  desc: 'Zgoda może być cofnięta w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.' },
                  { base: 'Skarga do UODO',   desc: 'Prawo wniesienia skargi do organu nadzorczego Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, gdy uznacie Państwo, że przetwarzanie danych osobowych narusza przepisy RODO.' },
                ].map(({ base, desc }) => (
                  <li key={base} className="flex gap-3 text-sm">
                    <span className="shrink-0 font-semibold text-xs px-2 py-0.5 rounded-md h-fit mt-0.5" style={{ backgroundColor: '#f0f9fd', color: '#124f74' }}>
                      {base}
                    </span>
                    <span style={{ color: '#4a5568' }}>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase tracking-wide" style={{ color: '#124f74', borderColor: '#ddf0f9' }}>
                8. Dobrowolność podania danych
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Podanie danych osobowych jest dobrowolne, jednak niezbędne do realizacji rezerwacji
                pobytu oraz spełnienia obowiązków wynikających z przepisów prawa np. ewidencji
                pobytu. Odmowa podania danych może uniemożliwić skorzystanie z usług wynajmu.
              </p>
            </div>

            {/* Informacja dodatkowa — Współadministrator */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}
            >
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#92400e' }}>
                Informacja dodatkowa (RODO) WSPÓŁADMINISTRATOR
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Pobyt w przestrzeni zabudowań obiektów usytuowanych przy ul. Modrzewiowa 25, 27 i 29
                jest monitorowana także przez zewnętrznego Administratora obiektów. Bezpośredni
                kontakt z nim jest wskazany na Tablicach informacyjnych monitoringu zewnętrznego.
              </p>
            </div>

            {/* Życzenie */}
            <p className="text-sm text-center font-semibold" style={{ color: '#124f74' }}>
              Wszystkim naszym Gościom życzymy udanego pobytu!
            </p>

            {/* Stopka */}
            <p className="text-xs pt-4 border-t" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
              Zapoznaj się również z naszym{' '}
              <Link href="/terms" className="underline hover:text-slate-600">Regulaminem wynajmu</Link>
              {' '}oraz{' '}
              <Link href="/meldunek" className="underline hover:text-slate-600">Formularzem zakwaterowania i pobytu</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
