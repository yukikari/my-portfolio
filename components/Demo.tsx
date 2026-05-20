import { createClient } from '@/lib/supabase/server'
import styles from './Demo.module.scss'

async function getSkillsFromDB() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('skills')
    .select('id, name, category, level')
    .order('category', { ascending: true })
    .order('level', { ascending: false })

  if (error) {
    console.error('Supabase error:', error.message)
    return []
  }
  return data ?? []
}

export default async function Demo() {
  const skills = await getSkillsFromDB()

  return (
    <section id="demo" className={styles.section}>
      <p className={styles.sectionLabel}>Demo</p>
      <p className={styles.description}>
        このセクションのデータは{' '}
        <code className={styles.code}>Supabase (PostgreSQL)</code>{' '}
        からサーバーサイドで取得しています。
        Next.js の Server Component から直接 SQL クエリを実行し、
        カテゴリ順・習熟度順でソートして表示しています。
      </p>

      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <span className={styles.dbIcon}>⬡</span>
          <span className={styles.boxTitle}>skills テーブル — SELECT クエリ結果</span>
          <span className={styles.rowCount}>{skills.length} rows</span>
        </div>

        {skills.length === 0 ? (
          <p className={styles.empty}>
            データが取得できませんでした。
            <br />
            <span className={styles.emptyNote}>
              .env.local に Supabase の接続情報を設定し、skills テーブルを作成してください。
              （README を参照）
            </span>
          </p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>category</th>
                  <th>level</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className={styles.idCell}>{skill.id}</td>
                    <td>{skill.name}</td>
                    <td>
                      <span className={`${styles.badge} ${skill.category === 'engineering' ? styles.badgeEng : styles.badgeCreative}`}>
                        {skill.category}
                      </span>
                    </td>
                    <td>
                      <div className={styles.levelBar}>
                        <div
                          className={styles.levelFill}
                          style={{ width: `${skill.level}%` }}
                        />
                        <span className={styles.levelNum}>{skill.level}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <p className={styles.note}>
        実装の詳細（テーブル定義・RLS設定）は{' '}
        <a
          href="https://github.com/yukikari/my-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub README
        </a>{' '}
        に記載しています。
      </p>
    </section>
  )
}
