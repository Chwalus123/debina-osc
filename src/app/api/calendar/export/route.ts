export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

interface BookingPayload {
  apartmentId?: '1' | '2'
  guestName: string
  guestEmail?: string
  startDate: string   // ISO string
  endDate: string     // ISO string
  notes?: string
}

/**
 * POST /api/calendar/export
 *
 * Przyjmuje dane rezerwacji i zwraca plik .ics gotowy do importu
 * w Booking.com lub dowolnym kliencie kalendarza.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload
    const { apartmentId = '1', guestName, guestEmail, startDate, endDate, notes } = body

    if (!guestName || !startDate || !endDate) {
      return NextResponse.json({ error: 'Brakuje wymaganych danych.' }, { status: 400 })
    }

    const start = new Date(startDate)
    const end   = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Nieprawidłowe daty.' }, { status: 400 })
    }

    const aptLabel = apartmentId === '2' ? 'Apartament Bałtycki' : 'Apartament Sosnowy'

    /* Formatuj datę do formatu iCal YYYYMMDD (pełne dni) */
    const toIcsDate = (d: Date) =>
      d.toISOString().slice(0, 10).replace(/-/g, '')

    const uid      = `${Date.now()}-apt${apartmentId}@debina-osc.pl`
    const dtstamp  = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'

    const descParts = [
      `Gość: ${guestName}`,
      guestEmail ? `Email: ${guestEmail}` : '',
      notes      ? `Uwagi: ${notes}`       : '',
    ].filter(Boolean)

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Osrodek Debina//NONSGML v1.0//PL',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(start)}`,
      `DTEND;VALUE=DATE:${toIcsDate(end)}`,
      `SUMMARY:Rezerwacja - ${guestName} - ${aptLabel}`,
      descParts.length ? `DESCRIPTION:${descParts.join('\\n')}` : null,
      'LOCATION:Debina\\, Polska',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter((l): l is string => l !== null)
      .join('\r\n')

    return new NextResponse(icsLines, {
      headers: {
        'Content-Type':        'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="rezerwacja-${toIcsDate(start)}.ics"`,
      },
    })
  } catch (error) {
    console.error('[iCal export] Błąd:', error)
    return NextResponse.json({ error: 'Błąd generowania pliku .ics.' }, { status: 500 })
  }
}
