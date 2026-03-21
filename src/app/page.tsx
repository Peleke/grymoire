'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import NodePanel from '@/components/dirdug/NodePanel'
import RouteList from '@/components/dirdug/RouteList'
import type { RouteNode } from '@/lib/dirdug'

// Leaflet must be loaded client-side only
const ExpeditionMap = dynamic(() => import('@/components/dirdug/ExpeditionMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-parchment-100 dark:bg-ink-900">
      <span className="font-mono text-sm text-ink-400 dark:text-parchment-600 animate-pulse">
        Loading map...
      </span>
    </div>
  ),
})

export default function HomePage() {
  const [selectedNode, setSelectedNode] = useState<RouteNode | null>(null)

  return (
    <div className="relative">
      {/* ================================================================ */}
      {/* Hero */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-4xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 dark:text-falun-400 sm:text-5xl">
          Ðirðug
        </h1>
        <p className="mt-2 font-serif text-xl text-ink-600 dark:text-parchment-400 sm:text-2xl">
          The Long Road North
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700 dark:text-parchment-300">
          An inverse pilgrimage across Europe. Language, history, martial tradition.
          Starting in Rome, following the reverse path of Guðríður Þorbjarnardóttir, the
          farthest-traveled woman of the medieval world. Each stop generates essays, field recordings,
          and research tied to its local significance.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-ink-500 dark:text-parchment-500">
          22 stops. Rome to Atlanta. Germanic migrations, traced in reverse.
        </p>
      </section>

      {/* ================================================================ */}
      {/* Map */}
      {/* ================================================================ */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ zIndex: 0, isolation: 'isolate' }}>
        <div className="overflow-hidden rounded-xl border border-parchment-300 dark:border-ink-700 card-shadow">
          <div className="h-[50vh] min-h-[400px] sm:h-[60vh] lg:h-[65vh]">
            <ExpeditionMap
              onNodeSelect={setSelectedNode}
              selectedNodeId={selectedNode?.id}
            />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-400 dark:text-parchment-600">
          Click a node to see its thematic context and planned content.
        </p>
      </section>

      {/* ================================================================ */}
      {/* Node detail panel (overlays the map) */}
      {/* ================================================================ */}
      <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />

      {/* ================================================================ */}
      {/* Route list */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-950 dark:text-falun-400 mb-2">
          The Route
        </h2>
        <p className="text-sm text-ink-500 dark:text-parchment-500 mb-8">
          Expand each stop to see its narrative context and planned content.
        </p>
        <RouteList />
      </section>

      {/* ================================================================ */}
      {/* Colophon */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <hr className="border-parchment-300 dark:border-ink-700 mb-10" />
        <div className="text-sm leading-relaxed text-ink-500 dark:text-parchment-500 space-y-4">
          <p>
            <strong className="text-ink-700 dark:text-parchment-300">Ðirðug</strong> is alive. Content appears as the journey unfolds. Essays first. Field recordings, language studies, research. HEMA where clubs and scheduling permit. Unreal renders of the scenes we can no longer visit in person.
          </p>
          <p>
            Four threads: Alaric and the fall of Rome. Germanic migrations north and west. Runic and Norse continuity. And the inverse journey of Guðríður Þorbjarnardóttir, whose path from Iceland to Rome this project traces in reverse...and then extends westward, to America, to the terminus.
          </p>
          <p>
            Researcher, host, HEMA practitioner, language partner, Unreal artist along this route? Get in touch.
          </p>
        </div>
      </section>
    </div>
  )
}
