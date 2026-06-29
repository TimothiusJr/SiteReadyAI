import ScenarioCard from '../components/scenarios/ScenarioCard.jsx'

function ScenarioPage({
                          scenario,
                          answer,
                          setAnswer,
                          feedback,
                          handleSubmit,
                          handleBackToDashboard,
                      }) {
    return (
        <ScenarioCard
            scenario={scenario}
            answer={answer}
            setAnswer={setAnswer}
            feedback={feedback}
            handleSubmit={handleSubmit}
            handleBackToDashboard={handleBackToDashboard}
        />
    )
}

export default ScenarioPage