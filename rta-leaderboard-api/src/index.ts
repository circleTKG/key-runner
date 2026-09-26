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

const allowedMethods = "GET,POST,PATCH,OPTIONS";
const allowedHeaders = "Content-Type,Authorization";
const adminSessionTtlSeconds = 4 * 60 * 60;
const encoder = new TextEncoder();

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

function getAdminPassword(env: Env): string | undefined {
	return (env as Env & { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
}

function toBase64Url(value: Uint8Array): string {
	let binary = "";
	for (const byte of value) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
	const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
	return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function createAdminToken(password: string): Promise<string> {
	const key = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
	const payload = toBase64Url(encoder.encode(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + adminSessionTtlSeconds })));
	const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
	return `${payload}.${toBase64Url(signature)}`;
}

async function isValidAdminToken(request: Request, password: string): Promise<boolean> {
	const authorization = request.headers.get("Authorization") || "";
	const match = /^Bearer ([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(authorization);
	if (!match) return false;
	try {
		const key = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
		const validSignature = await crypto.subtle.verify("HMAC", key, fromBase64Url(match[2]), encoder.encode(match[1]));
		if (!validSignature) return false;
		const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(match[1]))) as { exp?: unknown };
		return typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
	} catch {
		return false;
	}
}

async function passwordsMatch(candidate: string, expected: string): Promise<boolean> {
	const [candidateHash, expectedHash] = await Promise.all([
		crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
		crypto.subtle.digest("SHA-256", encoder.encode(expected)),
	]);
	const left = new Uint8Array(candidateHash);
	const right = new Uint8Array(expectedHash);
	let difference = 0;
	for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
	return difference === 0;
}

async function adminLogin(request: Request, env: Env): Promise<Response> {
	const password = getAdminPassword(env);
	if (!password) return json({ error: "admin login is not configured" }, 503);
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return json({ error: "invalid JSON" }, 400);
	}
	if (!payload || typeof payload !== "object" || typeof (payload as { password?: unknown }).password !== "string") {
		return json({ error: "invalid login payload" }, 400);
	}
	if (!await passwordsMatch((payload as { password: string }).password, password)) return json({ error: "unauthorized" }, 401);
	return json({ token: await createAdminToken(password), expires_in: adminSessionTtlSeconds });
}

async function getAdminScores(env: Env): Promise<Response> {
	const result = await env.DB.prepare(
		"SELECT id, run_id, nickname, clear_time, score, total_score, status, created_at FROM scores ORDER BY created_at DESC, id DESC",
	).all();
	return json({ scores: result.results });
}

async function updateAdminScores(request: Request, env: Env): Promise<Response> {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return json({ error: "invalid JSON" }, 400);
	}
	if (!payload || typeof payload !== "object" || !Array.isArray((payload as { updates?: unknown }).updates)) {
		return json({ error: "invalid updates payload" }, 400);
	}
	const requestedUpdates = (payload as { updates: unknown[] }).updates;
	if (requestedUpdates.length < 1 || requestedUpdates.length > 100) return json({ error: "updates must contain between 1 and 100 items" }, 400);
	const updates: Array<{ id: number; status: "approved" | "rejected" }> = [];
	const seenIds = new Set<number>();
	for (const update of requestedUpdates) {
		if (!update || typeof update !== "object") return json({ error: "invalid score update" }, 400);
		const value = update as { id?: unknown; status?: unknown };
		if (!Number.isSafeInteger(value.id) || Number(value.id) < 1 || (value.status !== "approved" && value.status !== "rejected") || seenIds.has(Number(value.id))) {
			return json({ error: "invalid score update" }, 400);
		}
		seenIds.add(Number(value.id));
		updates.push({ id: Number(value.id), status: value.status });
	}
	const results = await env.DB.batch(updates.map(({ id, status }) =>
		env.DB.prepare("UPDATE scores SET status = ? WHERE id = ?").bind(status, id),
	));
	const updated = results.reduce((count, result) => count + result.meta.changes, 0);
	return json({ updated, updates });
}

const blockedNicknameTerms = ["fuck", "shit", "bitch", "asshole", "cunt", "sex", "ばか", "バカ", "あほ", "アホ", "しね", "死ね", "くたばれ"];
const moderationCache = new Map<string, { allowed: boolean; expiresAt: number }>();
const moderationCacheTtlMs = 10 * 60 * 1000;

class ModerationError extends Error {
	status: number | string;
	type: string;
	code: string;

	constructor(status: number | string, type = "unknown", code = "unknown", message = "unknown") {
		super(message);
		this.name = "ModerationError";
		this.status = status;
		this.type = type;
		this.code = code;
	}
}

