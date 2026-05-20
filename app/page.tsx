import Nav from '@/components/Nav'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Demo from '@/components/Demo'
import Contact from '@/components/Contact'
import styles from './page.module.scss'

export default function Home() {
  const isStaticExport = process.env.STATIC_EXPORT === 'true'

  return (
    <>
      <Nav showDemo={!isStaticExport} />
      <main className={styles.main}>
        <About />
        <Skills />
        {!isStaticExport && <Demo />}
        <Contact />
      </main>
    </>
  )
}

