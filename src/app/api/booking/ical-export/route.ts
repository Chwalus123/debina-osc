export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getAllReservations, getAllBlocks } from '@/lib/reservations'

function toIcalDate(iso: string): string {
  // Format: YYYYMMDD (all-day, no time component — Booking.com prefers this)
  return iso.slice(0, 10).replace(/-/g, '')
}

function escapeIcal(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const apt = searchParams.get('apt') ?? '1'

  if (!['1', '2'].includes(apt)) {
    return new NextResponse('Nieprawidłowy apartament', { status: 400 })
  }

  const [all, allBlocks] = await Promise.all([getAllReservations(), getAllBlocks()])
  const reservations = all.filter(
    r => r.aptId === apt && (r.status === 'confirmed' || r.status === 'pending'),
  )
  const blocks = allBlocks.filter(b => b.aptId === apt)

  const aptName = apt === '1' ? 'Apartament A – Baza dla Odpoczynku' : 'Apartament B – Baza dla Odpoczynku'
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const events = reservations.map(r => {
    const uid = `res-${r.id}@bazadlaodpoczynku.pl`
    const dtstart = toIcalDate(r.startDate)
    const dtend = toIcalDate(r.endDate)
    const summary = escapeIcal(`Rezerwacja – ${r.guestName}`)
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${summary}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
    ].join('\r\n')
  })

  const blockEvents = blocks.map(b => {
    const uid = `block-${b.id}@bazadlaodpoczynku.pl`
    const dtstart = toIcalDate(b.startDate)
    const dtend = toIcalDate(b.endDate)
    const summary = escapeIcal(b.reason ? `Niedostępne – ${b.reason}` : 'Niedostępne (blokada)')
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${summary}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
    ].join('\r\n')
  })

  const ical = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baza dla Odpoczynku//bazadlaodpoczynku.pl//PL',
    `X-WR-CALNAME:${aptName}`,
    'X-WR-TIMEZONE:Europe/Warsaw',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    ...blockEvents,
    'END:VCALENDAR',
  ].join('\r\n')

  return new NextResponse(ical, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="apt${apt}-bazadlaodpoczynku.ics"`,
      'Cache-Control': 'no-cache, no-store',
    },
  })
}
