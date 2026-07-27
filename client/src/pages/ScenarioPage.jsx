import ScenarioCard from '../components/scenarios/ScenarioCard.jsx'

function ScenarioPage({
                          scenario,
                          answer,
                          setAnswer,
                          feedback,
                          isSubmitting,
                          handleSubmit,
                          handleBackToDashboard,
                      }) {
    return (
        <ScenarioCard
            scenario={scenario}
            answer={answer}
            setAnswer={setAnswer}
            feedback={feedback}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            handleBackToDashboard={handleBackToDashboard}
        />
    )
}

export default ScenarioPage