export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getApprovedReviews } from '@/lib/reviews'

export async function GET() {
  try {
    const reviews = await getApprovedReviews()
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('[reviews/list]', error)
    return NextResponse.json({ reviews: [] })
  }
}
