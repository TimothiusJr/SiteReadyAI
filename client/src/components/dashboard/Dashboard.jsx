function Dashboard({ scenarios, progress, onSelectScenario }) {
    const completedCount = progress.filter((item) => item.completed).length
    const totalCount = scenarios.length
    const progressPercent = Math.round((completedCount / totalCount) * 100)
    const completedScores = progress
        .filter((item) => item.completed && item.score !== null)
        .map((item) => item.score)

    const averageScore =
        completedScores.length > 0
            ? Math.round(
                completedScores.reduce((total, score) => total + score, 0) /
                completedScores.length,
            )
            : null

    return (
        <section className="dashboard">
            <h2>Training Dashboard</h2>
            <p>Select a scenario to begin practicing implementation planning.</p>

            <div className="progress-summary">
                <h3>Overall Progress</h3>
                <p>
                    {completedCount} of {totalCount} scenarios completed
                </p>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>

                <p>{progressPercent}% complete</p>

                {averageScore !== null && (
                    <p>Average Score: {averageScore}%</p>
                )}
            </div>

            <div className="scenario-list">
                {scenarios.map((scenario) => {
                    const scenarioProgress = progress.find(
                        (item) => item.scenarioId === scenario.id,
                    )

                    return (
                        <div className="scenario-preview" key={scenario.id}>
                            <h3>{scenario.title}</h3>
                            <p>{scenario.description}</p>

                            <p
                                className={
                                    scenarioProgress?.completed
                                        ? 'status completed'
                                        : 'status not-started'
                                }
                            >
                                {scenarioProgress?.completed ? 'Completed' : 'Not Started'}
                            </p>

                            {scenarioProgress?.score && (
                                <p>Score: {scenarioProgress.score}%</p>
                            )}

                            {scenarioProgress?.completedAt && (
                                <p>
                                    Completed:{' '}
                                    {new Date(scenarioProgress.completedAt).toLocaleDateString()}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={() => onSelectScenario(scenario)}
                            >
                                {scenarioProgress?.completed
                                    ? 'Review Scenario'
                                    : 'Start Scenario'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Dashboard