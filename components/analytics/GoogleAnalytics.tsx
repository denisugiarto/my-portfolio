'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') {
      return
    }

    // Initialize Web Worker
    const worker = new Worker('/analytics-worker.js')
    
    // Initialize Google Analytics in worker
    worker.postMessage({
      type: 'INIT_GA',
      data: { measurementId }
    })

    // Track initial page view
    const trackPageView = () => {
      worker.postMessage({
        type: 'TRACK_PAGE',
        data: {
          measurementId,
          title: document.title,
          url: window.location.href
        }
      })
    }

    // Listen for worker initialization
    worker.addEventListener('message', (event) => {
      if (event.data.type === 'GA_INITIALIZED') {
        trackPageView()
      }
    })

    // Expose gtag function for manual tracking
    window.gtag = (action: string, category?: string, options?: any) => {
      worker.postMessage({
        type: 'TRACK_EVENT',
        data: {
          action,
          category,
          ...options
        }
      })
    }

    return () => {
      worker.terminate()
    }
  }, [measurementId])

  // Track route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [pathname, measurementId])

  return null
}

// Extend window type for TypeScript
declare global {
  interface Window {
    gtag: (action: string, category?: string, options?: any) => void
  }
}