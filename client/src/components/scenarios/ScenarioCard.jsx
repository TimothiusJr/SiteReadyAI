import SiteDetails from './SiteDetails.jsx'
import TrainingQuestions from './TrainingQuestions.jsx'
import ResponseBox from '../feedback/ResponseBox.jsx'
import FeedbackCard from '../feedback/FeedbackCard'

function ScenarioCard({
                          scenario,
                          answer,
                          setAnswer,
                          feedback,
                          handleSubmit,
                          handleBackToDashboard,
                      }) {
    return (
        <section className="scenario-card">
            <button
                type="button"
                onClick={handleBackToDashboard}
            >
                ← Back to Dashboard
            </button>

            <h2>{scenario.title}</h2>

            <p>{scenario.description}</p>

            <SiteDetails details={scenario.siteDetails} />

            <TrainingQuestions questions={scenario.questions} />

            <ResponseBox
                answer={answer}
                setAnswer={setAnswer}
                feedback={feedback}
                handleSubmit={handleSubmit}
            />

            <FeedbackCard feedback={feedback} />
        </section>
    )
}

export default ScenarioCard