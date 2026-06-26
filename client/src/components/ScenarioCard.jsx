import SiteDetails from './SiteDetails'
import TrainingQuestions from './TrainingQuestions'
import ResponseBox from './ResponseBox'

function ScenarioCard({ scenario, answer, setAnswer }) {
    return (
        <section className="scenario-card">
            <h2>{scenario.title}</h2>
            <p>{scenario.description}</p>

            <SiteDetails details={scenario.siteDetails} />

            <TrainingQuestions questions={scenario.questions} />

            <ResponseBox answer={answer} setAnswer={setAnswer} />
        </section>
    )
}

export default ScenarioCard