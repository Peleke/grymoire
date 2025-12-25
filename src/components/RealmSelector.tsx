'use client'

import { motion } from 'framer-motion'
import { Realm, REALM_INFO } from '@/lib/types'

interface RealmSelectorProps {
  realms: Realm[]
  selected: Realm | 'all'
  onChange: (realm: Realm | 'all') => void
  cardCounts?: Record<Realm, number>
}

export function RealmSelector({ realms, selected, onChange, cardCounts }: RealmSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onChange('all')}
        className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected === 'all'
            ? 'text-ink-950'
            : 'text-ink-500 hover:text-ink-700'
        }`}
      >
        {selected === 'all' && (
          <motion.div
            layoutId="realm-indicator"
            className="absolute inset-0 rounded-full bg-gothic-100"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative">All</span>
      </button>

      {realms.map(realm => {
        const info = REALM_INFO[realm]
        const count = cardCounts?.[realm] ?? 0

        return (
          <button
            key={realm}
            onClick={() => onChange(realm)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected === realm
                ? 'text-ink-950'
                : 'text-ink-500 hover:text-ink-700'
            }`}
          >
            {selected === realm && (
              <motion.div
                layoutId="realm-indicator"
                className="absolute inset-0 rounded-full bg-gothic-100"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {info.name}
              {count > 0 && (
                <span className="text-xs text-ink-400">({count})</span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
