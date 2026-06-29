function ResponseBox({ answer, setAnswer, handleSubmit }) {
    return (
        <div className="section-block">
            <h3>Your Response</h3>

            <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your response here..."
                rows="8"
            />

            <p>Character count: {answer.length}</p>

            <button type="button" onClick={handleSubmit}>
                Submit Response
            </button>
        </div>
    )
}

export default ResponseBox