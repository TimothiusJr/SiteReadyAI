import Dashboard from '../components/dashboard/Dashboard'

function DashboardPage({
                           scenarios,
                           progress,
                           attempts,
                           onSelectScenario,
                       }) {
    return (
        <Dashboard
            scenarios={scenarios}
            progress={progress}
            attempts={attempts}
            onSelectScenario={onSelectScenario}
        />
    )
}

export default DashboardPage