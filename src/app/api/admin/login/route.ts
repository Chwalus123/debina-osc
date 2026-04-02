export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { cookies } from 'next/headers'

function createSessionToken(password: string): string {
  const secret = process.env.BOOKING_SECRET ?? 'fallback-secret'
  const date = new Date().toISOString().slice(0, 10)
  return crypto.createHmac('sha256', secret).update(`${password}:${date}`).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password: string }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json({ error: 'Konfiguracja admina niedostępna.' }, { status: 500 })
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: 'Nieprawidłowe hasło.' }, { status: 401 })
    }

    const sessionToken = createSessionToken(password)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/login] Błąd:', error)
    return NextResponse.json({ error: 'Wystąpił błąd.' }, { status: 500 })
  }
}
