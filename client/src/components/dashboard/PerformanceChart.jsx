import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'

function PerformanceChart({ attempts = [] }) {
    const chartData = [...attempts]
        .reverse()
        .map((attempt, index) => ({
            attempt: `#${index + 1}`,
            score: attempt.score,
        }))

    return (
        <section className="performance-chart-card">
            <div className="section-heading">
                <p className="section-eyebrow">Analytics</p>
                <h3>Performance Over Time</h3>
                <p className="section-description">
                    Track how your scores improve across completed scenarios.
                </p>
            </div>

            {chartData.length === 0 ? (
                <p>No attempts yet.</p>
            ) : (
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="4 4" />

                        <XAxis dataKey="attempt" />

                        <YAxis domain={[0, 100]} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </section>
    )
}

export default PerformanceChart