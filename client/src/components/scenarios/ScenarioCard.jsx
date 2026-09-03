import FeedbackCard from '../feedback/FeedbackCard'
import ResponseBox from '../feedback/ResponseBox.jsx'
import SiteDetails from './SiteDetails.jsx'
import TrainingQuestions from './TrainingQuestions.jsx'
import KnowledgeCheck from './KnowledgeCheck.jsx'
import ReferenceMaterial from './ReferenceMaterial.jsx'

function ScenarioCard({
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
    const isKnowledgeCheck = scenario.quizQuestions?.length > 0

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

            <div
                className={`scenario-content-grid ${
                    isKnowledgeCheck ? 'scenario-content-grid--quiz' : ''
                }`}
            >
                <div className="scenario-information">
                    <ReferenceMaterial
                        label={scenario.sourceLabel}
                        note={scenario.sourceNote}
                        url={scenario.sourceUrl}
                    />

                    {scenario.siteDetails?.length > 0 && (
                        <SiteDetails details={scenario.siteDetails} />
                    )}

                    {scenario.questions?.length > 0 && (
                        <TrainingQuestions questions={scenario.questions} />
                    )}
                </div>

                <div className="scenario-response-column">
                    {isKnowledgeCheck ? (
                        <KnowledgeCheck
                            questions={scenario.quizQuestions}
                            answers={quizAnswers}
                            setAnswers={setQuizAnswers}
                            feedback={feedback}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleQuizSubmit}
                        />
                    ) : (
                        <ResponseBox
                            answer={answer}
                            setAnswer={setAnswer}
                            feedback={feedback}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>

            <FeedbackCard feedback={feedback} />
        </section>
    )
}

export default ScenarioCard
