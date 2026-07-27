import { NavLink } from 'react-router-dom'

function SidebarIcon({ children }) {
    return (
        <span className="sidebar-icon" aria-hidden="true">
      {children}
    </span>
    )
}

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-brand">
                <p className="sidebar-brand-label">Learning workspace</p>
                <h2 className="sidebar-brand-name">SiteReadyAI</h2>
            </div>

            <nav className="sidebar-nav" aria-label="Primary navigation">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <SidebarIcon>⌂</SidebarIcon>
                    <span>Overview</span>
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <SidebarIcon>▤</SidebarIcon>
                    <span>Training scenarios</span>
                </NavLink>

                <NavLink
                    to="/progress"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <SidebarIcon>↗</SidebarIcon>
                    <span>My progress</span>
                </NavLink>

                <div className="sidebar-divider" />

                <span className="sidebar-disabled">
          <SidebarIcon>◎</SidebarIcon>

          <span>
            AI coach
            <small>Coming soon</small>
          </span>
        </span>

                <span className="sidebar-disabled">
          <SidebarIcon>□</SidebarIcon>

          <span>
            Learning resources
            <small>Coming soon</small>
          </span>
        </span>
            </nav>

            <div className="sidebar-footer">
                <p>Medical Affairs training prototype</p>
            </div>
        </aside>
    )
}

export default Sidebar