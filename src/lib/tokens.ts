import crypto from 'crypto'

const SECRET = () => {
  const s = process.env.BOOKING_SECRET
  if (!s) throw new Error('BOOKING_SECRET env variable is not set')
  return s
}

const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000 // 14 days

function toBase64url(buf: Buffer | string): string {
  const b64 = typeof buf === 'string' ? Buffer.from(buf).toString('base64') : buf.toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function fromBase64url(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(b64, 'base64').toString('utf8')
}

export function createActionToken(
  reservationId: string,
  action: 'confirm' | 'cancel',
): string {
  const payload = JSON.stringify({ reservationId, action, exp: Date.now() + TOKEN_TTL_MS })
  const encodedPayload = toBase64url(payload)
  const sig = crypto.createHmac('sha256', SECRET()).update(encodedPayload).digest('hex')
  return `${encodedPayload}.${sig}`
}

export function verifyActionToken(
  token: string,
): { reservationId: string; action: string } | null {
  try {
    const [encodedPayload, sig] = token.split('.')
    if (!encodedPayload || !sig) return null

    const expectedSig = crypto.createHmac('sha256', SECRET()).update(encodedPayload).digest('hex')
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null

    const payload = JSON.parse(fromBase64url(encodedPayload)) as {
      reservationId: string
      action: string
      exp: number
    }

    if (Date.now() > payload.exp) return null

    return { reservationId: payload.reservationId, action: payload.action }
  } catch {
    return null
  }
}
