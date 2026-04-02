export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { verifyActionToken } from '@/lib/tokens'
import {
  getReservation,
  updateReservationStatus,
  getWaitlistForDates,
} from '@/lib/reservations'
import {
  sendConfirmationToGuest,
  sendCancellationToGuest,
  sendWaitlistNotification,
} from '@/lib/booking-emails'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token') ?? ''

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debina-osc.pl'

  /* Weryfikacja tokenu */
  const payload = verifyActionToken(token)
  if (!payload) {
    return NextResponse.redirect(`${baseUrl}/admin?action=invalid`)
  }

  const { reservationId, action } = payload

  if (action !== 'confirm' && action !== 'cancel') {
    return NextResponse.redirect(`${baseUrl}/admin?action=invalid`)
  }

  /* Pobierz rezerwację */
  const reservation = await getReservation(reservationId)
  if (!reservation) {
    return NextResponse.redirect(`${baseUrl}/admin?action=not-found`)
  }

  /* Aktualizuj status */
  const status = (action === 'confirm' ? 'confirmed' : 'cancelled') as import('@/lib/reservations').ReservationStatus
  await updateReservationStatus(reservationId, status)
  const updated = { ...reservation, status }

  if (action === 'confirm') {
    await sendConfirmationToGuest(updated)
  } else {
    await sendCancellationToGuest(updated)

    /* Powiadom listę oczekujących */
    const waitlist = await getWaitlistForDates(
      reservation.aptId,
      reservation.startDate,
      reservation.endDate,
    )
    await Promise.all(
      waitlist.map(entry => sendWaitlistNotification(entry, reservation.aptName)),
    )
  }

  return NextResponse.redirect(`${baseUrl}/admin?action=${action}`)
}
