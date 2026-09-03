import { createAttempt } from '../services/attemptService.js'
import { getScenarioById } from '../services/scenarioService.js'
import { generateAIFeedback } from '../services/ai/openaiService.js'

function gradeKnowledgeCheck(quizQuestions, quizAnswers) {
    const questionResults = quizQuestions.map((question) => {
        const selectedOptionId = quizAnswers[question.id]
        const isCorrect = selectedOptionId === question.correctOptionId

        return {
            id: question.id,
            question: question.question,
            selectedOptionId,
            correctOptionId: question.correctOptionId,
            isCorrect,
            explanation: question.explanation,
            reference: question.reference,
            learningCardId: question.learningCardId,
            competency: question.competency,
        }
    })

    const correctCount = questionResults.filter(
        (result) => result.isCorrect,
    ).length
    const score = Math.round(
        (correctCount / quizQuestions.length) * 100,
    )
    const missedReferences = [
        ...new Set(
            questionResults
                .filter((result) => !result.isCorrect)
                .map((result) => result.reference),
        ),
    ]
    const competencyPerformance = Object.values(
        questionResults.reduce((performance, result) => {
            const competency = result.competency || result.reference

            if (!performance[competency]) {
                performance[competency] = {
                    competency,
                    correct: 0,
                    total: 0,
                }
            }

            performance[competency].total += 1
            performance[competency].correct += result.isCorrect ? 1 : 0

            return performance
        }, {}),
    ).map((item) => ({
        ...item,
        score: Math.round((item.correct / item.total) * 100),
    }))

    return {
        score,
        summary: `You answered ${correctCount} of ${quizQuestions.length} questions correctly.`,
        strengths: [
            `Correctly answered ${correctCount} of ${quizQuestions.length} PI-based questions`,
        ],
        improvements: missedReferences.map(
            (reference) => `Review ${reference}`,
        ),
        recommendations:
            missedReferences.length > 0
                ? [
                    'Review the cited PI sections, then repeat the knowledge check.',
                ]
                : [
                    'Continue using the current Prescribing Information as the source of truth.',
                ],
        questionResults,
        competencyPerformance,
        type: 'knowledge-check',
    }
}

export async function submitFeedback(req, res) {
    try {
        const { scenarioId, responseText, quizAnswers } = req.body

        if (!scenarioId) {
            return res.status(400).json({
                message: 'Scenario ID is required',
            })
        }

        const scenario = await getScenarioById(scenarioId)

        if (!scenario) {
            return res.status(404).json({
                message: 'Scenario not found',
            })
        }

        const isKnowledgeCheck = scenario.quizQuestions?.length > 0

        if (
            !isKnowledgeCheck &&
            !responseText?.trim()
        ) {
            return res.status(400).json({
                message: 'Response text is required',
            })
        }

        if (
            isKnowledgeCheck &&
            (!quizAnswers ||
                scenario.quizQuestions.some(
                    (question) => {
                        const selectedOptionId = quizAnswers[question.id]

                        return !question.options.some(
                            (option) => option.id === selectedOptionId,
                        )
                    },
                ))
        ) {
            return res.status(400).json({
                message: 'Answer every knowledge-check question before submitting',
            })
        }

        const feedback = isKnowledgeCheck
            ? gradeKnowledgeCheck(
                scenario.quizQuestions,
                quizAnswers,
            )
            : await generateAIFeedback({
                scenario,
                responseText,
            })

        const savedResponseText = isKnowledgeCheck
            ? scenario.quizQuestions
                .map((question, index) => {
                    const selectedOption = question.options.find(
                        (option) => option.id === quizAnswers[question.id],
                    )

                    return `${index + 1}. ${selectedOption?.text || 'No answer'}`
                })
                .join('\n')
            : responseText.trim()

        const attempt = await createAttempt({
            userId: req.user.userId,
            scenarioId,
            responseText: savedResponseText,
            score: feedback.score,
            strengths: feedback.strengths,
            improvements: feedback.improvements,
            summary: feedback.summary,
            recommendations: feedback.recommendations,
        })

        return res.status(201).json({
            message: isKnowledgeCheck
                ? 'Knowledge check scored and attempt saved'
                : 'AI feedback generated and attempt saved',
            feedback,
            attempt,
        })
    } catch (error) {
        console.error('AI feedback error:', error)

        return res.status(500).json({
            message: 'Failed to generate AI feedback',
        })
    }
}
