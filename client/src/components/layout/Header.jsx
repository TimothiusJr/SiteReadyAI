import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Header() {
    const { user, logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <header className="app-header">
            <div className="brand-mark" aria-hidden="true">
                J&amp;J
            </div>

            <div className="app-header__brand-text">
                <p className="brand-organization">
                    Johnson &amp; Johnson Innovative Medicine
                </p>

                <h1>SiteReadyAI</h1>

                <p className="brand-description">
                    Medical Affairs learning and site-readiness training
                </p>
            </div>

            {isAuthenticated && (
                <div className="app-header__account">
                    <div className="user-avatar" aria-hidden="true">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <div className="user-details">
                        <span className="user-label">Signed in as</span>
                        <strong>{user?.name || 'User'}</strong>
                    </div>

                    <button
                        className="secondary-button logout-button"
                        type="button"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header