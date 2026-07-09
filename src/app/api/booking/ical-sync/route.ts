export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { kv } from '@/lib/kv'
import { parseIcal } from '@/lib/ical'

const ICAL_URLS: Record<'1' | '2', string> = {
  '1': process.env.ICAL_URL_APT1 ?? '',
  '2': process.env.ICAL_URL_APT2 ?? '',
}

async function syncAll() {
  const results: Record<string, number | string> = {}

  for (const aptId of ['1', '2'] as const) {
    const url = ICAL_URLS[aptId]
    if (!url) {
      results[`apt${aptId}`] = 'brak URL (ustaw ICAL_URL_APT1 / ICAL_URL_APT2)'
      continue
    }

    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const text = await res.text()
      const slots = parseIcal(text)

      await kv.set(
        `ical:${aptId}`,
        JSON.stringify({
          slots: slots.map(s => ({
            start: s.start,
            end: s.end,
            status: 'confirmed' as const,
            source: 'booking.com',
            uid: s.uid,
          })),
          cachedAt: new Date().toISOString(),
        }),
      )

      results[`apt${aptId}`] = slots.length
    } catch (err) {
      console.error(`iCal sync apt${aptId}:`, err)
      results[`apt${aptId}`] = `błąd: ${String(err)}`
    }
  }

  return results
}

// Vercel cron calls GET
export async function GET() {
  const results = await syncAll()
  return NextResponse.json({ ok: true, synced: results, at: new Date().toISOString() })
}

// Admin panel can call POST to trigger on-demand sync
export async function POST() {
  const results = await syncAll()
  return NextResponse.json({ ok: true, synced: results, at: new Date().toISOString() })
}
