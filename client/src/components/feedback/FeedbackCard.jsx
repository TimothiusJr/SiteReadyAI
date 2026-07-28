function getScoreDetails(score) {
    if (score >= 80) {
        return {
            className: 'score-green',
            label: 'Excellent',
        }
    }

    if (score >= 60) {
        return {
            className: 'score-yellow',
            label: 'Good',
        }
    }

    return {
        className: 'score-red',
        label: 'Needs Improvement',
    }
}

function FeedbackCard({ feedback }) {
    if (!feedback) {
        return null
    }

    const score =
        typeof feedback.score === 'number'
            ? Math.min(Math.max(feedback.score, 0), 100)
            : null

    const scoreDetails =
        score !== null
            ? getScoreDetails(score)
            : null

    const gaugeStyle =
        score !== null
            ? {
                '--score-value': `${score * 3.6}deg`,
            }
            : undefined

    return (
        <section className="feedback-card">
            <header className="feedback-header">
                <div>
                    <p className="feedback-eyebrow">
                        Performance Review
                    </p>

                    <h2>AI Evaluation</h2>

                    <p className="feedback-header-description">
                        Personalized feedback based on site readiness,
                        safety planning, and operational decision-making.
                    </p>
                </div>

                {score !== null && (
                    <div
                        className={`score-gauge ${scoreDetails.className}`}
                        style={gaugeStyle}
                        aria-label={`Score: ${score} out of 100. ${scoreDetails.label}`}
                    >
                        <div className="score-gauge__center">
                            <strong>{score}</strong>
                            <span>/100</span>
                        </div>

                        <p>{scoreDetails.label}</p>
                    </div>
                )}
            </header>

            {feedback.summary && (
                <div className="feedback-section">
                    <h3>Overall Assessment</h3>
                    <p>{feedback.summary}</p>
                </div>
            )}

            <div className="feedback-columns">
                <div className="feedback-section feedback-section--column">
                    <h3>What You Addressed Well</h3>

                    {feedback.strengths?.length > 0 ? (
                        <ul>
                            {feedback.strengths.map((strength, index) => (
                                <li key={`${strength}-${index}`}>
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="feedback-empty-message">
                            No clear strengths were identified in this response.
                        </p>
                    )}
                </div>

                <div className="feedback-section feedback-section--column">
                    <h3>Readiness Gaps</h3>

                    {feedback.improvements?.length > 0 ? (
                        <ul>
                            {feedback.improvements.map((item, index) => (
                                <li key={`${item}-${index}`}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="feedback-empty-message">
                            No major readiness gaps were identified.
                        </p>
                    )}
                </div>
            </div>

            <div className="feedback-section">
                <h3>Recommended Next Steps</h3>

                {feedback.recommendations?.length > 0 ? (
                    <ol>
                        {feedback.recommendations.map((item, index) => (
                            <li key={`${item}-${index}`}>
                                {item}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="feedback-empty-message">
                        No additional recommendations were generated.
                    </p>
                )}
            </div>

            {feedback.message && (
                <p className="feedback-message">
                    {feedback.message}
                </p>
            )}
        </section>
    )
}

export default FeedbackCard