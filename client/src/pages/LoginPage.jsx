import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const [email, setEmail] = useState('timmy@example.com')
    const [password, setPassword] = useState('password123')
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { login } = useAuth()

    async function handleLogin(event) {
        event.preventDefault()

        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="auth-card">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>

                <button type="submit">Login</button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </section>
    )
}

export default LoginPage