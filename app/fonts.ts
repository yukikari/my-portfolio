import { Space_Grotesk, Zen_Kaku_Gothic_New, IBM_Plex_Sans_JP, JetBrains_Mono } from 'next/font/google'

// Headings — Latin glyphs (name romanization, section labels).
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-display-latin',
})

// Headings — Japanese glyphs. next/font/google has no preloadable
// "japanese" subset for this family, so preload is disabled per
// https://nextjs.org/docs/messages/google-fonts-missing-subsets
export const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  preload: false,
  display: 'swap',
  variable: '--font-display-jp',
})

// Body text (Japanese + Latin fallback).
export const ibmPlexSansJP = IBM_Plex_Sans_JP({
  weight: ['400', '500', '700'],
  preload: false,
  display: 'swap',
  variable: '--font-body',
})

// Years, numeric labels, data readouts.
export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-mono',
})
