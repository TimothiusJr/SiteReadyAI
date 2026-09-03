function ReferenceMaterial({ label, note, url, cards = [] }) {
    if (!url) {
        return null
    }

    return (
        <div className="section-block reference-material">
            <p className="section-eyebrow">Source Material</p>
            <h3>{label || 'Prescribing Information'}</h3>
            {note && <p>{note}</p>}
            <a href={url} target="_blank" rel="noreferrer">
                Open Prescribing Information
            </a>

            {cards.length > 0 && (
                <div className="learning-library">
                    <div className="learning-library__heading">
                        <p className="section-eyebrow">Learning Library</p>
                        <h4>Review by PI section</h4>
                        <p>Open a card for key facts and the MIL application.</p>
                    </div>

                    {cards.map((card) => (
                        <details
                            className="learning-card"
                            id={`learning-card-${card.id}`}
                            key={card.id}
                        >
                            <summary>
                                <span>{card.section}</span>
                                <strong>{card.title}</strong>
                            </summary>
                            <div className="learning-card__content">
                                <p>{card.summary}</p>
                                <ul>
                                    {(card.keyPoints || []).map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                                <div className="learning-card__application">
                                    <strong>MIL application</strong>
                                    <p>{card.milApplication}</p>
                                </div>
                                <small>Source: {card.reference}</small>
                            </div>
                        </details>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ReferenceMaterial
