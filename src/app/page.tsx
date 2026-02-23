import { Suspense } from 'react'
import { getAllCards } from '@/lib/cards'
import { CardGrid } from '@/components/CardGrid'

export default async function HomePage() {
  const cards = await getAllCards()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-indigo-900 dark:text-gold-400 sm:text-5xl lg:text-6xl">
          Your Daily Norse
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-700 dark:text-parchment-300">
          Runes, sagas, and the living roots of the North.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-base text-indigo-500 dark:text-parchment-500">
          Read the old words. Learn the old ways.
        </p>
      </header>

      {/* Card Grid */}
      <Suspense fallback={<div className="py-20 text-center text-indigo-500 dark:text-parchment-400">Loading...</div>}>
        <CardGrid cards={cards} />
      </Suspense>
    </div>
  )
}
