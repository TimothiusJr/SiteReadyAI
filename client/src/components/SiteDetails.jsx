function SiteDetails({ details }) {
    return (
        <div className="section-block">
            <h3>Site Details</h3>

            <ul>
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    )
}

export default SiteDetails