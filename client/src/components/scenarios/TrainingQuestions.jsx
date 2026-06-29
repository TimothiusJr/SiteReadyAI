function TrainingQuestions({ questions }) {
    return (
        <div className="section-block">
            <h3>Training Questions</h3>

            <ol>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ol>
        </div>
    )
}

export default TrainingQuestions