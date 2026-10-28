import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import Works from '@/components/Works'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Works />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
