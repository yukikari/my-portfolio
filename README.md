# 安尾 優輝 — Portfolio

Next.js + Supabase (PostgreSQL) で構築したポートフォリオサイトです。

## 技術スタック・選定理由

| 技術 | 用途 | 選定理由 |
|------|------|----------|
| Next.js 14 (App Router) | フロントエンド・SSR | Server Components により、DBアクセスをサーバーサイドに閉じ込められる |
| TypeScript | 全体 | 型による補完・バグの早期検出 |
| SCSS Modules | スタイリング | コンポーネント単位でスコープを分離しつつ、ネストや変数で可読性を高める |
| Supabase (PostgreSQL) | データベース | SQL をそのまま書けるため、クエリの意図が明確になる。RLS によるアクセス制御も容易 |
| Vercel | デプロイ | Next.js との親和性が高く、GitHub push で自動デプロイ |

## Demo セクションについて

`/components/Demo.tsx` は Server Component として動作します。
ページリクエスト時にサーバーサイドで Supabase に SQL クエリを発行し、
結果を SSR で描画します。クライアントへの JavaScript 送信が不要なため、
パフォーマンスと SEO の観点で有利です。

```sql
SELECT id, name, category, level
FROM skills
ORDER BY category ASC, level DESC;
```

## 詰まったこと・解決したこと

- **Server Component から Supabase へのアクセス**: `async` コンポーネントとして `await` でデータ取得。`useEffect` は不要。
- **RLS の設定**: Supabase はデフォルトで全アクセスをブロックするため、`anon` ロールへの SELECT ポリシーを明示的に作成する必要があった。
