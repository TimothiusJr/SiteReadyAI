import { pool } from '../db/pool.js'

export async function getAllScenarios() {
    const scenariosResult = await pool.query(`
        SELECT
            id,
            title,
            description
        FROM scenarios
        ORDER BY id
    `)

    const scenarios = scenariosResult.rows

    for (const scenario of scenarios) {
        const detailsResult = await pool.query(
            `
        SELECT detail_text
        FROM scenario_details
        WHERE scenario_id = $1
        ORDER BY id
      `,
            [scenario.id],
        )

        const questionsResult = await pool.query(
            `
        SELECT question_text
        FROM scenario_questions
        WHERE scenario_id = $1
        ORDER BY id
      `,
            [scenario.id],
        )

        scenario.siteDetails = detailsResult.rows.map((row) => row.detail_text)
        scenario.questions = questionsResult.rows.map((row) => row.question_text)
    }

    return scenarios
}