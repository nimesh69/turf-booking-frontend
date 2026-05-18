import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookingPage() {
  const { turfId } = useParams();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="page booking-page">
      <h1>Book Turf</h1>
      <div className="booking-form">
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="form-input" min={new Date().toISOString().split('T')[0]} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Time</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
              className="form-input" />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
              className="form-input" />
          </div>
        </div>
        <div className="booking-summary">
          <p>Turf ID: {turfId}</p>
          <p>Total: NPR —</p>
        </div>
        <button className="btn-primary">Confirm Booking</button>
      </div>
    </div>
  );
}
