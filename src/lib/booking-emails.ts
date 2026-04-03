import nodemailer from 'nodemailer'
import type { Reservation, WaitlistEntry } from './reservations'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'odpocznijspokojnie@gmail.com'
const BANK_ACCOUNT = '69 1050 1520 1000 0092 4956 6408'
const BANK_NAME = 'ING Bank Śląski'

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(n: number): string {
  return n.toLocaleString('pl-PL') + ' zł'
}

const baseStyle = `
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
  background: #f0f9fd;
`

function emailWrapper(content: string): string {
  return `
<div style="${baseStyle}">
  <div style="background: #0d2f45; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
      Baza dla Odpoczynku
    </h1>
    <p style="margin: 4px 0 0; color: #b3ddf0; font-size: 13px;">Dębina, Wybrzeże Słowińskie</p>
  </div>
  <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #ddf0f9; border-top: none;">
    ${content}
  </div>
  <div style="padding: 16px 32px; text-align: center;">
    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
      Baza dla Odpoczynku · ul. Modrzewiowa 29, 76-211 Dębina ·
      <a href="mailto:${CONTACT_EMAIL}" style="color: #2280b8;">${CONTACT_EMAIL}</a>
    </p>
  </div>
</div>
`
}

function reservationTable(res: Reservation): string {
  return `
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
  <tr style="background: #f0f9fd;">
    <td style="padding: 10px 12px; color: #64748b; width: 160px; border-bottom: 1px solid #e2e8f0;">Apartament</td>
    <td style="padding: 10px 12px; font-weight: 600; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.aptName}</td>
  </tr>
  <tr>
    <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Termin</td>
    <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${formatDate(res.startDate)} → ${formatDate(res.endDate)}</td>
  </tr>
  <tr style="background: #f0f9fd;">
    <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Liczba nocy</td>
    <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.nights}</td>
  </tr>
  <tr>
    <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Liczba gości</td>
    <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.guests || '—'}</td>
  </tr>
  <tr style="background: #f0f9fd;">
    <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Całkowita cena</td>
    <td style="padding: 10px 12px; font-weight: 600; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${formatPrice(res.totalPrice)}</td>
  </tr>
  <tr>
    <td style="padding: 10px 12px; color: #64748b;">Zadatek (25%)</td>
    <td style="padding: 10px 12px; font-weight: 700; color: #2280b8;">${formatPrice(res.zadatek)}</td>
  </tr>
</table>
`
}

async function maybeSend(opts: nodemailer.SendMailOptions): Promise<void> {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const t = createTransporter()
    await t.sendMail(opts)
  } else {
    console.info('[booking-emails] SMTP nie skonfigurowany. Email:', opts.subject)
  }
}

/* ─── 1. Do gościa: prośba przyjęta ─────────────────────────────────────── */

export async function sendReservationRequest(res: Reservation): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #0d2f45; margin: 0 0 8px; font-size: 22px;">Dziękujemy za prośbę o rezerwację!</h2>
    <p style="color: #4a5568; margin: 0 0 20px;">
      Drogi/a <strong>${res.guestName.split(' ')[0]}</strong>,<br>
      otrzymaliśmy Twoją prośbę o rezerwację. Właściciel ją przejrzy i wkrótce potwierdzi.
    </p>

    ${reservationTable(res)}

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 20px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px; color: #1e40af; font-size: 15px;">Prosimy o wpłatę zadatku</h3>
      <p style="margin: 0 0 8px; color: #334155; font-size: 14px;">
        Aby potwierdzić rezerwację, prosimy o przelanie zadatku w wysokości
        <strong>${formatPrice(res.zadatek)}</strong> na konto:
      </p>
      <table style="width: 100%; font-size: 14px; margin-top: 10px;">
        <tr>
          <td style="color: #64748b; padding: 4px 0; width: 120px;">Bank</td>
          <td style="color: #0d2f45; font-weight: 600;">${BANK_NAME}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding: 4px 0;">Numer konta</td>
          <td style="color: #0d2f45; font-weight: 700; letter-spacing: 1px;">${BANK_ACCOUNT}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding: 4px 0;">Właściciel</td>
          <td style="color: #0d2f45;">Rafał Szarłowski / Iwona Szarłowska</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding: 4px 0;">Tytuł przelewu</td>
          <td style="color: #0d2f45;">Zadatek ${res.aptName} ${formatDate(res.startDate)}</td>
        </tr>
      </table>
    </div>

    <p style="color: #64748b; font-size: 13px;">
      Po zaksięgowaniu zadatku i potwierdzeniu rezerwacji przez właściciela otrzymasz email z potwierdzeniem.
    </p>

    <div style="margin-top: 24px; padding: 16px; background: #f0f9fd; border-radius: 8px; font-size: 13px; color: #4a5568;">
      Kontakt: <a href="tel:+48501601881" style="color: #2280b8;">501 601 881</a> ·
      <a href="mailto:${CONTACT_EMAIL}" style="color: #2280b8;">${CONTACT_EMAIL}</a>
    </div>
  `)

  await maybeSend({
    from: `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
    to: res.guestEmail,
    subject: `Prośba o rezerwację przyjęta — ${res.aptName} · ${formatDate(res.startDate)}`,
    html,
  })
}

