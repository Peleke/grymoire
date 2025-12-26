'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonsProps {
  url: string
  title: string
  shareCopy: string
}

export function ShareButtons({ url, title, shareCopy }: ShareButtonsProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCaption, setCopiedCaption] = useState(false)

  const copyToClipboard = async (text: string, type: 'link' | 'caption') => {
    await navigator.clipboard.writeText(text)
    if (type === 'link') {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } else {
      setCopiedCaption(true)
      setTimeout(() => setCopiedCaption(false), 2000)
    }
  }

  const shareToX = () => {
    const text = encodeURIComponent(`${shareCopy}\n\n${url}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Copy Link */}
      <button
        onClick={() => copyToClipboard(url, 'link')}
        className="inline-flex items-center gap-2 rounded-lg border border-gothic-200 dark:border-ink-600 bg-white dark:bg-ink-800 px-4 py-2 text-sm font-medium text-ink-700 dark:text-parchment-200 transition-all hover:border-gothic-300 hover:bg-gothic-50 dark:hover:border-ink-500 dark:hover:bg-ink-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <AnimatePresence mode="wait">
          {copiedLink ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-gothic-700 dark:text-gothic-300"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              Copy link
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Copy Caption */}
      <button
        onClick={() => copyToClipboard(shareCopy, 'caption')}
        className="inline-flex items-center gap-2 rounded-lg border border-gothic-200 dark:border-ink-600 bg-white dark:bg-ink-800 px-4 py-2 text-sm font-medium text-ink-700 dark:text-parchment-200 transition-all hover:border-gothic-300 hover:bg-gothic-50 dark:hover:border-ink-500 dark:hover:bg-ink-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <AnimatePresence mode="wait">
          {copiedCaption ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-gothic-700 dark:text-gothic-300"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              Copy caption
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Share to X */}
      <button
        onClick={shareToX}
        className="inline-flex items-center gap-2 rounded-lg bg-ink-900 dark:bg-parchment-100 px-4 py-2 text-sm font-medium text-white dark:text-ink-900 transition-all hover:bg-ink-800 dark:hover:bg-parchment-200"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share
      </button>
    </div>
  )
}
