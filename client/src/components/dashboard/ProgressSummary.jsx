function ProgressSummary({
                             completedScenarioCount,
                             totalScenarios,
                             completionPercent,
                         }) {
    return (
        <section className="progress-summary">
            <h3>Overall Progress</h3>

            <p>
                {completedScenarioCount} of {totalScenarios} scenarios completed
            </p>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${completionPercent}%` }}
                />
            </div>

            <p>{completionPercent}% complete</p>
        </section>
    )
}

export default ProgressSummary