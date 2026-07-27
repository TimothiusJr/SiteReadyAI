import pool from '../db/pool.js'

async function attachScenarioContent(scenarios) {
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

        scenario.siteDetails = detailsResult.rows.map(
            (row) => row.detail_text,
        )

        scenario.questions = questionsResult.rows.map(
            (row) => row.question_text,
        )
    }

    return scenarios
}

export async function getAllScenarios() {
    const result = await pool.query(`
    SELECT
      id,
      title,
      description
    FROM scenarios
    ORDER BY id
  `)

    return attachScenarioContent(result.rows)
}

export async function getScenarioById(id) {
    const result = await pool.query(
        `
      SELECT
        id,
        title,
        description
      FROM scenarios
      WHERE id = $1
    `,
        [id],
    )

    if (result.rows.length === 0) {
        return null
    }

    const scenarios = await attachScenarioContent(result.rows)

    return scenarios[0]
}