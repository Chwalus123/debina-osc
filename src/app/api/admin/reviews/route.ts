export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllReviews, updateReviewStatus, deleteReview } from '@/lib/reviews'
import type { ReviewStatus } from '@/lib/reviews'

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

export async function GET() {
  if (!await isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const reviews = await getAllReviews()
  return NextResponse.json({ reviews })
}

export async function POST(request: Request) {
  if (!await isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { reviewId, action } = await request.json()
  if (!reviewId || !action) {
    return NextResponse.json({ error: 'Brak parametrów.' }, { status: 400 })
  }

  if (action === 'delete') {
    await deleteReview(reviewId)
    return NextResponse.json({ success: true })
  }

  const statusMap: Record<string, ReviewStatus> = {
    approve: 'approved',
    reject: 'rejected',
  }
  const status = statusMap[action]
  if (!status) return NextResponse.json({ error: 'Nieprawidłowa akcja.' }, { status: 400 })

  const updated = await updateReviewStatus(reviewId, status)
  if (!updated) return NextResponse.json({ error: 'Nie znaleziono opinii.' }, { status: 404 })

  return NextResponse.json({ success: true })
}
