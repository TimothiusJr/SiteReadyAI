import express from 'express'
import { getScenarios } from '../controllers/scenarioController.js'

const router = express.Router()

router.get('/scenarios', getScenarios)

export default router