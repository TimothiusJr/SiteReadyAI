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

function hideQuizAnswers(scenario) {
    return {
        ...scenario,
        quizQuestions: (scenario.quizQuestions || []).map(
            ({ correctOptionId, explanation, ...question }) => question,
        ),
    }
}

function hideSimulationAnswers(scenario) {
    if (!scenario.simulationData) return scenario

    return {
        ...scenario,
        simulationData: {
            ...scenario.simulationData,
            decisions: (scenario.simulationData.decisions || []).map(
                ({ correctOptionId, explanation, ...decision }) => decision,
            ),
            checklist: (scenario.simulationData.checklist || []).map(
                ({ required, ...item }) => item,
            ),
            readiness: scenario.simulationData.readiness
                ? {
                    prompt: scenario.simulationData.readiness.prompt,
                    options: scenario.simulationData.readiness.options,
                }
                : null,
        },
    }
}

function hideDecisionLabAnswers(scenario) {
    if (!scenario.decisionLab) return scenario

    return {
        ...scenario,
        decisionLab: {
            ...scenario.decisionLab,
            cases: (scenario.decisionLab.cases || []).map(
                ({ correctOptionId, explanation, ...caseItem }) => caseItem,
            ),
        },
    }
}

export async function getAllScenarios() {
    const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      source_url AS "sourceUrl",
      source_label AS "sourceLabel",
      source_note AS "sourceNote",
      learning_cards AS "learningCards",
      simulation_data AS "simulationData",
      decision_lab AS "decisionLab",
      quiz_questions AS "quizQuestions"
    FROM scenarios
    ORDER BY id
  `)

    const scenarios = await attachScenarioContent(result.rows)

    return scenarios.map((scenario) =>
        hideDecisionLabAnswers(
            hideSimulationAnswers(hideQuizAnswers(scenario)),
        ),
    )
}

export async function getScenarioById(id) {
    const result = await pool.query(
        `
      SELECT
        id,
        title,
        description,
        source_url AS "sourceUrl",
        source_label AS "sourceLabel",
        source_note AS "sourceNote",
        learning_cards AS "learningCards",
        simulation_data AS "simulationData",
        decision_lab AS "decisionLab",
        quiz_questions AS "quizQuestions"
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
