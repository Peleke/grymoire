'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ROUTE_NODES,
  ARCS,
  CONTENT_TYPE_LABELS,
  contentSlug,
  type RouteNode,
  type ContentLink,
} from '@/lib/dirdug'

// ============================================================================
// Compact content preview
// ============================================================================

function ContentPreview({ link, nodeId }: { link: ContentLink; nodeId: string }) {
  const isLive = link.status === 'published'
  const slug = contentSlug(nodeId, link.title)

  return (
    <li id={slug} className="flex items-start gap-2 text-sm">
      <span
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
          isLive
            ? 'bg-falun-600 dark:bg-falun-400'
            : link.status === 'aspirational'
              ? 'border border-parchment-400 dark:border-ink-600'
              : 'bg-parchment-400 dark:bg-ink-600'
        }`}
      />
      <span className="text-xs uppercase tracking-wider text-ink-400 dark:text-parchment-600 w-20 shrink-0 mt-0.5">
        {CONTENT_TYPE_LABELS[link.type]}
      </span>
      <span className="flex-1">
        {isLive && link.href ? (
          <a
            href={link.href}
            className="text-falun-700 dark:text-falun-400 underline underline-offset-2 decoration-falun-300 dark:decoration-falun-700"
          >
            {link.title}
          </a>
        ) : (
          <a href={`#${slug}`} className="text-ink-500 dark:text-parchment-500 hover:text-falun-700 dark:hover:text-falun-400 transition-colors">
            {link.title}
          </a>
        )}
        {link.description && (
          <span className="block mt-0.5 text-[11px] leading-relaxed text-ink-400 dark:text-parchment-600 space-y-1">
            {link.description.split('\n\n').map((p, i) => (
              <span key={i} className="block">{p}</span>
            ))}
          </span>
        )}
      </span>
    </li>
  )
}

// ============================================================================
// Expandable node row
// ============================================================================

function NodeRow({ node, isLast }: { node: RouteNode; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const hasPublished = node.content.some((c) => c.status === 'published')

  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div
          className={`absolute left-[11px] top-7 bottom-0 w-px ${
            node.liminal
              ? 'border-l border-dashed border-parchment-400 dark:border-ink-600'
              : 'bg-parchment-300 dark:bg-ink-700'
          }`}
        />
      )}

      {/* Node header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group flex w-full items-start gap-4 text-left py-3 transition-colors hover:bg-parchment-100/50 dark:hover:bg-ink-800/50 rounded-lg px-2 -mx-2"
      >
        {/* Marker dot */}
        <span
          className={`mt-1.5 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border-2 ${
            node.liminal
              ? 'border-dashed border-parchment-400 dark:border-ink-600 bg-transparent'
              : hasPublished
                ? 'border-falun-700 dark:border-falun-500 bg-falun-700 dark:bg-falun-500'
                : 'border-falun-700/60 dark:border-falun-500/60 bg-parchment-50 dark:bg-ink-950'
          }`}
        >
          <span className="font-mono text-[9px] font-bold leading-none text-parchment-50 dark:text-ink-950">
            {!node.liminal && String(node.order).padStart(2, '0')}
          </span>
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-parchment-100 group-hover:text-falun-800 dark:group-hover:text-falun-400 transition-colors">
              {node.name}
            </h3>
          </div>
          <p className="mt-0.5 text-sm text-ink-500 dark:text-parchment-500 line-clamp-1">
            {node.thematicAnchor}
          </p>
          {node.campaignPage && (
            <a
              href={node.campaignPage}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-falun-700 dark:text-falun-400 hover:text-falun-900 dark:hover:text-falun-300 transition-colors"
            >
              Explore this stop →
            </a>
          )}
        </div>

        {/* Expand chevron */}
        <svg
          className={`mt-2 h-4 w-4 shrink-0 text-ink-400 dark:text-parchment-600 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-[39px] pr-2 pb-4">
              {/* Narrative */}
              <div className="text-sm leading-relaxed text-ink-600 dark:text-parchment-400 mb-4 space-y-2">
                {node.narrative.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Faces */}
              {node.faces && node.faces.length > 0 && (
                <div className="mb-4 space-y-2">
                  {node.faces.map((face, i) => (
                    <div
                      key={i}
                      className={`rounded border p-2.5 text-sm ${
                        face.aspirational
                          ? 'border-dashed border-parchment-400 dark:border-ink-600'
                          : 'border-parchment-300 dark:border-ink-700'
                      }`}
                    >
                      <span className="font-serif font-semibold text-ink-800 dark:text-parchment-200">
                        {face.name}
                      </span>
                      {face.aspirational && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-ink-400 dark:text-parchment-600">
                          aspirational
                        </span>
                      )}
                      <p className="mt-1 text-ink-500 dark:text-parchment-500 leading-relaxed">
                        {face.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Historical anchors */}
              {node.historicalAnchors.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {node.historicalAnchors.map((anchor) => (
                    <span
                      key={anchor}
                      className="inline-flex rounded-full border border-parchment-300 dark:border-ink-700 bg-parchment-100 dark:bg-ink-800 px-2 py-0.5 text-[10px] font-medium text-ink-500 dark:text-parchment-500"
                    >
                      {anchor}
                    </span>
                  ))}
                </div>
              )}

              {/* Content links */}
              {node.content.length > 0 && (
                <ul className="space-y-1.5">
                  {node.content.map((link, i) => (
                    <ContentPreview key={i} link={link} nodeId={node.id} />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// RouteList
// ============================================================================

export default function RouteList() {
  // Group by arc
  const arcGroups = ARCS.map((arc) => ({
    ...arc,
    nodes: ROUTE_NODES.filter((n) => n.arc === arc.id),
  })).filter((g) => g.nodes.length > 0)

  return (
    <div className="space-y-8">
      {arcGroups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-parchment-600">
            {group.name}
          </h3>
          <div>
            {group.nodes.map((node, i) => (
              <NodeRow
                key={node.id}
                node={node}
                isLast={i === group.nodes.length - 1 && group.id === 'america'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
