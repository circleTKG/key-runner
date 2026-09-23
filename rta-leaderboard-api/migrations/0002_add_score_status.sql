ALTER TABLE scores ADD COLUMN status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected'));

CREATE INDEX IF NOT EXISTS scores_status_clear_time_idx ON scores (status, clear_time ASC, created_at ASC);