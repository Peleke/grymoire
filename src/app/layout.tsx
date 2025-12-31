import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { ThemeToggle } from '@/components/ThemeToggle'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Your Daily Norse',
    template: '%s | Your Daily Norse',
  },
  description: 'Ancient lines. Runic wisdom. Runes, staves, and the words of the ancestors.',
  metadataBase: new URL('https://yourdailynorse.com'),
  openGraph: {
    title: 'Your Daily Norse',
    description: 'Ancient lines. Runic wisdom.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Daily Norse',
    description: 'Ancient lines. Runic wisdom.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-parchment-50 text-ink-950 dark:bg-ink-950 dark:text-parchment-100">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-gothic-100 bg-parchment-50/80 backdrop-blur-lg dark:border-ink-800 dark:bg-ink-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
                <span className="font-serif text-2xl font-semibold tracking-tight text-ink-950 dark:text-parchment-100">
                  Your Daily Norse
                </span>
              </a>
              <nav className="flex items-center gap-6">
                <a
                  href="/"
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-950 dark:text-parchment-400 dark:hover:text-parchment-100"
                >
                  Browse
                </a>
                <a
                  href="/about"
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-950 dark:text-parchment-400 dark:hover:text-parchment-100"
                >
                  About
                </a>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gothic-100 py-8 dark:border-ink-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-ink-500 dark:text-parchment-500">
                Ancient lines. Runic wisdom.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
