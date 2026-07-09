import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
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
    default: 'Grymoire',
    template: '%s | Grymoire',
  },
  description: 'Ðirðug: The Long Road North. An inverse pilgrimage across Europe exploring language, history, and martial tradition.',
  metadataBase: new URL('https://grymoire.dev'),
  openGraph: {
    title: 'Grymoire',
    description: 'Ðirðug: The Long Road North. An inverse pilgrimage across Europe. 22 stops. Rome to Atlanta.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grymoire',
    description: 'Ðirðug: The Long Road North. An inverse pilgrimage across Europe. 22 stops. Rome to Atlanta.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var stored = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
      </head>
      <body className="min-h-screen antialiased bg-parchment-50 text-ink-950 dark:bg-ink-950 dark:text-parchment-100">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-parchment-300 bg-parchment-50/80 backdrop-blur-lg dark:border-ink-800 dark:bg-ink-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
                <span className="font-serif text-2xl font-semibold tracking-tight text-falun-800 dark:text-falun-400">
                  Grymoire
                </span>
              </a>
              <nav className="flex items-center gap-6">
                <a
                  href="/dirdug"
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-falun-500 dark:hover:text-falun-300"
                >
                  Ðirðug
                </a>
                <a
                  href="/readings"
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-falun-500 dark:hover:text-falun-300"
                >
                  Readings
                </a>
                <a
                  href="/about"
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-falun-500 dark:hover:text-falun-300"
                >
                  About
                </a>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer>
            {/* Quote banner — Hávamál 138 */}
            <div className="quote-banner relative overflow-hidden py-10 sm:py-14">
              <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
                <blockquote className="font-serif text-lg leading-relaxed text-parchment-100/90 sm:text-xl sm:leading-relaxed">
                  Deyr fé, deyja frændr,<br />
                  deyr sjalfr it sama;<br />
                  en orðstírr deyr aldregi<br />
                  hveim er sér góðan getr.
                </blockquote>
                <cite className="mt-5 block text-sm font-medium tracking-wide text-parchment-300/60 uppercase not-italic">
                  Hávamál &middot; 76
                </cite>
              </div>
            </div>
            {/* Footer bar */}
            <div className="bg-ink-950 py-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <div className="flex items-center gap-4">
                    <a href="/" className="font-serif text-lg font-semibold text-parchment-300 transition-colors hover:text-falun-400">
                      Grymoire
                    </a>
                    <span className="text-parchment-700">&middot;</span>
                    <a href="https://peleke.me" className="text-sm text-parchment-500 transition-colors hover:text-falun-400">
                      Peleke Sengstacke
                    </a>
                  </div>
                  <nav className="flex items-center gap-6 text-sm">
                    <a href="/" className="text-parchment-500 transition-colors hover:text-falun-400">Heim</a>
                    <a href="/about" className="text-parchment-500 transition-colors hover:text-falun-400">About</a>
                  </nav>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
