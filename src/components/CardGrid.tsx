'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, Realm } from '@/lib/types'
import { CardPreview } from './CardPreview'
import { RealmSelector } from './RealmSelector'

interface CardGridProps {
  cards: Card[]
}

export function CardGrid({ cards }: CardGridProps) {
  const [selectedRealm, setSelectedRealm] = useState<Realm | 'all'>('all')

  // Get unique realms from cards
  const realms = useMemo(() => {
    const unique = [...new Set(cards.map(c => c.realm))]
    return unique as Realm[]
  }, [cards])

  // Count cards per realm
  const cardCounts = useMemo(() => {
    return cards.reduce((acc, card) => {
      acc[card.realm] = (acc[card.realm] || 0) + 1
      return acc
    }, {} as Record<Realm, number>)
  }, [cards])

  // Filter cards by selected realm
  const filteredCards = useMemo(() => {
    if (selectedRealm === 'all') return cards
    return cards.filter(c => c.realm === selectedRealm)
  }, [cards, selectedRealm])

  return (
    <div>
      {/* Realm Selector */}
      <div className="mb-8">
        <RealmSelector
          realms={realms}
          selected={selectedRealm}
          onChange={setSelectedRealm}
          cardCounts={cardCounts}
        />
      </div>

      {/* Card Grid */}
      <div className="masonry">
        {filteredCards.map((card) => (
          <CardPreview key={card.id} card={card} />
        ))}
      </div>

      {/* Empty state */}
      {filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <p className="text-ink-500">No cards yet in this realm.</p>
        </motion.div>
      )}
    </div>
  )
}
