'use client'

import { useState, useEffect } from 'react'
import styles from './Nav.module.scss'


interface NavProps {
  showDemo?: boolean
}

export default function Nav({ showDemo = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    ...(showDemo ? [{ href: '#demo', label: 'Demo' }] : []),
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <span className={styles.logo}>安尾 優輝</span>
        <ul className={styles.links}>
          {filteredLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
