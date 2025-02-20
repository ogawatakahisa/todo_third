# todo_third

# 🚀 ブランチ戦略（Git Workflow）

フロントとバックを1つのリポジトリで管理？

## 🌟 基本ブランチ

| ブランチ名 | 役割 |
|------------|-------------------------------|
| `main` | 本番環境（Production） |
| `develop` | 開発環境（Staging） |
| `feature/*` | 新機能開発用 |
| `fix/*` | バグ修正用 |
| `hotfix/*` | 本番環境の緊急修正 |

## 📌 ブランチの詳細

### `main`（本番環境）
- AWSの **本番環境** にデプロイされる安定版
- 直接コミットは禁止、**PR経由でマージ**
- `develop` からのマージのみ許可

### `develop`（開発環境）
- **最新の開発コードを統合するブランチ**
- フロント & バックエンドの機能を `feature/*` ブランチで開発し、完成後マージ
- **本番前のテスト用ブランチ**

### `feature/*`（新機能開発）
- **新しい機能を開発するためのブランチ**
- フロントとバックエンドそれぞれに `feature/xxx` を作る
  - 例）`feature/add-todo`（フロント）
  - 例）`feature/api-add-todo`（バックエンド）
- 開発後は `develop` にPRを作成し、マージ

### `fix/*`（バグ修正）
- `develop` のバグ修正用ブランチ
- 例）`fix/todo-edit-bug`

### `hotfix/*`（緊急修正）
- `main` で発生した **致命的バグを修正** するブランチ
- 例）`hotfix/urgent-db-fix`

## 🚀 Git 運用フロー

```mermaid
graph TD;
    main -->|本番環境| develop;
    develop -->|機能開発| feature/add-todo;
    develop -->|機能開発| feature/api-add-todo;
    develop -->|バグ修正| fix/todo-edit-bug;
    develop -->|統合後リリース| main;
    main -->|緊急修正| hotfix/urgent-db-fix;
