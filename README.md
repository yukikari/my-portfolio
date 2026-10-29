# 安尾 優輝のポートフォリオ

Next.js (App Router) で構築し、GitHub Pages に静的サイトとして公開しているポートフォリオサイト。
文章と実績は `data/` 配下の TypeScript ファイルで管理しており、ビルド時に静的 HTML へ埋め込まれる。

公開URL: https://yukikari.github.io/portfolio/

## 技術スタック

| 技術 | 選定理由 |
|------|----------|
| Next.js 14 (App Router) | `output: 'export'` による完全な静的サイト生成。サーバー処理なしで GitHub Pages に配信できる |
| TypeScript | 型定義による補完とバグの早期検出。`data/` のコンテンツ型を一元管理できる |
| SCSS Modules | コンポーネント単位でスタイルをスコープし、ネストや変数で見通しよく書く |
| next/font | Google Fonts をビルド時にセルフホスト化し、レンダーブロッキングなしで和文フォントを提供 |

## デザイン（2026年10月改訂）

黒地にシアンの「Spectrogram Dark」から、紙色の地に墨色の文字を置く印刷物のような見た目へ作り直した。
決めごとは次のとおり。

- 色は `app/globals.scss` の4つだけ: 紙色 `--paper`、墨色 `--ink`、補足用 `--ink-soft`、罫線 `--rule`。アクセントの朱色 `--accent` は落款（名前の横の印）と、リンク（ナビ・本文・連絡先）のホバーにしか使わない
- 書体は明朝（Noto Serif JP: 見出し・名前・制作タイトル）とゴシック（Noto Sans JP: 本文）の2つ。`app/fonts.ts`
- 各セクションは左に見出し、右に本文の2段組み（`components/Section.tsx`）。「制作と研究」だけは全幅で並べて単調さを崩す
- 画像はプロフィール写真1枚。動画の埋め込み・サムネイル・制作物へのリンクは載せない（実績の説明は文章で書く）。外部リンクは連絡先の GitHub だけ
- 自動で動くのは、読み込み時にヒーローの「声の線」（`lib/voiceLine.ts` が生成する決定的な波形）が一度現れるだけ。`prefers-reduced-motion` では静止。ホバーの色変化は操作への反応なので可
- スキルの数値バーは廃止し、作業領域ごとに何ができるかを文章で書く（`data/skills.ts`）
- 落款「優輝」は `lib/sealPaths.ts` の字形パス（Noto Serif CJK JP の輪郭）で描き、`public/favicon.svg` と同じ形

## 文章・実績の編集

| ファイル | 内容 |
|---|---|
| `data/profile.ts` | 名前、ヒーローの二文、所属、自己紹介の段落、連絡先 |
| `data/works.ts` | 制作と研究。並びは見せたい順（おおむね動きの新しいものが上）。`period`（時期）・`role`（担当）・`summary`（段落の配列、体言止め） |
| `data/skills.ts` | できること。見出しは「作業領域」で揃える |
| `data/timeline.ts` | 経歴。年と節目だけを書き、中身は `works.ts` に書く |

文言を変えたら `node scripts/generate-assets.js` で OGP 画像を再生成する（名前・二文・所属はスクリプト内にも持っているので揃える）。

## 静的ビルド・デプロイ

```bash
npm run build:static
```

`scripts/build-static.js` が `STATIC_EXPORT=true` で `next build` を実行し、`out/` の内容を
`../my-portfolio-static`(GitHub Pages 配信用リポジトリ)へ移動する。`.git` は温存され、`.nojekyll` が生成される。
移動後は static リポジトリ側で内容を確認し、手動で commit & push する。

`STATIC_EXPORT=true` のとき `next.config.js` は `output: 'export'` と `basePath: '/portfolio'` を有効化する。
`public/` 配下の画像を `<img src>` で参照する箇所は `lib/assetPath.ts` の `assetPath()` でプレフィックスを付与し、
`npm run dev`(basePath なし)と静的ビルド(basePath あり)の両方で表示が壊れないようにしている。

## 実装中に詰まった点

**Server Component からの外部 DB 接続(旧構成)**
以前 Supabase を使っていた頃、Server Component から `async/await` で直接データ取得する構成にしていたが、
静的エクスポートではサーバー処理自体が存在しないため、ビルド時に解決可能な静的データファイルへ移行した。

**basePath とアセットパス**
GitHub Pages のサブパス配信(`/portfolio/`)と `next dev` のルート配信を両立させるため、
`public/` 配下のアセットは `assetPath()` ヘルパーで明示的にプレフィックスを付与する方針にした。

**metadata.icons と basePath**
Next 14.2.3 は `metadata.icons` に basePath を自動付与しないため、favicon のパスだけ `assetPath()` で手動プレフィックスしている。

## 過去の資料

`docs/requirements.md` と `docs/antigravity-handoff.md` は 2026年7月の「Spectrogram Dark」刷新時の資料で、現行デザインとは異なる。デプロイ手順と技術制約の記述だけが今も有効。
