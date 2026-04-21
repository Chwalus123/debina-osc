export interface IcalSlot {
  uid: string
  start: string
  end: string
  summary: string
}

function parseIcalDate(raw: string): string {
  const val = raw.trim()
  if (val.includes('T')) {
    // DATETIME: 20260501T160000Z
    const y = val.slice(0, 4), m = val.slice(4, 6), d = val.slice(6, 8)
    const hh = val.slice(9, 11), mm = val.slice(11, 13), ss = val.slice(13, 15)
    const z = val.endsWith('Z') ? 'Z' : ''
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}${z}`
  }
  // DATE: 20260501 — treat as midnight UTC
  const y = val.slice(0, 4), m = val.slice(4, 6), d = val.slice(6, 8)
  return `${y}-${m}-${d}T00:00:00.000Z`
}

export function parseIcal(text: string): IcalSlot[] {
  const slots: IcalSlot[] = []
  const blocks = text.split('BEGIN:VEVENT').slice(1)

  for (const block of blocks) {
    const end = block.indexOf('END:VEVENT')
    const content = end >= 0 ? block.slice(0, end) : block

    // Unfold RFC 5545 line continuations
    const unfolded = content.replace(/\r?\n[ \t]/g, '')
    const lines = unfolded.split(/\r?\n/)

    let uid = '', start = '', dtend = '', summary = ''

    for (const line of lines) {
      if (line.startsWith('UID:')) {
        uid = line.slice(4).trim()
      } else if (line.startsWith('DTSTART')) {
        start = parseIcalDate(line.split(':').slice(1).join(':'))
      } else if (line.startsWith('DTEND')) {
        dtend = parseIcalDate(line.split(':').slice(1).join(':'))
      } else if (line.startsWith('SUMMARY:')) {
        summary = line.slice(8).trim()
      }
    }

    if (uid && start && dtend) {
      slots.push({ uid, start, end: dtend, summary })
    }
  }

  return slots
}
