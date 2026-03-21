import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Grymoire — runes, sagas, and the living roots of the North.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-5xl font-bold tracking-tight text-falun-800 dark:text-falun-400 sm:text-6xl">
        Grymoire
      </h1>
      <p className="mt-6 max-w-md text-lg text-ink-600 dark:text-parchment-300">
        The site speaks for itself. The author is sick of bios.
      </p>
      <p className="mt-4 max-w-md text-sm text-ink-500 dark:text-parchment-500">
        Stick around. You might get one eventually.
      </p>
    </div>
  )
}
