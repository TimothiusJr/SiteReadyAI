import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../context/AuthContext'

function MainLayout({ children }) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return (
            <div className="public-layout">
                <Header />

                <main className="public-content">
                    {children}
                </main>
            </div>
        )
    }

    return (
        <div className="main-layout">
            <Header />

            <div className="app-shell">
                <Sidebar />

                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout