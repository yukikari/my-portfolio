import { works } from '@/data/works'
import styles from './Works.module.scss'

export default function Works() {
  return (
    <section id="works" className={`wrap ${styles.section}`}>
      <h2 className={styles.heading}>制作と研究</h2>
      <ul className={styles.list}>
        {works.map((work) => (
          <li key={work.title} className={styles.work}>
            <div className={styles.head}>
              <h3 className={styles.title}>{work.title}</h3>
              <span className={styles.period}>{work.period}</span>
            </div>
            <p className={styles.role}>{work.role}</p>
            <div className={styles.body}>
              {work.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
