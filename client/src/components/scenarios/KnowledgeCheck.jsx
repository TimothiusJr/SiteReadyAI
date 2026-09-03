function KnowledgeCheck({
                            questions,
                            answers,
                            setAnswers,
                            feedback,
                            isSubmitting,
                            handleSubmit,
                        }) {
    const answeredCount = Object.keys(answers).length
    const allAnswered = answeredCount === questions.length
    const hasResults = Boolean(feedback?.questionResults?.length)
    const resultsById = new Map(
        (feedback?.questionResults || []).map((result) => [
            result.id,
            result,
        ]),
    )

    function selectAnswer(questionId, optionId) {
        if (hasResults || isSubmitting) return

        setAnswers((current) => ({
            ...current,
            [questionId]: optionId,
        }))
    }

    return (
        <section className="knowledge-check">
            <header className="knowledge-check__header">
                <div>
                    <p className="section-eyebrow">TEC3 Knowledge Check</p>
                    <h3>TECVAYLI PI Sections 1–5</h3>
                    <p>
                        Select one answer for each question. Results include the
                        applicable PI section and a short explanation.
                    </p>
                </div>
                <strong>{answeredCount}/{questions.length} answered</strong>
            </header>

            <div className="knowledge-check__questions">
                {questions.map((question, questionIndex) => {
                    const result = resultsById.get(question.id)

                    return (
                        <fieldset className="quiz-question" key={question.id}>
                            <legend>
                                <span>{questionIndex + 1}</span>
                                {question.question}
                            </legend>

                            <div className="quiz-options">
                                {question.options.map((option) => {
                                    const isSelected = answers[question.id] === option.id
                                    const isCorrect = result?.correctOptionId === option.id
                                    const isIncorrectSelection =
                                        result && isSelected && !result.isCorrect

                                    const classNames = [
                                        'quiz-option',
                                        isSelected ? 'quiz-option--selected' : '',
                                        isCorrect ? 'quiz-option--correct' : '',
                                        isIncorrectSelection
                                            ? 'quiz-option--incorrect'
                                            : '',
                                    ].filter(Boolean).join(' ')

                                    return (
                                        <label className={classNames} key={option.id}>
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option.id}
                                                checked={isSelected}
                                                onChange={() =>
                                                    selectAnswer(question.id, option.id)
                                                }
                                                disabled={hasResults || isSubmitting}
                                            />
                                            <span>{option.text}</span>
                                        </label>
                                    )
                                })}
                            </div>

                            {result && (
                                <div
                                    className={`quiz-rationale ${
                                        result.isCorrect
                                            ? 'quiz-rationale--correct'
                                            : 'quiz-rationale--incorrect'
                                    }`}
                                >
                                    <strong>
                                        {result.isCorrect ? 'Correct' : 'Review this item'}
                                    </strong>
                                    <p>{result.explanation}</p>
                                    <span>{result.reference}</span>
                                </div>
                            )}
                        </fieldset>
                    )
                })}
            </div>

            <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
                disabled={!allAnswered || isSubmitting || hasResults}
            >
                {isSubmitting ? 'Scoring Knowledge Check...' : 'Submit Knowledge Check'}
            </button>

            {!allAnswered && (
                <p className="response-validation">
                    Answer all {questions.length} questions to submit.
                </p>
            )}
        </section>
    )
}

export default KnowledgeCheck
