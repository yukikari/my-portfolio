import type { Metadata } from 'next'
import { spaceGrotesk, zenKakuGothicNew, ibmPlexSansJP, jetBrainsMono } from './fonts'
import { assetPath } from '@/lib/assetPath'
import './globals.scss'

export const metadata: Metadata = {
  metadataBase: new URL('https://yukikari.github.io/portfolio'),
  title: '安尾 優輝 | Portfolio',
  description: '筑波大学 エンパワーメント情報学プログラム 博士課程 — 音響工学・システム開発',
  openGraph: {
    title: '安尾 優輝 | Portfolio',
    description: '音響工学・システム開発・映像制作 — 筑波大学 博士課程',
    url: '/',
    siteName: '安尾 優輝 | Portfolio',
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
  name: '安尾 優輝',
  alternateName: 'Yuki Yasuo',
  url: 'https://yukikari.github.io/portfolio/',
  affiliation: { '@type': 'CollegeOrUniversity', name: '筑波大学' },
  sameAs: ['https://github.com/yukikari'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${zenKakuGothicNew.variable} ${ibmPlexSansJP.variable} ${jetBrainsMono.variable}`}
    >
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
