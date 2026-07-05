import WaveCanvas from './WaveCanvas'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <WaveCanvas />
      <div className={styles.content}>
        <h1 className={styles.name}>
          安尾 優輝
          <span className={styles.romaji}>YUKI YASUO</span>
        </h1>
        <p className={styles.affiliation}>
          筑波大学 エンパワーメント情報学プログラム（一貫制博士課程）／ 音響工学
        </p>
      </div>
      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <span className={styles.scrollLabel}>SCROLL</span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M1 1l6 6 6-6" />
          <path d="M1 11l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
