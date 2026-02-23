'use client'

import { useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, Realm } from '@/lib/types'
import { CardPreview } from './CardPreview'
import { RealmSelector } from './RealmSelector'

interface CardGridProps {
  cards: Card[]
}

export function CardGrid({ cards }: CardGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read realm from URL, default to 'all'
  const selectedRealm = (searchParams.get('realm') as Realm | 'all') || 'all'

  // Update URL when realm changes
  const setSelectedRealm = useCallback((realm: Realm | 'all') => {
    const params = new URLSearchParams(searchParams.toString())
    if (realm === 'all') {
      params.delete('realm')
    } else {
      params.set('realm', realm)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

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
          <p className="text-indigo-500 dark:text-parchment-400">No cards yet in this realm.</p>
        </motion.div>
      )}
    </div>
  )
}
