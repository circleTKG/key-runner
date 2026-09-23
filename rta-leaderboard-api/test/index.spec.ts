import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { beforeAll, describe, it, expect, vi } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

	describe("leaderboard worker", () => {
		beforeAll(async () => {
		await env.DB.prepare("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, run_id TEXT NOT NULL UNIQUE, nickname TEXT NOT NULL, clear_time INTEGER NOT NULL, score INTEGER NOT NULL, total_score INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'approved', created_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
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

		it("rejects inappropriate nicknames", async () => {
			const request = new IncomingRequest("http://example.com/scores", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					run_id: "blocked-name-test",
					nickname: "s.e.x",
					clear_time: 1234,
					score: 100,
					total_score: 100,
				}),
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(202);
		});

		it("rejects inappropriate Japanese nicknames", async () => {
			const request = new IncomingRequest("http://example.com/scores", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					run_id: "blocked-japanese-name",
					nickname: "ばか",
					clear_time: 1234,
					score: 100,
					total_score: 100,
				}),
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(202);
		});

		it("stores a score as pending without calling OpenAI Moderation", async () => {
			env.OPENAI_API_KEY = "test-key";
			const moderationFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ results: [{ flagged: true }] }), { status: 200 }));
			const request = new IncomingRequest("http://example.com/scores", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					run_id: "moderation-name-test",
					nickname: "flagged-by-model",
					clear_time: 1234,
					score: 100,
					total_score: 100,
				}),
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(202);
			expect(moderationFetch).not.toHaveBeenCalled();
			moderationFetch.mockRestore();
		});

		it("returns the moderation result for Credit test entries", async () => {
			env.OPENAI_API_KEY = "test-key";
			const moderationFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ results: [{ flagged: false }] }), { status: 200 }));
			const request = new IncomingRequest("http://example.com/moderate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nickname: "test-player" }),
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(200);
			expect(await response.json()).toEqual({ allowed: true });
			moderationFetch.mockRestore();
		});

		it("exposes OpenAI moderation error details without the API key", async () => {
			env.OPENAI_API_KEY = "test-key";
			const moderationFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: { type: "insufficient_quota", code: "quota_exceeded", message: "Quota exceeded" } }), { status: 429 }));
			const request = new IncomingRequest("http://example.com/moderate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nickname: "quota-test" }),
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			expect(response.status).toBe(503);
			const body = await response.json();
			expect(body).toEqual({
				error: "moderation unavailable",
				reason: "rate_limited",
				status: 429,
				type: "insufficient_quota",
				code: "quota_exceeded",
				message: "Quota exceeded",
			});
			expect(moderationFetch).toHaveBeenCalledTimes(1);
			expect(JSON.stringify(body)).not.toContain("test-key");
			moderationFetch.mockRestore();
		});
	});
