import { useState } from 'react'
import Header from './components/Header'
import ScenarioCard from './components/ScenarioCard'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const scenario = {
    title: 'Community Oncology Site Readiness',
    description:
        'A community oncology practice wants to begin outpatient bispecific step-up dosing.',
    siteDetails: [
      '2 oncologists',
      '4 infusion chairs',
      'Limited nursing staff',
      'No weekend monitoring',
      'No formal CRS escalation protocol',
      'Nearest hospital is 40 minutes away',
    ],
    questions: [
      'What barriers do you identify?',
      'Is this site ready? Why or why not?',
      'What action plan would you recommend?',
    ],
  }
  function handleSubmit() {
    if (answer.trim().length < 20) {
      setFeedback('Your response is too short. Try identifying specific barriers and next steps.')
      return
    }

    setFeedback('Response submitted. Next step will be AI-generated feedback.')
  }

  return (
      <main>
        <Header />

        <ScenarioCard
            scenario={scenario}
            answer={answer}
            setAnswer={setAnswer}
            feedback={feedback}
            handleSubmit={handleSubmit}
        />
      </main>
  )
}

export default App