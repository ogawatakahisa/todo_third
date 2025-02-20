# Todoサーバー

このリポジトリは Todo アプリのバックエンドです。API リクエストの処理、ユーザー認証、データベース管理を担当します。


## 技術スタック

・フレームワーク: Express (Node.js)\
・データベース: Prisma (SQLite)\
・認証: AWS Cognito + JWT\
・環境変数管理: dotenv\
・デプロイ: AWS EC2 / Railway / Vercel\


## ディレクトリ構造


```bash
.
├── prisma/  # Prismaの設定
├── src/     # メインのアプリケーションコード
│   ├── config/  # 設定ファイル
│   ├── middleware/  # 認証ミドルウェア
│   ├── index.ts  # エントリーポイント
└── README.md
```


## 環境構築手順

## リポジトリのクローン
```bash
git clone https://github.com/ogawatakahisa/todo-server-sec.git
```


## 依存感関係のインストール

```bash
npm install
```


## データベースのセットアップ


```bash
npx prisma migrate dev --name init
npx prisma generate
```


## サーバーを起動

```bash
npm run dev
```
http://localhost:8080で動作します。


## APIエンドポイント一覧
| メソッド |エンドポイント | 説明 |
| --- | --- | --- |
| GET | /allTodos/:date | 指定した日付のTodoを作成 |
| POST | /createTodo | 新しいTodoを作成 |
| PUT | /editTodo/:id | Todoを更新 |
| DELETE | /deeteTodo/:id | Todoを削除 |


## 関連リポジトリ

・フロントエンドリポジトリ：[todo-client-sec)](https://github.com/ogawatakahisa/todo-client-sec.git)
