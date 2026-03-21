import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-falun-400">404</h1>
      <p className="mt-4 text-xl text-ink-600 dark:text-parchment-300">This path leads nowhere.</p>
      <p className="mt-2 text-ink-500 dark:text-parchment-400">The card you seek has not been inscribed.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800 dark:bg-falun-500 dark:text-ink-950 dark:hover:bg-falun-400"
      >
        Return to the collection
      </Link>
    </div>
  )
}
