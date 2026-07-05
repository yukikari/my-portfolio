'use client'

import { useEffect, useRef, useState } from 'react'
import { engineeringSkills, creativeSkills, type Skill } from '@/data/skills'
import { useInView } from '@/hooks/useInView'
import styles from './Skills.module.scss'

const SEGMENT_COUNT = 20

function levelToSegments(level: number) {
  return Math.round((level / 100) * SEGMENT_COUNT)
}

function SkillBar({
  skill,
  index,
  pending,
  active,
}: {
  skill: Skill
  index: number
  pending: boolean
  active: boolean
}) {
  const litSegments = levelToSegments(skill.level)

  return (
    <div className={styles.skillRow}>
      <span className={styles.skillName}>{skill.name}</span>
      <div className={styles.segments} role="img" aria-label={`${skill.name}: ${skill.level}%`}>
        {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
          const lit = i < litSegments
          const opacity = lit ? 0.45 + (i / SEGMENT_COUNT) * 0.55 : 1
          const classNames = [
            styles.segment,
            lit ? styles.lit : '',
            pending ? styles.pending : '',
            active ? styles.animate : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <span
              key={i}
              className={classNames}
              style={{
                opacity: lit ? opacity : undefined,
                transitionDelay: active ? `${index * 60 + i * 18}ms` : undefined,
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>
      <span className={styles.skillLevel}>{skill.level}</span>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)
  // Only collapse segments into their pre-animation state once mounted
  // client-side, so no-JS / pre-hydration output always shows full bars.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pending = mounted && !inView

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>Skills</p>
      <div className={styles.grid}>
        <div>
          <p className={styles.groupLabel}>エンジニアリング</p>
          {engineeringSkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} pending={pending} active={inView} />
          ))}
        </div>
        <div>
          <p className={styles.groupLabel}>クリエイティブ</p>
          {creativeSkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} pending={pending} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
