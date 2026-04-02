'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Utensils,
  Bath,
  Wifi,
  Car,
  Trees,
  Waves,
  Users,
  BedDouble,
  CheckCircle2,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Bike,
  Shell,
} from 'lucide-react'

/* ─── Typy ───────────────────────────────────────────────────── */

interface GalleryImage {
  src: string
  alt: string
}

/* ─── Dane apartamentów ──────────────────────────────────────── */

const apt1 = {
  name: 'Apartament 44 A',
  tagline: 'ul. Modrzewiowa 29/44A',
  desc: 'Nowoczesny apartament w stylu loft na pierwszej linii brzegowej. Salon z rozkładaną sofą i w pełni wyposażonym aneksem kuchennym, oddzielna sypialnia oraz balkon — idealne miejsce na wypoczynek dla par i rodzin z dzieckiem. Każdy poranek możesz zacząć od kawy na balkonie, wdychając zapach morskiej bryzy.',
  guests: '2–4 osoby',
  bedrooms: '1 sypialnia',
  features: [
    'Salon z rozkładaną sofą i aneksem kuchennym',
    'Oddzielna sypialnia',
    'Łazienka z prysznicem',
    'Balkon z miejscem do odpoczynku',
    'Aneks kuchenny: lodówka, zmywarka, mikrofala, dwupalnikowa kuchenka indukcyjna, ekspres do kawy, toster, czajnik bezprzewodowy',
    'Klimatyzacja',
    'Bezpłatne Wi-Fi, 2 telewizory',
    'Leżaki, parawan, deska do prasowania, żelazko, suszarka do włosów, pościel',
    'Bezpłatne miejsce parkingowe poza obiektem',
    'Apartament dla niepalących · pobyt z pupilami mile widziany',
  ],
  icons: [
    { icon: Users,    label: '2–4 osoby'    },
    { icon: BedDouble, label: '1 sypialnia' },
    { icon: Utensils, label: 'Kuchnia'      },
    { icon: Bath,     label: 'Prysznic'     },
    { icon: Wifi,     label: 'Wi-Fi'        },
    { icon: Car,      label: 'Parking'      },
  ],
  gallery: [
    { src: '/img/44a-salon-1.jpg',      alt: 'Salon z aneksem kuchennym'       },
    { src: '/img/44a-salon-2.jpg',      alt: 'Salon — widok na jadalnię'       },
    { src: '/img/44a-salon-3.jpg',      alt: 'Salon — strefa wypoczynku'       },
    { src: '/img/44a-sypialnia-1.jpg',  alt: 'Sypialnia'                       },
    { src: '/img/44a-sypialnia-2.jpg',  alt: 'Sypialnia — widok 2'             },
    { src: '/img/44a-sypialnia-3.jpg',  alt: 'Sypialnia — widok 3'             },
    { src: '/img/44a-sypialnia-4.jpg',  alt: 'Sypialnia — widok 4'             },
    { src: '/img/44a-lazienka-1.jpg',   alt: 'Łazienka z prysznicem'           },
    { src: '/img/44a-lazienka-2.jpg',   alt: 'Łazienka — detal'               },
  ] as GalleryImage[],
}

const apt2 = {
  name: 'Apartament 44B',
  tagline: 'ul. Modrzewiowa 29/44/B',
  desc: 'Nowoczesny apartament loft z wyjątkowym atutem — prywatnym tarasem na dachu budynku z panoramicznym widokiem na okolicę. Salon z rozkładaną sofą, oddzielna sypialnia, balkon oraz pełne wyposażenie kuchni z pralką. Dla tych, którzy cenią komfort i chcą odpocząć na własnych warunkach.',
  guests: '2–4 osoby',
  bedrooms: '1 sypialnia',
  features: [
    'Salon z rozkładaną sofą i aneksem kuchennym',
    'Oddzielna sypialnia',
    'Łazienka z prysznicem',
    'Balkon',
    'Taras na dachu budynku z panoramą okolicy',
    'Aneks kuchenny: pralka, lodówka, zmywarka, mikrofala, dwupalnikowa kuchenka indukcyjna, ekspres do kawy, toster, czajnik bezprzewodowy',
    'Klimatyzacja',
    'Bezpłatne Wi-Fi, 2 telewizory',
    'Leżaki, parawan, deska do prasowania, żelazko, suszarka do włosów, pościel',
    'Bezpłatne miejsce parkingowe poza obiektem',
    'Apartament dla niepalących · pobyt z pupilami mile widziany',
  ],
  icons: [
    { icon: Users,    label: '2–4 osoby'   },
    { icon: BedDouble, label: '1 sypialnia' },
    { icon: Utensils, label: 'Kuchnia'      },
    { icon: Bath,     label: 'Prysznic'     },
    { icon: Wifi,     label: 'Wi-Fi'        },
    { icon: Car,      label: 'Parking'      },
  ],
  gallery: [
    { src: '/img/44b-salon-1.jpg',      alt: 'Salon z aneksem kuchennym'       },
    { src: '/img/44b-salon-2.jpg',      alt: 'Salon — widok na jadalnię'       },
    { src: '/img/44b-salon-3.jpg',      alt: 'Salon — strefa wypoczynku'       },
    { src: '/img/44b-sypialnia-2.jpg',  alt: 'Sypialnia'                       },
    { src: '/img/44b-sypialnia-3.jpg',  alt: 'Sypialnia — widok 2'             },
    { src: '/img/44b-sypialnia-4.jpg',  alt: 'Sypialnia — widok 3'             },
    { src: '/img/44b-sypialnia-5.jpg',  alt: 'Sypialnia — widok 4'             },
    { src: '/img/44b-lazienka-1.jpg',   alt: 'Łazienka z prysznicem'           },
    { src: '/img/44b-lazienka-2.jpg',   alt: 'Łazienka — widok 2'             },
    { src: '/img/44b-lazienka-3.jpg',   alt: 'Łazienka — widok 3'             },
    { src: '/img/44b-lazienka-4.jpg',   alt: 'Łazienka — detal'               },
  ] as GalleryImage[],
}

