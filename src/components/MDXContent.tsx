'use client'

import { useEffect, useRef, useMemo } from 'react'
import { remark } from 'remark'
import html from 'remark-html'

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const htmlContent = useMemo(() => {
    // Simple markdown to HTML conversion
    const result = remark()
      .use(html, { sanitize: false })
      .processSync(content)
    let rendered = result.toString()

    // Rewrite interlinear.app URLs to env var (for local dev)
    const interlinearUrl = process.env.NEXT_PUBLIC_INTERLINEAR_URL
    if (interlinearUrl && interlinearUrl !== 'https://interlinear.peleke.me') {
      rendered = rendered.replace(/https:\/\/interlinear\.peleke\.me/g, interlinearUrl)
    }

    return rendered
  }, [content])

  // Wire up annotation tap-to-toggle on mobile
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const annotations = container.querySelectorAll('.annotation')
    const isTouch = () => !window.matchMedia('(hover: hover)').matches

    function handleAnnotationClick(this: Element, e: Event) {
      if (!isTouch()) return
      e.stopPropagation()
      const tooltip = this.querySelector('.annotation-tooltip') as HTMLElement
      if (!tooltip) return
      const isVisible = tooltip.style.display === 'block'

      // Close all others
      container!.querySelectorAll('.annotation-tooltip').forEach(t => {
        ;(t as HTMLElement).style.display = 'none'
      })

      if (!isVisible) {
        tooltip.style.display = 'block'
      }
    }

    function handleDocumentClick() {
      if (!isTouch()) return
      container!.querySelectorAll('.annotation-tooltip').forEach(t => {
        ;(t as HTMLElement).style.display = 'none'
      })
    }

    annotations.forEach(el => {
      el.addEventListener('click', handleAnnotationClick)
    })
    document.addEventListener('click', handleDocumentClick)

    return () => {
      annotations.forEach(el => {
        el.removeEventListener('click', handleAnnotationClick)
      })
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [htmlContent])

  return (
    <div
      ref={containerRef}
      className="prose-norse"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
