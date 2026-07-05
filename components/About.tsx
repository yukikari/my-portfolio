'use client'

import { useRef } from 'react'
import { timeline } from '@/data/timeline'
import { assetPath } from '@/lib/assetPath'
import { useInView } from '@/hooks/useInView'
import styles from './About.module.scss'

export default function About() {
  const timelineRef = useRef<HTMLOListElement>(null)
  const inView = useInView(timelineRef)

  return (
    <section id="about" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={assetPath('/avatar.jpg')} alt="安尾 優輝" />
        </div>
        <div>
          <h2 className={styles.name}>安尾 優輝</h2>
          <p className={styles.affiliation}>
            筑波大学 エンパワーメント情報学プログラム（一貫性博士課程）
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Timeline */}
        <div>
          <p className={styles.groupLabel}>経歴</p>
          <ol className={`${styles.timeline} ${inView ? styles.inView : ''}`} ref={timelineRef}>
            {timeline.map((item, i) => (
              <li
                key={i}
                className={styles.timelineItem}
                style={{ transitionDelay: inView ? `${i * 70}ms` : undefined }}
              >
                <span className={styles.year}>{item.year}</span>
                <div className={styles.dotCol}>
                  <span className={styles.peak} aria-hidden="true">
                    <span className={styles.peakBar} />
                    <span className={styles.peakBar} />
                    <span className={styles.peakBar} />
                  </span>
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
          <p className={styles.chipDetail}>🎵 合唱：指揮 / Tenor</p>
        </div>
      </div>
    </section>
  )
}
