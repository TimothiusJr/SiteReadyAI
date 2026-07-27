import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

const feedbackSchema = {
    type: 'object',
    properties: {
        score: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            description:
                'A whole-number score from 0 to 100. Use the full 100-point scale, never a 1-to-10 scale.',
        },
        summary: {
            type: 'string',
        },
        strengths: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        improvements: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        recommendations: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: [
        'score',
        'summary',
        'strengths',
        'improvements',
        'recommendations',
    ],
    additionalProperties: false,
}

export async function generateAIFeedback({
                                             scenario,
                                             responseText,
                                         }) {
    const prompt = `
You are a Medical Affairs implementation training coach.

Evaluate the learner response using a full 100-point scale.

Scoring guide:
- 0–20: Missing most major readiness concerns
- 21–40: Identifies a few concerns but lacks a workable plan
- 41–60: Partial understanding with several important gaps
- 61–80: Generally strong but needs more detail or specificity
- 81–100: Thorough, specific, practical, and safety-focused

Evaluate:
- Operational barriers
- Patient monitoring and safety planning
- Staffing and workflow readiness
- Stakeholder coordination
- Quality and specificity of the action plan

Do not provide medical advice.
Do not invent requirements that are absent from the scenario.

SCENARIO TITLE:
${scenario.title}

SCENARIO DESCRIPTION:
${scenario.description}

SITE DETAILS:
${scenario.siteDetails.map((detail) => `- ${detail}`).join('\n')}

TRAINING QUESTIONS:
${scenario.questions.map((question) => `- ${question}`).join('\n')}

LEARNER RESPONSE:
${responseText}
  `.trim()

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: feedbackSchema,
        },
    })

    if (!response.text) {
        throw new Error('Gemini returned an empty response')
    }

    const feedback = JSON.parse(response.text)

    if (
        !Number.isInteger(feedback.score) ||
        feedback.score < 0 ||
        feedback.score > 100
    ) {
        throw new Error('Gemini returned an invalid score')
    }

    return feedback
}