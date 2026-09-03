import { useState } from 'react'
import { Link } from 'react-router-dom'

function ReadinessSimulation({ simulation, feedback, isSubmitting, onSubmit }) {
    const [decisions, setDecisions] = useState({})
    const [actions, setActions] = useState([])
    const [readinessDecision, setReadinessDecision] = useState('')
    const hasResults = feedback?.type === 'readiness-simulation'
    const complete =
        Object.keys(decisions).length === simulation.decisions.length &&
        readinessDecision

    function toggleAction(id) {
        setActions((current) => current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id])
    }

    return (
        <section className="readiness-simulation">
            <header className="simulation-header">
                <p className="section-eyebrow">Applied Practice</p>
                <h3>{simulation.title}</h3>
                <p>{simulation.instructions}</p>
            </header>

            <div className="simulation-profile">
                <h4>Site profile</h4>
                <ul>{simulation.siteProfile.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>

            {simulation.decisions.map((decision, index) => {
                const result = feedback?.decisionResults?.find((item) => item.id === decision.id)
                return (
                    <fieldset className="simulation-decision" key={decision.id}>
                        <legend>{index + 1}. {decision.prompt}</legend>
                        {decision.options.map((option) => (
                            <label key={option.id}>
                                <input
                                    type="radio"
                                    name={decision.id}
                                    checked={decisions[decision.id] === option.id}
                                    disabled={hasResults || isSubmitting}
                                    onChange={() => setDecisions((current) => ({ ...current, [decision.id]: option.id }))}
                                />
                                <span>{option.text}</span>
                            </label>
                        ))}
                        {result && (
                            <div className={`simulation-result ${result.isCorrect ? 'simulation-result--correct' : 'simulation-result--review'}`}>
                                <strong>{result.isCorrect ? 'Strong decision' : 'Review this decision'}</strong>
                                <p>{result.explanation}</p>
                                <span>{result.reference}</span>
                                {!result.isCorrect && result.learningCardId && (
                                    <Link to={`/resources#learning-card-${result.learningCardId}`}>Review learning resource</Link>
                                )}
                            </div>
                        )}
                    </fieldset>
                )
            })}

            <section className="simulation-checklist">
                <h4>Build the pre-launch action plan</h4>
                <p>Select every action you would require before launch.</p>
                {simulation.checklist.map((item) => (
                    <label key={item.id}>
                        <input
                            type="checkbox"
                            checked={actions.includes(item.id)}
                            disabled={hasResults || isSubmitting}
                            onChange={() => toggleAction(item.id)}
                        />
                        <span>{item.label}</span>
                    </label>
                ))}
            </section>

            <fieldset className="simulation-decision">
                <legend>{simulation.readiness.prompt}</legend>
                {simulation.readiness.options.map((option) => (
                    <label key={option.id}>
                        <input
                            type="radio"
                            name="readiness-decision"
                            checked={readinessDecision === option.id}
                            disabled={hasResults || isSubmitting}
                            onChange={() => setReadinessDecision(option.id)}
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </fieldset>

            <button
                type="button"
                className="submit-button"
                disabled={!complete || isSubmitting || hasResults}
                onClick={() => onSubmit({ decisions, actions, readinessDecision })}
            >
                {isSubmitting ? 'Evaluating Readiness Plan...' : 'Submit Readiness Plan'}
            </button>
        </section>
    )
}

export default ReadinessSimulation
