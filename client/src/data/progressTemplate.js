export function createInitialProgress(scenarios) {
    return scenarios.map((scenario) => ({
        scenarioId: scenario.id,
        completed: false,
        score: null,
        completedAt: null,
        attempts: 0,
    }))
}