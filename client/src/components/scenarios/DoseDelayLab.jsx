import { useState } from 'react'
import { Link } from 'react-router-dom'

function DoseDelayLab({ lab, feedback, isSubmitting, onSubmit }) {
    const [answers, setAnswers] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const hasResults = feedback?.type === 'decision-lab'
    const currentCase = lab.cases[currentIndex]
    const result = feedback?.caseResults?.find((item) => item.id === currentCase.id)
    const answeredCount = Object.keys(answers).length

    return (
        <section className="decision-lab">
            <header className="simulation-header">
                <p className="section-eyebrow">Dose-Delay Decision Lab</p>
                <h3>{lab.title}</h3>
                <p>{lab.instructions}</p>
            </header>

            <div className="lab-progress">
                <div>
                    <strong>Case {currentIndex + 1} of {lab.cases.length}</strong>
                    <span>{hasResults ? 'Review results' : `${answeredCount} answered`}</span>
                </div>
                <div className="lab-progress__track">
                    <span style={{ width: `${((currentIndex + 1) / lab.cases.length) * 100}%` }} />
                </div>
            </div>

            <article className="dose-case">
                <p className="dose-case__label">Patient timeline</p>
                <h4>{currentCase.title}</h4>
                <dl>
                    <div><dt>Last dose</dt><dd>{currentCase.lastDose}</dd></div>
                    <div><dt>Time elapsed</dt><dd>{currentCase.elapsed}</dd></div>
                    <div><dt>Decision</dt><dd>{currentCase.prompt}</dd></div>
                </dl>

                <div className="dose-case__options">
                    {currentCase.options.map((option) => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name={currentCase.id}
                                checked={answers[currentCase.id] === option.id}
                                disabled={hasResults || isSubmitting}
                                onChange={() => setAnswers((current) => ({ ...current, [currentCase.id]: option.id }))}
                            />
                            <span>{option.text}</span>
                        </label>
                    ))}
                </div>

                {result && (
                    <div className={`simulation-result ${result.isCorrect ? 'simulation-result--correct' : 'simulation-result--review'}`}>
                        <strong>{result.isCorrect ? 'Correct restart decision' : 'Review this restart decision'}</strong>
                        <p>{result.explanation}</p>
                        <span>{result.reference}</span>
                        {!result.isCorrect && <Link to="/resources#learning-card-dose-delays">Review dose-delay learning card</Link>}
                    </div>
                )}
            </article>

            <div className="lab-navigation">
                <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>Previous case</button>
                {currentIndex < lab.cases.length - 1 ? (
                    <button type="button" disabled={!answers[currentCase.id] && !hasResults} onClick={() => setCurrentIndex((value) => value + 1)}>Next case</button>
                ) : (
                    <button type="button" disabled={answeredCount !== lab.cases.length || isSubmitting || hasResults} onClick={() => onSubmit({ answers })}>
                        {isSubmitting ? 'Scoring Decisions...' : 'Submit Decision Lab'}
                    </button>
                )}
            </div>
        </section>
    )
}

export default DoseDelayLab
