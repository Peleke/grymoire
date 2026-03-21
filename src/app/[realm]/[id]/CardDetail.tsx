'use client'

import { motion } from 'framer-motion'
import { CardWithContent, REALM_INFO, Realm } from '@/lib/types'
import { MDXContent } from '@/components/MDXContent'

interface CardDetailProps {
  card: CardWithContent
  realmInfo: (typeof REALM_INFO)[keyof typeof REALM_INFO]
}

// Realms that display runes/letters (glyph + phonetic/numeric)
const GLYPH_REALMS: Realm[] = ['gothic', 'younger-futhark', 'elder-futhark', 'bind-runes', 'galdrastafir']

// Realms that display verses/text (full text + translation)
const VERSE_REALMS: Realm[] = ['voluspa', 'havamal', 'sagas']

export function CardDetail({ card, realmInfo }: CardDetailProps) {
  const isGlyphRealm = GLYPH_REALMS.includes(card.realm)
  const isVerseRealm = VERSE_REALMS.includes(card.realm)

  return (
    <div>
      {/* Hero Image - only for glyph realms or if image exists */}
      {(isGlyphRealm || card.image) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-parchment-100 to-parchment-200 dark:from-ink-800 dark:to-ink-700 card-shadow"
        >
          {card.image ? (
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[12rem] text-ink-950 dark:text-parchment-100 select-none">
                {Array.from(card.primaryText)[0]}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={isGlyphRealm || card.image ? "mt-10" : ""}
      >
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 dark:text-parchment-100 sm:text-5xl text-balance">
            {card.title}
          </h1>
          {/* Stanza number badge for verses */}
          {isVerseRealm && card.numericValue && (
            <span className="inline-flex items-center justify-center rounded-full bg-falun-200 dark:bg-ink-700 px-3 py-1 text-sm font-medium text-falun-800 dark:text-falun-300">
              #{card.numericValue}
            </span>
          )}
        </div>
        {card.subtitle && (
          <p className="mt-3 text-xl text-ink-500 dark:text-parchment-400 italic">
            {card.subtitle}
          </p>
        )}
      </motion.header>

      {/* Content Block - different layout for glyphs vs verses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-xl bg-parchment-100 dark:bg-ink-800 p-6"
      >
        {isGlyphRealm ? (
          /* Glyph layout: large symbol + title + phonetic/numeric */
          <div className="flex items-center gap-6">
            <span className="font-serif text-6xl text-falun-700 dark:text-falun-300">
              {card.primaryText}
            </span>
            <div className="flex-1">
              <p className="font-serif text-2xl text-ink-900 dark:text-parchment-100">
                {card.title}
              </p>
              {(card.phonetic || card.numericValue) && (
                <div className="mt-2 flex flex-wrap items-center gap-4 text-ink-600 dark:text-parchment-400">
                  {card.phonetic && (
                    <span className="font-mono">
                      Phonetic: /{card.phonetic}/
                    </span>
                  )}
                  {card.numericValue && (
                    <span className="font-mono">
                      Numeric: {card.numericValue}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Verse/Saga layout: full text blocks */
          <div className="space-y-6">
            {/* Old Norse / Primary Text */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-falun-600 dark:text-falun-400 mb-2">
                Old Norse
              </p>
              <p className="font-serif text-xl leading-relaxed text-ink-900 dark:text-parchment-100 whitespace-pre-line">
                {card.primaryText}
              </p>
            </div>

            {/* Translation / Secondary Text */}
            {card.secondaryText && (
              <div className="border-t border-parchment-300 dark:border-ink-700 pt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-falun-600 dark:text-falun-400 mb-2">
                  Translation
                </p>
                <p className="font-serif text-lg leading-relaxed text-ink-700 dark:text-parchment-300 italic whitespace-pre-line">
                  {card.secondaryText}
                </p>
              </div>
            )}

            {/* Sources for saga entries */}
            {card.sources && card.sources.length > 0 && (
              <div className="border-t border-parchment-300 dark:border-ink-700 pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-falun-600 dark:text-falun-400 mb-1">
                  {card.sources.length === 1 ? 'Source' : 'Sources'}
                </p>
                <p className="text-ink-700 dark:text-parchment-300">
                  {card.sources.join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Secondary text for glyph realms */}
        {isGlyphRealm && card.secondaryText && (
          <p className="mt-4 text-ink-600 dark:text-parchment-400 border-t border-parchment-300 dark:border-ink-700 pt-4">
            {card.secondaryText}
          </p>
        )}
      </motion.div>

      {/* Commentary (MDX content) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-lg"
      >
        <MDXContent content={card.content} />
      </motion.div>

      {/* Tags */}
      {card.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {card.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-falun-100 dark:bg-ink-800 px-3 py-1 text-sm text-falun-800 dark:text-falun-300"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}
