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

function gradeReadinessSimulation(simulation, submission) {
    const decisionResults = simulation.decisions.map((decision) => ({
        id: decision.id,
        isCorrect: submission.decisions[decision.id] === decision.correctOptionId,
        explanation: decision.explanation,
        reference: decision.reference,
        learningCardId: decision.learningCardId,
        competency: decision.competency,
    }))
    const correctDecisions = decisionResults.filter((item) => item.isCorrect).length
    const requiredActions = simulation.checklist.filter((item) => item.required)
    const selectedRequired = requiredActions.filter((item) =>
        submission.actions.includes(item.id),
    )
    const unnecessaryActions = simulation.checklist.filter((item) =>
        !item.required && submission.actions.includes(item.id),
    )
    const readinessCorrect =
        submission.readinessDecision === simulation.readiness.correctOptionId
    const decisionScore = (correctDecisions / simulation.decisions.length) * 60
    const actionScore = (selectedRequired.length / requiredActions.length) * 25
    const score = Math.round(decisionScore + actionScore + (readinessCorrect ? 15 : 0))
    const missedActions = requiredActions.filter((item) =>
        !submission.actions.includes(item.id),
    )

    return {
        score,
        summary: `You made ${correctDecisions} of ${simulation.decisions.length} strong decisions and selected ${selectedRequired.length} of ${requiredActions.length} required pre-launch actions.`,
        strengths: [
            ...(correctDecisions > 0 ? [`Made ${correctDecisions} PI-aligned operational decisions`] : []),
            ...(readinessCorrect ? ['Assigned the appropriate overall readiness status'] : []),
        ],
        improvements: [
            ...decisionResults.filter((item) => !item.isCorrect).map((item) => `Review ${item.reference}`),
            ...missedActions.map((item) => `Add to action plan: ${item.label}`),
            ...unnecessaryActions.map((item) => `Reconsider action: ${item.label}`),
        ],
        recommendations: [
            'Review the linked PI resources, revise the site action plan, and repeat the simulation.',
        ],
        decisionResults,
        competencyPerformance: [
            ...decisionResults.map((item) => ({
                competency: item.competency,
                correct: item.isCorrect ? 1 : 0,
                total: 1,
                score: item.isCorrect ? 100 : 0,
            })),
            {
                competency: 'Action planning',
                correct: selectedRequired.length,
                total: requiredActions.length,
                score: Math.round((selectedRequired.length / requiredActions.length) * 100),
            },
            {
                competency: 'Readiness determination',
                correct: readinessCorrect ? 1 : 0,
                total: 1,
                score: readinessCorrect ? 100 : 0,
            },
        ],
        type: 'readiness-simulation',
    }
}

function gradeDecisionLab(lab, submission) {
    const caseResults = lab.cases.map((caseItem) => ({
        id: caseItem.id,
        title: caseItem.title,
        isCorrect: submission.answers[caseItem.id] === caseItem.correctOptionId,
        explanation: caseItem.explanation,
        reference: caseItem.reference,
    }))
    const correctCount = caseResults.filter((item) => item.isCorrect).length
    const score = Math.round((correctCount / lab.cases.length) * 100)

    return {
        score,
        summary: `You selected the correct restart plan in ${correctCount} of ${lab.cases.length} dose-delay cases.`,
        strengths: correctCount > 0
            ? [`Applied PI Table 3 correctly in ${correctCount} cases`]
            : [],
        improvements: caseResults
            .filter((item) => !item.isCorrect)
            .map((item) => `${item.title} - review ${item.reference}`),
        recommendations: [
            'Compare the last administered dose and elapsed time against PI Table 3 before choosing a restart plan.',
        ],
        caseResults,
        competencyPerformance: [{
            competency: 'Dose-delay decisions',
            correct: correctCount,
            total: lab.cases.length,
            score,
        }],
        type: 'decision-lab',
    }
}

export async function submitFeedback(req, res) {
    try {
        const {
            scenarioId,
            responseText,
            quizAnswers,
            simulationSubmission,
            decisionLabSubmission,
        } = req.body

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
        const isSimulation = scenario.simulationData?.decisions?.length > 0
        const isDecisionLab = scenario.decisionLab?.cases?.length > 0

        if (
            !isKnowledgeCheck && !isSimulation && !isDecisionLab &&
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

        if (
            isSimulation &&
            (!simulationSubmission ||
                !simulationSubmission.decisions ||
                !Array.isArray(simulationSubmission.actions) ||
                scenario.simulationData.decisions.some(
                    (decision) => !decision.options.some(
                        (option) => option.id === simulationSubmission.decisions[decision.id],
                    ),
                ) ||
                !scenario.simulationData.readiness.options.some(
                    (option) => option.id === simulationSubmission.readinessDecision,
                ))
        ) {
            return res.status(400).json({
                message: 'Complete every simulation decision before submitting',
            })
        }

        if (
            isDecisionLab &&
            (!decisionLabSubmission?.answers ||
                scenario.decisionLab.cases.some((caseItem) =>
                    !caseItem.options.some(
                        (option) => option.id === decisionLabSubmission.answers[caseItem.id],
                    ),
                ))
        ) {
            return res.status(400).json({
                message: 'Complete every dose-delay case before submitting',
            })
        }

        const feedback = isDecisionLab
            ? gradeDecisionLab(scenario.decisionLab, decisionLabSubmission)
            : isSimulation
            ? gradeReadinessSimulation(scenario.simulationData, simulationSubmission)
            : isKnowledgeCheck
            ? gradeKnowledgeCheck(
                scenario.quizQuestions,
                quizAnswers,
            )
            : await generateAIFeedback({
                scenario,
                responseText,
            })

        const savedResponseText = isDecisionLab
            ? JSON.stringify(decisionLabSubmission)
            : isSimulation
            ? JSON.stringify(simulationSubmission)
            : isKnowledgeCheck
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
            activityType: feedback.type,
            competencyScores: feedback.competencyPerformance || [],
        })

        return res.status(201).json({
            message: isDecisionLab
                ? 'Dose-delay decision lab scored and attempt saved'
                : isSimulation
                ? 'Readiness simulation scored and attempt saved'
                : isKnowledgeCheck
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
