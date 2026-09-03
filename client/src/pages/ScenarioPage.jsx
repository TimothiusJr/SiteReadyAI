import ScenarioCard from '../components/scenarios/ScenarioCard.jsx'

function ScenarioPage({
                          scenario,
                          answer,
                          setAnswer,
                          feedback,
                          isSubmitting,
                          handleSubmit,
                          quizAnswers,
                          setQuizAnswers,
                          handleQuizSubmit,
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
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            handleQuizSubmit={handleQuizSubmit}
            handleBackToDashboard={handleBackToDashboard}
        />
    )
}

export default ScenarioPage
