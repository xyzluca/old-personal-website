// Globale Typerweiterung für gtag
interface Window {
  dataLayer?: any[]
  gtag?: (...args: any[]) => void
}
