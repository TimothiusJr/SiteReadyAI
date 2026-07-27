function DashboardStats({
    averageScore,
    highestScore,
    completedScenarioCount,
    totalScenarios,
    totalAttempts,
    completionPercent,
    latestAttempt,
}) {
    return (
        <div className="dashboard-stats">
            <div className="stat-card">
                <span className="stat-label">Average Score</span>
                <strong>{averageScore !== null ? `${averageScore}%` : '—'}</strong>
            </div>

            <div className="stat-card">
                <span className="stat-label">Highest Score</span>
                <strong>{highestScore !== null ? `${highestScore}%` : '—'}</strong>
            </div>

            <div className="stat-card">
                <span className="stat-label">Scenarios Completed</span>
                <strong>
                    {completedScenarioCount} / {totalScenarios}
                </strong>
            </div>

            <div className="stat-card">
                <span className="stat-label">Total Attempts</span>
                <strong>{totalAttempts}</strong>
            </div>

            <div className="stat-card">
                <span className="stat-label">Completion</span>
                <strong>{completionPercent}%</strong>
            </div>

            <div className="stat-card">
                <span className="stat-label">Latest Activity</span>
                <strong>
                    {latestAttempt
                        ? new Date(latestAttempt.created_at).toLocaleDateString()
                        : '—'}
                </strong>
            </div>
        </div>
    )
}

export default DashboardStats