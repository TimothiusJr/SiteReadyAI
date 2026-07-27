const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export async function getAllScenarios() {
    const response = await fetch(`${API_BASE_URL}/scenarios`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch scenarios')
    }

    return data
}