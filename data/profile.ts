// サイト全体で使う本人の文章。文言はここだけを直せば反映される。
// 名前と二文は scripts/generate-assets.js（OGP画像）にも同じ値を持たせている。

export const profile = {
  name: '安尾 優輝',
  nameRomanized: 'Yuki Yasuo',
  // Hero の短い二文。研究と制作を無理に一文にまとめない。
  tagline: ['声帯を使えなくなった人のための代用発声を研究しています。', '地域の記録映像や紙面もつくっています。'],
  affiliation: '筑波大学大学院 エンパワーメント情報学プログラム 一貫制博士課程／音響工学',
  // <meta name="description"> と OGP の説明文
  siteDescription: '代用発声の研究と、映像・紙面の制作。筑波大学大学院 博士課程。',
  // About の本文。段落ごとに1要素。Hero と「制作と研究」で書いたことは繰り返さない。
  intro: [
    '中学の委員会で動画記録の仕組みをつくり、文化祭の配信や生徒会誌の紙面づくりを経て、いまは地域の記録映像の編集や、合宿の報告動画の撮影・編集を引き受けています。',
    '合唱団で歌い、指揮も振ります。映画も好きです。',
  ],
  contactNote: 'ご連絡はメールからどうぞ。個人で書いたコードはGitHubに置いています。',
  contact: {
    github: 'https://github.com/yukikari',
    githubLabel: 'github.com/yukikari',
    email: 'yasuoyuki20030513@gmail.com',
  },
  siteUrl: 'https://yukikari.github.io/portfolio/',
} as const
