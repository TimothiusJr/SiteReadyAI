import { useAuth } from '../../context/AuthContext'
import DashboardStats from './DashboardStats'
import PerformanceChart from './PerformanceChart'
import ProgressSummary from './ProgressSummary'
import RecentAttempts from './RecentAttempts'
import ScenarioList from './ScenarioList'

function Dashboard({
                       scenarios = [],
                       progress = [],
                       attempts = [],
                       onSelectScenario,
                   }) {
    const { user } = useAuth()

    const completedScenarioIds = new Set(
        attempts.map((attempt) => attempt.scenario_id),
    )

    const completedScenarioCount = completedScenarioIds.size

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

    const completionPercent =
        scenarios.length > 0
            ? Math.round((completedScenarioCount / scenarios.length) * 100)
            : 0

    return (
        <section className="dashboard">
            <div className="dashboard-hero">
                <p className="dashboard-eyebrow">
                    Medical Affairs Implementation Training
                </p>

                <h2>
                    Welcome back{user?.name ? `, ${user.name}` : ''}
                </h2>

                <p>
                    Continue building your implementation planning skills through
                    scenario-based practice and performance feedback.
                </p>
            </div>

            <section className="dashboard-section">
                <div className="section-heading">
                    <p className="section-eyebrow">Performance</p>
                    <h3>Your training overview</h3>
                </div>

                <DashboardStats
                    averageScore={averageScore}
                    highestScore={highestScore}
                    completedScenarioCount={completedScenarioCount}
                    totalScenarios={scenarios.length}
                    totalAttempts={attempts.length}
                    completionPercent={completionPercent}
                    latestAttempt={latestAttempt}
                />
            </section>

            <section className="dashboard-section">
                <PerformanceChart attempts={attempts} />
            </section>

            <section className="dashboard-grid">
                <ProgressSummary
                    completedScenarioCount={completedScenarioCount}
                    totalScenarios={scenarios.length}
                    completionPercent={completionPercent}
                />

                <RecentAttempts attempts={attempts} />
            </section>

            <section className="dashboard-section">
                <div className="section-heading">
                    <p className="section-eyebrow">Scenario Library</p>

                    <h3>Continue learning</h3>

                    <p className="section-description">
                        Choose a scenario to practice implementation planning.
                    </p>
                </div>

                <ScenarioList
                    scenarios={scenarios}
                    progress={progress}
                    attempts={attempts}
                    onSelectScenario={onSelectScenario}
                />
            </section>
        </section>
    )
}

export default Dashboard