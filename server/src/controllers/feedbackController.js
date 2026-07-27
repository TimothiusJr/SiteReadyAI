import { createAttempt } from '../services/attemptService.js'
import { getScenarioById } from '../services/scenarioService.js'
import { generateAIFeedback } from '../services/ai/openaiService.js'

export async function submitFeedback(req, res) {
    try {
        const { scenarioId, responseText } = req.body

        if (!scenarioId || !responseText?.trim()) {
            return res.status(400).json({
                message: 'Scenario ID and response text are required',
            })
        }

        const scenario = await getScenarioById(scenarioId)

        if (!scenario) {
            return res.status(404).json({
                message: 'Scenario not found',
            })
        }

        const feedback = await generateAIFeedback({
            scenario,
            responseText,
        })

        const attempt = await createAttempt({
            userId: req.user.userId,
            scenarioId,
            responseText,
            score: feedback.score,
            strengths: feedback.strengths,
            improvements: feedback.improvements,
            summary: feedback.summary,
            recommendations: feedback.recommendations,
        })

        return res.status(201).json({
            message: 'AI feedback generated and attempt saved',
            feedback,
            attempt,
        })
    } catch (error) {
        console.error('AI feedback error:', error)

        return res.status(500).json({
            message: 'Failed to generate AI feedback',
        })
    }
}