import './global.css'
import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { DeferredAnalytics } from './components/analytics'

const atkinson = Atkinson_Hyperlegible({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson'
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Luca Kursawe - Creative Technologist & Portfolio',
    template: '%s | Luca Kursawe',
  },
  description: 'Personal website and portfolio of Luca Kursawe - Creative Technologist, CS Student, and Innovative Tech Projects from Germany',
  keywords: ['Luca Kursawe', 'Creative Technologist', 'Computer Science Student', 'Creative Technology', 'Portfolio', 'Germany', 'Deutschland', 'Kreativ', 'Tech', 'Innovation', 'Student'],
  authors: [{ name: 'Luca Kursawe' }],
  creator: 'Luca Kursawe',
  publisher: 'Luca Kursawe',
  openGraph: {
    title: 'Luca Kursawe - Creative Technologist & Portfolio',
    description: 'Personal website and portfolio of Luca Kursawe - Creative Technologist, CS Student, and Innovative Tech Projects from Germany',
    url: baseUrl,
    siteName: 'Luca Kursawe',
    locale: 'en_US',
    alternateLocale: ['de_DE'],
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Luca Kursawe - Creative Technologist Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luca Kursawe - Creative Technologist & Portfolio',
    description: 'Personal website and portfolio of Luca Kursawe - Creative Technologist, CS Student, and Innovative Tech Projects from Germany',
    images: [`${baseUrl}/og-image.png`],
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
    languages: {
      'en': baseUrl,
      'de': baseUrl,
    },
  },
  category: 'technology',
  classification: 'Business',
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
        atkinson.variable
      )}
    >
      <head>
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        <link rel="alternate" hrefLang="de" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Germany" />
        <meta name="geo.position" content="51.1657;10.4515" />
        <meta name="ICBM" content="51.1657, 10.4515" />
      </head>
      <body className="antialiased max-w-4xl mx-4 mt-8 lg:mx-auto font-atkinson">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Luca Kursawe",
              "jobTitle": "Creative Technologist",
              "description": "Computer Science Student and Creative Technologist specializing in innovative tech projects",
              "url": baseUrl,
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "DE"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Computer Science Program"
              },
              "knowsAbout": ["Creative Technology", "Computer Science", "Innovation", "Digital Art", "Programming", "Tech Art", "Interactive Design"],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Student",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "Germany"
                }
              },
              "sameAs": [
                // Add your social media URLs here if you have them
              ]
            })
          }}
        />
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          <DeferredAnalytics gaId="G-G1973VDXCT" />
        </main>
      </body>
    </html>
  )
}
