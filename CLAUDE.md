# CLAUDE.md

Gulp でビルドし Firebase Hosting にデプロイする静的ポートフォリオサイト。

## コマンド

```shell
npm install      # 依存パッケージのインストール
npm run build    # 全アセットをビルド (テストスクリプトはなく、これを動作確認に使う)
npm run preview  # ファイル監視 + ローカルサーバー起動 (http://localhost:8080)
npx gulp css     # CSS のみビルド
npx gulp html    # HTML のみビルド (3 ページ全て)
```

## 規約

- 表示コンテンツは全て `src/yaml/{en,ja}.yaml` で管理し、テンプレートに直接書かない
- `src/slm/page.slm` は英日で共有するため、キーは `en.yaml` と `ja.yaml` の両方に追加する
- 言語ごとの分岐は `settings.language` で判定する
- 画像は `public/images/` に直接置く (`public/` の HTML と CSS はビルド成果物)

## 注意点

- `npm run preview` は起動時にビルドしないため、先に `npm run build` を実行する
- ブラウザは自動で更新されないため、手動で再読み込みする
- `src/scss/` のサブディレクトリの変更は監視されないため、`npx gulp css` を実行する
- YAML の変更では `index.html` が更新されないため、`npx gulp html` を実行する

## デプロイ

- Pull Request の作成 / 更新時: ブランチ名に対応した Firebase Hosting プレビューチャンネルへ自動デプロイする (`dependencies` ラベル付きは除外)
- `master` への push 時: 本番へ自動デプロイする
