function DashboardStats({
                            averageScore,
                            highestScore,
                            completedScenarioCount,
                            totalScenarios,
                            totalAttempts,
                            completionPercent,
                            latestAttempt,
                        }) {
    const hasAttempts = totalAttempts > 0

    return (
        <section
            className="performance-overview"
            aria-labelledby="performance-overview-heading"
        >
            <div className="performance-overview__heading">
                <div>
                    <p className="section-eyebrow">
                        Learning Analytics
                    </p>

                    <h3 id="performance-overview-heading">
                        Overall Performance
                    </h3>
                </div>

                <span className="performance-status">
          {hasAttempts
              ? 'Training in progress'
              : 'Ready to begin'}
        </span>
            </div>

            <div className="dashboard-stats">
                <article className="stat-card stat-card--featured">
          <span className="stat-label">
            Average Score
          </span>

                    <strong>
                        {averageScore !== null
                            ? `${averageScore}%`
                            : '—'}
                    </strong>

                    <span className="stat-supporting-text">
            Across all submitted attempts
          </span>
                </article>

                <article className="stat-card">
          <span className="stat-label">
            Best Score
          </span>

                    <strong>
                        {highestScore !== null
                            ? `${highestScore}%`
                            : '—'}
                    </strong>

                    <span className="stat-supporting-text">
            Highest recorded evaluation
          </span>
                </article>

                <article className="stat-card">
          <span className="stat-label">
            Scenarios Completed
          </span>

                    <strong>
                        {completedScenarioCount} / {totalScenarios}
                    </strong>

                    <span className="stat-supporting-text">
            {completionPercent}% of available training
          </span>
                </article>

                <article className="stat-card">
          <span className="stat-label">
            Total Attempts
          </span>

                    <strong>{totalAttempts}</strong>

                    <span className="stat-supporting-text">
            Submitted performance reviews
          </span>
                </article>

                <article className="stat-card">
          <span className="stat-label">
            Completion
          </span>

                    <strong>{completionPercent}%</strong>

                    <div
                        className="stat-progress"
                        aria-label={`${completionPercent}% complete`}
                    >
            <span
                style={{
                    width: `${completionPercent}%`,
                }}
            />
                    </div>
                </article>

                <article className="stat-card">
          <span className="stat-label">
            Latest Activity
          </span>

                    <strong className="stat-date">
                        {latestAttempt
                            ? new Date(
                                latestAttempt.created_at,
                            ).toLocaleDateString()
                            : '—'}
                    </strong>

                    <span className="stat-supporting-text">
            Most recent submission
          </span>
                </article>
            </div>
        </section>
    )
}

export default DashboardStats