import type { ReactNode } from 'react'
import styles from './Section.module.scss'

/**
 * 左に見出し、右に本文を置く2段組みのセクション。
 * `aside` は見出しの下に置く補助要素（写真など）。
 * `first` を付けたセクションは上の罫線を引かない（Hero の直後に置くもの）。
 */
export default function Section({
  id,
  title,
  aside,
  first = false,
  children,
}: {
  id?: string
  title: string
  aside?: ReactNode
  first?: boolean
  children: ReactNode
}) {
  return (
    <section id={id} className={`wrap ${styles.section} ${first ? styles.first : ''}`}>
      <div className={styles.label}>
        <h2 className={styles.title}>{title}</h2>
        {aside}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
