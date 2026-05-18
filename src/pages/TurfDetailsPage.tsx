import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function TurfDetailsPage() {
  const { id } = useParams();
  return (
    <div className="page turf-details-page">
      <div className="turf-details__gallery">
        <div className="gallery-placeholder">📸 Gallery - Turf {id}</div>
      </div>
      <div className="turf-details__content">
        <div className="turf-details__info">
          <h1>Turf Name</h1>
          <p className="turf-details__location">📍 Location</p>
          <div className="turf-details__stats">
            <span>⭐ 4.5</span>
            <span>💰 NPR 1200/hr</span>
            <span>✅ Available</span>
          </div>
          <p className="turf-details__desc">Turf description goes here.</p>
        </div>
        <div className="booking-panel">
          <h3>Book This Turf</h3>
          <Link to={`/booking/${id}`} className="btn-primary">Book Now</Link>
        </div>
      </div>
    </div>
  );
}
