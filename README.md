# 安尾 優輝のポートフォリオ

Next.js (App Router) で構築し、GitHub Pages に静的サイトとして公開しているポートフォリオサイト。
コンテンツは `data/` 配下の TypeScript ファイルで管理しており、ビルド時に静的 HTML へ埋め込まれる。

## 技術スタック

| 技術 | 選定理由 |
|------|----------|
| Next.js 14 (App Router) | `output: 'export'` による完全な静的サイト生成。サーバー処理なしで GitHub Pages に配信できる |
| TypeScript | 型定義による補完とバグの早期検出。`data/` のコンテンツ型を一元管理できる |
| SCSS Modules | コンポーネント単位でスタイルをスコープし、ネストや変数で見通しよく書いた |
| next/font | Google Fonts をビルド時にセルフホスト化し、レンダーブロッキングなしで日本語/欧文フォントを提供 |

## データ管理について

以前は Supabase (PostgreSQL) からスキルデータを取得していたが、サイト全体が静的公開のみのため、
現在は `data/skills.ts` / `data/timeline.ts` / `data/works.ts` にコンテンツを直接記述する構成に変更した。
Server Component 側で DB へ問い合わせる必要がなくなり、ビルド・デプロイの単純化と依存の削減を実現している。

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
