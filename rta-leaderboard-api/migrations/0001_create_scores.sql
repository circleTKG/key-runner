CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  clear_time INTEGER NOT NULL CHECK (clear_time >= 0),
  score INTEGER NOT NULL CHECK (score >= 0),
  total_score INTEGER NOT NULL CHECK (total_score >= 0),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS scores_clear_time_idx ON scores (clear_time ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS scores_total_score_idx ON scores (total_score DESC, created_at ASC);