const debinaGallery: GalleryImage[] = [
  { src: '/img/1000002722.jpg',  alt: 'Leśna ścieżka do morza wiosną'   },
  { src: '/img/DSC02495.JPG',    alt: 'Plaża z klifem w Dębinie'        },
  { src: '/img/DSC02500.JPG',    alt: 'Wybrzeże Bałtyku'                },
  { src: '/img/DSC02480.JPG',    alt: 'Fale Morza Bałtyckiego'         },
  { src: '/img/1000002723.png',  alt: 'Las bukowy w Dębinie'            },
  { src: '/img/DSC02445.JPG',    alt: 'Wieczorna ścieżka nad morzem'    },
]

const debinaAttractions = [
  { icon: Shell, label: 'Plaża',          desc: 'ok. 400 m ścieżką przez las'      },
  { icon: Waves, label: 'Klif do 30 m',  desc: 'Wybrzeże Słowińskie'              },
  { icon: Trees, label: 'Las Natura 2000', desc: 'Bezpośrednio przy ośrodku'      },
  { icon: Bike,  label: 'Szlaki',         desc: 'Piesze, rowerowe, paralotniarstwo' },
]

/* ─── Karuzela apartamentu ──────────────────────────────────── */

function ApartmentCarousel({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <>
      {/* Główne zdjęcie */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: '1.5rem', aspectRatio: '4/3' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setLightboxIdx(current)}
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradienty dla czytelności UI */}
            <div
              className="absolute inset-x-0 top-0 h-14 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.38), transparent)' }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38), transparent)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Licznik */}
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium text-white select-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)' }}
        >
          {current + 1} / {images.length}
        </div>

        {/* Podpowiedź */}
        <div
          className="absolute bottom-3 left-3 z-10 text-xs font-medium select-none"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          {images[current].alt}
        </div>

        {/* Przycisk "powiększ" */}
        <div
          className="absolute bottom-3 right-3 z-10 text-xs select-none"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          kliknij, aby powiększyć
        </div>

        {/* Strzałka lewo */}
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
          style={{ backgroundColor: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(4px)' }}
          aria-label="Poprzednie zdjęcie"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Strzałka prawo */}
        <button
          onClick={e => { e.stopPropagation(); next() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
          style={{ backgroundColor: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(4px)' }}
          aria-label="Następne zdjęcie"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pasek miniatur */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={img.alt}
            className="relative flex-shrink-0 overflow-hidden transition-all duration-200 focus:outline-none"
            style={{
              width: '72px',
              height: '54px',
              borderRadius: '0.625rem',
              outline: i === current ? '2.5px solid #2280b8' : '2.5px solid transparent',
              outlineOffset: '1px',
              opacity: i === current ? 1 : 0.55,
              transform: i === current ? 'scale(1.04)' : 'scale(1)',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  )
}

/* ─── Lightbox ───────────────────────────────────────────────── */

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: GalleryImage[]
  startIndex: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(startIndex)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,31,46,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Zamknij */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
        aria-label="Zamknij"
      >
        <X size={24} />
      </button>

      {/* Strzałka lewo */}
      <button
        onClick={e => { e.stopPropagation(); prev() }}
        className="absolute left-4 p-3 rounded-full text-white hover:bg-white/10 transition-colors"
        aria-label="Poprzednie"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Zdjęcie */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
        className="relative max-w-4xl w-full"
        style={{ maxHeight: '80vh', aspectRatio: '16/10' }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={images[idx].src}
          alt={images[idx].alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </motion.div>

      {/* Strzałka prawo */}
      <button
        onClick={e => { e.stopPropagation(); next() }}
        className="absolute right-4 p-3 rounded-full text-white hover:bg-white/10 transition-colors"
        aria-label="Następne"
      >
        <ChevronRight size={28} />
      </button>

      {/* Licznik */}
      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {idx + 1} / {images.length}
      </p>
    </motion.div>
  )
}

/* ─── Galeria miniatur ───────────────────────────────────────── */

function Gallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const }}
            onClick={() => setLightboxIdx(i)}
            className="group relative overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{ borderRadius: '1rem', aspectRatio: '4/3' }}
            aria-label={`Otwórz zdjęcie: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(10,31,46,0.6), transparent)' }}
            >
              <span className="text-xs text-white font-medium">{img.alt}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  )
}

/* ─── Karta apartamentu ──────────────────────────────────────── */

function ApartmentCard({
  apt,
  reversed = false,
}: {
  apt: typeof apt1
  reversed?: boolean
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#3a8067' }}
          >
            {apt.tagline}
          </span>
          <h2
            className="mt-1 text-3xl md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: '#0d2f45',
            }}
          >
            {apt.name}
          </h2>
        </motion.div>

        {/* Opis + ikony */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reversed ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className={reversed ? 'lg:order-2' : ''}
          >
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4a5568' }}>
              {apt.desc}
            </p>

            {/* Ikony cech */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {apt.icons.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center"
                  style={{ backgroundColor: '#f0f9fd' }}
                >
                  <Icon size={20} style={{ color: '#124f74' }} />
                  <span className="text-xs font-medium" style={{ color: '#0d2f45' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Lista wyposażenia */}
            <ul className="space-y-2">
              {apt.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#4a5568' }}>
                  <CheckCircle2
                    size={16}
                    style={{ color: '#3a8067', flexShrink: 0, marginTop: '2px' }}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: '#124f74', color: '#fff' }}
            >
              Zapytaj o dostępność
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Karuzela zdjęć */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className={reversed ? 'lg:order-1' : ''}
          >
            <ApartmentCarousel images={apt.gallery} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Strona Apartamentów ────────────────────────────────────── */

export default function ApartmentsPage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — PAGE HEADER
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-4 text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/1000002722.jpg"
            alt="Dębina"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,31,46,0.6) 0%, rgba(10,31,46,0.45) 60%, rgba(10,31,46,0.75) 100%)',
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#7cc2e4' }}
          >
            Apartamenty na wynajem 
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Nasze Apartamenty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' as const }}
            className="mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Dwa nowoczesne apartamenty loft w pierwszej linii brzegowej Dębiny —
            każdy z własną kuchnią, łazienką, balkonem i klimatyzacją.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DĘBINA — GALERIA I ATRAKCJE
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f0f9fd' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center mb-10"
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#3a8067' }}
            >
              Okolica
            </span>
            <h2
              className="mt-2 text-3xl md:text-4xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: '#0d2f45',
              }}
            >
              Dębina i atrakcje
            </h2>
            <p className="mt-3 max-w-lg mx-auto text-sm md:text-base" style={{ color: '#64748b' }}>
              Maleńka wieś na Wybrzeżu Słowińskim między Rowami a Ustką — wysoki klif,
              piaszczysta plaża, lasy Natura 2000. Obiekt posiada miejsce na rowery,
              plac zabaw dla najmłodszych i bezpośrednie wyjście na ścieżkę ku klifowi i plaży.
            </p>
          </motion.div>

          {/* Ikony atrakcji */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {debinaAttractions.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const }}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white text-center shadow-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#ddf0f9' }}
                >
                  <Icon size={20} style={{ color: '#124f74' }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: '#0d2f45' }}>{label}</p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Galeria Dębiny */}
          <Gallery images={debinaGallery} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APARTAMENT 1
      ══════════════════════════════════════════ */}
      <ApartmentCard apt={apt1} />

      {/* Separator */}
      <div className="mx-auto max-w-6xl px-4">
        <hr style={{ borderColor: '#e2e8f0' }} />
      </div>

      {/* ══════════════════════════════════════════
          APARTAMENT 2
      ══════════════════════════════════════════ */}
      <ApartmentCard apt={apt2} reversed />

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: '#0a1f2e' }}
      >
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
              Gotowy na wypoczynek?
            </h2>
            <p className="mb-8 text-base" style={{ color: '#7cc2e4' }}>
              Sprawdź wolne terminy i zarezerwuj swój apartament.
              Odpowiemy w ciągu kilku godzin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#2280b8', color: '#fff' }}
              >
                Zapytaj o termin
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/price-list"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: '#b3ddf0' }}
              >
                Zobacz cennik
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
