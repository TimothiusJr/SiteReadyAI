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
            <h2>✍️ Your Response</h2>

            <p className="response-description">
                Explain your implementation plan, identify operational barriers,
                and describe how you would prepare the site for successful adoption.
            </p>

            <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Describe your implementation strategy..."
                rows={12}
                maxLength={maxCharacters}
                disabled={isSubmitting}
            />

            <div className="response-footer">
                <span>{answer.length} characters</span>
                <span>{charactersRemaining} remaining</span>
            </div>

            <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? '🤖 Generating AI Evaluation...'
                    : 'Submit Response'}
            </button>
        </div>
    )
}

export default ResponseBox