import './global.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const geistMono = GeistMono.variable

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Luca Kursawe',
    template: '%s | Luca Kursawe',
  },
  description: 'Personal website and portfolio of Luca Kursawe',
  openGraph: {
    title: 'Luca Kursawe',
    description: 'Personal website and portfolio of Luca Kursawe',
    url: baseUrl,
    siteName: 'Luca Kursawe',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Luca Kursawe',
    description: 'Personal website and portfolio of Luca Kursawe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        geistMono
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
