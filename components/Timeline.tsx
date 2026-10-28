import { timeline } from '@/data/timeline'
import Section from './Section'
import styles from './Timeline.module.scss'

export default function Timeline() {
  return (
    <Section title="経歴">
      <ol className={styles.list}>
        {timeline.map((item) => (
          <li key={`${item.year}-${item.title}`} className={styles.item}>
            <span className={styles.year}>{item.year}</span>
            <div>
              <p className={styles.title}>{item.title}</p>
              {item.sub && <p className={styles.sub}>{item.sub}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
