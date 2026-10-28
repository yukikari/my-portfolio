import { skillGroups } from '@/data/skills'
import Section from './Section'
import styles from './Skills.module.scss'

export default function Skills() {
  return (
    <Section id="skills" title="できること">
      <dl className={styles.list}>
        {skillGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <dt className={styles.title}>{group.title}</dt>
            <dd className={styles.body}>{group.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
