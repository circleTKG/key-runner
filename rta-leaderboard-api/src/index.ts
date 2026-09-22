/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

type ScorePayload = {
	run_id: string;
	nickname: string;
	clear_time: number;
	score: number;
	total_score: number;
};

const allowedMethods = "GET,POST,OPTIONS";
const allowedHeaders = "Content-Type";

function corsHeaders(): Headers {
	return new Headers({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": allowedMethods,
		"Access-Control-Allow-Headers": allowedHeaders,
		"Cache-Control": "no-store",
	});
}

function json(data: unknown, status = 200): Response {
	const headers = corsHeaders();
	headers.set("Content-Type", "application/json; charset=utf-8");
	return new Response(JSON.stringify(data), { status, headers });
}

function isNonNegativeInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function validatePayload(payload: unknown): ScorePayload | null {
	if (!payload || typeof payload !== "object") return null;
	const value = payload as Partial<ScorePayload>;
	if (
		typeof value.run_id !== "string" ||
		value.run_id.length < 8 ||
		value.run_id.length > 100 ||
		typeof value.nickname !== "string" ||
		value.nickname.trim().length < 1 ||
		value.nickname.trim().length > 32 ||
		!isNonNegativeInteger(value.clear_time) ||
		!isNonNegativeInteger(value.score) ||
		!isNonNegativeInteger(value.total_score)
	) return null;

	return {
		run_id: value.run_id,
		nickname: value.nickname.trim(),
		clear_time: value.clear_time,
		score: value.score,
		total_score: value.total_score,
	};
}

async function getScores(env: Env): Promise<Response> {
	const result = await env.DB.prepare(
		"SELECT nickname, clear_time, score, total_score, created_at FROM scores ORDER BY clear_time ASC, created_at ASC LIMIT 100",
	).all();
	return json({ scores: result.results });
}

async function createScore(request: Request, env: Env): Promise<Response> {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return json({ error: "invalid JSON" }, 400);
	}

	const score = validatePayload(payload);
	if (!score) return json({ error: "invalid score payload" }, 400);

	const result = await env.DB.prepare(
		"INSERT OR IGNORE INTO scores (run_id, nickname, clear_time, score, total_score) VALUES (?, ?, ?, ?, ?)",
	)
		.bind(score.run_id, score.nickname, score.clear_time, score.score, score.total_score)
		.run();

	if (result.meta.changes === 0) return json({ accepted: false, reason: "duplicate run_id" }, 409);
	return json({ accepted: true }, 201);
}

export default {
	async fetch(request, env): Promise<Response> {
		if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders() });

		const url = new URL(request.url);
		if (url.pathname === "/health" && request.method === "GET") return json({ ok: true });
		if (url.pathname !== "/scores") return json({ error: "not found" }, 404);

		try {
			if (request.method === "GET") return await getScores(env);
			if (request.method === "POST") return await createScore(request, env);
			return json({ error: "method not allowed" }, 405);
		} catch (error) {
			console.error(error);
			return json({ error: "database unavailable" }, 503);
		}
	},
} satisfies ExportedHandler<Env>;
