# key-runner

## Leaderboard moderation setup

The leaderboard Worker requires an OpenAI API key to moderate nicknames. Set it as a Cloudflare secret, then deploy the Worker:

```powershell
cd rta-leaderboard-api
npx wrangler secret put OPENAI_API_KEY
npm run deploy
```

Without this secret, every nickname moderation request returns `503` and no test record or score is saved.
