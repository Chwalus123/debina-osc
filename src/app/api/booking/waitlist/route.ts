export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { addToWaitlist } from '@/lib/reservations'

interface WaitlistPayload {
  aptId: '1' | '2'
  email: string
  startDate: string
  endDate: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload
    const { aptId, email, startDate, endDate } = body

    if (!aptId || !email?.trim() || !startDate || !endDate) {
      return NextResponse.json({ error: 'Wypełnij wszystkie pola.' }, { status: 400 })
    }

    if (!['1', '2'].includes(aptId)) {
      return NextResponse.json({ error: 'Nieprawidłowy identyfikator apartamentu.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Podaj prawidłowy adres email.' }, { status: 400 })
    }

    const entry = await addToWaitlist({
      aptId: aptId as '1' | '2',
      email: email.trim(),
      startDate,
      endDate,
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch (error) {
    console.error('[booking/waitlist] Błąd:', error)
    return NextResponse.json({ error: 'Wystąpił błąd. Spróbuj ponownie.' }, { status: 500 })
  }
}
