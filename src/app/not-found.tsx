import Link from 'next/link'
import { ArrowLeft, Waves } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24"
      style={{ backgroundColor: '#f0f9fd' }}
    >
      {/* Dekoracja */}
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
        style={{ backgroundColor: '#ddf0f9' }}
      >
        <Waves size={40} style={{ color: '#124f74' }} />
      </div>

      {/* Kod błędu */}
      <p
        className="text-8xl font-bold mb-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#ddf0f9',
          lineHeight: 1,
        }}
      >
        404
      </p>

      <h1
        className="text-2xl md:text-3xl mb-4"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          color: '#0d2f45',
        }}
      >
        Ta strona zgubiła się w lesie
      </h1>

      <p className="text-base max-w-sm mb-10" style={{ color: '#64748b', lineHeight: 1.7 }}>
        Strona, której szukasz, nie istnieje lub została przeniesiona.
        Wróć na stronę główną, by kontynuować spacer.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#124f74', color: '#fff' }}
      >
        <ArrowLeft size={16} />
        Wróć na stronę główną
      </Link>
    </div>
  )
}
