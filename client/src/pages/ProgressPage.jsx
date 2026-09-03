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
    const competencySummary = Object.values(
        attempts.reduce((summary, attempt) => {
            const scores = attempt.competency_scores || []

            scores.forEach((item) => {
                if (!summary[item.competency]) {
                    summary[item.competency] = {
                        competency: item.competency,
                        scores: [],
                    }
                }
                summary[item.competency].scores.push(item.score)
            })
            return summary
        }, {}),
    )
        .map((item) => ({
            competency: item.competency,
            score: Math.round(
                item.scores.reduce((total, score) => total + score, 0) /
                item.scores.length,
            ),
            attempts: item.scores.length,
        }))
        .sort((a, b) => a.score - b.score)

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

            <section className="competency-dashboard">
                <div className="section-heading">
                    <div>
                        <p className="section-eyebrow">Competency View</p>
                        <h3>MIL capability profile</h3>
                    </div>
                    <p>Scores combine your PI knowledge, applied decisions, and readiness planning.</p>
                </div>

                {competencySummary.length === 0 ? (
                    <p className="competency-empty">Complete a TECVAYLI activity to begin building your capability profile.</p>
                ) : (
                    <div className="competency-grid">
                        {competencySummary.map((item) => (
                            <article className="competency-card" key={item.competency}>
                                <div>
                                    <h4>{item.competency}</h4>
                                    <span>{item.attempts} scored {item.attempts === 1 ? 'activity' : 'activities'}</span>
                                </div>
                                <strong>{item.score}%</strong>
                                <div className="competency-meter" aria-label={`${item.competency}: ${item.score}%`}>
                                    <span style={{ width: `${item.score}%` }} />
                                </div>
                                <small>{item.score >= 80 ? 'Proficient' : item.score >= 60 ? 'Developing' : 'Priority review'}</small>
                            </article>
                        ))}
                    </div>
                )}
            </section>

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
