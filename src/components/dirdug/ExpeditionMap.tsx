'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngTuple } from 'leaflet'
import { ROUTE_NODES, type RouteNode } from '@/lib/dirdug'

// ============================================================================
// Tile URLs
// ============================================================================

const TILES = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

// ============================================================================
// Theme-aware tile layer
// ============================================================================

function ThemeAwareTiles() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return <TileLayer url={dark ? TILES.dark : TILES.light} attribution={ATTRIBUTION} />
}

// ============================================================================
// Fit bounds to all nodes
// ============================================================================

function FitBounds({ nodes }: { nodes: RouteNode[] }) {
  const map = useMap()

  useEffect(() => {
    if (nodes.length === 0) return
    const bounds = nodes.map((n) => n.coordinates as LatLngTuple)
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 })
  }, [map, nodes])

  return null
}

// ============================================================================
// Route line segments — solid for land, dashed for ocean crossings
// ============================================================================

function RouteLines() {
  const segments = useMemo(() => {
    const result: { positions: LatLngTuple[]; dashed: boolean }[] = []
    let current: { positions: LatLngTuple[]; dashed: boolean } | null = null

    for (let i = 0; i < ROUTE_NODES.length; i++) {
      const node = ROUTE_NODES[i]
      const isOcean = node.liminal || node.arc === 'atlantic'

      if (!current || current.dashed !== isOcean) {
        // Carry over the last point so segments connect
        const carryOver: LatLngTuple | null = current ? current.positions[current.positions.length - 1] : null
        current = { positions: carryOver ? [carryOver] : [], dashed: isOcean }
        result.push(current)
      }

      current.positions.push(node.coordinates as LatLngTuple)
    }

    return result
  }, [])

  return (
    <>
      {segments.map((seg, i) => (
        <Polyline
          key={i}
          positions={seg.positions}
          pathOptions={{
            color: seg.dashed ? '#9a7f5c' : '#9a2520',
            weight: seg.dashed ? 2 : 2.5,
            opacity: seg.dashed ? 0.5 : 0.7,
            dashArray: seg.dashed ? '8 6' : undefined,
          }}
        />
      ))}
    </>
  )
}

// ============================================================================
// Node marker styling
// ============================================================================

function getMarkerStyle(node: RouteNode) {
  if (node.liminal) {
    return { radius: 4, fillColor: '#9a7f5c', fillOpacity: 0.4, color: '#9a7f5c', weight: 1, opacity: 0.6 }
  }

  const hasPublished = node.content.some((c) => c.status === 'published')
  if (hasPublished) {
    return { radius: 7, fillColor: '#9a2520', fillOpacity: 0.9, color: '#6e2019', weight: 2, opacity: 1 }
  }
  if (node.status === 'aspirational') {
    return { radius: 5, fillColor: 'transparent', fillOpacity: 0, color: '#9a7f5c', weight: 1.5, opacity: 0.6, dashArray: '3 3' }
  }
  // Planned (default)
  return { radius: 6, fillColor: '#fdf5f4', fillOpacity: 0.9, color: '#9a2520', weight: 2, opacity: 0.8 }
}

// ============================================================================
// Animated route draw — the line traces itself from Rome to Atlanta
// ============================================================================

function AnimatedRouteDraw({ playing, onNodeReached }: { playing: boolean; onNodeReached?: (node: RouteNode) => void }) {
  const map = useMap()

  useEffect(() => {
    if (!playing) return

    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null
    const layers: L.Layer[] = []

    const coords = ROUTE_NODES.map((n) => n.coordinates as LatLngTuple)

    // Interpolate
    const frames: { point: LatLngTuple; nodeIndex: number | null }[] = []
    const pps = Math.floor(600 / (coords.length - 1))
    for (let i = 0; i < coords.length - 1; i++) {
      const [y1, x1] = coords[i]
      const [y2, x2] = coords[i + 1]
      for (let j = 0; j < pps; j++) {
        const t = j / pps
        frames.push({ point: [y1 + (y2 - y1) * t, x1 + (x2 - x1) * t], nodeIndex: j === 0 ? i : null })
      }
    }
    frames.push({ point: coords[coords.length - 1], nodeIndex: coords.length - 1 })

    const solid = L.polyline([], { color: '#9a2520', weight: 2.5, opacity: 0.8 })
    const dashed = L.polyline([], { color: '#9a7f5c', weight: 2, opacity: 0.5, dashArray: '8 6' })
    solid.addTo(map)
    dashed.addTo(map)
    layers.push(solid, dashed)

    let i = 0
    function step() {
      if (cancelled || i >= frames.length) return
      const f = frames[i]
      const n = f.nodeIndex !== null ? ROUTE_NODES[f.nodeIndex] : null

      if (n?.liminal || n?.arc === 'atlantic') {
        dashed.addLatLng(f.point)
      } else {
        solid.addLatLng(f.point)
      }

      if (f.nodeIndex !== null && n && !n.liminal) {
        const m = L.circleMarker(f.point, { radius: 6, fillColor: '#fdf5f4', fillOpacity: 0.9, color: '#9a2520', weight: 2, opacity: 0.8 })
        m.addTo(map)
        layers.push(m)

        const lb = L.marker(f.point, {
          icon: L.divIcon({
            className: 'animate-fade-in',
            html: `<div style="font-family:var(--font-serif);font-size:12px;font-weight:600;color:#9a2520;white-space:nowrap;text-shadow:0 0 4px rgba(253,252,250,.9),0 0 8px rgba(253,252,250,.7);transform:translateY(-20px);pointer-events:none">${n.name}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          }),
        })
        lb.addTo(map)
        layers.push(lb)
        if (onNodeReached) onNodeReached(n)
      }

      i++
      timer = setTimeout(step, 20)
    }

    timer = setTimeout(step, 500)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      layers.forEach((l) => { try { map.removeLayer(l) } catch {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  return null
}

// ============================================================================
// ExpeditionMap
// ============================================================================

interface ExpeditionMapProps {
  onNodeSelect: (node: RouteNode) => void
  selectedNodeId?: string | null
  animating?: boolean
  onNodeReached?: (node: RouteNode) => void
}

export default function ExpeditionMap({ onNodeSelect, selectedNodeId, animating = false, onNodeReached }: ExpeditionMapProps) {
  return (
    <MapContainer
      center={[50, 5]}
      zoom={4}
      className="h-full w-full"
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ background: 'transparent' }}
    >
      <ThemeAwareTiles />
      <FitBounds nodes={ROUTE_NODES} />

      {animating ? (
        <AnimatedRouteDraw playing={animating} onNodeReached={onNodeReached} />
      ) : (
        <>
          <RouteLines />
          {ROUTE_NODES.map((node) => {
            const style = getMarkerStyle(node)
            const isSelected = selectedNodeId === node.id

            return (
              <CircleMarker
                key={node.id}
                center={node.coordinates as LatLngTuple}
                {...style}
                radius={isSelected ? style.radius + 2 : style.radius}
                eventHandlers={{
                  click: () => onNodeSelect(node),
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <span className="font-serif text-sm font-semibold">{node.name}</span>
                </Tooltip>
              </CircleMarker>
            )
          })}
        </>
      )}
    </MapContainer>
  )
}
