function ReferenceMaterial({ label, note, url }) {
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

        </div>
    )
}

export default ReferenceMaterial
