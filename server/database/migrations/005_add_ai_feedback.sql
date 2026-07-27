ALTER TABLE scenario_attempts
    ADD COLUMN summary TEXT;

ALTER TABLE scenario_attempts
    ADD COLUMN recommendations JSONB DEFAULT '[]'::jsonb;