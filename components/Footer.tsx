import { profile } from '@/data/profile'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`wrap ${styles.footer}`}>
      <small>© 2026 {profile.name}</small>
    </footer>
  )
}
