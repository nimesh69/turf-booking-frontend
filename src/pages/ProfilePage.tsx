import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="page profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || '?'}
        </div>
        <div>
          <h1>{user?.name || 'User'}</h1>
          <p>{user?.email}</p>
          <span className="badge">{user?.role}</span>
        </div>
      </div>
      <div className="profile-sections">
        <section className="profile-section">
          <h2>My Bookings</h2>
          <p className="empty-state">No bookings yet</p>
        </section>
        <section className="profile-section">
          <h2>My Reviews</h2>
          <p className="empty-state">No reviews yet</p>
        </section>
      </div>
    </div>
  );
}
