import { Suspense } from 'react'
import { getAllCards } from '@/lib/cards'
import { CardGrid } from '@/components/CardGrid'

export default async function HomePage() {
  const cards = await getAllCards()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 dark:text-parchment-100 sm:text-5xl lg:text-6xl">
          Ancient lines. Runic wisdom.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600 dark:text-parchment-400">
          Runes, staves, and the words of the ancestors.
          Explore the magic of the Northern way.
        </p>
      </header>

      {/* Card Grid */}
      <Suspense fallback={<div className="py-20 text-center text-ink-500">Loading...</div>}>
        <CardGrid cards={cards} />
      </Suspense>
    </div>
  )
}
