/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimiert für moderne Browser
  experimental: {
    optimizeFonts: true,
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
  // Moderne Kompilierung nutzen
  swcMinify: true,
  // Modul-Optimierungen
  modularizeImports: {
    '@next/third-parties/google': {
      transform: '@next/third-parties/google/{{member}}'
    }
  }
}

module.exports = nextConfig
