import styles from './Skills.module.scss'

const engineeringSkills = [
  { name: 'SQL', level: 75 },
  { name: 'Next.js', level: 65 },
  { name: 'React', level: 60 },
  { name: 'Python / 深層学習', level: 55 },
]

const creativeSkills = [
  { name: '動画制作', level: 85 },
  { name: '文章編集・校正', level: 80 },
  { name: '紙面デザイン', level: 75 },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <p className={styles.sectionLabel}>Skills</p>
      <div className={styles.grid}>
        <div>
          <p className={styles.groupLabel}>エンジニアリング</p>
          {engineeringSkills.map((skill) => (
            <div key={skill.name} className={styles.skillRow}>
              <span className={styles.skillName}>{skill.name}</span>
              <div className={styles.barBg}>
                <div
                  className={styles.barFill}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className={styles.groupLabel}>クリエイティブ</p>
          {creativeSkills.map((skill) => (
            <div key={skill.name} className={styles.skillRow}>
              <span className={styles.skillName}>{skill.name}</span>
              <div className={styles.barBg}>
                <div
                  className={styles.barFill}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
