'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { works, type Work, type WorkCategory } from '@/data/works'
import { assetPath } from '@/lib/assetPath'
import { useInView } from '@/hooks/useInView'
import styles from './Works.module.scss'

const categoryClass: Record<WorkCategory, string> = {
  システム開発: styles.categoryDev,
  動画制作: styles.categoryVideo,
  紙面デザイン: styles.categoryDesign,
  研究: styles.categoryResearch,
}

function WorkCardBody({ work }: { work: Work }) {
  return (
    <>
      <div className={`${styles.thumbnail} ${!work.thumbnail ? categoryClass[work.category] : ''}`}>
        {work.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={assetPath(work.thumbnail)} alt="" />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.badge}>{work.category}</span>
          <span className={styles.year}>{work.year}</span>
        </div>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.description}>{work.description}</p>
        {work.link && (
          <span className={styles.linkIcon} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        )}
      </div>
    </>
  )
}

function WorkCard({ work, className, style }: { work: Work; className: string; style?: CSSProperties }) {
  const content: ReactNode = <WorkCardBody work={work} />

  if (work.link) {
    return (
      <a href={work.link} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    )
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  )
}

export default function Works() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)

  return (
    <section id="works" className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>Works</p>
      <div className={styles.grid}>
        {works.map((work, i) => (
          <WorkCard
            key={work.title}
            work={work}
            className={`${styles.card} ${inView ? styles.visible : ''}`}
            style={{ transitionDelay: inView ? `${i * 80}ms` : undefined }}
          />
        ))}
      </div>
    </section>
  )
}
