# セットアップ・デプロイ手順

## 1. リポジトリをクローンして依存関係をインストール

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/my-portfolio.git
cd my-portfolio
npm install
```

## 2. Supabase プロジェクトの作成

1. [supabase.com](https://supabase.com) でアカウントを作成し、新しいプロジェクトを作成
2. **SQL Editor** で以下を実行

```sql
-- テーブル作成
CREATE TABLE skills (
  id       SERIAL  PRIMARY KEY,
  name     TEXT    NOT NULL,
  category TEXT    NOT NULL CHECK (category IN ('engineering', 'creative')),
  level    INTEGER NOT NULL CHECK (level BETWEEN 0 AND 100)
);

-- インデックス（カテゴリ・レベルでの並び替えを高速化）
CREATE INDEX idx_skills_category ON skills (category);
CREATE INDEX idx_skills_level    ON skills (level DESC);

-- サンプルデータ
INSERT INTO skills (name, category, level) VALUES
  ('SQL',            'engineering', 75),
  ('Next.js',        'engineering', 65),
  ('React',          'engineering', 60),
  ('Python / 深層学習', 'engineering', 55),
  ('動画制作',       'creative',    85),
  ('文章編集・校正',  'creative',    80),
  ('紙面デザイン',   'creative',    75);

-- RLS（Row Level Security）設定
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "skills_read_public"
  ON skills FOR SELECT TO anon
  USING (true);
```

## 3. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、
Supabase の **Project Settings → API** から値を貼り付けます。

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. ローカルで動作確認

```bash
npm run dev
```

http://localhost:3000 で確認します。

## 5. GitHub へ push

```bash
git add .
git commit -m "initial commit"
git push origin main
```

## 6. Vercel でデプロイ

1. [vercel.com](https://vercel.com) でリポジトリをインポート
2. Environment Variables に `.env.local` の2つの値を設定
3. Deploy

## カスタマイズ箇所

| ファイル | 変更内容 |
|----------|----------|
| `components/About.tsx` | 名前・所属・経歴・趣味の文言 |
| `components/Contact.tsx` | GitHub URL・メールアドレス |
| `components/Demo.tsx` | GitHub README リンク |
| `components/Skills.tsx` | スキルバーの数値 |
| `app/layout.tsx` | ページタイトル・description |
