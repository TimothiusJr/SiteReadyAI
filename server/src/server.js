import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import scenarioRoutes from './routes/scenarioRoutes.js'
import authRoutes from './routes/authRoutes.js'
import attemptRoutes from './routes/attemptRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'

dotenv.config()

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
].filter(Boolean)

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
                return
            }

            callback(new Error('Origin not allowed by CORS'))
        },
        credentials: true,
    }),
)

app.use(express.json())

app.get('/', (request, response) => {
    response.json({
        status: 'ok',
        message: 'SiteReadyAI API is running',
    })
})

app.get('/api/health', (request, response) => {
    response.json({
        status: 'ok',
        message: 'SiteReadyAI API is healthy',
    })
})

app.use('/api', scenarioRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', attemptRoutes)
app.use('/api', feedbackRoutes)

app.use((error, request, response, next) => {
    console.error(error)

    response.status(500).json({
        message: 'An unexpected server error occurred',
    })
})

const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

export default app