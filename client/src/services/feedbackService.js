const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export async function generateFeedback({
                                           token,
                                           scenarioId,
                                           responseText,
                                       }) {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            scenarioId,
            responseText,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to generate AI feedback')
    }

    return data
}