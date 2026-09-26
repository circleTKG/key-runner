# Key-Runner

Key-Runner is a keyboard-focused maze game built with Tauri, Rust, JavaScript, and Three.js. Explore each maze, solve typing doors, and reach the escape gate before the timer runs out.

The repository contains two parts:

- The Tauri desktop application in the repository root.
- The optional leaderboard API in [`rta-leaderboard-api`](rta-leaderboard-api).

# For Developers

## Requirements

- Node.js 18 or later
- Rust 1.77.2 or later
- The platform prerequisites required by [Tauri 2](https://v2.tauri.app/start/prerequisites/)
- A package manager such as npm

## Run the desktop application

Install the root dependencies and start the Tauri development build:

```bash
npm install
npm run dev
```

The frontend is served directly from [`src`](src), as configured in [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json). There is no separate frontend build command.

## Build a distributable application

```bash
npm run build
```

Tauri creates platform-specific bundles under `src-tauri/target`.

## Frontend structure

- [`src/index.html`](src/index.html): home screen, settings, tutorial, and scoreboard UI.
- [`src/key-runner.html`](src/key-runner.html): game screen.
- [`src/src/index.js`](src/src/index.js): home screen state, localization, progression, and leaderboard requests.
- [`src/src/game.js`](src/src/game.js): maze layouts, game loop, typing doors, timers, scoring, and result submission.
- [`src/src/controls.js`](src/src/controls.js): keyboard input handling.
- [`src/style`](src/style): game layout and interaction styles.

Three.js is loaded as an ES module from jsDelivr at runtime. An internet connection is required for that dependency unless it is replaced with a local copy.

## Leaderboard API

The API is a separate Cloudflare Workers project. It uses Cloudflare D1 for score storage and the OpenAI Moderation API to check submitted nicknames.

Install its dependencies and run the Worker locally:

```bash
cd rta-leaderboard-api
npm install
npm run dev
```

Before deploying, configure the D1 database described in [`rta-leaderboard-api/wrangler.jsonc`](rta-leaderboard-api/wrangler.jsonc), apply the migrations, and add the moderation key as a Wrangler secret:

```bash
npx wrangler d1 migrations apply key-runner --remote
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put ADMIN_PASSWORD
npm run deploy
```

`ADMIN_PASSWORD` is required for the hidden score-review screen. In the home screen, click the version at the bottom five times to open the login form. The password is kept as a Cloudflare Worker secret; after login, a signed session token expires after four hours.

The Worker exposes these endpoints:

- `GET /health`: health check.
- `GET /scores`: returns approved and pending scores.
- `POST /scores`: accepts a new score and places it in the pending state.
- `POST /moderate`: checks whether a nickname is suitable for publication.
- `POST /admin/login`: exchanges the admin password for a four-hour session token.
- `GET /admin/scores`: returns all score records with admin authentication.
- `PATCH /admin/scores`: applies 1 to 100 score status changes in one request. The review screen stages changes locally until Apply is selected.

The desktop client uses the deployed API URL defined in [`src/src/index.js`](src/src/index.js). For a local or alternate API, set `window.__KEY_RUNNER_API_URL__` before the application scripts run, or set the `key-runner-api-url` value in `localStorage`.

## Tests

Run the API test suite with:

```bash
cd rta-leaderboard-api
npm test
```

# For Players

## Objective

Find the glowing escape gate at the end of the maze before time runs out.

## Controls

- Move with `W`, `A`, `S`, `D`, or the arrow keys.
- When you are near a red typing door, type the displayed word.
- Press `Enter` to submit the word and open the door.
- Use `Esc` to close an open menu or pause screen.

## Difficulty and progression

Start with the tutorial to learn the controls. Completing a stage unlocks the next difficulty:

1. Tutorial
2. Easy
3. Normal
4. Hard
5. Extreme

Higher difficulties provide less time, slower movement, larger penalties for incorrect typing, and more demanding maze layouts. Extreme mode uses a separate set of advanced vocabulary words.

## Scores and privacy

After clearing Extreme, you can choose whether to submit your run to the online ranking. Submitted scores are initially marked as pending while the nickname is reviewed. The scoreboard displays the best available `RTA any%` times.

If the leaderboard server is unavailable, the game remains playable, but the run cannot be immediately saved to the online ranking.

## Language and accessibility settings

The game supports Japanese, English, and Spanish. The settings menu also provides small, medium, and large text sizes. Progress and preferences are stored locally in the application.

## License

Key-Runner is released under the MIT License. See [`LICENSE`](LICENSE) for details.