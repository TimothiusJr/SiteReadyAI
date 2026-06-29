import express from 'express'
import { login, registerUser } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)

router.get('/me', authenticateToken, (req, res) => {
    res.json({
        message: 'Protected route accessed successfully',
        user: req.user,
    })
})

export default router