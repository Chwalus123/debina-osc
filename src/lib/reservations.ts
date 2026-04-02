import { kv } from '@vercel/kv'

/* ─── Cennik ────────────────────────────────────────────────────────────── */

const PRICES_A = [350, 350, 350, 360, 400, 440, 480, 480, 440, 400, 350, 350]
const PRICES_B = [390, 390, 390, 430, 470, 510, 550, 550, 510, 470, 390, 390]

export function calculateTotalPrice(aptId: '1' | '2', startDate: string, endDate: string): number {
  const prices = aptId === '1' ? PRICES_A : PRICES_B
  const start = new Date(startDate)
  const end = new Date(endDate)
  let total = 0
  const current = new Date(start)
  while (current < end) {
    const month = current.getMonth() // 0-indexed
    total += prices[month]
    current.setDate(current.getDate() + 1)
  }
  return total
}

/* ─── Typy ──────────────────────────────────────────────────────────────── */

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
  id: string
  aptId: '1' | '2'
  aptName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  guests: string
  message: string
  startDate: string
  endDate: string
  nights: number
  totalPrice: number
  zadatek: number
  status: ReservationStatus
  createdAt: string
}

export interface WaitlistEntry {
  id: string
  aptId: '1' | '2'
  email: string
  startDate: string
  endDate: string
  createdAt: string
}

/* ─── CRUD: Reservations ────────────────────────────────────────────────── */

export async function createReservation(
  data: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'totalPrice' | 'zadatek' | 'nights' | 'aptName'>,
): Promise<Reservation> {
  const { nanoid } = await import('nanoid')
  const id = nanoid()

  const aptName = data.aptId === '1' ? 'Apartament A' : 'Apartament B'
  const start = new Date(data.startDate)
  const end = new Date(data.endDate)
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  const totalPrice = calculateTotalPrice(data.aptId, data.startDate, data.endDate)
  const zadatek = Math.round(totalPrice * 0.25)

  const reservation: Reservation = {
    ...data,
    id,
    aptName,
    nights,
    totalPrice,
    zadatek,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  await kv.set(`res:${id}`, JSON.stringify(reservation))

  const list: string[] = (await kv.get<string[]>('res:list')) ?? []
  list.unshift(id)
  await kv.set('res:list', list)

  return reservation
}

export async function getReservation(id: string): Promise<Reservation | null> {
  const raw = await kv.get<string>(`res:${id}`)
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw as Reservation
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<Reservation | null> {
  const res = await getReservation(id)
  if (!res) return null
  const updated = { ...res, status }
  await kv.set(`res:${id}`, JSON.stringify(updated))
  return updated
}

export async function getAllReservations(): Promise<Reservation[]> {
  const list: string[] = (await kv.get<string[]>('res:list')) ?? []
  const reservations = await Promise.all(list.map(id => getReservation(id)))
  return reservations.filter((r): r is Reservation => r !== null)
}

export async function deleteReservation(id: string): Promise<void> {
  await kv.del(`res:${id}`)
  const list: string[] = (await kv.get<string[]>('res:list')) ?? []
  await kv.set('res:list', list.filter(i => i !== id))
}

export async function getBlockedSlots(
  aptId: '1' | '2',
): Promise<Array<{ start: string; end: string; status: ReservationStatus }>> {
  const all = await getAllReservations()
  return all
    .filter(r => r.aptId === aptId && (r.status === 'pending' || r.status === 'confirmed'))
    .map(r => ({ start: r.startDate, end: r.endDate, status: r.status }))
}

/* ─── Konflikt dat ──────────────────────────────────────────────────────── */

export async function hasDateConflict(
  aptId: '1' | '2',
  startDate: string,
  endDate: string,
): Promise<boolean> {
  const slots = await getBlockedSlots(aptId)
  const newStart = new Date(startDate).getTime()
  const newEnd = new Date(endDate).getTime()

  return slots.some(({ start, end }) => {
    const s = new Date(start).getTime()
    const e = new Date(end).getTime()
    return newStart < e && newEnd > s
  })
}

/* ─── CRUD: Waitlist ────────────────────────────────────────────────────── */

export async function addToWaitlist(
  data: Omit<WaitlistEntry, 'id' | 'createdAt'>,
): Promise<WaitlistEntry> {
  const { nanoid } = await import('nanoid')
  const id = nanoid()

  const entry: WaitlistEntry = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  }

  await kv.set(`wait:${id}`, JSON.stringify(entry))

  const list: string[] = (await kv.get<string[]>('wait:list')) ?? []
  list.unshift(id)
  await kv.set('wait:list', list)

  return entry
}

export async function getWaitlistForDates(
  aptId: '1' | '2',
  startDate: string,
  endDate: string,
): Promise<WaitlistEntry[]> {
  const list: string[] = (await kv.get<string[]>('wait:list')) ?? []
  const entries = await Promise.all(
    list.map(async id => {
      const raw = await kv.get<string>(`wait:${id}`)
      if (!raw) return null
      return (typeof raw === 'string' ? JSON.parse(raw) : raw) as WaitlistEntry
    }),
  )

  const newStart = new Date(startDate).getTime()
  const newEnd = new Date(endDate).getTime()

  return entries.filter((e): e is WaitlistEntry => {
    if (!e || e.aptId !== aptId) return false
    const s = new Date(e.startDate).getTime()
    const en = new Date(e.endDate).getTime()
    return newStart < en && newEnd > s
  })
}

export async function removeFromWaitlist(id: string): Promise<void> {
  await kv.del(`wait:${id}`)
  const list: string[] = (await kv.get<string[]>('wait:list')) ?? []
  await kv.set('wait:list', list.filter(i => i !== id))
}
