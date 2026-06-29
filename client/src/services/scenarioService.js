export async function getAllScenarios() {
    const response = await fetch('http://localhost:3001/api/scenarios')

    if (!response.ok) {
        throw new Error('Failed to fetch scenarios')
    }

    return response.json()
}