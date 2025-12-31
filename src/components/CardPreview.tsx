'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, REALM_INFO, Realm } from '@/lib/types'

interface CardPreviewProps {
  card: Card
}

// Realms that display runes/letters
const GLYPH_REALMS: Realm[] = ['gothic', 'younger-futhark', 'elder-futhark', 'bind-runes', 'galdrastafir']

// Realms that display verses/text
const VERSE_REALMS: Realm[] = ['voluspa', 'havamal', 'sagas']

export function CardPreview({ card }: CardPreviewProps) {
  const realmInfo = REALM_INFO[card.realm]
  const searchParams = useSearchParams()
  const realmParam = searchParams.get('realm')

  const isGlyphRealm = GLYPH_REALMS.includes(card.realm)
  const isVerseRealm = VERSE_REALMS.includes(card.realm)

  // Preserve realm filter in the link so back button works
  const href = realmParam
    ? `/${card.realm}/${card.id}?from=${realmParam}`
    : `/${card.realm}/${card.id}`

  // Use sum of char codes for simple deterministic variety
  // Simpler than hash to avoid server/client differences
  const charSum = card.id.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0)
  const aspectRatio =
    charSum % 5 === 0 ? '130%' :  // tall
    charSum % 5 === 1 ? '115%' :  // medium-tall
    charSum % 5 === 2 ? '100%' :  // square
    charSum % 5 === 3 ? '85%' :   // medium-wide
    '70%'                          // wide

  // Get the first grapheme (handles multi-byte Unicode like Gothic)
  const displayGlyph = Array.from(card.primaryText)[0] || card.title.charAt(0)

  // For verses, show stanza number in hero instead of first letter
  const heroContent = isVerseRealm && card.numericValue
    ? card.numericValue.toString()
    : displayGlyph

  return (
    <div className="masonry-item">
      <Link href={href} className="group block">
          <article
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-ink-900 card-shadow transition-shadow duration-300 group-hover:card-shadow-hover"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {/* Image placeholder - aspect ratio using padding trick for CSS columns compatibility */}
            <div
              className="relative overflow-hidden bg-gradient-to-br from-gothic-100 to-gothic-200 dark:from-ink-800 dark:to-ink-700"
              style={{ paddingBottom: aspectRatio }}
            >
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-serif transition-transform duration-500 group-hover:scale-110 ${
                    isVerseRealm ? 'text-5xl text-gothic-500 dark:text-gothic-400' : 'text-6xl text-ink-950 dark:text-parchment-100'
                  }`}>
                    {heroContent}
                  </span>
                </div>
              )}

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Realm badge */}
              <div className="mb-3">
                <span className={`realm-badge realm-badge-${realmInfo.id}`}>
                  {realmInfo.name}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-ink-950 dark:text-parchment-100 text-balance">
                {card.title}
              </h3>

              {/* Subtitle */}
              {card.subtitle && (
                <p className="mt-1 text-sm text-ink-500 dark:text-parchment-400 italic">
                  {card.subtitle}
                </p>
              )}

              {/* Primary text preview - different style for verses vs glyphs */}
              <p className={`mt-3 text-sm line-clamp-2 ${
                isVerseRealm
                  ? 'font-serif italic text-ink-600 dark:text-parchment-400'
                  : 'font-mono text-gothic-600 dark:text-gothic-400'
              }`}>
                {card.primaryText}
              </p>

              {/* Secondary info - only for glyph realms */}
              {isGlyphRealm && (card.phonetic || card.numericValue) && (
                <div className="mt-3 flex items-center gap-3 text-xs text-ink-400 dark:text-parchment-500">
                  {card.phonetic && (
                    <span>/{card.phonetic}/</span>
                  )}
                  {card.numericValue && (
                    <span>= {card.numericValue}</span>
                  )}
                </div>
              )}

              {/* Sources for saga entries */}
              {card.sources && card.sources.length > 0 && (
                <p className="mt-3 text-xs text-ink-400 dark:text-ink-500 italic line-clamp-1">
                  {card.sources.join(' · ')}
                </p>
              )}
            </div>
          </article>
        </Link>
    </div>
  )
}
