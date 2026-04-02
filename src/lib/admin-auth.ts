import crypto from 'crypto'
import { cookies } from 'next/headers'

function getExpectedToken(password: string): string {
  const secret = process.env.BOOKING_SECRET ?? 'fallback-secret'
  const date = new Date().toISOString().slice(0, 10)
  return crypto.createHmac('sha256', secret).update(`${password}:${date}`).digest('hex')
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) return false

    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    if (!session?.value) return false

    const expected = getExpectedToken(adminPassword)
    return crypto.timingSafeEqual(
      Buffer.from(session.value, 'hex'),
      Buffer.from(expected, 'hex'),
    )
  } catch {
    return false
  }
}
