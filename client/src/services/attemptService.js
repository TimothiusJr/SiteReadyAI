const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export async function saveAttempt({
                                      token,
                                      scenarioId,
                                      responseText,
                                      score,
                                      strengths,
                                      improvements,
                                  }) {
    const response = await fetch(`${API_BASE_URL}/attempts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            scenarioId,
            responseText,
            score,
            strengths,
            improvements,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to save attempt')
    }

    return data
}

export async function getMyAttempts(token) {
    const response = await fetch(`${API_BASE_URL}/attempts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to load attempts')
    }

    return data
}