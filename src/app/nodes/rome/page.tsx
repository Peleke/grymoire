'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getNodeById, type ContentLink, CONTENT_TYPE_LABELS, contentSlug } from '@/lib/dirdug'

const node = getNodeById('rome')!

// ============================================================================
// Campaign sections — the Ovid Arc, Alaric, Guðríður
// ============================================================================

interface CampaignSection {
  id: string
  title: string
  subtitle: string
  description: string
  contentFilter?: (link: ContentLink) => boolean
}

const CAMPAIGNS: CampaignSection[] = [
  {
    id: 'ovid',
    title: 'The Ovid Arc',
    subtitle: 'Content Batch 1',
    description:
      'A poet publishes a sex manual while the government criminalizes sex. Augustus sleeps with senators\' wives and calls it statecraft. Ovid gets shipped to the edge of the map. The books stay popular. The poet dies in exile. Everyone remembers him anyway.',
    contentFilter: (l) =>
      l.title.includes('Song') ||
      l.title.includes('Tongues') ||
      l.title.includes('Sala') ||
      l.title.includes('Aurelian'),
  },
  {
    id: 'gudridur',
    title: 'Guðríður: The Heir',
    subtitle: 'The heart of Node 0',
    description:
      'What did the pilgrimage actually feel like, day to day? The blisters. The inns. The men who stared. The women who shared bread and stories. The saga sources give us her route. We have to imagine the rest...honestly, without invention, toward the silence the record keeps.',
    contentFilter: (l) => l.title.includes('Guðríður') || l.title.includes('Heir'),
  },
]

// ============================================================================
// Content row
// ============================================================================

function ContentRow({ link }: { link: ContentLink }) {
  const isLive = link.status === 'published' && link.href
  const slug = contentSlug('rome', link.title)

  return (
    <li id={slug} className="flex items-start gap-3 py-2 border-b border-parchment-200/50 dark:border-ink-800/50 last:border-0">
      <span className="mt-0.5 shrink-0 text-[10px] font-medium uppercase tracking-widest text-ink-400 dark:text-parchment-600 w-28">
        {CONTENT_TYPE_LABELS[link.type]}
      </span>
      <div className="flex-1">
        {isLive ? (
          <a href={link.href} className="text-falun-700 dark:text-falun-400 underline decoration-falun-300 dark:decoration-falun-700 underline-offset-2 hover:text-falun-900 dark:hover:text-falun-300 transition-colors">
            {link.title}
          </a>
        ) : (
          <a href={`#${slug}`} className="text-ink-700 dark:text-parchment-300 hover:text-falun-700 dark:hover:text-falun-400 transition-colors">
            {link.title}
          </a>
        )}
        {link.status !== 'published' && (
          <span className="ml-2 inline-flex rounded-full bg-parchment-200 dark:bg-ink-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-500 dark:text-parchment-500">
            {link.status === 'aspirational' ? 'Aspirational' : 'Planned'}
          </span>
        )}
        {link.description && (
          <span className="block mt-1 text-sm leading-relaxed text-ink-500 dark:text-parchment-500">
            {link.description.split('\n\n').map((p, i) => (
              <span key={i} className="block mb-1 last:mb-0">{p}</span>
            ))}
          </span>
        )}
      </div>
    </li>
  )
}

// ============================================================================
// Expandable campaign section
// ============================================================================

function CampaignBlock({ campaign }: { campaign: CampaignSection }) {
  const [expanded, setExpanded] = useState(true)
  const filtered = campaign.contentFilter
    ? node.content.filter(campaign.contentFilter)
    : node.content

  return (
    <div className="mb-12">
      <button
        onClick={() => setExpanded(!expanded)}
        className="group flex w-full items-baseline gap-3 text-left"
      >
        <h3 className="font-serif text-xl font-bold text-ink-950 dark:text-falun-400 group-hover:text-falun-800 dark:group-hover:text-falun-300 transition-colors">
          {campaign.title}
        </h3>
        <span className="text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-parchment-600">
          {campaign.subtitle}
        </span>
        <svg
          className={`ml-auto h-4 w-4 shrink-0 text-ink-400 dark:text-parchment-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-parchment-400 max-w-2xl">
            {campaign.description}
          </p>

          {filtered.length > 0 && (
            <ul className="mt-6 space-y-0">
              {filtered.map((link, i) => (
                <ContentRow key={i} link={link} />
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  )
}

// ============================================================================
// Page
// ============================================================================

export default function RomeCampaignPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <a href="/" className="text-xs font-medium uppercase tracking-widest text-falun-600 dark:text-falun-500 hover:text-falun-800 dark:hover:text-falun-300 transition-colors">
          ← Back to the map
        </a>
        <span className="ml-3 font-mono text-xs text-ink-400 dark:text-parchment-600">
          Node {String(node.order).padStart(2, '0')}
        </span>

        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-ink-950 dark:text-falun-400 sm:text-5xl">
          {node.name}
        </h1>
        <p className="mt-2 font-serif text-lg italic text-ink-500 dark:text-parchment-500">
          {node.thematicAnchor}
        </p>
      </div>

      {/* Narrative */}
      <div className="mb-12 text-base leading-relaxed text-ink-700 dark:text-parchment-300 space-y-4">
        {node.narrative.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Historical anchors */}
      <div className="mb-12 flex flex-wrap gap-1.5">
        {node.historicalAnchors.map((anchor) => (
          <span
            key={anchor}
            className="inline-flex rounded-full border border-parchment-300 dark:border-ink-700 bg-parchment-100 dark:bg-ink-800 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 dark:text-parchment-400"
          >
            {anchor}
          </span>
        ))}
      </div>

      <hr className="border-parchment-300 dark:border-ink-700 mb-12" />

      {/* Campaign sections */}
      {CAMPAIGNS.map((campaign) => (
        <CampaignBlock key={campaign.id} campaign={campaign} />
      ))}

      {/* All content */}
      <div className="mb-12">
        <h3 className="font-serif text-xl font-bold text-ink-950 dark:text-falun-400 mb-6">
          All planned content
        </h3>
        <ul className="space-y-0">
          {node.content.map((link, i) => (
            <ContentRow key={i} link={link} />
          ))}
        </ul>
      </div>

      {/* Sponsor CTA */}
      <hr className="border-parchment-300 dark:border-ink-700 mb-10" />
      <div className="text-center py-8">
        <p className="font-serif text-lg text-ink-600 dark:text-parchment-400">
          Want to support the Rome research phase?
        </p>
        <p className="mt-2 text-sm text-ink-500 dark:text-parchment-500">
          Sponsorships, collaboration, and language partnerships welcome.
        </p>
        <p className="mt-4 text-sm font-medium text-falun-700 dark:text-falun-400">
          Get in touch.
        </p>
      </div>
    </div>
  )
}
