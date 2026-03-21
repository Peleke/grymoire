'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  type RouteNode,
  type ContentLink,
  CONTENT_TYPE_LABELS,
  contentSlug,
  getPublishedContent,
  getPlannedContent,
  getAspirationalContent,
} from '@/lib/dirdug'

// ============================================================================
// Content link row
// ============================================================================

function ContentRow({ link, nodeId }: { link: ContentLink; nodeId: string }) {
  const isLive = link.status === 'published' || link.status === 'draft'
  const slug = contentSlug(nodeId, link.title)
  const statusLabel =
    link.status === 'published'
      ? null
      : link.status === 'draft'
        ? 'Draft'
        : link.status === 'aspirational'
          ? 'Aspirational'
          : 'Planned'

  return (
    <li id={slug} className="flex items-start gap-3 py-1.5">
      <span className="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-parchment-600 w-24">
        {CONTENT_TYPE_LABELS[link.type]}
      </span>
      <span className="flex-1">
        {isLive && link.href ? (
          <a
            href={link.href}
            className="text-falun-700 dark:text-falun-400 underline decoration-falun-300 dark:decoration-falun-700 underline-offset-2 transition-colors hover:text-falun-900 dark:hover:text-falun-300"
          >
            {link.title}
          </a>
        ) : (
          <a href={`#${slug}`} className="text-ink-500 dark:text-parchment-500 hover:text-falun-700 dark:hover:text-falun-400 transition-colors">
            {link.title}
          </a>
        )}
        {statusLabel && (
          <span className="ml-2 inline-flex items-center rounded-full bg-parchment-200 dark:bg-ink-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-500 dark:text-parchment-500">
            {statusLabel}
          </span>
        )}
        {link.description && (
          <span className="block mt-1 text-xs leading-relaxed text-ink-400 dark:text-parchment-600 space-y-1.5">
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
// Content section
// ============================================================================

function ContentSection({ title, links, nodeId }: { title: string; links: ContentLink[]; nodeId: string }) {
  if (links.length === 0) return null

  return (
    <div className="mt-5">
      <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ink-400 dark:text-parchment-600 mb-2">
        {title}
      </h4>
      <ul className="space-y-0.5">
        {links.map((link, i) => (
          <ContentRow key={i} link={link} nodeId={nodeId} />
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// NodePanel
// ============================================================================

interface NodePanelProps {
  node: RouteNode | null
  onClose: () => void
}

export default function NodePanel({ node, onClose }: NodePanelProps) {
  return (
    <AnimatePresence mode="wait">
      {node && (
        <>
          {/* Backdrop on mobile */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink-950/20 dark:bg-ink-950/40 md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key={node.id}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-parchment-300 dark:border-ink-700 bg-parchment-50/95 dark:bg-ink-950/95 backdrop-blur-lg shadow-2xl md:top-16"
          >
            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-parchment-200 hover:text-ink-700 dark:text-parchment-500 dark:hover:bg-ink-800 dark:hover:text-parchment-200"
                aria-label="Close panel"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              {/* Node order */}
              <span className="font-mono text-xs text-ink-400 dark:text-parchment-600">
                {String(node.order).padStart(2, '0')}
              </span>

              {/* Title */}
              <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-ink-950 dark:text-falun-400">
                {node.name}
              </h2>

              {/* Thematic anchor */}
              <p className="mt-1 text-sm italic text-ink-500 dark:text-parchment-500">
                {node.thematicAnchor}
              </p>

              {/* Faces (for dual-identity nodes like Iceland) */}
              {node.faces && node.faces.length > 0 && (
                <div className="mt-4 space-y-3">
                  {node.faces.map((face, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border p-3 ${
                        face.aspirational
                          ? 'border-dashed border-parchment-400 dark:border-ink-600'
                          : 'border-parchment-300 dark:border-ink-700'
                      }`}
                    >
                      <h3 className="font-serif text-sm font-semibold text-ink-900 dark:text-parchment-200">
                        {face.name}
                        {face.aspirational && (
                          <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-ink-400 dark:text-parchment-600">
                            Aspirational
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-parchment-400">
                        {face.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Narrative */}
              <div className="mt-5 text-sm leading-relaxed text-ink-700 dark:text-parchment-300 space-y-3">
                {node.narrative.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Historical anchors as tags */}
              {node.historicalAnchors.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {node.historicalAnchors.map((anchor) => (
                    <span
                      key={anchor}
                      className="inline-flex items-center rounded-full border border-parchment-300 dark:border-ink-700 bg-parchment-100 dark:bg-ink-800 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 dark:text-parchment-400"
                    >
                      {anchor}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <hr className="mt-6 border-parchment-300 dark:border-ink-700" />

              {/* Content links */}
              <ContentSection title="Published" links={getPublishedContent(node)} nodeId={node.id} />
              <ContentSection title="In Progress" links={getPlannedContent(node)} nodeId={node.id} />
              <ContentSection title="Aspirational" links={getAspirationalContent(node)} nodeId={node.id} />

              {/* Empty state */}
              {node.content.length === 0 && (
                <p className="mt-6 text-sm italic text-ink-400 dark:text-parchment-600">
                  Content forthcoming.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
