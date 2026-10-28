> **注記（2026年10月28日）**: この文書は2026年7月の「Spectrogram Dark」刷新時のもの。デザインは2026年10月に紙色の誌面調へ作り直したため、デザイン仕様の節は現行と異なる（現行の決めごとは README.md を参照）。デプロイ手順と技術制約の記述は今も有効。

# ポートフォリオサイト刷新 要件定義書

- 作成日: 2026年7月5日
- 対象リポジトリ: `my-portfolio`(このリポジトリ / https://github.com/yukikari/my-portfolio)
- 公開URL: https://yukikari.github.io/portfolio/
- 本書は実装エージェント(Claude Code / Codex / Antigravity 等)が**会話コンテキストなしで実装できる**ことを目的とした自己完結ドキュメントである。

---

## 1. 目的

現行サイトは「きれいだが没個性」なライトテーマのワンページで、以下の課題がある。

1. 視覚的個性がなく、誰のポートフォリオでも成立するデザイン
2. 本人の専門性(音響工学)がデザインに反映されていない
3. 制作実績(システム開発・動画制作・紙面デザイン)を見せるセクションがない
4. 日本語Webフォント未設定(和文がOSのシステムフォント任せ)
5. OGP・favicon・構造化データがなく、SNSシェア/検索での見栄えが貧弱
6. 静的公開サイトなのに Supabase 依存が残っている

本刷新では、デザインコンセプト **「Spectrogram Dark」**(§4)への全面刷新、**Works セクション新設**、**メタデータ整備**、**Supabase 完全除去**を行う。

## 2. 現状構成と技術制約

### 2.1 リポジトリ構成(2リポジトリ)

| リポジトリ | 役割 | 場所 |
|---|---|---|
| `yukikari/my-portfolio` | ソース(Next.js) | `C:\Users\yuki yasuo\Documents\Projects\my-portfolio` |
| `yukikari/portfolio` | ビルド成果物(GitHub Pages 配信元) | `C:\Users\yuki yasuo\Documents\Projects\my-portfolio-static` |

デプロイフロー(変更しない):
`npm run build:static`(= `node scripts/build-static.js`)→ `STATIC_EXPORT=true` で `next build` → `out/` の中身を `../my-portfolio-static` へ移動(`.git` は温存、`.nojekyll` 生成)→ static リポジトリ側で手動 commit & push。

### 2.2 現行の技術スタック

- Next.js 14.2.3(App Router)/ React 18 / TypeScript 5 / SCSS Modules(sass ^1.77.0)
- `next.config.js`: `STATIC_EXPORT=true` のとき `output: 'export'` + `basePath: '/portfolio'`。`images.unoptimized: true`
- 主要ファイル:
  - `app/layout.tsx`(metadata は title/description のみ)、`app/page.tsx`、`app/globals.scss`、`app/page.module.scss`
  - `components/{Nav,About,Skills,Demo,Contact}.tsx` + 各 `.module.scss`
  - `lib/supabase/`(Supabase クライアント)、`scripts/build-static.js`
  - `public/avatar.jpg`(唯一の静的アセット)

### 2.3 技術制約(必ず守る)

- **GitHub Pages = 静的配信のみ**。サーバー処理・API Route・ISR は使用不可。動きはすべてクライアント JS / CSS で実現する。
- `basePath` は静的ビルド時のみ `/portfolio`。**`public/` 配下の画像を `<img src>` で直接参照する場合、basePath は自動付与されない**。現行コードの `About.tsx` 同様、ビルドモードに応じたプレフィックス処理を踏襲するか、共通ヘルパー(例: `lib/assetPath.ts` の `assetPath(p: string)`)を新設して統一すること。
- `npm run dev`(basePath なし)と `npm run build:static`(basePath あり)の**両方で表示が壊れないこと**。

## 3. スコープ

### In scope
1. デザイン全面刷新「Spectrogram Dark」(§4)
2. Hero セクション新設(Canvas 波形アニメーション)(§4.3)
3. Works セクション新設(§5)
4. Supabase 完全除去・データの静的ファイル化(§6)
5. メタデータ・OGP・favicon・JSON-LD 整備(§7)

### Out of scope(今回はやらない)
- ダーク/ライトのテーマ切替(ダーク固定でよい)
- デプロイ自動化(GitHub Actions 化)— 手動フローを維持
- 多言語対応(日本語のみ)
- Contact のメールアドレス変更(現行の mailto を維持)

## 4. デザイン仕様「Spectrogram Dark」

コンセプト: 音響工学研究者としてのアイデンティティを、スペクトログラム/波形のモチーフとダーク基調で表現する。装飾は「1〜2 要素を丁寧に」。過剰な WebGL・重いライブラリは使わない。

### 4.1 デザイントークン(`app/globals.scss` の CSS 変数を全面置換)

```scss
:root {
  --color-bg: #0A0E14;            // ページ背景(濃紺黒)
  --color-surface: #111823;       // カード・ナビ背景
  --color-surface-raised: #18212F; // ホバー時など一段明るい面
  --color-border: rgba(230, 232, 235, 0.08);
  --color-accent: #00E5C7;        // シアン(周波数の可視化イメージ)
  --color-accent-dim: rgba(0, 229, 199, 0.35);
  --color-accent-faint: rgba(0, 229, 199, 0.08); // チップ背景等
  --color-text: #E6E8EB;
  --color-text-muted: #8A94A6;
  --color-text-faint: #566173;
  --max-width: 960px;             // 860px から拡大
}
```

- コントラスト比(確認済み): `#00E5C7`/`#0A0E14` ≈ 12:1、`#E6E8EB`/`#0A0E14` ≈ 16:1 — いずれも WCAG AA/AAA を満たす。`--color-text-faint` は本文には使わず補助表示のみ。
- 影(shadow)トークンはダーク背景では効果が薄いため、**境界線 + 背景色差**で面の階層を表現する方針に変更。

### 4.2 タイポグラフィ

現行の `globals.scss` 冒頭の Google Fonts `@import` を**削除**し、`next/font/google` に移行する(static export 対応・レンダーブロッキング解消)。

| 用途 | フォント | 指定 |
|---|---|---|
| 見出し(欧文・名前ローマ字) | Space Grotesk | weights 400/500/700 |
| 見出し(和文) | Zen Kaku Gothic New | weights 400/500/700、`preload: false` |
| 本文 | IBM Plex Sans JP | weights 400/500/700、`preload: false` |
| 年号・数値・ラベル | JetBrains Mono | weights 400/600 |

- 実装: `app/fonts.ts`(新規)で定義し、`layout.tsx` で CSS 変数(`--font-display-latin` 等)として `<html>` に付与。SCSS 側は `var(--font-...)` を参照。
- 注意: 日本語フォントは `next/font/google` で `subsets` 指定不可のため `preload: false` とし、`display: 'swap'` を指定。
- 見出しの font-family は `var(--font-display-latin), var(--font-display-jp), sans-serif` の順(欧文グリフは Space Grotesk、和文は Zen Kaku Gothic New にフォールバック)。

### 4.3 Hero セクション(新設: `components/Hero.tsx` + `Hero.module.scss` + `components/WaveCanvas.tsx`)

- 高さ: `min-height: calc(100svh - 64px)` 程度(ナビ分を除いたほぼ全画面)。次セクションが少し見える形でも可。
- 内容:
  - 名前「安尾 優輝」大型タイポ(`clamp(2.5rem, 8vw, 5rem)`)+ ローマ字サブ表記「YUKI YASUO」(Space Grotesk、letter-spacing 広め、`--color-text-muted`)
  - 肩書き: 「筑波大学 エンパワーメント情報学プログラム(一貫制博士課程)/ 音響工学」
  - スクロール誘導(下向き矢印 or 「scroll」縦書きラベル、ゆっくり明滅)
- **背景の Canvas 波形アニメーション**(`WaveCanvas.tsx`、`'use client'`):
  - 手続き生成でよい(音声ファイル・Web Audio 不要)。複数の正弦波の合成 + 時間変化するノイズで「オシロスコープ風の波形ライン」または「スペクトログラム風の縦バー列」を描画。色は `--color-accent` 系、透明度低め(コンテンツの可読性優先、opacity 0.3〜0.5 程度)。
  - `requestAnimationFrame` ループ。**`document.visibilitychange` でタブ非表示時に停止**。IntersectionObserver で画面外に出たら停止。
  - `devicePixelRatio` を考慮した解像度設定(上限 2)。リサイズは debounce して追従。
  - **`prefers-reduced-motion: reduce` の場合はアニメーションせず静止した1フレームのみ描画**(`matchMedia` で判定)。
  - `pointer-events: none`、`aria-hidden="true"`。canvas 非対応/JS 無効時も Hero テキストは通常表示されること(canvas は装飾専用)。
- 既存 About ヘッダーの avatar は About セクション側に残す(Hero には置かない)。

### 4.4 Nav(`components/Nav.tsx` / `Nav.module.scss` 改修)

- 現行のスクロール時ガラスモーフィズムを暗色に変更: `background: rgba(10, 14, 20, 0.75)` + `backdrop-filter: blur(12px)`、下罫線 `--color-border`。
- リンクは `About / Skills / Works / Contact` の4つ(**Demo リンクと `showDemo` prop を削除**、Works を追加)。
- ロゴ(名前)は現行踏襲。ホバー・カレント表示のアクセントは `--color-accent`。

### 4.5 About(`components/About.tsx` / `About.module.scss` 改修)

- 構成(avatar + 経歴タイムライン + 趣味チップ)と文言は現状維持。配色・フォントを新トークンへ。
- タイムラインの意匠変更: 現行の dot + 縦線を「波形ピーク風」に — 各項目のドットを小さな縦バー(高さ違いのバー2〜3本、`--color-accent`)に置換するか、ドットに `box-shadow: 0 0 8px var(--color-accent-dim)` のグロー付与。縦線は `--color-border`。
- 年号は JetBrains Mono、`--color-accent`。
- スクロール入場アニメーション: 各 timeline item がビューポートに入ったら fade + translateY。実装は **CSS Scroll-Driven Animations(`animation-timeline: view()`)を第一候補**とし、`@supports (animation-timeline: view())` で分岐、非対応ブラウザは IntersectionObserver で `.visible` クラス付与のフォールバック(小さな共通フック `hooks/useInView.ts` を新設可)。
- avatar の枠色・影をダークトーンへ調整(現行の青系ライトカラーを除去)。

### 4.6 Skills(`components/Skills.tsx` / `Skills.module.scss` 改修)

- データ取得を Supabase から `data/skills.ts`(§6.2)直読みに変更。async Server Component である必要がなくなる。
- 意匠変更: 単純な塗りバー → **イコライザー風セグメントバー**。
  - 1スキル = 横並びの小セグメント20個(1セグメント = 5%)。`level` に応じた個数が点灯(`--color-accent`、点灯部は左から右へグラデーション的に不透明度を上げてよい)。消灯部は `--color-accent-faint`。
  - 入場時アニメーション: セクションがビューポートに入ったら、セグメントが左から順に立ち上がる(CSS `transition-delay` の階段 or `animation-delay`)。発火は §4.5 と同じ入場検知を再利用。
  - 数値(`level`)を JetBrains Mono で右端に表示(例: `90`)。
- グループラベル「エンジニアリング」「クリエイティブ」は現状維持。

### 4.7 Works(新設 — §5 参照)

### 4.8 Contact(`components/Contact.tsx` / `Contact.module.scss` 改修)

- 構成・リンク先(GitHub / mailto)は現状維持。配色を新トークンへ(surface カード + border、ホバーで `--color-accent` の枠色 + わずかな浮き)。

### 4.9 全体ルール

- アニメーションは **transform / opacity のみ**(layout を発生させるプロパティのアニメーション禁止)。
- レスポンシブ: 現行同様 768px / 480px ブレークポイント。375px 幅で崩れないこと。
- `html { scroll-behavior: smooth }` 維持。`prefers-reduced-motion: reduce` 時は全入場アニメーション無効化(要素は最初から表示状態)。

## 5. Works セクション(新設)

- ファイル: `components/Works.tsx` + `Works.module.scss`、データは `data/works.ts`
- `page.tsx` の配置順: `About → Skills → Works → Contact`。セクション id は `works`。
- 表示: カテゴリバッジ付きカードグリッド(デスクトップ2〜3列、モバイル1列)。カード = surface 背景 + border、ホバーで `--color-surface-raised` + アクセント枠。
- カード内容: タイトル / 年(JetBrains Mono)/ カテゴリバッジ / 説明1〜2行 / (任意)リンクアイコン。サムネイルは任意項目とし、**未設定の場合はカテゴリ別のプレースホルダー背景**(アクセント色の波形パターン等、CSS だけで描けるもの)を表示。
- データ型と初期データ(プレースホルダー。ユーザーが後で自由に差し替える):

```ts
// data/works.ts
export type WorkCategory = 'システム開発' | '動画制作' | '紙面デザイン' | '研究'

export interface Work {
  title: string
  year: string          // 表示用文字列("2021" / "2018–2021" など)
  category: WorkCategory
  description: string
  link?: string         // 外部URL(任意)
  thumbnail?: string    // public/ 配下のパス(任意、basePath 処理必須)
}

export const works: Work[] = [
  { title: '文化祭 待ち時間表示システム', year: '2018', category: 'システム開発',
    description: '複数人がリアルタイムで待ち時間を更新できる表示システムを自作。' },
  { title: 'オンライン文化祭 動画配信', year: '2021', category: '動画制作',
    description: 'コロナ禍のオンライン文化祭で30本以上の動画を制作・配信、ライブ中継を実施。' },
  { title: '生徒会誌 紙面デザイン内製化', year: '2020', category: '紙面デザイン',
    description: '紙面デザインを初めて内製化し、例年の2倍の誌面を製作。' },
  { title: '卒業研究: 代用発声の音声スペクトル再現', year: '2026', category: '研究',
    description: '口腔内音源導入による代用発声の自然音声スペクトル再現に関する研究。' },
  { title: 'ポートフォリオサイト(本サイト)', year: '2026', category: 'システム開発',
    description: 'Next.js 静的エクスポート + GitHub Pages。Canvas による波形ビジュアル実装。',
    link: 'https://github.com/yukikari/my-portfolio' },
]
```

## 6. 完全静的化(Supabase 除去)

### 6.1 削除・変更対象

| 対象 | 処置 |
|---|---|
| `lib/supabase/` ディレクトリ | 削除 |
| `components/Demo.tsx` / `Demo.module.scss` | 削除 |
| `package.json` の `@supabase/ssr`, `@supabase/supabase-js` | dependencies から除去(`npm uninstall`) |
| `.env.local` / `.env*` の Supabase 変数 | 参照コードごと廃止(ファイル自体はユーザー管理のため削除不要) |
| `app/page.tsx` | `Demo` import と `{!isStaticExport && <Demo />}` を削除。`isStaticExport` が他で不要になれば変数ごと削除。`Works` を追加 |
| `components/Nav.tsx` | `showDemo` prop と Demo リンクを削除、Works リンクを追加 |
| `components/Skills.tsx` | Supabase 取得ロジック(`getSkills`)とフォールバック定数を削除し、`data/skills.ts` を import |
| `README.md` | Supabase 前提の記述を静的構成の説明へ更新 |

### 6.2 スキルデータの正データ

**注意: コード内のフォールバック値は古い。** 公開中サイト(ビルド時に DB から取得された値)が最新のため、以下を `data/skills.ts` の初期値とする。

```ts
// data/skills.ts
export interface Skill { name: string; level: number } // level: 0–100

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
```

- 任意(推奨): `About.tsx` にハードコードされたタイムライン配列も `data/timeline.ts` へ抽出し、コンテンツ編集をデータファイルに集約する。文言は現状のまま移すこと。

## 7. メタデータ・OGP・favicon

### 7.1 `app/layout.tsx` の metadata 拡張

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://yukikari.github.io/portfolio'),
  title: '安尾 優輝 | Portfolio',
  description: '筑波大学 エンパワーメント情報学プログラム 博士課程 — 音響工学・システム開発',
  openGraph: {
    title: '安尾 優輝 | Portfolio',
    description: '音響工学・システム開発・映像制作 — 筑波大学 博士課程',
    url: '/',
    siteName: '安尾 優輝 | Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
}
```

- `metadataBase` により相対パスが本番 URL に解決される。dev(basePath なし)での favicon 404 は許容。

### 7.2 静的アセット(新規作成、`public/` 配下)

| ファイル | 仕様 |
|---|---|
| `og-image.png` | 1200×630。新デザイントーン(bg `#0A0E14`、波形ライン `#00E5C7`、名前・肩書きテキスト)。生成方法自由(Node の `canvas`/`sharp` スクリプト、SVG→PNG 変換等)。生成スクリプトを使った場合は `scripts/` に残すこと |
| `favicon.svg` | 波形モチーフ(角丸正方形 `#0A0E14` 地 + シアンの波形ライン)。手書き SVG でよい |
| `favicon.ico` | 上記 SVG から 32×32/16×16 で変換 |
| `apple-touch-icon.png` | 180×180、同モチーフ |

### 7.3 構造化データ

`layout.tsx`(または `page.tsx`)に JSON-LD を `<script type="application/ld+json">` で埋め込む:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "安尾 優輝",
  "alternateName": "Yuki Yasuo",
  "url": "https://yukikari.github.io/portfolio/",
  "affiliation": { "@type": "CollegeOrUniversity", "name": "筑波大学" },
  "sameAs": ["https://github.com/yukikari"]
}
```

## 8. 非機能要件

- **パフォーマンス**: Lighthouse(モバイル)で Performance / Accessibility / SEO 各 90 以上を目標。Canvas ループの CPU 負荷に注意(タブ非表示・画面外での停止は必須要件)。追加 npm 依存は原則なし(アニメーションライブラリ不要。どうしても必要な場合も 10KB gzip 以下に留める)。
- **アクセシビリティ**: 全テキストのコントラスト比 AA 以上。装飾 SVG/canvas は `aria-hidden`。セクション見出しの見出しレベル整合(h1 は Hero の名前のみ)。キーボードでナビゲーション可能。
- **互換性**: 最新の Chrome / Edge / Safari / Firefox。CSS Scroll-Driven Animations 非対応ブラウザでは IntersectionObserver フォールバックで同等の見た目になること。

## 9. 受け入れ基準(チェックリスト)

- [ ] `npm run dev` で全セクション(Hero/About/Skills/Works/Contact)が新デザインで表示される
- [ ] `npx tsc --noEmit` と `npm run lint` がエラーなしで通る
- [ ] ソース全体で `supabase` を grep して 0 件(README の変更履歴的言及を除く)
- [ ] `npm run build:static` が成功し、`../my-portfolio-static` に成果物が配置される
- [ ] basePath 検証: 一時ディレクトリに `portfolio/` フォルダを作って成果物をコピーし、その親を `npx serve`(または `python -m http.server`)で配信 → `http://localhost:3000/portfolio/` で CSS・画像・favicon・canvas がすべて動作
- [ ] Hero の canvas がアニメーションし、タブ非表示で停止する(DevTools Performance で確認)
- [ ] DevTools の Emulate `prefers-reduced-motion: reduce` で canvas が静止画になり、入場アニメーションが無効化される
- [ ] 375px 幅(iPhone SE 相当)でレイアウト崩れなし
- [ ] OGP 確認: ビルド後の `index.html` に `og:image` 等のメタタグが絶対 URL で出力されている
- [ ] Lighthouse(モバイル)Performance / Accessibility / SEO ≥ 90

