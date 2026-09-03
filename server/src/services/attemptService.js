import pool from '../db/pool.js'

export async function createAttempt({
                                        userId,
                                        scenarioId,
                                        responseText,
                                        score,
                                        strengths,
                                        improvements,
                                        summary = null,
                                        recommendations = [],
                                        activityType = null,
                                        competencyScores = [],
                                    }) {
    const result = await pool.query(
        `
            INSERT INTO scenario_attempts (
                user_id,
                scenario_id,
                response_text,
                score,
                strengths,
                improvements,
                summary,
                recommendations,
                activity_type,
                competency_scores
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
        `,
        [
            userId,
            scenarioId,
            responseText,
            score,
            JSON.stringify(strengths),
            JSON.stringify(improvements),
            summary,
            JSON.stringify(recommendations),
            activityType,
            JSON.stringify(competencyScores),
        ],
    )

    return result.rows[0]
}

export async function getAttemptsByUser(userId) {
    const result = await pool.query(
        `
            SELECT
                scenario_attempts.id,
                scenario_attempts.scenario_id,
                scenarios.title AS scenario_title,
                scenario_attempts.response_text,
                scenario_attempts.score,
                scenario_attempts.strengths,
                scenario_attempts.improvements,
                scenario_attempts.summary,
                scenario_attempts.recommendations,
                scenario_attempts.activity_type,
                scenario_attempts.competency_scores,
                scenario_attempts.created_at
            FROM scenario_attempts
                     JOIN scenarios
                          ON scenarios.id = scenario_attempts.scenario_id
            WHERE scenario_attempts.user_id = $1
            ORDER BY scenario_attempts.created_at DESC
        `,
        [userId],
    )

    return result.rows
}