function isNicknameAllowed(nickname: string): boolean {
	const normalized = nickname.normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
	return normalized.length > 0 && !blockedNicknameTerms.some((term) => normalized.includes(term));
}

async function moderateNickname(nickname: string, env: Env): Promise<boolean> {
	if (!isNicknameAllowed(nickname)) return false;
	if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
	const cacheKey = nickname.normalize("NFKC").trim().toLocaleLowerCase();
	const cached = moderationCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) return cached.allowed;

	const response = await fetch("https://api.openai.com/v1/moderations", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.OPENAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ model: "omni-moderation-latest", input: nickname }),
	});
	console.log({
		status: response.status,
		remainingRequests: response.headers.get("x-ratelimit-remaining-requests"),
		resetRequests: response.headers.get("x-ratelimit-reset-requests"),
		remainingTokens: response.headers.get("x-ratelimit-remaining-tokens"),
		resetTokens: response.headers.get("x-ratelimit-reset-tokens"),
	});
	if (!response?.ok) {
		let details: { error?: { type?: string; code?: string; message?: string } } = {};
		if (response) {
			try {
				details = await response.json() as typeof details;
			} catch {
				// Keep the HTTP status when the upstream body is not JSON.
			}
		}
		throw new ModerationError(
			response?.status || "network",
			details.error?.type,
			details.error?.code,
			details.error?.message || "OpenAI Moderation request failed",
		);
	}

	const result = (await response.json()) as { results?: Array<{ flagged?: boolean }> };
	if (!result.results?.length || typeof result.results[0].flagged !== "boolean") {
		throw new Error("invalid moderation response");
	}
	const allowed = !result.results[0].flagged;
	moderationCache.set(cacheKey, { allowed, expiresAt: Date.now() + moderationCacheTtlMs });
	return allowed;
}

async function moderateNicknameRequest(request: Request, env: Env): Promise<Response> {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return json({ error: "invalid JSON" }, 400);
	}
	if (!payload || typeof payload !== "object" || typeof (payload as { nickname?: unknown }).nickname !== "string") {
		return json({ error: "invalid nickname payload" }, 400);
	}
	const nickname = (payload as { nickname: string }).nickname.trim() || "anonymous";
	if (nickname.length > 32) return json({ error: "nickname too long" }, 400);
	return json({ allowed: await moderateNickname(nickname, env) });
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
		"SELECT CASE WHEN status = 'approved' THEN nickname ELSE NULL END AS nickname, clear_time, score, total_score, status, created_at FROM scores WHERE status IN ('approved', 'pending') ORDER BY clear_time ASC, created_at ASC LIMIT 100",
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
	const insert = await env.DB.prepare(
		"INSERT OR IGNORE INTO scores (run_id, nickname, clear_time, score, total_score, status) VALUES (?, ?, ?, ?, ?, 'pending')",
	)
		.bind(score.run_id, score.nickname, score.clear_time, score.score, score.total_score)
		.run();
	if (insert.meta.changes === 0) return json({ accepted: false, reason: "duplicate run_id" }, 409);

	return json({ accepted: true, status: "pending" }, 202);
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders() });

		const url = new URL(request.url);
		if (url.pathname === "/health" && request.method === "GET") return json({ ok: true });
		if (url.pathname === "/moderate" && request.method === "POST") {
			try {
				return await moderateNicknameRequest(request, env);
			} catch (error) {
				console.error(error);
				if (error instanceof ModerationError) {
					return json({
						error: "moderation unavailable",
						reason: error.status === 429 ? "rate_limited" : error.status === 401 || error.status === 403 ? "invalid_api_key" : "upstream_error",
						status: error.status,
						type: error.type,
						code: error.code,
						message: error.message,
					}, 503);
				}
				return json({ error: "moderation unavailable", reason: "upstream_error", status: "network", type: "unknown", code: "unknown", message: "Moderation request failed" }, 503);
			}
		}
		if (url.pathname === "/admin/login" && request.method === "POST") {
			try {
				return await adminLogin(request, env);
			} catch (error) {
				console.error(error);
				return json({ error: "admin login unavailable" }, 503);
			}
		}
		if (url.pathname === "/admin/scores") {
			const password = getAdminPassword(env);
			if (!password) return json({ error: "admin login is not configured" }, 503);
			if (!await isValidAdminToken(request, password)) return json({ error: "unauthorized" }, 401);
			try {
				if (request.method === "GET") return await getAdminScores(env);
				if (request.method === "PATCH") return await updateAdminScores(request, env);
				return json({ error: "method not allowed" }, 405);
			} catch (error) {
				console.error(error);
				return json({ error: "database unavailable" }, 503);
			}
		}
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
