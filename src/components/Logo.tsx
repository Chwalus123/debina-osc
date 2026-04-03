interface LogoProps {
  variant?: 'dark' | 'light'
  iconOnly?: boolean
  className?: string
}

const Logo = ({ variant = 'dark', iconOnly = false, className = '' }: LogoProps) => {
  const textPrimary = variant === 'dark' ? '#0d2f45' : '#ffffff'
  const textAccent  = variant === 'dark' ? '#3a8067' : '#b3ddf0'

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* ── Logo ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-ck.png"
        alt="Logo Bazy dla Odpoczynku"
        width={44}
        height={44}
        style={{ objectFit: 'contain', flexShrink: 0 }}
      />

      {/* ── Nazwa ── */}
      {!iconOnly && (
        <div className="leading-tight">
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.125rem',
              fontWeight: 700,
              color: textPrimary,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Odpocznij
          </div>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.65rem',
              fontWeight: 500,
              color: textAccent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}
          >
            Sobie
          </div>
        </div>
      )}
    </div>
  )
}

export default Logo
