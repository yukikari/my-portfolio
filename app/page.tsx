import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Works from '@/components/Works'
import Contact from '@/components/Contact'
import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main className={styles.main}>
        <About />
        <Skills />
        <Works />
        <Contact />
      </main>
    </>
  )
}

