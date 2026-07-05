export interface Skill {
  name: string
  level: number // 0–100
}

export const engineeringSkills: Skill[] = [
  { name: 'Python / 深層学習', level: 90 },
  { name: 'Next.js', level: 70 },
  { name: 'React', level: 60 },
  { name: 'SQL', level: 60 },
]

export const creativeSkills: Skill[] = [
  { name: '動画制作', level: 95 },
  { name: '文章編集・校正', level: 85 },
  { name: '紙面デザイン', level: 85 },
]
