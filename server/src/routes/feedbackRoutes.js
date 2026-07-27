import express from 'express'
import { submitFeedback } from '../controllers/feedbackController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/feedback', authenticateToken, submitFeedback)

export default router