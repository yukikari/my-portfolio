import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'

// 見出し・名前・制作タイトル用の明朝。
// 日本語フォントは next/font/google で preload できる subset がないため
// preload: false にする（https://nextjs.org/docs/messages/google-fonts-missing-subsets）。
export const notoSerifJP = Noto_Serif_JP({
  weight: ['500', '600'],
  preload: false,
  display: 'swap',
  variable: '--font-serif',
})

// 本文用のゴシック。
export const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500'],
  preload: false,
  display: 'swap',
  variable: '--font-sans',
})
