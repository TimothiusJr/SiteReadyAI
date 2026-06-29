import { getAllScenarios } from '../services/scenarioService.js'

export async function getScenarios(req, res) {
    try {
        const scenarios = await getAllScenarios()

        res.json(scenarios)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Failed to load scenarios',
        })
    }
}