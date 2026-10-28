import { profile } from '@/data/profile'
import { assetPath } from '@/lib/assetPath'
import Section from './Section'
import styles from './About.module.scss'

export default function About() {
  return (
    <Section
      id="about"
      title="自己紹介"
      first
      aside={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.avatar}
          src={assetPath('/avatar.jpg')}
          alt={`${profile.name}の写真`}
          width={112}
          height={112}
        />
      }
    >
      {profile.intro.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </Section>
  )
}
