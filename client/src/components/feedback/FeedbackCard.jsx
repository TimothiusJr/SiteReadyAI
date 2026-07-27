function FeedbackCard({ feedback }) {
    if (!feedback) {
        return null
    }

    const score = feedback.score

    let scoreClass = 'score-red'
    let scoreLabel = 'Needs Improvement'

    if (score >= 80) {
        scoreClass = 'score-green'
        scoreLabel = 'Excellent'
    } else if (score >= 60) {
        scoreClass = 'score-yellow'
        scoreLabel = 'Good'
    }

    return (
        <section className="feedback-card">
            <header className="feedback-header">
                <h2>🤖 AI Evaluation</h2>

                {score !== null && (
                    <div className={`score-badge ${scoreClass}`}>
                        <span className="score-number">{score}</span>
                        <span className="score-text">
                            {scoreLabel}
                        </span>
                    </div>
                )}
            </header>

            {feedback.summary && (
                <div className="feedback-section">
                    <h3>📝 Overall Assessment</h3>

                    <p>{feedback.summary}</p>
                </div>
            )}

            {feedback.strengths?.length > 0 && (
                <div className="feedback-section">
                    <h3>✅ Strengths</h3>

                    <ul>
                        {feedback.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                        ))}
                    </ul>
                </div>
            )}

            {feedback.improvements?.length > 0 && (
                <div className="feedback-section">
                    <h3>⚠ Areas for Improvement</h3>

                    <ul>
                        {feedback.improvements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {feedback.recommendations?.length > 0 && (
                <div className="feedback-section">
                    <h3>💡 AI Recommendations</h3>

                    <ol>
                        {feedback.recommendations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>
            )}

            {feedback.message && (
                <p className="feedback-message">
                    {feedback.message}
                </p>
            )}
        </section>
    )
}

export default FeedbackCard