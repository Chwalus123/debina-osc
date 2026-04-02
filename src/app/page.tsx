'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Waves,
  TreePine,
  Star,
  Wind,
  MapPin,
  ArrowRight,
  Quote,
  Sun,
  Shell,
  Bike,
} from 'lucide-react'

/* ─── Dane statyczne ─────────────────────────────────────────── */

const features = [
  {
    icon: Waves,
    title: 'Morze o krok',
    desc: 'Plaża dostępna ścieżką przez las dębowo-grabowy Natura 2000 — ok. 400 m od apartamentów.',
  },
  {
    icon: TreePine,
    title: 'Las Natura 2000',
    desc: 'Bezpośrednie sąsiedztwo chronionych lasów dębowo-grabowych i sosnowych Pobrzeża Słowińskiego.',
  },
  {
    icon: Wind,
    title: 'Klif i panorama',
    desc: 'Malowniczy klif do 30 m n.p.m. — jedno z piękniejszych miejsc polskiego wybrzeża.',
  },
  {
    icon: Sun,
    title: 'Styl i komfort',
    desc: 'Nowoczesne apartamenty w stylu loft, wyposażone w wysokim standardzie z klimatem nadmorskim.',
  },
]

const attractions = [
  {
    icon: Shell,
    title: 'Plaża w Dębinie',
    desc: 'Piaszczysta, szeroka plaża ok. 400 m od apartamentów — ścieżkami przez las dębowo-grabowy Natura 2000. Spokój i dzikość z dala od tłumów.',
    img: '/img/DSC02495.JPG',
  },
  {
    icon: Waves,
    title: 'Klif w Dębinie',
    desc: 'Malowniczy klif do 30 m n.p.m., część pasma łączącego Dębinę z Poddąbiem i Rowami. Z jego szczytu widać podwodne głazy zwane Kamieniskim.',
    img: '/img/DSC02480.JPG',
  },
  {
    icon: Bike,
    title: 'Szlaki i atrakcje',
    desc: 'Trasy piesze i rowerowe przez Słowiński Park Narodowy, zatopiony las koło Czołpina, wrak torpedowca w Poddąbiu oraz szlak „Zwiniętych Torów" z Ustki do Rowów.',
    img: '/img/1000002723.png',
  },
]

const reviews = [
  {
    name: 'Anna K.',
    location: 'Warszawa',
    stars: 5,
    text: 'Idealne miejsce na reset. Cisza, szum lasu, morze za płotem — wróciłam wypoczęta jak po tygodniu spa. Właściciel niezwykle pomocny i serdeczny.',
  },
  {
    name: 'Tomasz i Marta N.',
    location: 'Kraków',
    stars: 5,
    text: 'Wracamy tu co rok od 4 lat. Apartament zadbany, czysto, wszystkiego pod dostatkiem. Okolica bajkowa o każdej porze roku.',
  },
  {
    name: 'Ewa Z.',
    location: 'Poznań',
    stars: 5,
    text: 'Wreszcie spokojne wakacje! Dzieci mogły biegać po lesie, my siedzieliśmy z kawą na tarasie i słuchaliśmy ptaków. Polecam całym sercem.',
  },
]

/* ─── Subkomponenty ──────────────────────────────────────────── */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#f59e0b" stroke="none" />
      ))}
    </div>
  )
}

/* ─── Helper animacji ────────────────────────────────────────── */

