import { rubric } from '../data/rubric'

export function generateFeedback(answer) {
    const lowerCaseAnswer = answer.toLowerCase()

    let score = 0
    const strengths = []
    const improvements = []

    rubric.forEach((category) => {
        const matched = category.keywords.some((keyword) =>
            lowerCaseAnswer.includes(keyword),
        )

        if (matched) {
            score += category.points
            strengths.push(`Addressed ${category.title}`)
        } else {
            improvements.push(`Consider discussing ${category.title}`)
        }
    })

    return {
        score,
        strengths,
        improvements,
        message:
            'Feedback generated using a rubric-based scoring engine. AI feedback will replace or enhance this later.',
    }
}