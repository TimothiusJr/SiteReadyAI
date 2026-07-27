import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db/pool.js'

export async function createUser({ name, email, password }) {
    const existingUser = await pool.query(
        `
      SELECT id
      FROM users
      WHERE email = $1
    `,
        [email],
    )

    if (existingUser.rows.length > 0) {
        throw new Error('Email already exists')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await pool.query(
        `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `,
        [name, email, passwordHash],
    )

    return result.rows[0]
}
export async function loginUser({ email, password }) {
    const result = await pool.query(
        `
      SELECT id, name, email, password_hash
      FROM users
      WHERE email = $1
    `,
        [email],
    )

    const user = result.rows[0]

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        },
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    }
}