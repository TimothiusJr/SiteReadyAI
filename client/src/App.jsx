import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ScenarioPage from './pages/ScenarioPage'
import MainLayout from './layouts/MainLayout'
import { createInitialProgress } from './data/progressTemplate'
import { getAllScenarios } from './services/scenarioService'
import { generateFeedback } from './services/feedbackService'
import './App.css'

function App() {
    const [scenarios, setScenarios] = useState([])
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [progress, setProgress] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadScenarios() {
            try {
                const data = await getAllScenarios()
                setScenarios(data)
                setProgress(createInitialProgress(data))
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadScenarios()
    }, [])

    function handleSelectScenario(scenario) {
        setSelectedScenario(scenario)
        setAnswer('')
        setFeedback(null)
    }

    function handleBackToDashboard() {
        setSelectedScenario(null)
        setAnswer('')
        setFeedback(null)
    }

    function handleSubmit() {
        if (answer.trim().length < 20) {
            setFeedback({
                message:
                    'Your response is too short. Try identifying specific barriers and next steps.',
                score: null,
                strengths: [],
                improvements: [],
            })
            return
        }

        const feedbackResult = generateFeedback(answer)

        setProgress(
            progress.map((item) => {
                if (item.scenarioId === selectedScenario.id) {
                    return {
                        ...item,
                        completed: true,
                        score: feedbackResult.score,
                        attempts: item.attempts + 1,
                        completedAt: new Date().toISOString(),
                    }
                }

                return item
            }),
        )

        setFeedback(feedbackResult)
    }

    if (isLoading) {
        return (
            <MainLayout>
                <p>Loading scenarios...</p>
            </MainLayout>
        )
    }

    if (error) {
        return (
            <MainLayout>
                <p>Error: {error}</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route
                    path="/dashboard"
                    element={
                        <DashboardPage
                            scenarios={scenarios}
                            progress={progress}
                            onSelectScenario={handleSelectScenario}
                        />
                    }
                />

                <Route
                    path="/scenario"
                    element={
                        selectedScenario ? (
                            <ScenarioPage
                                scenario={selectedScenario}
                                answer={answer}
                                setAnswer={setAnswer}
                                feedback={feedback}
                                handleSubmit={handleSubmit}
                                handleBackToDashboard={handleBackToDashboard}
                            />
                        ) : (
                            <Navigate to="/dashboard" replace />
                        )
                    }
                />
            </Routes>
        </MainLayout>
    )
}

export default App