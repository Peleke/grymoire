'use client'

import { useMemo } from 'react'
import { remark } from 'remark'
import html from 'remark-html'

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const htmlContent = useMemo(() => {
    // Simple markdown to HTML conversion
    const result = remark()
      .use(html)
      .processSync(content)
    return result.toString()
  }, [content])

  return (
    <div
      className="prose-norse"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
