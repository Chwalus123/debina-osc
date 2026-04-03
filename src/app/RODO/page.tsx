'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const sections = [
  {
    title: '1. Administrator danych osobowych',
    content:
      'Administratorem Państwa danych osobowych jest Placówka Szkoleniowa „FILAR" R. Szarłowski, prowadząca Bazę dla Odpoczynku. Kontakt z Administratorem możliwy jest pod adresem e‑mail: odpocznijspokojnie@gmail.com lub telefonicznie: +48 123 456 789.',
  },
  {
    title: '2. Cele i podstawy prawne przetwarzania',
    items: [
      { base: 'Art. 6 ust. 1 lit. b RODO', desc: 'Przetwarzanie niezbędne do wykonania umowy (realizacja rezerwacji, rozliczenia pobytu).' },
      { base: 'Art. 6 ust. 1 lit. a RODO', desc: 'Zgoda osoby — w celach marketingowych lub informacyjnych (np. powiadamianie o ofercie).' },
      { base: 'Art. 6 ust. 1 lit. c RODO', desc: 'Obowiązek prawny — prowadzenie ewidencji gości zgodnie z wymogami prawa (Ustawa o ewidencji ludności).' },
      { base: 'Art. 6 ust. 1 lit. f RODO', desc: 'Prawnie uzasadniony interes Administratora — bezpieczeństwo mienia i dochodzenie roszczeń.' },
    ],
  },
  {
    title: '3. Zakres przetwarzanych danych',
    content:
      'Przetwarzamy dane niezbędne do realizacji usług: imię i nazwisko, adres e‑mail, numer telefonu, adres zamieszkania (na potrzeby karty meldunkowej), numer dokumentu tożsamości (wymagany prawnie przy meldunku) oraz dane dotyczące rezerwacji (daty, liczba osób).',
  },
  {
    title: '4. Okres przechowywania danych',
    content:
      'Dane przetwarzane w celu realizacji umowy przechowywane są przez 5 lat od zakończenia pobytu (wymogi podatkowe i rachunkowe). Dane przetwarzane na podstawie zgody — do czasu jej cofnięcia. Ewidencja meldunkowa — zgodnie z przepisami prawa (minimum 5 lat).',
  },
  {
    title: '5. Odbiorcy danych',
    content:
      'Państwa dane mogą być przekazywane: dostawcom usług IT (hosting, poczta elektroniczna), platformom rezerwacyjnym (Booking.com) w zakresie wynikającym z korzystania z tych usług, oraz organom publicznym — wyłącznie gdy wymagają tego przepisy prawa.',
  },
  {
    title: '6. Prawa osób, których dane dotyczą',
    items: [
      { base: 'Dostęp', desc: 'Prawo do uzyskania informacji o przetwarzanych danych i kopii danych (art. 15 RODO).' },
      { base: 'Sprostowanie', desc: 'Prawo do żądania poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych (art. 16 RODO).' },
      { base: 'Usunięcie', desc: 'Prawo do żądania usunięcia danych („prawo do bycia zapomnianym") w określonych okolicznościach (art. 17 RODO).' },
      { base: 'Ograniczenie', desc: 'Prawo do żądania ograniczenia przetwarzania w określonych sytuacjach (art. 18 RODO).' },
      { base: 'Przenoszenie', desc: 'Prawo do otrzymania danych w ustrukturyzowanym formacie (art. 20 RODO).' },
      { base: 'Sprzeciw', desc: 'Prawo do wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie Administratora (art. 21 RODO).' },
      { base: 'Cofnięcie zgody', desc: 'Zgoda może być cofnięta w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.' },
    ],
  },
  {
    title: '7. Prawo do skargi',
    content:
      'Przysługuje Państwu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00‑193 Warszawa, gdy uznacie Państwo, że przetwarzanie danych osobowych narusza przepisy RODO.',
  },
  {
    title: '8. Dobrowolność podania danych',
    content:
      'Podanie danych osobowych jest dobrowolne, jednak niezbędne do realizacji rezerwacji oraz spełnienia obowiązków wynikających z przepisów prawa (ewidencja meldunkowa). Odmowa podania danych może uniemożliwić skorzystanie z usług Ośrodka.',
  },
]

export default function RodoPage() {
  return (
    <>
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
            Ochrona Danych Osobowych (RODO)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: '#64748b' }}
          >
            Informacja sporządzona zgodnie z art.&nbsp;13 Rozporządzenia Parlamentu
            Europejskiego i Rady (UE) 2016/679 z dnia 27&nbsp;kwietnia 2016&nbsp;r. (RODO).
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="p-8 md:p-12 rounded-3xl space-y-8"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 16px rgba(10,31,46,0.06)' }}
          >
            {sections.map(({ title, content, items }) => (
              <div key={title}>
                <h2
                  className="text-base font-bold mb-3 pb-2 border-b"
                  style={{ color: '#124f74', borderColor: '#ddf0f9' }}
                >
                  {title}
                </h2>

                {content && (
                  <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                    {content}
                  </p>
                )}

                {items && (
                  <ul className="space-y-2.5">
                    {items.map(({ base, desc }) => (
                      <li key={base} className="flex gap-3 text-sm">
                        <span
                          className="shrink-0 font-semibold text-xs px-2 py-0.5 rounded-md h-fit mt-0.5"
                          style={{ backgroundColor: '#f0f9fd', color: '#124f74' }}
                        >
                          {base}
                        </span>
                        <span style={{ color: '#4a5568' }}>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Kontakt RODO */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#f0f9fd', border: '1px solid #ddf0f9' }}
            >
              <p className="text-sm" style={{ color: '#334155' }}>
                <span className="font-semibold" style={{ color: '#0d2f45' }}>Kontakt w sprawach RODO:&nbsp;</span>
                <a
                  href="mailto:odpocznijspokojnie@gmail.com"
                  className="underline hover:text-slate-600"
                  style={{ color: '#124f74' }}
                >
                  odpocznijspokojnie@gmail.com
                </a>
              </p>
            </div>

            <p className="text-xs pt-2" style={{ color: '#94a3b8' }}>
              Dokument zaktualizowany: marzec 2024 · Wszelkie zmiany będą publikowane na niniejszej stronie.
              Zapoznaj się również z naszym{' '}
              <Link href="/terms" className="underline hover:text-slate-600">Regulaminem</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
