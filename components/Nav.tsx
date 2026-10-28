import { profile } from '@/data/profile'
import styles from './Nav.module.scss'

const links = [
  { href: '#about', label: '自己紹介' },
  { href: '#works', label: '制作と研究' },
  { href: '#skills', label: 'できること' },
  { href: '#contact', label: '連絡先' },
]

export default function Nav() {
  return (
    <header className={styles.top}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#" className={styles.name}>
          {profile.name}
        </a>
        <nav className={styles.nav} aria-label="ページ内">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
