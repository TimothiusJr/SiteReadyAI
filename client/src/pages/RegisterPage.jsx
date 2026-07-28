import { useState } from 'react'
import {
    Link,
    Navigate,
    useNavigate,
} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] =
        useState('')
    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState('')
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] =
        useState(false)

    const navigate = useNavigate()
    const {
        register,
        isAuthenticated,
    } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    async function handleRegister(event) {
        event.preventDefault()
        setError(null)

        if (name.trim().length < 2) {
            setError(
                'Please enter your full name.',
            )
            return
        }

        if (password.length < 8) {
            setError(
                'Your password must contain at least 8 characters.',
            )
            return
        }

        if (password !== confirmPassword) {
            setError(
                'The passwords do not match.',
            )
            return
        }

        setIsSubmitting(true)

        try {
            await register(
                name.trim(),
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

                <h2>Create your account</h2>

                <p>
                    Start practicing site-readiness scenarios
                    and receive personalized performance
                    feedback.
                </p>
            </div>

            <div className="auth-tabs">
                <Link
                    to="/login"
                    className="auth-tab"
                >
                    Sign In
                </Link>

                <Link
                    to="/register"
                    className="auth-tab active"
                >
                    Create Account
                </Link>
            </div>

            <form onSubmit={handleRegister}>
                <label htmlFor="register-name">
                    Full name

                    <input
                        id="register-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                    />
                </label>

                <label htmlFor="register-email">
                    Email address

                    <input
                        id="register-email"
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

                <label htmlFor="register-password">
                    Password

                    <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </label>

                <label htmlFor="confirm-password">
                    Confirm password

                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value,
                            )
                        }
                        placeholder="Enter your password again"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? 'Creating account...'
                        : 'Create Account'}
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
                Already have an account?{' '}
                <Link to="/login">
                    Sign in
                </Link>
            </p>
        </section>
    )
}

export default RegisterPage