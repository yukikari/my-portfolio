import { profile } from '@/data/profile'
import { voiceLinePath, VOICE_LINE_WIDTH, VOICE_LINE_HEIGHT } from '@/lib/voiceLine'
import Seal from './Seal'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={`wrap ${styles.hero}`}>
      <div className={styles.head}>
        <h1 className={styles.name}>
          {profile.name}
          <span className={styles.romanized}>{profile.nameRomanized}</span>
        </h1>
        <Seal className={styles.seal} />
      </div>

      {/* 声の線。読み込み時に一度だけ左から現れる（reduced motion では静止） */}
      <svg
        className={styles.voice}
        viewBox={`0 0 ${VOICE_LINE_WIDTH} ${VOICE_LINE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={voiceLinePath()} />
      </svg>

      <p className={styles.tagline}>
        {profile.tagline.map((sentence) => (
          <span key={sentence}>{sentence}</span>
        ))}
      </p>
      <p className={styles.affiliation}>{profile.affiliation}</p>
    </section>
  )
}
