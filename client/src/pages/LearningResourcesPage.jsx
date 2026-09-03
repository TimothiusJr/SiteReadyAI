import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function LearningResourcesPage({ scenarios }) {
    const { hash } = useLocation()
    const resourceGroups = scenarios
        .filter((scenario) => scenario.learningCards?.length > 0)
        .map((scenario) => ({
            id: scenario.id,
            title: scenario.sourceLabel || scenario.title,
            note: scenario.sourceNote,
            sourceUrl: scenario.sourceUrl,
            cards: scenario.learningCards,
        }))

    useEffect(() => {
        if (!hash) return

        const card = document.getElementById(hash.slice(1))

        if (card) {
            card.open = true
            card.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [hash, resourceGroups.length])

    return (
        <section className="resources-page">
            <header className="resources-hero">
                <p className="section-eyebrow">Learning Resources</p>
                <h2>Product knowledge library</h2>
                <p>
                    Review approved source material, key facts, and practical
                    considerations for MIL site-readiness discussions.
                </p>
            </header>

            {resourceGroups.length === 0 ? (
                <div className="section-block">
                    <p>No learning resources are available yet.</p>
                </div>
            ) : (
                resourceGroups.map((group) => (
                    <section className="resource-group" key={group.id}>
                        <div className="resource-group__header">
                            <div>
                                <p className="section-eyebrow">Source Material</p>
                                <h3>{group.title}</h3>
                                {group.note && <p>{group.note}</p>}
                            </div>
                            <a href={group.sourceUrl} target="_blank" rel="noreferrer">
                                Open Prescribing Information
                            </a>
                        </div>

                        <div className="learning-library learning-library--resources">
                            {group.cards.map((card) => (
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
                    </section>
                ))
            )}
        </section>
    )
}

export default LearningResourcesPage
