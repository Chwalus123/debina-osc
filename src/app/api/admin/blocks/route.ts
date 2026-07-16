export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { createBlock, getAllBlocks, deleteBlock } from '@/lib/reservations'

interface CreateBlockPayload {
  aptId: '1' | '2'
  startDate: string
  endDate: string
  reason?: string
}

/* Lista blokad (panel admina) */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 })
  }
  const blocks = await getAllBlocks()
  return NextResponse.json({ blocks })
}

/* Utwórz blokadę terminu */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 })
  }

  try {
    const { aptId, startDate, endDate, reason } = (await request.json()) as CreateBlockPayload

    if (!aptId || !['1', '2'].includes(aptId)) {
      return NextResponse.json({ error: 'Nieprawidłowy apartament.' }, { status: 400 })
    }
    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Podaj datę początkową i końcową.' }, { status: 400 })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      return NextResponse.json({ error: 'Nieprawidłowy zakres dat.' }, { status: 400 })
    }

    const block = await createBlock({
      aptId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      reason: reason?.trim() ?? '',
    })

    return NextResponse.json({ success: true, block })
  } catch (error) {
    console.error('[admin/blocks] Błąd tworzenia blokady:', error)
    return NextResponse.json({ error: 'Wystąpił błąd.' }, { status: 500 })
  }
}

/* Usuń blokadę */
export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Brak identyfikatora blokady.' }, { status: 400 })
  }

  await deleteBlock(id)
  return NextResponse.json({ success: true })
}
