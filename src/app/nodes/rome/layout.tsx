import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rome — Node 00',
  description:
    'A Gothic king is buried in a riverbed and never found. The Ovid Arc, Alaric, and Guðríður. Where Ðirðug begins.',
}

export default function RomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
