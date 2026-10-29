export interface SkillGroup {
  title: string
  body: string
}

// 数値のレベル表示はやめ、作業の領域ごとに何ができるかを体言止めで書く。
// 3つの見出しは「作業領域」で揃える（成果物名や技術名を混ぜない）。
export const skillGroups: SkillGroup[] = [
  {
    title: '映像制作',
    body: '撮影と、DaVinci Resolveでの編集。字幕と説明テロップの設計、音量の調整、納品仕様の確認、BGMのライセンス確認まで一人で。',
  },
  {
    title: '紙面・文章',
    body: '紙面のレイアウトと、文章の編集・校正。',
  },
  {
    title: 'ソフトウェア開発',
    body: '研究の信号処理や深層学習のコードはPython、このサイトのようなWebはTypeScriptとNext.js。編集ソフトをスクリプトから動かす自動化も。',
  },
]
