function ResponseBox({
                         answer,
                         setAnswer,
                         handleSubmit,
                         isSubmitting,
                     }) {
    const maxCharacters = 500
    const charactersRemaining = maxCharacters - answer.length

    return (
        <div className="response-box">
            <p className="response-eyebrow">
                Implementation Assessment
            </p>

            <h2>Your Response</h2>

            <p className="response-description">
                Explain the site’s readiness, identify the main barriers,
                and recommend the next steps required before implementation.
            </p>

            <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
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
                <div
                    className="ai-evaluation-status"
                    role="status"
                    aria-live="polite"
                >
                    <span className="loading-spinner" aria-hidden="true" />

                    <div>
                        <strong>Evaluating your response</strong>

                        <p>
                            Reviewing site readiness, safety considerations,
                            operational gaps, and your recommended action plan.
                        </p>
                    </div>
                </div>
            )}

            <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || answer.trim().length < 20}
            >
                {isSubmitting
                    ? 'Generating performance review...'
                    : 'Submit for Evaluation'}
            </button>

            {!isSubmitting && answer.trim().length > 0 && answer.trim().length < 20 && (
                <p className="response-validation">
                    Please provide at least 20 characters before submitting.
                </p>
            )}
        </div>
    )
}

export default ResponseBox