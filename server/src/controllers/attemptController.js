import {
    createAttempt,
    getAttemptsByUser,
} from '../services/attemptService.js'

export async function submitAttempt(req, res) {
    try {
        const attempt = await createAttempt({
            userId: req.user.userId,
            scenarioId: req.body.scenarioId,
            responseText: req.body.responseText,
            score: req.body.score,
            strengths: req.body.strengths,
            improvements: req.body.improvements,
        })



        res.status(201).json({
            message: 'Attempt saved successfully',
            attempt,
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Failed to save attempt',
        })
    }
}

export async function getMyAttempts(req, res) {
    try {
        const attempts = await getAttemptsByUser(req.user.userId)

        res.json(attempts)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Failed to load attempts',
        })
    }
}