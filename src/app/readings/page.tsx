import { Suspense } from 'react'
import { getAllCards } from '@/lib/cards'
import { CardGrid } from '@/components/CardGrid'

export default async function ReadingsPage() {
  const cards = await getAllCards()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-falun-600 dark:text-falun-500 mb-3">
          Letters &amp; Echoes
        </p>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink-950 dark:text-parchment-100 sm:text-3xl">
          Musings, memories, and inklings
        </h1>
      </header>

      {/* Card Grid */}
      {cards.length > 0 ? (
        <Suspense fallback={<div className="py-20 text-center text-ink-500 dark:text-parchment-400">Loading...</div>}>
          <CardGrid cards={cards} />
        </Suspense>
      ) : (
        <div className="py-20 text-center">
          <p className="font-serif text-xl text-ink-400 dark:text-parchment-600">
            Readings landing soon
          </p>
        </div>
      )}
    </div>
  )
}
