import express from 'express'
import cors from 'cors'
import scenarioRoutes from './routes/scenarioRoutes.js'

const app = express()

const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api', scenarioRoutes)

app.get('/', (req, res) => {
    res.send('SiteReady AI Backend is running!')
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})