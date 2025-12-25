import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Realm-specific styling
const realmStyles: Record<string, { bg: string; accent: string; text: string }> = {
  gothic: {
    bg: 'linear-gradient(135deg, #28241f 0%, #48423a 100%)',
    accent: '#c9c1b3',
    text: '#f0ede8',
  },
  voluspa: {
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)',
    accent: '#888888',
    text: '#e7e7e7',
  },
  havamal: {
    bg: 'linear-gradient(135deg, #362d21 0%, #665642 100%)',
    accent: '#d4c3a5',
    text: '#f8f5ef',
  },
  'younger-futhark': {
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #4f4f4f 100%)',
    accent: '#b0b0b0',
    text: '#f6f6f6',
  },
  'elder-futhark': {
    bg: 'linear-gradient(135deg, #28241f 0%, #544c42 100%)',
    accent: '#a89d8a',
    text: '#f0ede8',
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Your Daily Norse'
  const subtitle = searchParams.get('subtitle') || ''
  const primaryText = searchParams.get('primaryText') || ''
  const realm = searchParams.get('realm') || 'gothic'
  const phonetic = searchParams.get('phonetic') || ''
  const numericValue = searchParams.get('numericValue') || ''

  const style = realmStyles[realm] || realmStyles.gothic

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: style.bg,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: style.accent,
            opacity: 0.6,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          {/* Primary text (the letter/rune) */}
          {primaryText && (
            <div
              style={{
                fontSize: '180px',
                color: style.accent,
                marginBottom: '20px',
                lineHeight: 1,
              }}
            >
              {primaryText}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: style.text,
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: '32px',
                color: style.accent,
                fontStyle: 'italic',
                marginBottom: '24px',
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Phonetic and numeric values */}
          {(phonetic || numericValue) && (
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
                fontSize: '28px',
                color: style.accent,
                opacity: 0.8,
              }}
            >
              {phonetic && <span>/{phonetic}/</span>}
              {numericValue && <span>= {numericValue}</span>}
            </div>
          )}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: style.text,
              opacity: 0.6,
            }}
          >
            Your Daily Norse
          </div>
        </div>

        {/* Decorative bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: style.accent,
            opacity: 0.6,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
