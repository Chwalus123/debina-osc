export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { createReview } from '@/lib/reviews'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, location, rating, text } = body

    if (!name?.trim() || !text?.trim() || !rating) {
      return NextResponse.json({ error: 'Wypełnij wymagane pola.' }, { status: 400 })
    }

    const r = Number(rating)
    if (isNaN(r) || r < 1 || r > 5) {
      return NextResponse.json({ error: 'Ocena musi być od 1 do 5.' }, { status: 400 })
    }

    if (text.trim().length < 10) {
      return NextResponse.json({ error: 'Opinia musi mieć co najmniej 10 znaków.' }, { status: 400 })
    }

    await createReview({
      name: name.trim(),
      location: location?.trim() ?? '',
      rating: r,
      text: text.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[reviews/submit]', error)
    return NextResponse.json({ error: 'Wystąpił błąd. Spróbuj ponownie.' }, { status: 500 })
  }
}
