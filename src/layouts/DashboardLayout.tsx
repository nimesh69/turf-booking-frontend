import { Outlet, Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { to: '/owner', label: 'Dashboard', icon: '📊' },
  { to: '/owner/turfs', label: 'My Turfs', icon: '🏟️' },
  { to: '/owner/bookings', label: 'Bookings', icon: '📅' },
  { to: '/owner/earnings', label: 'Earnings', icon: '💰' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Link to="/" className="site-logo">⚽ TurfBook</Link>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <Link key={item.to} to={item.to}
              className={`sidebar-link ${pathname === item.to ? 'sidebar-link--active' : ''}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main"><Outlet /></main>
    </div>
  );
}
