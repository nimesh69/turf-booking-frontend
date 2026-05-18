import { Outlet, Link, useLocation } from 'react-router-dom';

export default function MainLayout() {

  return (
    <div className="main-layout">
      <main className="site-main"><Outlet /></main>
    </div>
  );
}
