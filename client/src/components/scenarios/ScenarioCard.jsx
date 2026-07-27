import FeedbackCard from '../feedback/FeedbackCard'
import ResponseBox from '../feedback/ResponseBox.jsx'
import SiteDetails from './SiteDetails.jsx'
import TrainingQuestions from './TrainingQuestions.jsx'

function ScenarioCard({
                          scenario,
                          answer,
                          setAnswer,
                          feedback,
                          isSubmitting,
                          handleSubmit,
                          handleBackToDashboard,
                      }) {
    return (
        <section className="scenario-page-content">
            <button
                type="button"
                className="back-link-button"
                onClick={handleBackToDashboard}
            >
                ← Back to Dashboard
            </button>

            <header className="scenario-hero">
                <p className="scenario-eyebrow">
                    Medical Affairs Training Scenario
                </p>

                <h2>{scenario.title}</h2>

                <p>{scenario.description}</p>
            </header>

            <div className="scenario-content-grid">
                <div className="scenario-information">
                    <SiteDetails details={scenario.siteDetails} />

                    <TrainingQuestions questions={scenario.questions} />
                </div>

                <div className="scenario-response-column">
                    <ResponseBox
                        answer={answer}
                        setAnswer={setAnswer}
                        feedback={feedback}
                        isSubmitting={isSubmitting}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>

            <FeedbackCard feedback={feedback} />
        </section>
    )
}

export default ScenarioCard