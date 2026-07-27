function getScoreClass(score) {
    if (score >= 95) return 'score excellent'
    if (score >= 80) return 'score good'
    if (score >= 65) return 'score fair'
    return 'score low'
}

function RecentAttempts({ attempts = [] }) {
    return (
        <section className="recent-attempts">
            <h3>Recent Attempts</h3>

            {attempts.length === 0 ? (
                <p>No attempts yet.</p>
            ) : (
                <ul>
                    {attempts.slice(0, 5).map((attempt) => (
                        <li key={attempt.id} className="recent-attempt-item">
                            <span>{attempt.scenario_title}</span>

                            <span className={getScoreClass(attempt.score)}>
                {attempt.score}%
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default RecentAttempts