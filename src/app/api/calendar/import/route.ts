export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import ical, { type VEvent } from 'node-ical'

/**
 * GET /api/calendar/import?apt=1|2
 *
 * Pobiera plik iCal z Booking.com (URL w zmiennych środowiskowych),
 * parsuje eventy VEVENT i zwraca listę zablokowanych zakresów dat.
 *
 * Zmienne środowiskowe (.env.local):
 *   ICAL_URL_APT1 — link iCal Booking.com dla Apartamentu 1
 *   ICAL_URL_APT2 — link iCal Booking.com dla Apartamentu 2
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const apt = searchParams.get('apt') ?? '1'

    const urlMap: Record<string, string | undefined> = {
      '1': process.env.ICAL_URL_APT1,
      '2': process.env.ICAL_URL_APT2,
    }

    const icalUrl = urlMap[apt]

    if (!icalUrl) {
      return NextResponse.json({
        apartment: apt,
        blockedRanges: [],
        note: `ICAL_URL_APT${apt} nie jest ustawiony w .env.local`,
      })
    }

    const events = await ical.fromURL(icalUrl)

    const blockedRanges: Array<{ start: string; end: string; summary: string }> = []

    for (const component of Object.values(events)) {
      /* Pomiń undefined, VCALENDAR i inne typy niż VEVENT */
      if (!component || component.type !== 'VEVENT') continue

      const event = component as VEvent
      const { start, end, summary } = event

      if (!start) continue

      blockedRanges.push({
        start:   start instanceof Date ? start.toISOString() : String(start),
        end:     end   instanceof Date ? end.toISOString()   : (start instanceof Date ? start.toISOString() : String(start)),
        summary: typeof summary === 'string' ? summary : (summary as { val?: string })?.val ?? 'Rezerwacja',
      })
    }

    return NextResponse.json({ apartment: apt, blockedRanges })
  } catch (error) {
    console.error('[iCal import] Błąd:', error)
    return NextResponse.json(
      { error: 'Nie udało się pobrać kalendarza. Spróbuj ponownie.' },
      { status: 500 },
    )
  }
}
