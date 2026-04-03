export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactPayload {
  name: string
  email: string
  phone?: string
  apartment: '1' | '2' | 'any'
  startDate?: string
  endDate?: string
  message: string
  guests?: string
}

/**
 * POST /api/contact
 *
 * Obsługuje formularz zapytania o rezerwację.
 * Wysyła email do właściciela i potwierdzenie do gościa.
 *
 * Zmienne środowiskowe (.env.local):
 *   SMTP_HOST     — serwer SMTP (domyślnie smtp.gmail.com)
 *   SMTP_PORT     — port (domyślnie 587)
 *   SMTP_USER     — adres email nadawcy
 *   SMTP_PASS     — hasło aplikacji (Gmail App Password)
 *   CONTACT_EMAIL — adres właściciela (domyślnie odpocznijspokojnie@gmail.com)
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, phone, apartment, startDate, endDate, message, guests } = body

    /* Walidacja */
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Wypełnij wymagane pola: imię, email, wiadomość.' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Podaj prawidłowy adres email.' }, { status: 400 })
    }

    const aptLabels: Record<string, string> = {
      '1':   'Apartament Sosnowy',
      '2':   'Apartament Bałtycki',
      'any': 'Dowolny apartament',
    }
    const aptLabel = aptLabels[apartment] ?? apartment

    const dateInfo =
      startDate && endDate
        ? `${new Date(startDate).toLocaleDateString('pl-PL')} → ${new Date(endDate).toLocaleDateString('pl-PL')}`
        : 'Nie podano'

    /* ── Email do właściciela ── */
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 8px;">
        <h2 style="color: #124f74; margin-top: 0;">Nowe zapytanie o rezerwację</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #64748b; width: 140px;">Imię i nazwisko:</td><td style="padding: 8px; font-weight: 600;">${name}</td></tr>
          <tr style="background:#edf2f7"><td style="padding: 8px; color: #64748b;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; color: #64748b;">Telefon:</td><td style="padding: 8px;">${phone ?? '—'}</td></tr>
          <tr style="background:#edf2f7"><td style="padding: 8px; color: #64748b;">Apartament:</td><td style="padding: 8px; font-weight: 600;">${aptLabel}</td></tr>
          <tr><td style="padding: 8px; color: #64748b;">Termin:</td><td style="padding: 8px;">${dateInfo}</td></tr>
          <tr style="background:#edf2f7"><td style="padding: 8px; color: #64748b;">Liczba gości:</td><td style="padding: 8px;">${guests ?? '—'}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #fff; border-left: 4px solid #124f74; border-radius: 4px;">
          <p style="margin: 0; color: #334155;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">Wiadomość wysłana przez formularz na stronie debina-osc.pl</p>
      </div>
    `

    /* ── Potwierdzenie dla gościa ── */
    const guestHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 8px;">
        <h2 style="color: #124f74; margin-top: 0;">Dziękujemy za zapytanie, ${name.split(' ')[0]}!</h2>
        <p style="color: #4a5568;">Otrzymaliśmy Twoje zapytanie dotyczące rezerwacji w <strong>Bazie dla Odpoczynku</strong>.</p>
        <p style="color: #4a5568;">Potwierdzamy:</p>
        <ul style="color: #4a5568;">
          <li>Apartament: <strong>${aptLabel}</strong></li>
          <li>Termin: <strong>${dateInfo}</strong></li>
        </ul>
        <p style="color: #4a5568;">Odpowiemy na Twoje zapytanie w ciągu <strong>kilku godzin</strong> (zazwyczaj tego samego dnia).</p>
        <div style="margin-top: 24px; padding: 16px; background: #e0f2fe; border-radius: 8px;">
          <p style="margin: 0; color: #0369a1; font-size: 14px;">
            📞 <a href="tel:+48123456789" style="color: #0369a1;">+48 123 456 789</a><br>
            ✉️ <a href="mailto:odpocznijspokojnie@gmail.com" style="color: #0369a1;">odpocznijspokojnie@gmail.com</a>
          </p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">Baza dla Odpoczynku · Dębina, Pobrzeże Słowińskie</p>
      </div>
    `

    const contactEmail = process.env.CONTACT_EMAIL ?? 'odpocznijspokojnie@gmail.com'

    /* ── Wysyłka (jeśli SMTP skonfigurowany) ── */
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host:   process.env.SMTP_HOST ?? 'smtp.gmail.com',
        port:   Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await Promise.all([
        /* Do właściciela */
        transporter.sendMail({
          from:    `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
          to:      contactEmail,
          replyTo: email,
          subject: `Zapytanie o rezerwację — ${name} · ${aptLabel}`,
          html:    ownerHtml,
        }),
        /* Potwierdzenie dla gościa */
        transporter.sendMail({
          from:    `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
          to:      email,
          subject: 'Potwierdzenie zapytania — Baza dla Odpoczynku',
          html:    guestHtml,
        }),
      ])
    } else {
      /* Tryb deweloperski — loguj zamiast wysyłać */
      console.info('[contact] SMTP nie skonfigurowany. Zapytanie:', {
        name, email, apartment, startDate, endDate,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact] Błąd:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na email.' },
      { status: 500 },
    )
  }
}
