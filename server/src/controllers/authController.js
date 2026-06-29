import { createUser, loginUser } from '../services/authService.js'

export async function registerUser(req, res) {
    try {
        const user = await createUser(req.body)

        res.status(201).json({
            message: 'User registered successfully',
            user,
        })
    } catch (error) {
        console.error(error)

        res.status(400).json({
            message: error.message,
        })
    }
}

export async function login(req, res) {
    try {
        const result = await loginUser(req.body)

        res.json({
            message: 'Login successful',
            ...result,
        })
    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
    }
}