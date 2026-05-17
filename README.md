# 安尾 優輝のポートフォリオ

Next.js と Supabase (PostgreSQL) で構築したポートフォリオサイト。
スキルデータはDBで管理しており、サーバーサイドで取得・描画している。

## 技術スタック

| 技術 | 選定理由 |
|------|----------|
| Next.js 14 (App Router) | Server Components でDBアクセスをサーバーに閉じ込め、クライアントへの不要なJS送信を避けた |
| TypeScript | 型定義による補完とバグの早期検出。特にSupabaseのレスポンス型との整合性管理に効いた |
| SCSS Modules | コンポーネント単位でスタイルをスコープし、ネストや変数で見通しよく書いた |
| Supabase (PostgreSQL) | SQLをそのまま書けること、RLSでアクセス制御を宣言的に管理できることを評価して採用 |
| Vercel | Next.jsとの親和性が高く、pushのたびに自動でデプロイが走る点が開発体験としてよかった |

## Demoセクションについて

`/components/Demo.tsx` をasync Server Componentとして実装し、リクエスト時にSupabaseへ直接クエリを発行している。
`useEffect` を使ったクライアントサイドフェッチと比べて、初期表示が速くSEOにも有利な構成になっている。

```sql
SELECT id, name, category, level
FROM skills
ORDER BY category ASC, level DESC;
```

## 実装中に詰まった点

**Server ComponentからのSupabase接続**
最初、クライアントコンポーネントと同じ感覚で`useEffect`を書こうとしてエラーになった。
Server Componentでは`async/await`でそのままデータ取得できることを確認してから書き直した。

**RLSの設定**
Supabaseはデフォルトで全アクセスをブロックする。最初はデータが返ってこず原因がわからなかったが、
RLSポリシーで`anon`ロールへのSELECTを明示的に許可することで解決した。