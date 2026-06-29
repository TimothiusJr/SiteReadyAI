export function generateFeedback(answer) {
    const lowerCaseAnswer = answer.toLowerCase()

    const criteria = [
        {
            keyword: 'staff',
            points: 20,
        },
        {
            keyword: 'monitor',
            points: 20,
        },
        {
            keyword: 'crs',
            points: 20,
        },
        {
            keyword: 'protocol',
            points: 20,
        },
        {
            keyword: 'pharmacy',
            points: 20,
        },
    ]

    let score = 0
    const strengths = []
    const improvements = []

    criteria.forEach((criterion) => {
        if (lowerCaseAnswer.includes(criterion.keyword)) {
            score += criterion.points
            strengths.push(`Mentioned ${criterion.keyword}`)
        } else {
            improvements.push(`Consider discussing ${criterion.keyword}`)
        }
    })

    return {
        score,
        strengths,
        improvements,
        message:
            'Feedback generated using an early keyword-based scoring engine. AI feedback will replace this later.',
    }
}