/* ─── Strona Główna ──────────────────────────────────────────── */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        {/* Parallax image */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <Image
            src="/img/1000002722.jpg"
            alt="Leśna ścieżka ku Morzu Bałtyckiemu w Dębinie"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,31,46,0.35) 0%, rgba(10,31,46,0.15) 40%, rgba(10,31,46,0.55) 80%, rgba(10,31,46,0.85) 100%)',
            }}
          />
        </motion.div>

        {/* Treść Hero */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 py-24 md:py-32 min-h-[100svh]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: 'easeOut' as const }}
            className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#b3ddf0' }}
          >
            <a
              href="https://maps.google.com/?q=ul.+Modrzewiowa+29,+76-211+Dębina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: 'inherit' }}
            >
              <MapPin size={12} />
              Dębina · Wybrzeże Bałtyku
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' as const }}
            className="mt-4 mb-6 max-w-3xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Baza dla twojego odpoczynku
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' as const }}
            className="mb-10 max-w-lg text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            Dwa komfortowe apartamenty w stylu loft w pierwszej linii brzegowej Dębiny —
            między Rowami a Ustką, ok.&nbsp;400&nbsp;m od plaży Morza&nbsp;Bałtyckiego.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#2280b8', color: '#fff' }}
            >
              Zarezerwuj termin
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/apartments"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:bg-white/20"
              style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}
            >
              Zobacz apartamenty
            </Link>
          </motion.div>
        </div>

        {/* Scrolldown hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <span className="text-[10px] tracking-widest uppercase">Przewiń</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 rounded-full"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES STRIP
      ══════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0f9fd' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#ddf0f9' }}
                >
                  <Icon size={22} style={{ color: '#124f74' }} />
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#0d2f45' }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          O NAS
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Zdjęcie */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="relative"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ borderRadius: '1.5rem', aspectRatio: '4/5' }}
              >
                <Image
                  src="/img/DSC02445.JPG"
                  alt="Ścieżka przez las ku morzu w Dębinie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* dekoracyjny element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl -z-10"
                style={{ backgroundColor: '#ddf0f9' }}
              />
            </motion.div>

            {/* Tekst */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' as const }}
              className="flex flex-col gap-6"
            >
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#3a8067' }}
                >
                  O nas
                </span>
                <h2
                  className="mt-2 text-3xl md:text-4xl leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    color: '#0d2f45',
                  }}
                >
                  Twój azyl na Wybrzeżu Bałtyckim
                </h2>
              </div>

              <p className="text-base leading-relaxed" style={{ color: '#4a5568' }}>
                Dębina to mała, spokojna nadmorska miejscowość w województwie pomorskim,
                położona między Rowami a Ustką na Wybrzeżu Słowińskim. Słynie z wspaniałego
                klifu, piaszczystej plaży oraz bezpośredniego sąsiedztwa lasów Natura 2000.
                Idealne miejsce dla tych, którzy szukają odpoczynku, ciszy lub ucieczki od
                codzienności.
              </p>

              <p className="text-base leading-relaxed" style={{ color: '#4a5568' }}>
                Nasze apartamenty mieszczą się w budynku z windą, usytuowanym w pierwszej
                linii brzegowej. Każdy dzień możesz zacząć od porannej kawy na tarasie,
                wdychając zapach morskiej bryzy i lasu. Lokale urządzone są w nowoczesnym
                stylu loft, z wysokim standardem wyposażenia i nadmorskim klimatem.
              </p>

              <a
                href="https://maps.google.com/?q=ul.+Modrzewiowa+29,+76-211+Dębina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl transition-colors hover:opacity-90"
                style={{ backgroundColor: '#f0f9fd', border: '1px solid #b3ddf0' }}
              >
                <MapPin size={20} style={{ color: '#2280b8', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0d2f45' }}>
                    Dębina, gmina Ustka
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                    Wybrzeże Słowińskie · Województwo Pomorskie · ok. 400 m spacerem do plaży
                  </p>
                </div>
              </a>

              <Link
                href="/apartments"
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#124f74', color: '#fff' }}
              >
                Nasze apartamenty
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DĘBINA I OKOLICA
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: '#faf8f4' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center mb-14"
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#3a8067' }}
            >
              Atrakcje
            </span>
            <h2
              className="mt-2 text-3xl md:text-4xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: '#0d2f45',
              }}
            >
              Dębina i jej skarby
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: '#64748b' }}>
              Maleńka wieś ukryta między lasem a morzem. Tu czas płynie wolniej,
              a każdy spacer to odkrycie.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {attractions.map(({ icon: Icon, title, desc, img }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Zdjęcie */}
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,31,46,0.4) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    className="absolute bottom-3 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}
                  >
                    <Icon size={18} color="#ffffff" />
                  </div>
                </div>
                {/* Tekst */}
                <div className="p-6 flex flex-col gap-2 flex-grow">
                  <h3 className="font-semibold text-base" style={{ color: '#0d2f45' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OPINIE GOŚCI
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center mb-14"
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#3a8067' }}
            >
              Opinie
            </span>
            <h2
              className="mt-2 text-3xl md:text-4xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: '#0d2f45',
              }}
            >
              Co mówią nasi goście
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(({ name, location, stars, text }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const }}
                className="flex flex-col gap-4 p-7 rounded-3xl"
                style={{ backgroundColor: '#f0f9fd', border: '1px solid #ddf0f9' }}
              >
                <Quote size={28} style={{ color: '#b3ddf0' }} />
                <p className="text-sm leading-relaxed flex-grow" style={{ color: '#334155' }}>
                  {text}
                </p>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#ddf0f9' }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0d2f45' }}>
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>
                      {location}
                    </p>
                  </div>
                  <StarRating count={stars} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Tło gradientowe */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #0a1f2e 0%, #124f74 50%, #1a6494 100%)',
          }}
        />
        {/* Dekoracyjne kółka */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 -z-10"
          style={{ background: 'radial-gradient(circle, #4aa3d4, transparent)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-10 -z-10"
          style={{ background: 'radial-gradient(circle, #3a8067, transparent)' }}
        />

        <div className="container mx-auto max-w-2xl text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            <h2
              className="text-3xl md:text-5xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Zaplanuj swój wypoczynek
            </h2>
            <p
              className="text-base md:text-lg mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Sprawdź dostępne terminy i napisz do nas. Odpowiemy szybko i pomożemy
              wybrać najlepszy apartament dla Ciebie i Twoich bliskich.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#ffffff', color: '#124f74' }}
              >
                Zapytaj o termin
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/apartments"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: '#ffffff',
                }}
              >
                Galeria apartamentów
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
