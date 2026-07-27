import { Link, Navigate, useParams } from 'react-router-dom'

function getScoreClass(score) {
    if (score >= 80) return 'score excellent'
    if (score >= 60) return 'score good'
    return 'score low'
}

function AttemptDetailsPage({ attempts = [] }) {
    const { attemptId } = useParams()

    const attempt = attempts.find(
        (item) => item.id === Number(attemptId),
    )

    if (!attempt) {
        return <Navigate to="/progress" replace />
    }

    return (
        <section className="attempt-details-page">
            <Link to="/progress" className="back-link">
                ← Back to Progress
            </Link>

            <header className="attempt-details-hero">
                <p className="section-eyebrow">AI Evaluation</p>

                <h2>{attempt.scenario_title}</h2>

                <p>
                    Submitted {new Date(attempt.created_at).toLocaleString()}
                </p>
            </header>

            <div className="attempt-details-grid">
                <section className="attempt-detail-card attempt-score-card">
                    <span className="stat-label">Overall Score</span>

                    <span className={getScoreClass(attempt.score)}>
            {attempt.score}%
          </span>
                </section>

                <section className="attempt-detail-card">
                    <h3>Overall Assessment</h3>

                    <p>
                        {attempt.summary ||
                            'No AI assessment was recorded for this attempt.'}
                    </p>
                </section>

                <section className="attempt-detail-card">
                    <h3>Strengths</h3>

                    {attempt.strengths?.length > 0 ? (
                        <ul>
                            {attempt.strengths.map((strength, index) => (
                                <li key={`${strength}-${index}`}>{strength}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No strengths were recorded.</p>
                    )}
                </section>

                <section className="attempt-detail-card">
                    <h3>Areas for Improvement</h3>

                    {attempt.improvements?.length > 0 ? (
                        <ul>
                            {attempt.improvements.map((improvement, index) => (
                                <li key={`${improvement}-${index}`}>
                                    {improvement}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No improvement areas were recorded.</p>
                    )}
                </section>

                <section className="attempt-detail-card">
                    <h3>AI Recommendations</h3>

                    {attempt.recommendations?.length > 0 ? (
                        <ol>
                            {attempt.recommendations.map((recommendation, index) => (
                                <li key={`${recommendation}-${index}`}>
                                    {recommendation}
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>No recommendations were recorded.</p>
                    )}
                </section>

                <section className="attempt-detail-card submitted-response-card">
                    <h3>Your Response</h3>

                    <p>{attempt.response_text}</p>
                </section>
            </div>
        </section>
    )
}

export default AttemptDetailsPage