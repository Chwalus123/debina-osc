export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
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

interface ActionPayload {
  reservationId: string
  action: 'confirm' | 'cancel'
}

export async function POST(request: Request) {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 })
  }

  try {
    const { reservationId, action } = (await request.json()) as ActionPayload

    if (!reservationId || !action || !['confirm', 'cancel'].includes(action)) {
      return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 })
    }

    const reservation = await getReservation(reservationId)
    if (!reservation) {
      return NextResponse.json({ error: 'Rezerwacja nie istnieje.' }, { status: 404 })
    }

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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/action] Błąd:', error)
    return NextResponse.json({ error: 'Wystąpił błąd.' }, { status: 500 })
  }
}
