import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-gold-400">404</h1>
      <p className="mt-4 text-xl text-indigo-600 dark:text-parchment-300">This path leads nowhere.</p>
      <p className="mt-2 text-indigo-500 dark:text-parchment-400">The card you seek has not been inscribed.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-indigo-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-800 dark:bg-gold-500 dark:text-indigo-950 dark:hover:bg-gold-400"
      >
        Return to the collection
      </Link>
    </div>
  )
}
