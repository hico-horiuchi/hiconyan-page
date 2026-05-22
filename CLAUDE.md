# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## アーキテクチャ

静的ポートフォリオサイト。Gulp でビルドし Firebase Hosting にデプロイする。

### データフロー

```
src/yaml/{en,ja}.yaml  →  gulpfile.js (js-yaml で読み込み)
src/slm/page.slm       →  gulp-slm でレンダリング  →  public/{en,ja}.html
src/slm/index.slm      →  gulp-slm でレンダリング  →  public/index.html
src/scss/project.scss  →  gulp-sass + csso (minify)  →  public/app.min.css
```

### コンテンツ管理

**全ての表示コンテンツは YAML ファイルで管理する。**

- `src/yaml/en.yaml` / `src/yaml/ja.yaml` — プロフィール・スキル・職歴・資格・リンクなどを言語別に定義
- テンプレートは `page.slm` の 1 ファイルを英日共有。言語切り替えは `settings.language` フィールドで制御
- `index.html` は言語選択ランディングページ (`index.slm`)

### スタイル

- `@primer/css` を基盤とし、`src/scss/` 配下のモジュール (banner, box, colors, icon, timeline, utilities, variables) で上書き・拡張
- Google Fonts: M PLUS 1p (日本語) / Ubuntu (英語)
- Font Awesome Kit ID は YAML の `settings.fontawesome.kit` で指定

### デプロイ

- Pull Request 作成時: ブランチ名に対応した Firebase Hosting プレビューチャンネルへ自動デプロイ (`dependencies` ラベル付き Pull Request は除外)
- `master` push 時: 本番へ自動デプロイ
- セキュリティスキャン: Trivy で `package-lock.json` を毎 Pull Request チェック

## コマンド

```bash
npm install      # 依存パッケージのインストール
npm run build    # 全アセットをビルド (gulp default)
npm run preview  # ファイル監視 + ローカルサーバー起動 (livereload, http://localhost:8080)
```

個別タスク:

```bash
npx gulp css     # CSS のみビルド
npx gulp html    # HTML のみビルド (3 ページ全て)
```

テストスクリプトはなし。
