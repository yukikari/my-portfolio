import type { Metadata } from 'next'
import { notoSerifJP, notoSansJP } from './fonts'
import { assetPath } from '@/lib/assetPath'
import { profile } from '@/data/profile'
import './globals.scss'

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} | Portfolio`,
  description: profile.siteDescription,
  openGraph: {
    title: `${profile.name} | Portfolio`,
    description: profile.siteDescription,
    url: '/',
    siteName: `${profile.name} | Portfolio`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  // Next's `icons` shorthand does not get `basePath` auto-prepended during
  // static export (unlike `openGraph.images`, which resolves against
  // `metadataBase`), so the path is prefixed manually here to avoid a
  // broken favicon on the deployed GitHub Pages site.
  icons: { icon: assetPath('/favicon.svg'), apple: assetPath('/apple-touch-icon.png') },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.nameRomanized,
  url: profile.siteUrl,
  affiliation: { '@type': 'CollegeOrUniversity', name: '筑波大学' },
  sameAs: [profile.contact.github],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
