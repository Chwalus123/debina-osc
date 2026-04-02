export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getBlockedSlots } from '@/lib/reservations'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const apt = searchParams.get('apt') ?? '1'

  if (!['1', '2'].includes(apt)) {
    return NextResponse.json({ error: 'Nieprawidłowy identyfikator apartamentu.' }, { status: 400 })
  }

  const slots = await getBlockedSlots(apt as '1' | '2')
  return NextResponse.json({ slots })
}
