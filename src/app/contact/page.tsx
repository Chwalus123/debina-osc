'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  CalendarDays,
  Home,
  Users,
  Clock,
} from 'lucide-react'

/* ─── Typy ───────────────────────────────────────────────────────── */

type AptId = '1' | '2'
type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'conflict'

interface BookingSlot {
  start: string
  end: string
  status: 'pending' | 'confirmed'
}

interface FormData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
}

/* ─── Subkomponent: selektor apartamentu ─────────────────────────── */

function ApartmentSelector({
  selected,
  onChange,
}: {
  selected: AptId
  onChange: (id: AptId) => void
}) {
  const opts: { id: AptId; name: string; desc: string }[] = [
    { id: '1', name: 'Apartament A', desc: '2–4 osób · 1 sypialnie' },
    { id: '2', name: 'Apartament B', desc: '2–4 osoby · 1 sypialnia' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {opts.map(({ id, name, desc }) => {
        const active = selected === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-150 border-2"
            style={{
              borderColor: active ? '#124f74' : '#e2e8f0',
              backgroundColor: active ? '#f0f9fd' : '#ffffff',
            }}
          >
            <Home size={18} style={{ color: active ? '#124f74' : '#94a3b8', marginBottom: '6px' }} />
            <span className="font-semibold text-sm" style={{ color: active ? '#0d2f45' : '#334155' }}>
              {name}
            </span>
            <span className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
              {desc}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Subkomponent: kalendarz z kolorowaniem ─────────────────────── */

function BookingCalendar({
  apartmentId,
  selectedRange,
  onRangeChange,
}: {
  apartmentId: AptId
  selectedRange: [Date, Date] | null
  onRangeChange: (range: [Date, Date] | null) => void
}) {
  const [slots, setSlots] = useState<BookingSlot[]>([])
  const [loadingCal, setLoadingCal] = useState(false)

  const loadSlots = useCallback(async (aptId: AptId) => {
    setLoadingCal(true)
    try {
      const res = await fetch(`/api/booking/slots?apt=${aptId}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSlots(data.slots ?? [])
    } catch {
      setSlots([])
    } finally {
      setLoadingCal(false)
    }
  }, [])

  useEffect(() => {
    loadSlots(apartmentId)
  }, [apartmentId, loadSlots])

  const getSlotForDate = (date: Date): BookingSlot | null => {
    const ts = date.getTime()
    return slots.find(({ start, end }) => {
      const s = new Date(start).getTime()
      const e = new Date(end).getTime()
      return ts >= s && ts < e
    }) ?? null
  }

  const isDateBlocked = (date: Date): boolean => {
    return getSlotForDate(date) !== null
  }

  const tileClassName = ({ date, view }: { date: Date; view: string }): string => {
    if (view !== 'month') return ''
    const slot = getSlotForDate(date)
    if (!slot) return ''
    return slot.status === 'confirmed' ? 'cal-confirmed' : 'cal-pending'
  }

  const handleChange = (value: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
      onRangeChange([value[0], value[1]])
    } else {
      onRangeChange(null)
    }
  }

  return (
    <div className="relative">
      <style>{`
        .react-calendar__tile.cal-pending { background: #fef3c7 !important; }
        .react-calendar__tile.cal-confirmed { background: #fee2e2 !important; }
        .react-calendar__tile.cal-pending:hover,
        .react-calendar__tile.cal-pending:focus { background: #fde68a !important; }
        .react-calendar__tile.cal-confirmed:hover,
        .react-calendar__tile.cal-confirmed:focus { background: #fca5a5 !important; }
      `}</style>
      {loadingCal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70">
          <Loader2 size={24} className="animate-spin" style={{ color: '#124f74' }} />
        </div>
      )}
      <Calendar
        onChange={(value) => handleChange(value as Date | [Date | null, Date | null] | null)}
        value={selectedRange ?? undefined}
        selectRange
        minDate={new Date()}
        tileDisabled={({ date }) => isDateBlocked(date)}
        tileClassName={tileClassName}
        className="w-full"
      />
      {slots.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748b' }}>
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a' }} />
            Oczekująca
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748b' }}>
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5' }} />
            Potwierdzona
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Subkomponent: formularz listy oczekujących ─────────────────── */

function WaitlistForm({
  aptId,
  startDate,
  endDate,
  onClose,
}: {
  aptId: AptId
  startDate: string
  endDate: string
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/booking/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aptId, email, startDate, endDate }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Błąd zapisu.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Problem z połączeniem.')
      setStatus('error')
    }
  }

  return (
    <div
      className="p-5 rounded-2xl mt-4"
      style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} style={{ color: '#92400e' }} />
        <h3 className="font-semibold text-sm" style={{ color: '#92400e' }}>
          Termin zajęty — zapisz się na listę oczekujących
        </h3>
      </div>

      {status === 'success' ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: '#3a8067' }}>
          <CheckCircle size={15} />
          Zostałeś/aś dodany/a do listy. Powiadomimy Cię, gdy termin się zwolni.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Twój email"
            className="flex-1 px-3 py-2 text-sm rounded-xl border outline-none"
            style={{ borderColor: '#fcd34d', color: '#0d2f45' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#92400e', color: '#fff' }}
          >
            {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 'Zapisz'}
          </button>
        </form>
      )}

      {errorMsg && (
        <p className="mt-2 text-xs" style={{ color: '#b91c1c' }}>
          {errorMsg}
        </p>
      )}

      <button
        onClick={onClose}
        className="mt-3 text-xs underline"
        style={{ color: '#64748b' }}
      >
        Wybierz inny termin
      </button>
    </div>
  )
}

/* ─── Strona Kontakt ─────────────────────────────────────────────── */

export default function ContactPage() {
  const [apartment, setApartment] = useState<AptId>('1')
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', guests: '', message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })

  const nightsCount = dateRange
    ? Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / 86_400_000)
    : 0

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setShowWaitlist(false)

    if (!dateRange) {
      setErrorMsg('Proszę wybrać termin pobytu w kalendarzu.')
      setStatus('error')
      return
    }

    try {
      const payload = {
        aptId: apartment,
        guestName: formData.name,
        guestEmail: formData.email,
        guestPhone: formData.phone,
        guests: formData.guests,
        message: formData.message,
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
      }

      const res = await fetch('/api/booking/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.status === 409) {
        setErrorMsg(data.error ?? 'Wybrany termin jest już zajęty.')
        setStatus('conflict')
        setShowWaitlist(true)
        return
      }

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Wystąpił błąd. Spróbuj ponownie.')
        setStatus('error')
        return
      }

      setReservationId(data.reservationId)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', guests: '', message: '' })
      setDateRange(null)
    } catch {
      setErrorMsg('Problem z połączeniem. Sprawdź internet lub napisz bezpośrednio na email.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Nagłówek strony ── */}
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
            Kontakt - Rezerwacje
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="mt-3 text-base"
            style={{ color: '#64748b' }}
          >
            Wybierz termin w kalendarzu i wyślij prośbę o rezerwację — odpiszemy w jak najkrótszym czasie.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ══ LEWA KOLUMNA — dane kontaktowe ══ */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Dane */}
              <div
                className="p-7 rounded-3xl"
                style={{ backgroundColor: '#f0f9fd', border: '1px solid #ddf0f9' }}
              >
                <h2 className="font-semibold text-lg mb-5" style={{ color: '#0d2f45' }}>
                  Dane kontaktowe
                </h2>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3" style={{ color: '#4a5568' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#ddf0f9' }}>
                      <Mail size={16} style={{ color: '#124f74' }} />
                    </div>
                    <a href="mailto:odpocznijspokojnie@gmail.com"
                       className="hover:underline break-all"
                       style={{ color: '#124f74' }}>
                      odpocznijspokojnie@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3" style={{ color: '#4a5568' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#ddf0f9' }}>
                      <Phone size={16} style={{ color: '#124f74' }} />
                    </div>
                    <a href="tel:+48501601881" className="hover:underline" style={{ color: '#124f74' }}>
                       501 601 881 |  501 013 931
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <a
                      href="https://maps.google.com/?q=ul.+Modrzewiowa+29,+76-211+Dębina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:opacity-80 transition-opacity"
                      style={{ color: '#4a5568' }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#ddf0f9' }}>
                        <MapPin size={16} style={{ color: '#124f74' }} />
                      </div>
                      <span>Dębina, ul. Modrzewiowa 29/44, 76-211<br />Wybrzeże Słowińskie, woj. Pomorskie</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Karta meldunkowa */}
              <div
                className="p-7 rounded-3xl"
                style={{ backgroundColor: '#f0faf6', border: '1px solid #b3d6cd' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Download size={16} style={{ color: '#2d6651' }} />
                  <h3 className="font-semibold text-sm" style={{ color: '#1a3028' }}>
                    Karta Meldunkowa
                  </h3>
                </div>
                <p className="text-xs mb-4" style={{ color: '#3a5045' }}>
                  Pobierz formularz meldunkowy wymagany przy zameldowaniu.
                </p>
                <a
                  href="/meldunek.pdf"
                  download="karta-meldunek-pobytu.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#2d6651', color: '#fff' }}
                >
                  <Download size={13} />
                  Pobierz PDF
                </a>
              </div>

              {/* Regulamin */}
              <p className="text-xs px-1" style={{ color: '#94a3b8' }}>
                Rezerwując akceptujesz{' '}
                <Link href="/terms" className="underline hover:text-slate-600">Regulamin</Link>
                {' '}i zapoznałeś/aś się z{' '}
                <Link href="/RODO" className="underline hover:text-slate-600">Polityką RODO</Link>.
              </p>
            </motion.div>

            {/* ══ PRAWA KOLUMNA — formularz ══ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
              className="lg:col-span-3"
            >
              <div
                className="p-8 rounded-3xl"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(10,31,46,0.07)' }}
              >
                <h2 className="font-semibold text-lg mb-6" style={{ color: '#0d2f45' }}>
                  Zarezerwuj termin
                </h2>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    /* ── Sukces ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-12 text-center"
                    >
                      <CheckCircle size={52} style={{ color: '#3a8067' }} />
                      <h3 className="text-xl font-semibold" style={{ color: '#0d2f45' }}>
                        Prośba o rezerwację wysłana!
                      </h3>
                      <p className="text-sm max-w-sm" style={{ color: '#64748b' }}>
                        Wysłaliśmy Ci email z instrukcją dotyczącą zadatku. Właściciel potwierdzi rezerwację
                        wkrótce. Sprawdź folder spam.
                      </p>
                      {reservationId && (
                        <p className="text-xs" style={{ color: '#94a3b8' }}>
                          Nr rezerwacji: {reservationId}
                        </p>
                      )}
                      <button
                        onClick={() => { setStatus('idle'); setReservationId(null) }}
                        className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
                        style={{ backgroundColor: '#f0f9fd', color: '#124f74' }}
                      >
                        Wyślij kolejne zapytanie
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Formularz ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Wybór apartamentu */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748b' }}>
                          Apartament
                        </label>
                        <ApartmentSelector selected={apartment} onChange={id => {
                          setApartment(id)
                          setShowWaitlist(false)
                          setStatus('idle')
                        }} />
                      </div>

                      {/* Kalendarz */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748b' }}>
                          <CalendarDays size={13} className="inline mr-1" />
                          Wybierz termin
                        </label>
                        <BookingCalendar
                          apartmentId={apartment}
                          selectedRange={dateRange}
                          onRangeChange={range => {
                            setDateRange(range)
                            setShowWaitlist(false)
                            if (status === 'conflict') setStatus('idle')
                          }}
                        />
                        {dateRange && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                            style={{ backgroundColor: '#daf0ea', color: '#1a3028' }}
                          >
                            <CheckCircle size={15} style={{ color: '#2d6651' }} />
                            {formatDate(dateRange[0])} → {formatDate(dateRange[1])}
                            {nightsCount > 0 && (
                              <span className="ml-auto text-xs" style={{ color: '#3a5045' }}>
                                {nightsCount} {nightsCount === 1 ? 'noc' : nightsCount < 5 ? 'noce' : 'nocy'}
                              </span>
                            )}
                          </motion.div>
                        )}

                        {/* Lista oczekujących po konflikcie */}
                        <AnimatePresence>
                          {showWaitlist && dateRange && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                            >
                              <WaitlistForm
                                aptId={apartment}
                                startDate={dateRange[0].toISOString()}
                                endDate={dateRange[1].toISOString()}
                                onClose={() => { setShowWaitlist(false); setStatus('idle') }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Dane osobowe */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748b' }}>
                            Imię i nazwisko *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}
                            required
                            placeholder="Jan Kowalski"
                            className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-shadow"
                            style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                            onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748b' }}>
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                            required
                            placeholder="jan@example.com"
                            className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-shadow"
                            style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                            onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748b' }}>
                            Telefon
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInput}
                            placeholder="+48 600 000 000"
                            className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                            style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                            onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748b' }}>
                            <Users size={12} className="inline mr-1" />
                            Liczba gości
                          </label>
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleInput}
                            className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none bg-white"
                            style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                          >
                            <option value="">Wybierz</option>
                            {[1, 2, 3, 4, 5, 6].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób'}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Wiadomość */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748b' }}>
                          Wiadomość
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInput}
                          rows={4}
                          placeholder="Dodatkowe pytania, życzenia dotyczące pobytu..."
                          className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none resize-none"
                          style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                          onFocus={e => e.currentTarget.style.borderColor = '#124f74'}
                          onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      {/* Błąd */}
                      {(status === 'error' || status === 'conflict') && !showWaitlist && (
                        <div
                          className="flex items-start gap-2.5 p-4 rounded-xl text-sm"
                          style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}
                        >
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ backgroundColor: '#124f74', color: '#fff' }}
                      >
                        {status === 'loading' ? (
                          <><Loader2 size={17} className="animate-spin" /> Wysyłanie...</>
                        ) : (
                          'Wyślij prośbę o rezerwację'
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
