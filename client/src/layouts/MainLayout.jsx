import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
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

                <Footer />
            </div>
        )
    }

    return (
        <div className="main-layout">
            <Header />

            <div className="app-shell">
                <Sidebar />

                <div className="content-shell">
                    <main className="main-content">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MainLayout