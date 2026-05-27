import { useState } from 'react';
import VenueOnboarding from '../components/VenueOnboarding/VenueOnboarding';
import { useOwnerVenues } from '../hooks/useTurfs';

export default function MyVenues() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { data: venues = [], isLoading, isError } = useOwnerVenues();

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <VenueOnboarding onClose={handleOnboardingClose} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Venues</h1>
          <p className="text-gray-600 mt-1">Manage your turf venues</p>
        </div>
        <button 
          onClick={() => setShowOnboarding(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Venue
        </button>
      </div>

      {/* Venues Grid */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">Loading venues...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
          Unable to load venues. Please try again.
        </div>
      ) : venues.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-5xl mb-4">🏟️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Venues Yet</h3>
          <p className="text-gray-600 mb-6">Create your first venue to start accepting bookings</p>
          <button 
            onClick={() => setShowOnboarding(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Your First Venue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 relative">
                {venue.coverImage && <img src={venue.coverImage} alt={venue.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{venue.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{venue.location}</p>
                <p className="text-gray-500 text-xs mb-4">{venue.turfCount} courts</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
