export default function SettingsPage() {
  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <div className="settings-sections">
        {[
          { title:'Account', items:['Edit Profile','Change Password','Phone Number']},
          { title:'Notifications', items:['Push Notifications','Email Alerts','Booking Reminders']},
          { title:'Privacy', items:['Profile Visibility','Location Sharing']},
          { title:'About', items:['Terms of Service','Privacy Policy','App Version']},
        ].map(sec=>(
          <section key={sec.title} className="settings-section">
            <h2>{sec.title}</h2>
            <ul>
              {sec.items.map(item=>(
                <li key={item} className="settings-item">
                  <span>{item}</span>
                  <span>›</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <button className="btn-danger">Sign Out</button>
      </div>
    </div>
  );
}
