import express from 'express'
import cors from 'cors'
import scenarioRoutes from './routes/scenarioRoutes.js'
import authRoutes from './routes/authRoutes.js'
import attemptRoutes from './routes/attemptRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'

const app = express()

const PORT = 3001

app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
)

app.use(express.json())

app.use('/api', scenarioRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('SiteReady AI Backend is running!')
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.use('/api', attemptRoutes)

app.use('/api', feedbackRoutes)