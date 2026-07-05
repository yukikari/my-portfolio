# Antigravity 引き継ぎ資料 — ポートフォリオ視覚微調整フェーズ

- 作成日: 2026-07-05
- 対象プロジェクト: `C:\Users\yuki yasuo\Documents\Projects\my-portfolio`(Next.js 14.2.3 App Router + TypeScript + SCSS Modules)
- 公開URL: https://yukikari.github.io/portfolio/(GitHub Pages)
- 一次仕様書: **`docs/requirements.md`**(本書とセットで必ず読むこと。デザイントークン・非機能要件・受け入れ基準の一次ソース)

## 1. 現在の状態

デザイン「Spectrogram Dark」の一次実装は**完了済み**(Claude Sonnet 5 による実装、レビュー済み)。全変更は main の**未コミット作業ツリー**にある(コミットはユーザー確認後)。

検証済み: `npx tsc --noEmit` / `npm run lint` / `STATIC_EXPORT=true npx next build` すべて成功。Supabase 除去済み(grep 0件)。basePath 付きローカル配信で全アセット 200 確認済み。

**未実施(このフェーズでやること)**: 実ブラウザでの見た目の磨き込み、Lighthouse 実測、Firefox での入場アニメーションフォールバック確認。

## 2. 起動・検証方法

```bash
cd "C:\Users\yuki yasuo\Documents\Projects\my-portfolio"
npm install          # 依存が変わっているため初回に実行
npm run dev          # http://localhost:3000(basePath なし)
```

静的ビルド検証(デプロイはしない):
```bash
STATIC_EXPORT=true npx next build   # out/ が生成される(basePath /portfolio 付き)
```
⚠️ **`npm run build:static` は実行禁止**(隣の `../my-portfolio-static` デプロイリポジトリの中身を消して置き換えるため、デプロイ時のみユーザー確認のうえ実行)。

## 3. このフェーズの任務: 視覚微調整

コードの構造は変えず、**見た目のパラメータ調整**に集中する。調整対象と場所:

| 対象 | ファイル | 調整ポイント |
|---|---|---|
| Hero 波形アニメーション | `components/WaveCanvas.tsx` | 冒頭の定数(`LINE_COUNT`)と `drawFrame` 内の amplitude / speed / freq / opacity。現在3本の正弦波合成。「音響研究者のオシロスコープ」らしい説得力が出るまで調整。動きは「ゆったり・上品」方向、チカチカさせない |
| Hero タイポグラフィ | `components/Hero.tsx` / `Hero.module.scss` | 名前の clamp サイズ、字間、ローマ字サブ表記とのバランス、スクロール誘導の明滅速度 |
| Skills イコライザー | `components/Skills.module.scss` | セグメントの立ち上がり stagger タイミング、点灯グラデーション、セグメント形状(角丸・隙間) |
| About タイムライン | `components/About.module.scss` | 波形ピーク意匠(バー/グロー)の見え方、入場アニメーションの距離・時間 |
| Works カード | `components/Works.module.scss` | ホバー遷移、サムネイル未設定時のプレースホルダー背景(CSS 波形パターン) |
| 全体 | `app/globals.scss` | 余白リズム、セクション間の呼吸。**カラートークンの変更は原則しない**(変える場合はコントラスト比 AA を再確認) |

確認ビューポート: 375px / 768px / 1280px。ダークテーマ固定(切替なし)。

## 4. 守るべき制約(requirements.md §8 より)

1. アニメーションは **transform / opacity のみ**
2. **ランタイム npm 依存の追加禁止**(アニメーションライブラリ不可。CSS と素の JS で解決する)
3. `prefers-reduced-motion: reduce` で canvas 静止・入場アニメーション無効(実装済みの挙動を壊さない)
4. `public/` 画像参照は `lib/assetPath.ts` の `assetPath()` を必ず通す(basePath 対応)
5. `npm run dev`(basePath なし)と静的ビルド(basePath `/portfolio`)の両方で動作すること
6. Canvas はタブ非表示・画面外で停止(`WaveCanvas.tsx` 実装済み。パラメータ調整時に壊さない)

## 5. 完了条件(requirements.md §9 の残項目)

- [ ] Lighthouse(モバイル)Performance / Accessibility / SEO ≥ 90 を実測
- [ ] Chrome / Firefox / Safari(可能な範囲)で入場アニメーション確認 — Firefox は CSS Scroll-Driven Animations 非対応のため IntersectionObserver フォールバック(`hooks/useInView.ts`)で同等に見えること
- [ ] `prefers-reduced-motion` エミュレーションで canvas 静止を確認
- [ ] 375px 幅でレイアウト崩れなし
- [ ] 調整後に `npx tsc --noEmit` / `npm run lint` / `STATIC_EXPORT=true npx next build` が通ること

## 6. 実装済みの設計判断(変更しないこと)

- About の名前見出しは `<h2>`(h1 は Hero の名前のみ、ページに1つ)
- `metadata.icons` は `assetPath()` で手動プレフィックス(Next 14.2.3 は icons に basePath を自動付与しないため)
- OGP 画像等は `scripts/generate-og.js`(sharp + png-to-ico)で生成 → `public/` にコミット済み。デザイン変更時はスクリプトを再実行して再生成する
- スキル値の正データは `data/skills.ts`(公開サイトの値に準拠)。文言・実績データは `data/{skills,timeline,works}.ts` に集約

## 7. 仕上げ後の流れ(ユーザー確認後)

1. `my-portfolio` で変更をコミット(まだ一次実装分も未コミットなので一括でよい)
2. `npm run build:static` → `../my-portfolio-static` に成果物が配置される
3. `my-portfolio-static` で commit & push → https://yukikari.github.io/portfolio/ に反映
4. 反映後、X/Slack 等に URL を貼って OGP カードの表示を確認
