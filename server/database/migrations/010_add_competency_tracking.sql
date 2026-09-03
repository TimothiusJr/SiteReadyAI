ALTER TABLE scenario_attempts
    ADD COLUMN IF NOT EXISTS activity_type VARCHAR(80),
    ADD COLUMN IF NOT EXISTS competency_scores JSONB NOT NULL DEFAULT '[]'::jsonb;
