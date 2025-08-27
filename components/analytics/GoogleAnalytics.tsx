'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') {
      return
    }

    // Initialize dataLayer if not already present
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }

    // Initialize Google Analytics
    gtag('js', new Date())
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    })

    // Make gtag available globally
    window.gtag = gtag
  }, [measurementId])

  // Track route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && pathname) {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [pathname, measurementId])

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onError={(error) => {
          console.error('Failed to load Google Analytics:', error)
        }}
      />
    </>
  )
}