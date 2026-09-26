# Key-Runner Leaderboard

Cloudflare Pages にそのままアップロードできる静的ランキングページです。ビルドは不要です。

## Cloudflare Pages へ公開

1. Cloudflare ダッシュボードで **Workers & Pages > Create > Pages > Upload assets** を選びます。
2. `leaderboard` フォルダの中身をアップロードして、プロジェクト名を設定します。
3. 発行されたURLをスマートフォンで開いて表示を確認します。

CLIを使う場合は、リポジトリのルートで次を実行します。

```sh
npx wrangler pages deploy ./leaderboard --project-name key-runner-leaderboard
```

ページは `https://rta-leaderboard-api.bvszp558ds.workers.dev/scores` からランキングを取得します。別のAPIを使う場合は、`index.html` の `app.js` より前に `window.LEADERBOARD_API_URL = "https://your-api.example.com";` を設定してください。API側でPagesのオリジンを許可するCORS設定も必要です。