import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCard, getAllCardSlugs, getCardsByRealm } from '@/lib/cards'
import { Realm, REALM_INFO } from '@/lib/types'
import { ShareButtons } from '@/components/ShareButtons'
import { CardDetail } from './CardDetail'

interface PageProps {
  params: Promise<{
    realm: string
    id: string
  }>
  searchParams: Promise<{ from?: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCardSlugs()
  return slugs.map(({ realm, id }) => ({ realm, id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { realm, id } = await params
  const card = await getCard(realm as Realm, id)

  if (!card) {
    return { title: 'Not Found' }
  }

  const realmInfo = REALM_INFO[card.realm]

  // Build OG image URL with card data
  const ogImageParams = new URLSearchParams({
    title: card.title,
    subtitle: card.subtitle || '',
    primaryText: card.primaryText,
    realm: card.realm,
    phonetic: card.phonetic || '',
    numericValue: card.numericValue?.toString() || '',
  })

  const ogImageUrl = `/api/og?${ogImageParams.toString()}`

  return {
    title: `${card.title} — ${realmInfo.name}`,
    description: card.shareCopy,
    openGraph: {
      title: card.title,
      description: card.shareCopy,
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: card.title,
      description: card.shareCopy,
      images: [ogImageUrl],
    },
  }
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { realm, id } = await params
  const { from } = await searchParams
  const card = await getCard(realm as Realm, id)

  if (!card) {
    notFound()
  }

  const realmInfo = REALM_INFO[card.realm]
  const realmCards = await getCardsByRealm(card.realm)

  // Find previous and next cards
  const currentIndex = realmCards.findIndex(c => c.id === card.id)
  const prevCard = currentIndex > 0 ? realmCards[currentIndex - 1] : null
  const nextCard = currentIndex < realmCards.length - 1 ? realmCards[currentIndex + 1] : null

  const cardUrl = `https://yourdailynorse.com/${card.realm}/${card.id}`

  // Build back link that preserves realm filter
  const homeHref = from ? `/?realm=${from}` : '/'

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-indigo-500 dark:text-parchment-400">
          <li>
            <a href={homeHref} className="hover:text-indigo-700 dark:hover:text-gold-400 transition-colors">
              ← Back
            </a>
          </li>
          <li>/</li>
          <li>
            <span className={`realm-badge realm-badge-${realmInfo.id}`}>
              {realmInfo.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Card Detail Client Component for animations */}
      <CardDetail card={card} realmInfo={realmInfo} />

      {/* Share Bar */}
      <div className="mt-12 border-t border-gold-200 dark:border-indigo-800 pt-8">
        <h3 className="mb-4 text-sm font-medium text-indigo-600 dark:text-parchment-400 uppercase tracking-wider">
          Share this card
        </h3>
        <ShareButtons
          url={cardUrl}
          title={card.title}
          shareCopy={card.shareCopy}
        />
      </div>

      {/* Navigation */}
      <nav className="mt-12 grid grid-cols-2 gap-4 pt-8">
        {prevCard ? (
          <a
            href={`/${prevCard.realm}/${prevCard.id}`}
            className="group block overflow-hidden rounded-xl bg-gold-50 dark:bg-indigo-800 transition-all hover:bg-gold-100 dark:hover:bg-indigo-700"
          >
            {/* Accent ribbon */}
            <div className="h-1 bg-gradient-to-r from-crimson-300 to-crimson-400 dark:from-crimson-600 dark:to-crimson-500" />
            <div className="p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-gold-600 dark:text-gold-400">← Previous</span>
              <p className="mt-2 font-serif text-lg text-indigo-900 dark:text-parchment-100 group-hover:text-indigo-950">
                {prevCard.title}
              </p>
            </div>
          </a>
        ) : (
          <div />
        )}
        {nextCard ? (
          <a
            href={`/${nextCard.realm}/${nextCard.id}`}
            className="group block overflow-hidden rounded-xl bg-gold-50 dark:bg-indigo-800 text-right transition-all hover:bg-gold-100 dark:hover:bg-indigo-700"
          >
            {/* Accent ribbon */}
            <div className="h-1 bg-gradient-to-r from-crimson-400 to-crimson-300 dark:from-crimson-500 dark:to-crimson-600" />
            <div className="p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-gold-600 dark:text-gold-400">Next →</span>
              <p className="mt-2 font-serif text-lg text-indigo-900 dark:text-parchment-100 group-hover:text-indigo-950">
                {nextCard.title}
              </p>
            </div>
          </a>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
