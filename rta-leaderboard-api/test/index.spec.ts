import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { beforeAll, describe, it, expect } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

	describe("leaderboard worker", () => {
		beforeAll(async () => {
		await env.DB.prepare("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, run_id TEXT NOT NULL UNIQUE, nickname TEXT NOT NULL, clear_time INTEGER NOT NULL, score INTEGER NOT NULL, total_score INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
		});

		it("returns a health response", async () => {
			const request = new IncomingRequest("http://example.com/health");
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(200);
			expect(await response.json()).toEqual({ ok: true });
		});

		it("returns the D1 score collection", async () => {
			const response = await SELF.fetch("https://example.com/scores");
			expect(response.status).toBe(200);
			const body = await response.json() as { scores: unknown[] };
			expect(Array.isArray(body.scores)).toBe(true);
		});
	});
