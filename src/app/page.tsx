import { getAllCards } from '@/lib/cards'
import { CardGrid } from '@/components/CardGrid'

export default async function HomePage() {
  const cards = await getAllCards()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
          Ancient lines. Daily signal.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600">
          Explore the Gothic alphabet, Norse verses, and runic wisdom.
          One card at a time.
        </p>
      </header>

      {/* Card Grid */}
      <CardGrid cards={cards} />
    </div>
  )
}