/* ─── 2. Do właściciela: powiadomienie z przyciskami ────────────────────── */

export async function sendOwnerNotification(
  res: Reservation,
  confirmUrl: string,
  cancelUrl: string,
): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #0d2f45; margin: 0 0 8px; font-size: 22px;">Nowa prośba o rezerwację</h2>
    <p style="color: #4a5568; margin: 0 0 20px; font-size: 14px;">
      Gość złożył prośbę o rezerwację. Poniżej szczegóły.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
      <tr style="background: #f0f9fd;">
        <td style="padding: 10px 12px; color: #64748b; width: 140px; border-bottom: 1px solid #e2e8f0;">Gość</td>
        <td style="padding: 10px 12px; font-weight: 600; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.guestName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Email</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${res.guestEmail}" style="color: #2280b8;">${res.guestEmail}</a></td>
      </tr>
      <tr style="background: #f0f9fd;">
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Telefon</td>
        <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.guestPhone || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Apartament</td>
        <td style="padding: 10px 12px; font-weight: 600; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.aptName}</td>
      </tr>
      <tr style="background: #f0f9fd;">
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Termin</td>
        <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${formatDate(res.startDate)} → ${formatDate(res.endDate)} (${res.nights} nocy)</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Goście</td>
        <td style="padding: 10px 12px; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${res.guests || '—'}</td>
      </tr>
      <tr style="background: #f0f9fd;">
        <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Cena całkowita</td>
        <td style="padding: 10px 12px; font-weight: 600; color: #0d2f45; border-bottom: 1px solid #e2e8f0;">${formatPrice(res.totalPrice)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; color: #64748b;">Zadatek (25%)</td>
        <td style="padding: 10px 12px; font-weight: 700; color: #2280b8;">${formatPrice(res.zadatek)}</td>
      </tr>
    </table>

    ${res.message ? `
    <div style="background: #f8fafc; border-left: 4px solid #124f74; padding: 14px 16px; margin-bottom: 24px; border-radius: 4px; font-size: 14px; color: #334155;">
      <strong>Wiadomość od gościa:</strong><br>
      ${res.message.replace(/\n/g, '<br>')}
    </div>
    ` : ''}

    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <a href="${confirmUrl}"
         style="display: inline-block; padding: 14px 28px; background: #3a8067; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; margin-right: 12px;">
        POTWIERDZ REZERWACJE
      </a>
      <a href="${cancelUrl}"
         style="display: inline-block; padding: 14px 28px; background: #dc2626; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px;">
        ANULUJ REZERWACJE
      </a>
    </div>
    <p style="margin-top: 12px; font-size: 12px; color: #94a3b8;">
      Linki wygasają po 14 dniach. Możesz też zarządzać rezerwacjami w panelu admina.
    </p>
  `)

  await maybeSend({
    from: `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `Nowa rezerwacja: ${res.guestName} · ${res.aptName} · ${formatDate(res.startDate)}`,
    html,
  })
}

/* ─── 3. Do gościa: pobyt potwierdzony ──────────────────────────────────── */

