import { useParams } from 'react-router-dom';

export default function PlayerProfilePage() {
  const { id } = useParams();
  return (
    <div className="page player-profile-page">
      <div className="player-hero">
        <div className="player-avatar">P</div>
        <div>
          <h1>Player Profile</h1>
          <p>ID: {id}</p>
        </div>
      </div>
      <div className="player-stats">
        {[{label:'Matches',val:42},{label:'Rating',val:'4.8'},{label:'Sports',val:3}].map(s=>(
          <div key={s.label} className="stat-card">
            <span className="stat-card__val">{s.val}</span>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
