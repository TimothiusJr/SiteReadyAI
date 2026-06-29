import Dashboard from '../components/dashboard/Dashboard'

function DashboardPage({ scenarios, progress, onSelectScenario }) {
    return (
        <Dashboard
            scenarios={scenarios}
            progress={progress}
            onSelectScenario={onSelectScenario}
        />
    )
}

export default DashboardPage