import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Card, CardWithContent, Realm, CardFrontmatter } from './types'

const contentDirectory = path.join(process.cwd(), 'src/content')

/**
 * Get all cards from a specific realm
 * @param realm - The realm to get cards from
 * @param includeDrafts - Whether to include unpublished cards (default: false)
 */
export async function getCardsByRealm(realm: Realm, includeDrafts = false): Promise<Card[]> {
  const realmDir = path.join(contentDirectory, realm)

  if (!fs.existsSync(realmDir)) {
    return []
  }

  const files = fs.readdirSync(realmDir).filter(f => f.endsWith('.mdx') && !f.startsWith('_'))

  const cards = files.map(filename => {
    const filePath = path.join(realmDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as Card
  })

  // Filter out drafts unless includeDrafts is true
  // Cards must have published: true to be shown (unpublished by default)
  const filtered = includeDrafts
    ? cards
    : cards.filter(c => c.published === true)

  return filtered.sort((a, b) => a.order - b.order)
}

/**
 * Get all cards across all realms
 */
export async function getAllCards(): Promise<Card[]> {
  const realms: Realm[] = ['gothic', 'voluspa', 'havamal', 'younger-futhark', 'elder-futhark', 'sagas']

  const allCards = await Promise.all(
    realms.map(realm => getCardsByRealm(realm))
  )

  return allCards.flat()
}

/**
 * Get a single card by realm and id
 */
export async function getCard(realm: Realm, id: string): Promise<CardWithContent | null> {
  const realmDir = path.join(contentDirectory, realm)
  const files = fs.readdirSync(realmDir).filter(f => f.endsWith('.mdx') && !f.startsWith('_'))

  for (const filename of files) {
    const filePath = path.join(realmDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (data.id === id) {
      return {
        ...(data as Card),
        content,
      }
    }
  }

  return null
}

/**
 * Get all card slugs for static generation
 */
export async function getAllCardSlugs(): Promise<{ realm: Realm; id: string }[]> {
  const cards = await getAllCards()
  return cards.map(card => ({ realm: card.realm, id: card.id }))
}

/**
 * Get cards for today (based on publish date or rotation)
 */
export async function getTodaysCard(): Promise<Card | null> {
  const cards = await getAllCards()
  const today = new Date().toISOString().split('T')[0]

  // First, try to find a card with today's publish date
  const scheduled = cards.find(c => c.publishDate === today)
  if (scheduled) return scheduled

  // Otherwise, rotate through published cards
  const published = cards.filter(c => c.published)
  if (published.length === 0) return cards[0] || null

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )

  return published[dayOfYear % published.length]
}
