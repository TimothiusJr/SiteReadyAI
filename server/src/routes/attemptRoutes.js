import express from 'express'
import {
    getMyAttempts,
    submitAttempt,
} from '../controllers/attemptController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/attempts', authenticateToken, getMyAttempts)
router.post('/attempts', authenticateToken, submitAttempt)

export default router