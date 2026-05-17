import styles from './About.module.scss'

const timeline = [
  { year: '2016', title: '灘中学校 入学' },
  {
    year: '2018',
    title: '中学委員会にて動画編集を波及',
    sub: '動画記録の文化・仕組みを構築',
  },
  {
    year: '2018',
    title: '文化祭にて待ち時間表示システムを自作',
    sub: '複数人がリアルタイムで待ち時間を更新できるプログラムを構築',
  },
  {
    year: '2019',
    title: 'PKSHA Technology 夏季短期インターン（1回目）',
    sub: '深層学習技術への知見を習得',
  },
  {
    year: '2020',
    title: 'PKSHA Technology 夏季短期インターン（2回目）',
  },
  {
    year: '2020',
    title: '生徒会誌 副会長（会誌担当）',
    sub: '紙面デザインを初めて内製化、例年の2倍の誌面を製作',
  },
  {
    year: '2021',
    title: '文化委員会 動画班を設立',
    sub: 'コロナ禍オンライン文化祭にて30本以上の動画を配信・ライブ中継',
  },
  {
    year: '2022',
    title: '灘高校 卒業 ／ 筑波大学 工学システム学類 入学',
  },
  {
    year: '2026',
    title: '筑波大学 工学システム学類 卒業',
    sub: '卒論：口腔内音源導入による代用発声の自然音声スペクトル再現',
  },
  {
    year: '2026–',
    title: '博士課程 進学（現在）',
    sub: 'エンパワーメント情報学プログラム・専攻：音響工学',
  },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.header}>
        {/* 写真をここに入れる場合は img タグに差し替えてください */}
        <div className={styles.avatar}>
          <img src="/avatar.jpg" alt="安尾 優輝" />
        </div>
        <div>
          <h1 className={styles.name}>安尾 優輝</h1>
          <p className={styles.affiliation}>
            筑波大学 エンパワーメント情報学プログラム（博士課程）
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Timeline */}
        <div>
          <p className={styles.groupLabel}>経歴</p>
          <ol className={styles.timeline}>
            {timeline.map((item, i) => (
              <li key={i} className={styles.timelineItem}>
                <span className={styles.year}>{item.year}</span>
                <div className={styles.dotCol}>
                  <span className={styles.dot} />
                  {i < timeline.length - 1 && <span className={styles.line} />}
                </div>
                <div className={styles.content}>
                  <p className={styles.timelineTitle}>{item.title}</p>
                  {item.sub && <p className={styles.timelineSub}>{item.sub}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Hobbies */}
        <div>
          <p className={styles.groupLabel}>趣味・関心</p>
          <div className={styles.chips}>
            <span className={styles.chip}>映画</span>
            <span className={styles.chip}>合唱</span>
          </div>
          <p className={styles.chipDetail}>🎵 合唱：指揮 ／ パート Tenor</p>
        </div>
      </div>
    </section>
  )
}
