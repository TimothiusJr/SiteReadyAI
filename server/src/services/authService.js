import bcrypt from 'bcrypt'
import { pool } from '../db/pool.js'

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