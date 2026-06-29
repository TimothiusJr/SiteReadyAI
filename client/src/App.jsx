import { useState } from 'react'
import Header from './components/layout/Header.jsx'
import DashboardPage from './pages/DashboardPage'
import ScenarioPage from './pages/ScenarioPage'
import { scenarios } from './data/scenarios'
import { createInitialProgress } from './data/progressTemplate'
import { generateFeedback } from './services/feedbackService'
import './App.css'

function App() {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [progress, setProgress] = useState(
      createInitialProgress(scenarios)
  )

  function handleSelectScenario(scenario) {
    setSelectedScenario(scenario)
    setAnswer('')
    setFeedback('')
  }

  function handleBackToDashboard() {
    setSelectedScenario(null)
    setAnswer('')
    setFeedback('')
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
        })
    )

    setFeedback(feedbackResult)
  }

  return (
      <main>
        <Header />

        {selectedScenario ? (
            <ScenarioPage
                scenario={selectedScenario}
                answer={answer}
                setAnswer={setAnswer}
                feedback={feedback}
                handleSubmit={handleSubmit}
                handleBackToDashboard={handleBackToDashboard}
            />
        ) : (
            <DashboardPage
                scenarios={scenarios}
                progress={progress}
                onSelectScenario={handleSelectScenario}
            />
        )}
      </main>
  )
}

export default App