## 10. 推奨実装順序

1. **静的化リファクタ**(§6): Supabase 除去 + `data/` 新設 → ビルドが通ることを確認(見た目の変更なしで安全に土台を作る)
2. **フォント + デザイントークン**(§4.1–4.2): `next/font` 移行、globals.scss 置換 → 全体がダークになる
3. **既存セクションの restyle**(§4.4–4.6, 4.8): Nav → About → Skills → Contact
4. **Hero + Canvas**(§4.3)
5. **Works 新設**(§5)
6. **メタデータ・アセット**(§7)
7. **検証**(§9)→ `npm run build:static` → static リポジトリで commit & push(push はユーザー確認後)

## 11. 実装ツールに関する補足(発注者向けメモ)

| ツール | 適性 | 備考 |
|---|---|---|
| Claude Code + Sonnet 5 | ◎ 推奨 | この規模のフロントエンド刷新は Sonnet 級で十分。dev サーバー + スクリーンショットの反復確認が可能 |
| Antigravity | ◎(視覚調整に強み) | ブラウザ内蔵の視覚フィードバックループがあり、Canvas の見た目調整フェーズに最適 |
| Codex | ○ | コード生成品質は十分。視覚確認ループは上記2つに一歩譲る |

本書はツール非依存で書かれており、上記いずれでも実装可能。実装後の受け入れ確認は §9 のチェックリストに従うこと。
