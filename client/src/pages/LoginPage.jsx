import { useState } from 'react'
import {
    Link,
    Navigate,
    useNavigate,
} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] =
        useState(false)

    const navigate = useNavigate()
    const {
        login,
        isAuthenticated,
    } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    async function handleLogin(event) {
        event.preventDefault()

        setError(null)
        setIsSubmitting(true)

        try {
            await login(
                email.trim().toLowerCase(),
                password,
            )

            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="auth-card">
            <div className="auth-heading">
                <p className="auth-eyebrow">
                    SiteReadyAI
                </p>

                <h2>Welcome back</h2>

                <p>
                    Sign in to continue your Medical Affairs
                    training and review your progress.
                </p>
            </div>

            <div className="auth-tabs">
                <Link
                    to="/login"
                    className="auth-tab active"
                >
                    Sign In
                </Link>

                <Link
                    to="/register"
                    className="auth-tab"
                >
                    Create Account
                </Link>
            </div>

            <form onSubmit={handleLogin}>
                <label htmlFor="login-email">
                    Email address

                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="name@example.com"
                        autoComplete="email"
                        required
                    />
                </label>

                <label htmlFor="login-password">
                    Password

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? 'Signing in...'
                        : 'Sign In'}
                </button>
            </form>

            {error && (
                <p
                    className="error-message"
                    role="alert"
                >
                    {error}
                </p>
            )}

            <p className="auth-footer-message">
                New to SiteReadyAI?{' '}
                <Link to="/register">
                    Create an account
                </Link>
            </p>
        </section>
    )
}

export default LoginPage