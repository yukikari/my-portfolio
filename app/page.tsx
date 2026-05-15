import Nav from '@/components/Nav'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Demo from '@/components/Demo'
import Contact from '@/components/Contact'
import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <About />
        <Skills />
        <Demo />
        <Contact />
      </main>
    </>
  )
}
