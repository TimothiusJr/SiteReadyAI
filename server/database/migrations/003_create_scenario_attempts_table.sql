CREATE TABLE IF NOT EXISTS scenario_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scenario_id INTEGER NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    score INTEGER NOT NULL,
    strengths JSONB DEFAULT '[]',
    improvements JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );