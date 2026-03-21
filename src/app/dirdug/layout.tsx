import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ðirðug — The Long Road North',
  description:
    'An inverse pilgrimage across Europe exploring language, technology, and martial tradition. Rome to Atlanta, tracing Germanic migrations in reverse.',
  openGraph: {
    title: 'Ðirðug — The Long Road North',
    description:
      'An inverse pilgrimage across Europe exploring language, technology, and martial tradition.',
    type: 'website',
  },
}

export default function DirdugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
