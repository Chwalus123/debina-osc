'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Loader2, CheckCircle, XCircle, AlertCircle, Clock, Users, Star, MessageSquare } from 'lucide-react'
import type { Reservation, WaitlistEntry } from '@/lib/reservations'
import type { Review } from '@/lib/reviews'

/* ─── Typy ──────────────────────────────────────────────────────────────── */

type AdminView = 'login' | 'dashboard'

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatPrice(n: number): string {
  return n.toLocaleString('pl-PL') + ' zł'
}

/* ─── Status badge ──────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: Reservation['status'] }) {
  if (status === 'pending') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
      >
        <Clock size={11} />
        Oczekująca
      </span>
    )
  }
  if (status === 'confirmed') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: '#124f74', color: '#ffffff' }}
      >
        <CheckCircle size={11} />
        Potwierdzona
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: '#e5e7eb', color: '#6b7280' }}
    >
      <XCircle size={11} />
      Anulowana
    </span>
  )
}

/* ─── Login Form ────────────────────────────────────────────────────────── */

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Błąd logowania.')
      } else {
        onSuccess()
      }
    } catch {
      setError('Problem z połączeniem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#f0f9fd' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="w-full max-w-sm"
      >
        <div
          className="p-8 rounded-3xl"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(10,31,46,0.10)',
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: '#0d2f45' }}
          >
            <span style={{ color: '#fff', fontSize: '20px' }}>D</span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: '#0d2f45' }}>
            Panel admina
          </h1>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>
            Baza dla Odpoczynku
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: '#64748b' }}
              >
                Hasło administratora
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                style={{ borderColor: '#e2e8f0', color: '#0d2f45' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#124f74')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}
              >
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0d2f45', color: '#fff' }}
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Logowanie...</> : 'Zaloguj się'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Dashboard ─────────────────────────────────────────────────────────── */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [resData, revData] = await Promise.all([
        fetch('/api/admin/reservations'),
        fetch('/api/admin/reviews'),
      ])
      if (resData.status === 401) { onLogout(); return }
      const d = await resData.json()
      setReservations(d.reservations ?? [])
      setWaitlist(d.waitlist ?? [])
      if (revData.ok) {
        const rd = await revData.json()
        setReviews(rd.reviews ?? [])
      }
    } catch {
      setMessage({ text: 'Błąd ładowania danych.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [onLogout])

  useEffect(() => {
    loadData()

    /* Sprawdź params z URL */
    const params = new URLSearchParams(window.location.search)
    const action = params.get('action')
    if (action === 'confirm') {
      setMessage({ text: 'Rezerwacja potwierdzona pomyślnie.', type: 'success' })
    } else if (action === 'cancel') {
      setMessage({ text: 'Rezerwacja anulowana.', type: 'success' })
    } else if (action === 'invalid') {
      setMessage({ text: 'Nieprawidłowy lub wygasły link.', type: 'error' })
    }
    /* Wyczyść URL */
    if (action) {
      window.history.replaceState({}, '', '/admin')
    }
  }, [loadData])

  const handleAction = async (reservationId: string, action: 'confirm' | 'cancel') => {
    setActionLoading(reservationId + action)
    try {
      const res = await fetch('/api/admin/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, action }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ text: data.error ?? 'Wystąpił błąd.', type: 'error' })
      } else {
        setMessage({
          text: action === 'confirm' ? 'Rezerwacja potwierdzona!' : 'Rezerwacja anulowana.',
          type: 'success',
        })
        await loadData()
      }
    } catch {
      setMessage({ text: 'Problem z połączeniem.', type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    onLogout()
  }

  const pending = reservations.filter(r => r.status === 'pending')
  const others = reservations.filter(r => r.status !== 'pending')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f9fd' }}>
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#0d2f45', color: '#fff' }}
      >
        <div>
          <h1 className="font-bold text-lg">Panel Admina — Baza dla Odpoczynku</h1>
          <p className="text-xs" style={{ color: '#b3ddf0' }}>
            {reservations.length} rezerwacji · {waitlist.length} na liście oczekujących
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#124f74', color: '#fff' }}
        >
          <LogOut size={15} />
          Wyloguj
        </button>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Komunikat */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: message.type === 'success' ? '#dcfce7' : '#fef2f2',
                color: message.type === 'success' ? '#166534' : '#b91c1c',
                border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
              }}
            >
              {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message.text}
              <button
                onClick={() => setMessage(null)}
                className="ml-auto text-lg leading-none opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: '#124f74' }} />
          </div>
        ) : (
          <>
            {/* Oczekujące */}
            {pending.length > 0 && (
              <section>
                <h2 className="font-semibold text-base mb-3" style={{ color: '#0d2f45' }}>
                  Oczekujące rezerwacje ({pending.length})
                </h2>
                <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #e2e8f0' }}>
                  <table className="w-full text-sm" style={{ backgroundColor: '#fff' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        {['Apt', 'Gość', 'Email', 'Telefon', 'Termin', 'Noce', 'Cena', 'Zadatek', 'Status', 'Akcje'].map(h => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                            style={{ color: '#64748b' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pending.map((res, i) => (
                        <tr
                          key={res.id}
                          style={{
                            borderBottom: i < pending.length - 1 ? '1px solid #f1f5f9' : 'none',
                            backgroundColor: '#fffbeb',
                          }}
                        >
                          <td className="px-4 py-3 font-medium" style={{ color: '#0d2f45' }}>
                            {res.aptName}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#0d2f45' }}>
                            {res.guestName}
                          </td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${res.guestEmail}`} style={{ color: '#2280b8' }}>
                              {res.guestEmail}
                            </a>
                          </td>
                          <td className="px-4 py-3" style={{ color: '#334155' }}>
                            {res.guestPhone || '—'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#334155' }}>
                            {formatDate(res.startDate)} – {formatDate(res.endDate)}
                          </td>
                          <td className="px-4 py-3 text-center" style={{ color: '#334155' }}>
                            {res.nights}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: '#0d2f45' }}>
                            {formatPrice(res.totalPrice)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-semibold" style={{ color: '#2280b8' }}>
                            {formatPrice(res.zadatek)}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={res.status} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAction(res.id, 'confirm')}
                                disabled={!!actionLoading}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                                style={{ backgroundColor: '#3a8067', color: '#fff' }}
                              >
                                {actionLoading === res.id + 'confirm' ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : 'Potwierdź'}
                              </button>
                              <button
                                onClick={() => handleAction(res.id, 'cancel')}
                                disabled={!!actionLoading}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                                style={{ backgroundColor: '#dc2626', color: '#fff' }}
                              >
                                {actionLoading === res.id + 'cancel' ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : 'Anuluj'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Pozostałe rezerwacje */}
            <section>
              <h2 className="font-semibold text-base mb-3" style={{ color: '#0d2f45' }}>
                Wszystkie rezerwacje ({reservations.length})
              </h2>
              {reservations.length === 0 ? (
                <div
                  className="py-12 text-center rounded-2xl text-sm"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#94a3b8' }}
                >
                  Brak rezerwacji.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #e2e8f0' }}>
                  <table className="w-full text-sm" style={{ backgroundColor: '#fff' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        {['Apt', 'Gość', 'Email', 'Telefon', 'Termin', 'Noce', 'Cena', 'Zadatek', 'Status', 'Akcje'].map(h => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                            style={{ color: '#64748b' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((res, i) => (
                        <tr
                          key={res.id}
                          style={{
                            borderBottom: i < reservations.length - 1 ? '1px solid #f1f5f9' : 'none',
                          }}
                        >
                          <td className="px-4 py-3 font-medium" style={{ color: '#0d2f45' }}>
                            {res.aptName}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#0d2f45' }}>
                            {res.guestName}
                          </td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${res.guestEmail}`} style={{ color: '#2280b8' }}>
                              {res.guestEmail}
                            </a>
                          </td>
                          <td className="px-4 py-3" style={{ color: '#334155' }}>
                            {res.guestPhone || '—'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#334155' }}>
                            {formatDate(res.startDate)} – {formatDate(res.endDate)}
                          </td>
                          <td className="px-4 py-3 text-center" style={{ color: '#334155' }}>
                            {res.nights}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: '#0d2f45' }}>
                            {formatPrice(res.totalPrice)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-semibold" style={{ color: '#2280b8' }}>
                            {formatPrice(res.zadatek)}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={res.status} />
                          </td>
                          <td className="px-4 py-3">
                            {(res.status === 'pending' || res.status === 'confirmed') && (
                              <div className="flex gap-2">
                                {res.status === 'pending' && (
                                  <button
                                    onClick={() => handleAction(res.id, 'confirm')}
                                    disabled={!!actionLoading}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                                    style={{ backgroundColor: '#3a8067', color: '#fff' }}
                                  >
                                    {actionLoading === res.id + 'confirm' ? (
                                      <Loader2 size={12} className="animate-spin" />
                                    ) : 'Potwierdź'}
                                  </button>
                                )}
                                <button
                                  onClick={() => handleAction(res.id, 'cancel')}
                                  disabled={!!actionLoading}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                                  style={{ backgroundColor: '#dc2626', color: '#fff' }}
                                >
                                  {actionLoading === res.id + 'cancel' ? (
                                    <Loader2 size={12} className="animate-spin" />
                                  ) : 'Anuluj'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Opinie do moderacji */}
            <section>
              <h2 className="font-semibold text-base mb-3 flex items-center gap-2" style={{ color: '#0d2f45' }}>
                <MessageSquare size={16} />
                Opinie ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <div className="py-12 text-center rounded-2xl text-sm" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
                  Brak opinii.
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map(rev => (
                    <div
                      key={rev.id}
                      className="flex items-start gap-4 p-4 rounded-2xl"
                      style={{
                        backgroundColor: rev.status === 'pending' ? '#fffbeb' : rev.status === 'approved' ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${rev.status === 'pending' ? '#fde68a' : rev.status === 'approved' ? '#bbf7d0' : '#fecaca'}`,
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm" style={{ color: '#0d2f45' }}>{rev.name}</span>
                          {rev.location && <span className="text-xs" style={{ color: '#94a3b8' }}>{rev.location}</span>}
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={11} fill={i < rev.rating ? '#f59e0b' : 'none'} stroke={i < rev.rating ? '#f59e0b' : '#d1d5db'} />
                            ))}
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                            backgroundColor: rev.status === 'pending' ? '#fef3c7' : rev.status === 'approved' ? '#dcfce7' : '#fee2e2',
                            color: rev.status === 'pending' ? '#92400e' : rev.status === 'approved' ? '#166534' : '#b91c1c',
                          }}>
                            {rev.status === 'pending' ? 'Oczekująca' : rev.status === 'approved' ? 'Opublikowana' : 'Odrzucona'}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: '#334155' }}>{rev.text}</p>
                        <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{formatDate(rev.createdAt)}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={async () => {
                              setActionLoading(rev.id + 'approve')
                              await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewId: rev.id, action: 'approve' }) })
                              setActionLoading(null)
                              loadData()
                            }}
                            disabled={!!actionLoading}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                            style={{ backgroundColor: '#3a8067', color: '#fff' }}
                          >
                            {actionLoading === rev.id + 'approve' ? <Loader2 size={12} className="animate-spin" /> : 'Opublikuj'}
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={async () => {
                              setActionLoading(rev.id + 'reject')
                              await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewId: rev.id, action: 'reject' }) })
                              setActionLoading(null)
                              loadData()
                            }}
                            disabled={!!actionLoading}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                            style={{ backgroundColor: '#dc2626', color: '#fff' }}
                          >
                            {actionLoading === rev.id + 'reject' ? <Loader2 size={12} className="animate-spin" /> : 'Odrzuć'}
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            setActionLoading(rev.id + 'delete')
                            await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewId: rev.id, action: 'delete' }) })
                            setActionLoading(null)
                            loadData()
                          }}
                          disabled={!!actionLoading}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                          style={{ backgroundColor: '#e5e7eb', color: '#374151' }}
                        >
                          {actionLoading === rev.id + 'delete' ? <Loader2 size={12} className="animate-spin" /> : 'Usuń'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Lista oczekujących */}
            <section>
              <h2 className="font-semibold text-base mb-3 flex items-center gap-2" style={{ color: '#0d2f45' }}>
                <Users size={16} />
                Lista oczekujących ({waitlist.length})
              </h2>
              {waitlist.length === 0 ? (
                <div
                  className="py-12 text-center rounded-2xl text-sm"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#94a3b8' }}
                >
                  Brak wpisów na liście oczekujących.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #e2e8f0' }}>
                  <table className="w-full text-sm" style={{ backgroundColor: '#fff' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        {['Apartament', 'Email', 'Termin', 'Dodano'].map(h => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                            style={{ color: '#64748b' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {waitlist.map((entry, i) => (
                        <tr
                          key={entry.id}
                          style={{
                            borderBottom: i < waitlist.length - 1 ? '1px solid #f1f5f9' : 'none',
                          }}
                        >
                          <td className="px-4 py-3 font-medium" style={{ color: '#0d2f45' }}>
                            {entry.aptId === '1' ? 'Apartament A' : 'Apartament B'}
                          </td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${entry.email}`} style={{ color: '#2280b8' }}>
                              {entry.email}
                            </a>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#334155' }}>
                            {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#94a3b8' }}>
                            {formatDate(entry.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('login')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    /* Sprawdź sesję */
    fetch('/api/admin/reservations')
      .then(r => {
        if (r.status !== 401) setView('dashboard')
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0f9fd' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#124f74' }} />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'login' ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginForm onSuccess={() => setView('dashboard')} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dashboard onLogout={() => setView('login')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
