export type WorkCategory = 'システム開発' | '動画制作' | '紙面デザイン' | '研究'

export interface Work {
  title: string
  year: string // 表示用文字列("2021" / "2018–2021" など)
  category: WorkCategory
  description: string
  link?: string // 外部URL(任意)
  thumbnail?: string // public/ 配下のパス(任意、basePath 処理必須)
}

export const works: Work[] = [
  {
    title: '文化祭 待ち時間表示システム',
    year: '2018',
    category: 'システム開発',
    description: '複数人がリアルタイムで待ち時間を更新できる表示システムを自作。',
  },
  {
    title: 'オンライン文化祭 動画配信',
    year: '2021',
    category: '動画制作',
    description: 'コロナ禍のオンライン文化祭で30本以上の動画を制作・配信、ライブ中継を実施。',
  },
  {
    title: '生徒会誌 紙面デザイン内製化',
    year: '2020',
    category: '紙面デザイン',
    description: '紙面デザインを初めて内製化し、例年の2倍の誌面を製作。',
  },
  {
    title: '卒業研究: 代用発声の音声スペクトル再現',
    year: '2026',
    category: '研究',
    description: '口腔内音源導入による代用発声の自然音声スペクトル再現に関する研究。',
  },
  {
    title: 'ポートフォリオサイト(本サイト)',
    year: '2026',
    category: 'システム開発',
    description: 'Next.js 静的エクスポート + GitHub Pages。Canvas による波形ビジュアル実装。',
    link: 'https://github.com/yukikari/my-portfolio',
  },
]
