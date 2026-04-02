import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import Navbar from './Navbar'
import Logo from './Logo'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />

      {/* Offset pod sticky header */}
      <div className="h-16 md:h-18 shrink-0" />

      <main className="flex-grow">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#0a1f2e', color: '#b3ddf0' }}>
        {/* Górna część footera */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Kolumna 1 — Brand */}
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-sm leading-relaxed" style={{ color: '#7cc2e4', maxWidth: '22rem' }}>
                Komfortowe apartamenty w malowniczej Dębinie nad Morzem Bałtyckim.
                Cisza, zieleń i morska bryza — idealne miejsce na prawdziwy wypoczynek.
              </p>
            </div>

            {/* Kolumna 2 — Nawigacja */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#4aa3d4' }}
              >
                Nawigacja
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  { href: '/',           label: 'O nas'           },
                  { href: '/apartments', label: 'Apartamenty'     },
                  { href: '/price-list', label: 'Cennik'          },
                  { href: '/gift-cards', label: 'Bon podarunkowy' },
                  { href: '/contact',    label: 'Kontakt'         },
                  { href: '/terms',      label: 'Regulamin'       },
                  { href: '/RODO',       label: 'RODO'            },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-white"
                      style={{ color: '#7cc2e4' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolumna 3 — Kontakt */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#4aa3d4' }}
              >
                Kontakt
              </h3>
              <ul className="space-y-3 text-sm" style={{ color: '#7cc2e4' }}>
                <li className="flex items-center gap-2">
                  <Mail size={15} style={{ color: '#4aa3d4', flexShrink: 0 }} />
                  <a
                    href="mailto:odpocznijspokojnie@gmail.com"
                    className="hover:text-white transition-colors break-all"
                  >
                    odpocznijspokojnie@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={15} style={{ color: '#4aa3d4', flexShrink: 0 }} />
                  <a href="tel:+48501601881" className="hover:text-white transition-colors">
                    501 601 881
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <a
                    href="https://maps.google.com/?q=ul.+Modrzewiowa+29,+76-211+Dębina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:opacity-75 transition-opacity"
                    style={{ color: 'inherit' }}
                  >
                    <MapPin size={15} style={{ color: '#4aa3d4', flexShrink: 0, marginTop: '2px' }} />
                    <span>ul. Modrzewiowa 29, 76-211 Dębina<br />nad Morzem Bałtyckim</span>
                  </a>
                </li>
                {/* TODO: odkomentować po dodaniu profilu na Booking.com
                <li className="pt-1">
                  <a
                    href="https://www.booking.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors hover:text-white"
                    style={{ border: '1px solid #2280b8', color: '#4aa3d4' }}
                  >
                    Booking.com
                    <ExternalLink size={12} />
                  </a>
                </li>
                */}
              </ul>
            </div>
          </div>
        </div>

        {/* Pasek RODO */}
        <div style={{ borderTop: '1px solid #0f3d5a' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <p
              className="text-xs leading-relaxed text-center"
              style={{ color: '#4aa3d4', maxWidth: '860px', margin: '0 auto' }}
            >
              Zgodnie z art.&nbsp;13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
              dnia 27&nbsp;kwietnia 2016&nbsp;r. w&nbsp;sprawie ochrony osób fizycznych w&nbsp;związku z&nbsp;przetwarzaniem
              danych osobowych i&nbsp;w&nbsp;sprawie swobodnego przepływu takich danych oraz uchylenia
              dyrektywy 95/46/WE (RODO), informujemy, że Administratorem Państwa danych jest Placówka
              Szkoleniowa &ldquo;FILAR&rdquo; R.&nbsp;Szarłowski. Wszelkie informacje w&nbsp;zakresie prowadzenia przez
              Nas Polityki Bezpieczeństwa danych osobowych możecie Państwo uzyskać w&nbsp;zakładce{' '}
              <Link href="/RODO" className="underline hover:text-white transition-colors">
                RODO
              </Link>
              .
            </p>
            <p className="text-center text-xs mt-3" style={{ color: '#2280b8' }}>
              © {new Date().getFullYear()} Ośrodek Wypoczynkowy Dębina. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
