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

		it("requires admin authentication to list and update scores", async () => {
			const adminEnv = env as typeof env & { ADMIN_PASSWORD?: string };
			adminEnv.ADMIN_PASSWORD = "admin-test-secret";
			const runId = "admin-review-test";
			await env.DB.prepare("INSERT INTO scores (run_id, nickname, clear_time, score, total_score, status) VALUES (?, ?, ?, ?, ?, 'pending')")
				.bind(runId, "review-player", 1234, 500, 1500)
				.run();
			await env.DB.prepare("INSERT INTO scores (run_id, nickname, clear_time, score, total_score, status) VALUES (?, ?, ?, ?, ?, 'pending')")
				.bind("admin-review-batch-test", "batch-player", 2345, 600, 1600)
				.run();

			const fetchWorker = async (request: Request) => {
				const ctx = createExecutionContext();
				const response = await worker.fetch(request, env, ctx);
				await waitOnExecutionContext(ctx);
				return response;
			};

			try {
				const unauthorized = await fetchWorker(new IncomingRequest("http://example.com/admin/scores"));
				expect(unauthorized.status).toBe(401);

				const wrongPassword = await fetchWorker(new IncomingRequest("http://example.com/admin/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ password: "incorrect" }),
				}));
				expect(wrongPassword.status).toBe(401);

				const login = await fetchWorker(new IncomingRequest("http://example.com/admin/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ password: "admin-test-secret" }),
				}));
				expect(login.status).toBe(200);
				const { token } = await login.json() as { token: string };

				const list = await fetchWorker(new IncomingRequest("http://example.com/admin/scores", {
					headers: { Authorization: `Bearer ${token}` },
				}));
				expect(list.status).toBe(200);
				const scores = (await list.json() as { scores: Array<{ id: number; run_id: string; status: string }> }).scores;
				const pendingScore = scores.find((score) => score.run_id === runId);
				expect(pendingScore?.status).toBe("pending");
				expect(pendingScore).toBeDefined();

				const batchScore = scores.find((score) => score.run_id === "admin-review-batch-test");
				expect(batchScore?.status).toBe("pending");
				const update = await fetchWorker(new IncomingRequest("http://example.com/admin/scores", {
					method: "PATCH",
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
					body: JSON.stringify({ updates: [
						{ id: pendingScore!.id, status: "approved" },
						{ id: batchScore!.id, status: "rejected" },
					] }),
				}));
				expect(update.status).toBe(200);
				expect(await update.json()).toEqual({
					updated: 2,
					updates: [
						{ id: pendingScore!.id, status: "approved" },
						{ id: batchScore!.id, status: "rejected" },
					],
				});

				const invalidUpdate = await fetchWorker(new IncomingRequest("http://example.com/admin/scores", {
					method: "PATCH",
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
					body: JSON.stringify({ updates: [{ id: pendingScore!.id, status: "pending" }] }),
				}));
				expect(invalidUpdate.status).toBe(400);
			} finally {
				delete adminEnv.ADMIN_PASSWORD;
			}
		});
	});
