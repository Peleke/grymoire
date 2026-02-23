/**
 * Realm identifiers for content categorization
 */
export type Realm =
  | 'gothic'
  | 'voluspa'
  | 'havamal'
  | 'younger-futhark'
  | 'elder-futhark'
  | 'bind-runes'
  | 'galdrastafir'
  | 'sagas'

/**
 * Core Card schema - the atomic unit of content
 * Every piece of content in the system is a Card
 */
export interface Card {
  /** Unique identifier, used in URLs (slug) */
  id: string

  /** Which realm this card belongs to */
  realm: Realm

  /** Primary display title */
  title: string

  /** Optional poetic/descriptive subtitle */
  subtitle?: string

  /**
   * Primary text content
   * - For runes: the rune character + name
   * - For verses: Old Norse text + translation
   */
  primaryText: string

  /**
   * Secondary supporting text
   * - For runes: phonetic value, numeric value
   * - For verses: transliteration, source info
   * Nullable for letters that are numerals-only (e.g., Gothic ϥ, ψ)
   */
  secondaryText?: string | null

  /**
   * Phonetic value of the letter/rune
   * Null for numerals-only characters (opens numerology hooks)
   */
  phonetic?: string | null

  /**
   * Numeric value (for Gothic letters and runes with numeric associations)
   */
  numericValue?: number | null

  /** Path to associated image */
  image?: string

  /** Thematic tags for cross-referencing */
  tags: string[]

  /** Pre-written social share copy */
  shareCopy: string

  /** Assigned publication date (ISO string) */
  publishDate?: string

  /** Whether this card has been published */
  published?: boolean

  /** Order within the realm (for alphabets, verse numbers) */
  order: number

  /**
   * Source texts for saga entries
   * e.g., ['Heimskringla', 'Ynglinga saga']
   */
  sources?: string[]
}

/**
 * Card frontmatter as stored in MDX files
 */
export interface CardFrontmatter {
  id: string
  realm: Realm
  title: string
  subtitle?: string
  primaryText: string
  secondaryText?: string | null
  phonetic?: string | null
  numericValue?: number | null
  image?: string
  tags: string[]
  shareCopy: string
  publishDate?: string
  published?: boolean
  order: number
  sources?: string[]
}

/**
 * Card with parsed MDX content
 */
export interface CardWithContent extends Card {
  /** Raw MDX content (commentary) */
  content: string
}

/**
 * Realm metadata for display
 */
export interface RealmInfo {
  id: Realm
  name: string
  description: string
  cardCount: number
  color: string
}

export const REALM_INFO: Record<Realm, Omit<RealmInfo, 'cardCount'>> = {
  gothic: {
    id: 'gothic',
    name: 'Gothic Alphabet',
    description: 'The 27 letters of Wulfila\'s script',
    color: 'gold',
  },
  voluspa: {
    id: 'voluspa',
    name: 'Völuspá',
    description: 'The Prophecy of the Seeress',
    color: 'indigo',
  },
  havamal: {
    id: 'havamal',
    name: 'Hávamál',
    description: 'Words of the High One',
    color: 'parchment',
  },
  'younger-futhark': {
    id: 'younger-futhark',
    name: 'Younger Futhark',
    description: 'The 16 Viking Age runes',
    color: 'crimson',
  },
  'elder-futhark': {
    id: 'elder-futhark',
    name: 'Elder Futhark',
    description: 'The 24 ancient runes',
    color: 'gold',
  },
  'bind-runes': {
    id: 'bind-runes',
    name: 'Bind Runes',
    description: 'Combined runic symbols',
    color: 'indigo',
  },
  galdrastafir: {
    id: 'galdrastafir',
    name: 'Galdrastafir',
    description: 'Icelandic magical staves',
    color: 'crimson',
  },
  sagas: {
    id: 'sagas',
    name: 'Sagas',
    description: 'Readings from the Icelandic sagas',
    color: 'parchment',
  },
}
