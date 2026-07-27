import { useEffect, useState } from 'react'
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'
import './App.css'

import ProtectedRoute from './components/common/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { createInitialProgress } from './data/progressTemplate'
import MainLayout from './layouts/MainLayout'
import AttemptDetailsPage from './pages/AttemptDetailsPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import ProgressPage from './pages/ProgressPage'
import ScenarioPage from './pages/ScenarioPage'
import { getMyAttempts } from './services/attemptService'
import { generateFeedback } from './services/feedbackService'
import { getAllScenarios } from './services/scenarioService'

function App() {
    const [scenarios, setScenarios] = useState([])
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [progress, setProgress] = useState([])
    const [attempts, setAttempts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { token } = useAuth()

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

    useEffect(() => {
        async function loadAttempts() {
            if (!token) {
                setAttempts([])
                return
            }

            try {
                const data = await getMyAttempts(token)
                setAttempts(data)
            } catch (error) {
                console.error('Failed to load attempts:', error.message)
            }
        }

        loadAttempts()
    }, [token])

    function handleSelectScenario(scenario) {
        setSelectedScenario(scenario)
        setAnswer('')
        setFeedback(null)
        navigate('/scenario')
    }

    function handleBackToDashboard() {
        setSelectedScenario(null)
        setAnswer('')
        setFeedback(null)
        navigate('/dashboard')
    }

    async function handleSubmit() {
        const trimmedAnswer = answer.trim()

        if (trimmedAnswer.length < 20) {
            setFeedback({
                message:
                    'Your response is too short. Identify specific barriers and recommended next steps.',
                score: null,
                summary: '',
                strengths: [],
                improvements: [],
                recommendations: [],
            })
            return
        }

        if (!token) {
            setFeedback({
                message: 'Your session has expired. Please log in again.',
                score: null,
                summary: '',
                strengths: [],
                improvements: [],
                recommendations: [],
            })
            return
        }

        if (!selectedScenario) {
            setFeedback({
                message: 'No scenario is currently selected.',
                score: null,
                summary: '',
                strengths: [],
                improvements: [],
                recommendations: [],
            })
            return
        }

        setIsSubmitting(true)
        setFeedback(null)

        try {
            const data = await generateFeedback({
                token,
                scenarioId: selectedScenario.id,
                responseText: trimmedAnswer,
            })

            const feedbackResult = data.feedback

            setFeedback({
                ...feedbackResult,
                message: data.message,
            })

            setProgress((currentProgress) =>
                currentProgress.map((item) => {
                    if (item.scenarioId !== selectedScenario.id) {
                        return item
                    }

                    return {
                        ...item,
                        completed: true,
                        score: feedbackResult.score,
                        attempts: item.attempts + 1,
                        completedAt: new Date().toISOString(),
                    }
                }),
            )

            const updatedAttempts = await getMyAttempts(token)
            setAttempts(updatedAttempts)
        } catch (error) {
            setFeedback({
                message: error.message,
                score: null,
                summary: '',
                strengths: [],
                improvements: [],
                recommendations: [],
            })
        } finally {
            setIsSubmitting(false)
        }
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
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage
                                scenarios={scenarios}
                                progress={progress}
                                attempts={attempts}
                                onSelectScenario={handleSelectScenario}
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scenario"
                    element={
                        <ProtectedRoute>
                            {selectedScenario ? (
                                <ScenarioPage
                                    scenario={selectedScenario}
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    feedback={feedback}
                                    isSubmitting={isSubmitting}
                                    handleSubmit={handleSubmit}
                                    handleBackToDashboard={handleBackToDashboard}
                                />
                            ) : (
                                <Navigate to="/dashboard" replace />
                            )}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/progress"
                    element={
                        <ProtectedRoute>
                            <ProgressPage attempts={attempts} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attempt/:attemptId"
                    element={
                        <ProtectedRoute>
                            <AttemptDetailsPage attempts={attempts} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </MainLayout>
    )
}

export default App