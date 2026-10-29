export interface TimelineItem {
  year: string
  title: string
  sub?: string
}

// 経歴は年と節目だけに絞る。制作物の中身は data/works.ts に書く。
export const timeline: TimelineItem[] = [
  { year: '2016', title: '灘中学校 入学' },
  { year: '2018', title: '中学の委員会に動画編集を広め、動画記録の仕組みを整備' },
  { year: '2019', title: 'PKSHA Technology 夏季短期インターン（1回目）', sub: '深層学習を習得' },
  { year: '2020', title: 'PKSHA Technology 夏季短期インターン（2回目）' },
  { year: '2020', title: '生徒会誌 副会長（会誌担当）' },
  { year: '2021', title: '文化委員会に動画班を設立' },
  { year: '2022', title: '灘高等学校 卒業／筑波大学 工学システム学類 入学' },
  {
    year: '2026',
    title: '筑波大学 工学システム学類 卒業',
    sub: '卒業研究：口腔内音源導入による代用発声の自然音声スペクトル再現',
  },
  {
    year: '2026〜',
    title: '筑波大学大学院 エンパワーメント情報学プログラム 一貫制博士課程',
    sub: '音響工学',
  },
]
