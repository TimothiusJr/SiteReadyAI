function FeedbackCard({ feedback }) {
    if (!feedback) {
        return null
    }

    return (
        <div className="feedback-card">
            <h3>Feedback</h3>

            {feedback.score !== null && (
                <div>
                    <h4>Overall Score</h4>
                    <p>{feedback.score}%</p>
                </div>
            )}

            {feedback.strengths.length > 0 && (
                <div>
                    <h4>Strengths</h4>
                    <ul>
                        {feedback.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                        ))}
                    </ul>
                </div>
            )}

            {feedback.improvements.length > 0 && (
                <div>
                    <h4>Suggestions</h4>
                    <ul>
                        {feedback.improvements.map((improvement, index) => (
                            <li key={index}>{improvement}</li>
                        ))}
                    </ul>
                </div>
            )}

            <p>{feedback.message}</p>
        </div>
    )
}

export default FeedbackCard