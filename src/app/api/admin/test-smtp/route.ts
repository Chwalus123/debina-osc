export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Brak dostępu.' }, { status: 401 })
  }

  const result: Record<string, unknown> = {
    env: {
      SMTP_HOST: process.env.SMTP_HOST ?? '(brak — domyślnie smtp.gmail.com)',
      SMTP_PORT: process.env.SMTP_PORT ?? '(brak — domyślnie 587)',
      SMTP_USER: process.env.SMTP_USER ? `ustawiony (${process.env.SMTP_USER})` : 'BRAK',
      SMTP_PASS: process.env.SMTP_PASS ? 'ustawiony (ukryty)' : 'BRAK',
      CONTACT_EMAIL: process.env.CONTACT_EMAIL ?? '(brak — domyślnie odpocznijspokojnie@gmail.com)',
    },
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return NextResponse.json({
      ...result,
      status: 'error',
      message: 'SMTP_USER lub SMTP_PASS nie są ustawione w zmiennych środowiskowych Vercel.',
    })
  }

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.verify()
    result.status = 'ok'
    result.message = 'Połączenie SMTP działa poprawnie.'
  } catch (err) {
    result.status = 'error'
    result.message = 'Połączenie SMTP nie powiodło się.'
    result.error = String(err)
  }

  // Optionally send a real test email if ?send=1
  if (searchParams.get('send') === '1' && result.status === 'ok') {
    const contactEmail = process.env.CONTACT_EMAIL ?? 'odpocznijspokojnie@gmail.com'
    try {
      await transporter.sendMail({
        from:    `"Test SMTP" <${process.env.SMTP_USER}>`,
        to:      contactEmail,
        subject: '[TEST] Weryfikacja SMTP — Baza dla Odpoczynku',
        html:    '<p>Ten email potwierdza, że konfiguracja SMTP działa poprawnie.</p>',
      })
      result.testEmailSent = `Email testowy wysłany na ${contactEmail}`
    } catch (err) {
      result.testEmailError = String(err)
    }
  }

  return NextResponse.json(result)
}
