import { Link } from 'react-router-dom'

function getScoreClass(score) {
    if (score >= 95) return 'score excellent'
    if (score >= 80) return 'score good'
    if (score >= 65) return 'score fair'
    return 'score low'
}

function ProgressPage({ attempts = [] }) {
    const completedScenarioIds = new Set(
        attempts.map((attempt) => attempt.scenario_id),
    )

    const averageScore =
        attempts.length > 0
            ? Math.round(
                attempts.reduce((total, attempt) => total + attempt.score, 0) /
                attempts.length,
            )
            : null

    const highestScore =
        attempts.length > 0
            ? Math.max(...attempts.map((attempt) => attempt.score))
            : null

    const latestAttempt = attempts[0]

    return (
        <section className="progress-page">
            <div className="progress-hero">
                <p className="dashboard-eyebrow">Learning Analytics</p>
                <h2>Your progress</h2>
                <p>
                    Review your performance, previous responses, and coaching feedback.
                </p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <span className="stat-label">Scenarios Completed</span>
                    <strong>{completedScenarioIds.size}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Total Attempts</span>
                    <strong>{attempts.length}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Average Score</span>
                    <strong>{averageScore !== null ? `${averageScore}%` : '—'}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Highest Score</span>
                    <strong>{highestScore !== null ? `${highestScore}%` : '—'}</strong>
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

            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <p className="section-eyebrow">History</p>
                        <h3>Attempt history</h3>
                    </div>

                    <p>Review your submitted responses and coaching results.</p>
                </div>

                {attempts.length === 0 ? (
                    <div className="empty-state">
                        <h3>No attempts yet</h3>
                        <p>Complete a scenario to begin tracking your progress.</p>

                        <Link to="/dashboard">Go to Dashboard</Link>
                    </div>
                ) : (
                    <div className="attempt-list">
                        {attempts.map((attempt) => (
                            <article className="attempt-card" key={attempt.id}>
                                <div className="attempt-card-header">
                                    <div>
                                        <p className="attempt-label">Scenario</p>
                                        <h4>{attempt.scenario_title}</h4>
                                        <p className="attempt-date">
                                            Submitted{' '}
                                            {new Date(attempt.created_at).toLocaleString()}
                                        </p>
                                    </div>

                                    <span className={getScoreClass(attempt.score)}>
                    {attempt.score}%
                  </span>
                                </div>

                                <div className="attempt-summary-grid">
                                    <div>
                                        <h5>Strengths</h5>

                                        {attempt.strengths.length === 0 ? (
                                            <p>No strengths recorded.</p>
                                        ) : (
                                            <ul>
                                                {attempt.strengths.map((strength, index) => (
                                                    <li key={`${strength}-${index}`}>{strength}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div>
                                        <h5>Areas to Improve</h5>

                                        {attempt.improvements.length === 0 ? (
                                            <p>No improvement areas recorded.</p>
                                        ) : (
                                            <ul>
                                                {attempt.improvements.map((improvement, index) => (
                                                    <li key={`${improvement}-${index}`}>
                                                        {improvement}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <Link
                                    to={`/attempt/${attempt.id}`}
                                    className="view-details-link"
                                >
                                    View Details →
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </section>
    )
}

export default ProgressPage