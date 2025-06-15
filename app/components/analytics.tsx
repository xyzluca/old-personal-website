'use client'

import { useEffect, useState } from 'react'

type DeferredAnalyticsProps = {
  gaId: string
}

export function DeferredAnalytics({ gaId }: DeferredAnalyticsProps) {
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Nur in Produktion laden
    if (process.env.NODE_ENV !== 'production') return

    // Event-Listener für verschiedene Interaktionen hinzufügen
    const handleInteraction = () => setHasInteracted(true)
    
    // Nach 3 Sekunden Inaktivität oder nach Interaktion laden
    const idleTimer = setTimeout(() => setHasInteracted(true), 3000)
    
    // Verschiedene Interaktionstypen abfangen
    window.addEventListener('scroll', handleInteraction, { once: true })
    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })
    window.addEventListener('mousemove', handleInteraction, { once: true })
    
    return () => {
      clearTimeout(idleTimer)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('mousemove', handleInteraction)
    }
  }, [])
  
  useEffect(() => {
    // Google Analytics erst nach Nutzerinteraktion laden
    if (!hasInteracted) return
    
    // Google Tag Manager Script erstellen
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.defer = true
    script.async = true
    document.head.appendChild(script)
    
    // Global gtag Funktion einrichten
    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args: any[]) {
      window.dataLayer!.push(args)
    }
    
    // Analytics initialisieren
    window.gtag('js', new Date())
    window.gtag('config', gaId, {
      send_page_view: false // Verhindert automatisches Senden beim Laden
    })
    
    // Beim ersten Rendering eine PageView senden
    window.gtag('event', 'page_view')
    
    // Script beim Unmounten entfernen
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [hasInteracted, gaId])

  // Keine sichtbaren Elemente rendern
  return null
}
