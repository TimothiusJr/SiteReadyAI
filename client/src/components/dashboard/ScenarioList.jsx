function getScoreClass(score) {
    if (score >= 95) return 'score excellent'
    if (score >= 80) return 'score good'
    if (score >= 65) return 'score fair'
    return 'score low'
}

function ScenarioList({
                          scenarios = [],
                          progress = [],
                          attempts = [],
                          onSelectScenario,
                      }) {
    return (
        <section className="scenario-list">
            {scenarios.map((scenario) => {
                const scenarioAttempts = attempts.filter(
                    (attempt) => attempt.scenario_id === scenario.id,
                )

                const latestScenarioAttempt = scenarioAttempts[0]

                const localProgress = progress.find(
                    (item) => item.scenarioId === scenario.id,
                )

                const isCompleted =
                    scenarioAttempts.length > 0 || localProgress?.completed

                const displayedScore =
                    latestScenarioAttempt?.score ?? localProgress?.score

                const completedAt =
                    latestScenarioAttempt?.created_at ?? localProgress?.completedAt

                return (
                    <article className="scenario-preview" key={scenario.id}>
                        <h3>{scenario.title}</h3>
                        <p>{scenario.description}</p>

                        <p
                            className={
                                isCompleted ? 'status completed' : 'status not-started'
                            }
                        >
                            {isCompleted ? 'Completed' : 'Not Started'}
                        </p>

                        {displayedScore !== null &&
                            displayedScore !== undefined && (
                                <p>
                                    Latest Score:{' '}
                                    <span className={getScoreClass(displayedScore)}>
                    {displayedScore}%
                  </span>
                                </p>
                            )}

                        {scenarioAttempts.length > 0 && (
                            <p>Attempts: {scenarioAttempts.length}</p>
                        )}

                        {completedAt && (
                            <p>
                                Last completed:{' '}
                                {new Date(completedAt).toLocaleDateString()}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={() => onSelectScenario(scenario)}
                        >
                            {isCompleted ? 'Practice Again' : 'Start Scenario'}
                        </button>
                    </article>
                )
            })}
        </section>
    )
}

export default ScenarioList