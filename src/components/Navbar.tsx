'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { href: '/',            label: 'O nas'           },
  { href: '/apartments',  label: 'Apartamenty'     },
  { href: '/price-list',  label: 'Cennik'          },
  { href: '/gift-cards',  label: 'Bon podarunkowy' },
  { href: '/terms',       label: 'Regulamin'       },
  { href: '/RODO',        label: 'RODO'            },
  { href: '/contact',     label: 'Kontakt'         },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Zamknij menu po zmianie trasy
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/70 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" aria-label="Strona główna">
            <Logo variant="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Nawigacja główna">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                    active
                      ? 'text-ocean-800 bg-ocean-50'
                      : 'text-slate-600 hover:text-ocean-700 hover:bg-ocean-50',
                  ].join(' ')}
                  style={active ? { color: '#124f74', backgroundColor: '#f0f9fd' } : {}}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: '#2280b8' }}
                    />
                  )}
                </Link>
              )
            })}

            <Link
              href="/contact"
              className="ml-3 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#124f74' }}
            >
              Zarezerwuj
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <nav
          className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t"
          style={{ borderColor: '#ddf0f9', backgroundColor: 'rgba(255,255,255,0.97)' }}
          aria-label="Nawigacja mobilna"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'font-semibold'
                    : 'text-slate-600 hover:bg-slate-50',
                ].join(' ')}
                style={active ? { color: '#124f74', backgroundColor: '#f0f9fd' } : {}}
              >
                {label}
              </Link>
            )
          })}

          <Link
            href="/contact"
            className="mt-2 px-4 py-3 text-sm font-semibold text-white text-center rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#124f74' }}
          >
            Zarezerwuj teraz
          </Link>
        </nav>
      </div>
    </header>
  )
}
