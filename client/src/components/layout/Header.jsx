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
        <header>
            <h1>SiteReady AI</h1>

            <p>AI-assisted scenario training for Medical Implementation Leads.</p>

            {isAuthenticated && (
                <div>
                    <p>Logged in as {user.name}</p>

                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header