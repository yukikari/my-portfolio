import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: '安尾 優輝 | Portfolio',
  description: '筑波大学 エンパワーメント情報学プログラム 博士課程 — 音響工学・システム開発',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
