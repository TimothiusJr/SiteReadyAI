import { getAllScenarios } from '../services/scenarioService.js'

export function getScenarios(req, res) {
    const scenarios = getAllScenarios()

    res.json(scenarios)
}