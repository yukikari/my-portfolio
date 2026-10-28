import { profile } from '@/data/profile'
import Section from './Section'
import styles from './Contact.module.scss'

export default function Contact() {
  return (
    <Section id="contact" title="連絡先">
      <p>{profile.contactNote}</p>
      <ul className={styles.list}>
        <li>
          <a href={`mailto:${profile.contact.email}`} className={styles.link}>
            {profile.contact.email}
          </a>
        </li>
        <li>
          <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {profile.contact.githubLabel}
          </a>
        </li>
      </ul>
    </Section>
  )
}
