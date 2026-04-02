export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { getAllReservations } from '@/lib/reservations'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { kv } from '@vercel/kv'
import type { WaitlistEntry } from '@/lib/reservations'

export async function GET() {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 })
  }

  const reservations = await getAllReservations()

  /* Pobierz też listę oczekujących */
  const waitIds: string[] = (await kv.get<string[]>('wait:list')) ?? []
  const waitlist = (
    await Promise.all(
      waitIds.map(async id => {
        const raw = await kv.get<string>(`wait:${id}`)
        if (!raw) return null
        return (typeof raw === 'string' ? JSON.parse(raw) : raw) as WaitlistEntry
      }),
    )
  ).filter((e): e is WaitlistEntry => e !== null)

  return NextResponse.json({ reservations, waitlist })
}
