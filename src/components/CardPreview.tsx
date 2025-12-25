'use client'

import Link from 'next/link'
import { Card, REALM_INFO } from '@/lib/types'

interface CardPreviewProps {
  card: Card
}

export function CardPreview({ card }: CardPreviewProps) {
  const realmInfo = REALM_INFO[card.realm]

  // Use card.order for deterministic aspect ratio (stable between server/client)
  // Using paddingBottom trick for guaranteed cross-browser CSS column support
  const aspectRatio =
    card.order % 3 === 1 ? '125%' :  // 4:5
    card.order % 3 === 2 ? '100%' :  // 1:1
    '75%'                             // 4:3

  return (
    <div className="masonry-item">
      <Link href={`/${card.realm}/${card.id}`} className="group block">
          <article
            className="relative overflow-hidden rounded-2xl bg-white card-shadow transition-shadow duration-300 group-hover:card-shadow-hover"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {/* Image placeholder - aspect ratio using padding trick for CSS columns compatibility */}
            <div
              className="relative overflow-hidden bg-gradient-to-br from-gothic-100 to-gothic-200"
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
                  <span className="font-serif text-6xl text-gothic-400/60 transition-transform duration-500 group-hover:scale-110">
                    {card.title.charAt(0).toUpperCase()}
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
              <h3 className="font-serif text-xl font-semibold text-ink-950 text-balance">
                {card.title}
              </h3>

              {/* Subtitle */}
              {card.subtitle && (
                <p className="mt-1 text-sm text-ink-500 italic">
                  {card.subtitle}
                </p>
              )}

              {/* Primary text preview */}
              <p className="mt-3 font-mono text-sm text-gothic-600 line-clamp-2">
                {card.primaryText}
              </p>

              {/* Secondary info for runes/letters */}
              {(card.phonetic || card.numericValue) && (
                <div className="mt-3 flex items-center gap-3 text-xs text-ink-400">
                  {card.phonetic && (
                    <span>/{card.phonetic}/</span>
                  )}
                  {card.numericValue && (
                    <span>= {card.numericValue}</span>
                  )}
                </div>
              )}
            </div>
          </article>
        </Link>
    </div>
  )
}
