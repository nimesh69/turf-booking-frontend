export default function OwnerDashboardPage() {
  return (
    <div className="page owner-dashboard-page">
      <h1>Owner Dashboard</h1>
      <div className="dashboard-grid">
        {[
          {icon:'🏟️',label:'My Turfs',val:3},
          {icon:'📅',label:'Today Bookings',val:8},
          {icon:'💰',label:'Revenue',val:'NPR 24,000'},
          {icon:'⭐',label:'Avg Rating',val:'4.7'},
        ].map(card=>(
          <div key={card.label} className="dashboard-card">
            <span className="dashboard-card__icon">{card.icon}</span>
            <div>
              <p className="dashboard-card__val">{card.val}</p>
              <p className="dashboard-card__label">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
      <section>
        <h2>Recent Bookings</h2>
        <div className="booking-list">
          <p className="empty-state">No recent bookings</p>
        </div>
      </section>
    </div>
  );
}
