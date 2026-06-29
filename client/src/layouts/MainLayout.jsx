import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

function MainLayout({ children }) {
    return (
        <>
            <Header />

            <div className="app-shell">
                <Sidebar />

                <main className="main-content">
                    {children}
                </main>
            </div>
        </>
    )
}

export default MainLayout