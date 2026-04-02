export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import {
  createReservation,
  hasDateConflict,
} from '@/lib/reservations'
import {
  sendReservationRequest,
  sendOwnerNotification,
} from '@/lib/booking-emails'
import { createActionToken } from '@/lib/tokens'

interface ReservePayload {
  aptId: '1' | '2'
  guestName: string
  guestEmail: string
  guestPhone: string
  guests: string
  message: string
  startDate: string
  endDate: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservePayload
    const { aptId, guestName, guestEmail, guestPhone, guests, message, startDate, endDate } = body

    /* Walidacja */
    if (!aptId || !guestName?.trim() || !guestEmail?.trim() || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Wypełnij wszystkie wymagane pola.' },
        { status: 400 },
      )
    }

    if (!['1', '2'].includes(aptId)) {
      return NextResponse.json({ error: 'Nieprawidłowy identyfikator apartamentu.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(guestEmail)) {
      return NextResponse.json({ error: 'Podaj prawidłowy adres email.' }, { status: 400 })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      return NextResponse.json({ error: 'Nieprawidłowe daty.' }, { status: 400 })
    }

    /* Sprawdź konflikty */
    const conflict = await hasDateConflict(aptId as '1' | '2', startDate, endDate)
    if (conflict) {
      return NextResponse.json(
        { error: 'Wybrany termin jest już zajęty. Wybierz inne daty.' },
        { status: 409 },
      )
    }

    /* Utwórz rezerwację */
    const reservation = await createReservation({
      aptId: aptId as '1' | '2',
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone?.trim() ?? '',
      guests: guests?.trim() ?? '',
      message: message?.trim() ?? '',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    })

    /* Tokeny do linków emailowych */
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debina-osc.pl'
    const confirmToken = createActionToken(reservation.id, 'confirm')
    const cancelToken = createActionToken(reservation.id, 'cancel')
    const confirmUrl = `${baseUrl}/api/booking/action?token=${confirmToken}`
    const cancelUrl = `${baseUrl}/api/booking/action?token=${cancelToken}`

    /* Wyślij emaile */
    await Promise.all([
      sendReservationRequest(reservation),
      sendOwnerNotification(reservation, confirmUrl, cancelUrl),
    ])

    return NextResponse.json({ success: true, reservationId: reservation.id })
  } catch (error) {
    console.error('[booking/reserve] Błąd:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd. Spróbuj ponownie.' },
      { status: 500 },
    )
  }
}