export async function sendConfirmationToGuest(res: Reservation): Promise<void> {
  const html = emailWrapper(`
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 60px; height: 60px; background: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="font-size: 28px;">✓</span>
      </div>
      <h2 style="color: #0d2f45; margin: 0; font-size: 24px;">Rezerwacja potwierdzona!</h2>
    </div>

    <p style="color: #4a5568; font-size: 14px; margin-bottom: 20px;">
      Drogi/a <strong>${res.guestName.split(' ')[0]}</strong>,<br>
      z radością informujemy, że Twoja rezerwacja w Ośrodku Wypoczynkowym Dębina została <strong>potwierdzona</strong>.
      Czekamy na Ciebie!
    </p>

    ${reservationTable(res)}

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #166534; margin: 0 0 10px; font-size: 15px;">Informacje praktyczne</h3>
      <ul style="color: #374151; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
        <li>Adres: ul. Modrzewiowa 29, 76-211 Dębina</li>
        <li>Zameldowanie: od 15:00</li>
        <li>Wymeldowanie: do 11:00</li>
        <li>Pozostałą kwotę (<strong>${formatPrice(res.totalPrice - res.zadatek)}</strong>) prosimy uiścić przy zameldowaniu</li>
      </ul>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #f0f9fd; border-radius: 8px; font-size: 13px; color: #4a5568; text-align: center;">
      W razie pytań: <a href="tel:+48501601881" style="color: #2280b8;">501 601 881</a> ·
      <a href="mailto:${CONTACT_EMAIL}" style="color: #2280b8;">${CONTACT_EMAIL}</a>
    </div>
  `)

  await maybeSend({
    from: `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
    to: res.guestEmail,
    subject: `Rezerwacja potwierdzona — ${res.aptName} · ${formatDate(res.startDate)}`,
    html,
  })
}

/* ─── 4. Do gościa: rezerwacja anulowana ────────────────────────────────── */

export async function sendCancellationToGuest(res: Reservation): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #0d2f45; margin: 0 0 16px; font-size: 22px;">Rezerwacja anulowana</h2>
    <p style="color: #4a5568; font-size: 14px; margin-bottom: 20px;">
      Drogi/a <strong>${res.guestName.split(' ')[0]}</strong>,<br>
      niestety informujemy, że Twoja rezerwacja w Ośrodku Wypoczynkowym Dębina została <strong>anulowana</strong>.
    </p>

    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 16px; margin-bottom: 20px; font-size: 14px; color: #991b1b;">
      <strong>${res.aptName}</strong> · ${formatDate(res.startDate)} → ${formatDate(res.endDate)}
    </div>

    <p style="color: #4a5568; font-size: 14px;">
      W razie pytań dotyczących anulowania prosimy o kontakt:
    </p>

    <div style="margin-top: 16px; padding: 16px; background: #f0f9fd; border-radius: 8px; font-size: 13px; color: #4a5568; text-align: center;">
      <a href="tel:+48501601881" style="color: #2280b8;">501 601 881</a> ·
      <a href="mailto:${CONTACT_EMAIL}" style="color: #2280b8;">${CONTACT_EMAIL}</a>
    </div>

    <p style="color: #64748b; font-size: 13px; margin-top: 20px;">
      Jeśli nadal planujesz pobyt w naszym ośrodku, zapraszamy do ponownej rezerwacji na naszej stronie.
    </p>
  `)

  await maybeSend({
    from: `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
    to: res.guestEmail,
    subject: `Rezerwacja anulowana — ${res.aptName} · ${formatDate(res.startDate)}`,
    html,
  })
}

/* ─── 5. Do osoby z listy oczekujących ──────────────────────────────────── */

export async function sendWaitlistNotification(
  entry: WaitlistEntry,
  aptName: string,
): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #0d2f45; margin: 0 0 16px; font-size: 22px;">Termin znów dostępny!</h2>
    <p style="color: #4a5568; font-size: 14px; margin-bottom: 20px;">
      Informujemy, że termin, na który czekałeś/aś, jest ponownie <strong>dostępny</strong>:
    </p>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="color: #64748b; padding: 6px 0; width: 120px;">Apartament</td>
          <td style="color: #0d2f45; font-weight: 600;">${aptName}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding: 6px 0;">Termin</td>
          <td style="color: #0d2f45;">${formatDate(entry.startDate)} → ${formatDate(entry.endDate)}</td>
        </tr>
      </table>
    </div>

    <p style="color: #4a5568; font-size: 14px;">
      Zarezerwuj teraz, zanim ktoś inny zajmie ten termin!
    </p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debina-osc.pl'}/contact"
         style="display: inline-block; padding: 14px 32px; background: #124f74; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px;">
        Zarezerwuj teraz
      </a>
    </div>

    <p style="color: #94a3b8; font-size: 12px; text-align: center;">
      Otrzymałeś/aś ten email, ponieważ zapisałeś/aś się na listę oczekujących.
    </p>
  `)

  await maybeSend({
    from: `"Baza dla Odpoczynku" <${process.env.SMTP_USER}>`,
    to: entry.email,
    subject: `Termin dostępny — ${aptName} · ${formatDate(entry.startDate)}`,
    html,
  })
}
