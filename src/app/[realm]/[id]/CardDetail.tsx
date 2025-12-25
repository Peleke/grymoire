'use client'

import { motion } from 'framer-motion'
import { CardWithContent, REALM_INFO } from '@/lib/types'

interface CardDetailProps {
  card: CardWithContent
  realmInfo: (typeof REALM_INFO)[keyof typeof REALM_INFO]
}

export function CardDetail({ card, realmInfo }: CardDetailProps) {
  return (
    <div>
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-gothic-100 to-gothic-200 card-shadow"
      >
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-[12rem] text-gothic-300/40 select-none">
              {card.primaryText.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10"
      >
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl text-balance">
          {card.title}
        </h1>
        {card.subtitle && (
          <p className="mt-3 text-xl text-ink-500 italic">
            {card.subtitle}
          </p>
        )}
      </motion.header>

      {/* Primary & Secondary Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-xl bg-gothic-50 p-6"
      >
        {/* Primary text - the letter/rune/verse */}
        <div className="flex items-center gap-6">
          <span className="font-serif text-6xl text-gothic-700">
            {card.primaryText}
          </span>
          <div className="flex-1">
            {/* Letter name for Gothic alphabet */}
            <p className="font-serif text-2xl text-ink-900">
              {card.title}
            </p>

            {/* Secondary info */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-ink-600">
              {card.phonetic ? (
                <span className="font-mono">
                  Phonetic: /{card.phonetic}/
                </span>
              ) : (
                <span className="font-mono italic text-ink-400">
                  Numeral only — no phonetic value
                </span>
              )}
              {card.numericValue && (
                <span className="font-mono">
                  Numeric: {card.numericValue}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Additional secondary text if present */}
        {card.secondaryText && (
          <p className="mt-4 text-ink-600 border-t border-gothic-200 pt-4">
            {card.secondaryText}
          </p>
        )}
      </motion.div>

      {/* Commentary (MDX content) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="prose-norse mt-10 text-lg"
      >
        {/* For now, render as plain text. Will add MDX rendering later */}
        {card.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
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
              className="rounded-full bg-gothic-100 px-3 py-1 text-sm text-gothic-700"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}
