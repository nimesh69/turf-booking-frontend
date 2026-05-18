import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  return (
    <div className="page explore-page">
      <div className="page__header">
        <h1>Explore Turfs</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search by name or location…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="form-input" />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      <div className="filters">
        {['Football','Cricket','Basketball','Tennis'].map(s => (
          <button key={s} className="filter-chip">{s}</button>
        ))}
      </div>
      <div className="turf-grid">
        {/* Turf cards rendered here */}
      </div>
    </div>
  );
}
