function ResponseBox({
                         answer,
                         setAnswer,
                         handleSubmit,
                         isSubmitting,
                     }) {
    const maxCharacters = 500
    const minimumCharacters = 20
    const charactersRemaining =
        maxCharacters - answer.length

    const canSubmit =
        answer.trim().length >= minimumCharacters &&
        !isSubmitting

    return (
        <div className="response-box">
            <p className="response-eyebrow">
                Implementation Assessment
            </p>

            <h2>Your Response</h2>

            <p className="response-description">
                Explain the site’s readiness, identify the main
                barriers, and recommend the next steps required
                before implementation.
            </p>

            <textarea
                value={answer}
                onChange={(event) =>
                    setAnswer(event.target.value)
                }
                placeholder="Describe your assessment and recommended action plan..."
                rows={12}
                maxLength={maxCharacters}
                disabled={isSubmitting}
            />

            <div className="response-footer">
                <span>{answer.length} characters</span>
                <span>{charactersRemaining} remaining</span>
            </div>

            {isSubmitting && (
                <section
                    className="ai-thinking-panel"
                    role="status"
                    aria-live="polite"
                >
                    <div className="ai-thinking-header">
            <span
                className="loading-spinner"
                aria-hidden="true"
            />

                        <div>
                            <p className="ai-thinking-eyebrow">
                                AI Performance Review
                            </p>

                            <h3>Evaluating your response</h3>
                        </div>
                    </div>

                    <div className="ai-thinking-steps">
                        <div className="ai-thinking-step">
                            <span aria-hidden="true">✓</span>
                            <p>Reviewing operational barriers</p>
                        </div>

                        <div className="ai-thinking-step">
                            <span aria-hidden="true">✓</span>
                            <p>Assessing patient safety considerations</p>
                        </div>

                        <div className="ai-thinking-step">
                            <span aria-hidden="true">✓</span>
                            <p>Evaluating site-readiness planning</p>
                        </div>

                        <div className="ai-thinking-step ai-thinking-step--active">
              <span
                  className="ai-thinking-dot"
                  aria-hidden="true"
              />

                            <p>Generating personalized recommendations</p>
                        </div>
                    </div>

                    <p className="ai-thinking-note">
                        This may take a few seconds.
                    </p>
                </section>
            )}

            <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
            >
                {isSubmitting
                    ? 'Generating Performance Review...'
                    : 'Submit for Evaluation'}
            </button>

            {!isSubmitting &&
                answer.trim().length > 0 &&
                answer.trim().length < minimumCharacters && (
                    <p className="response-validation">
                        Please provide at least {minimumCharacters}{' '}
                        characters before submitting.
                    </p>
                )}
        </div>
    )
}

export default ResponseBox