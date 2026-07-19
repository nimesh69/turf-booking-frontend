import { ChevronLeft, Edit } from 'lucide-react';
import type { OnboardingData } from './VenueOnboarding';

interface Step5Props {
  data: OnboardingData;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onBack: () => void;
  onComplete: () => void;
}

export default function Step5PreviewReview({ data, isSubmitting = false, errorMessage, onBack, onComplete }: Step5Props) {
  const venueDetails = data.venueDetails;
  const courts = data.courts?.courts ?? [];
  const amenities = venueDetails?.amenities ?? [];
  const media = data.media?.courtImages ?? {};

  return (
    <main className="pt-6 pb-24 min-h-screen px-6 max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-blue-600 uppercase tracking-wider text-sm">Step 5 of 5</span>
          <span className="font-bold text-gray-900 text-sm">100% Complete</span>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-full transition-all duration-1000 ease-out"></div>
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Preview & Review</h1>
        <p className="text-gray-600">Verify all your information before completing the registration.</p>
      </div>

      {/* Venue Information Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">General Information</h2>
            <p className="text-sm text-gray-600">Verify your venue's primary details.</p>
          </div>
          <button className="flex items-center gap-2 font-sm text-blue-600 hover:underline transition-all">
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-2">Venue Name</label>
              <p className="text-lg font-semibold text-gray-900">{venueDetails?.venueName}</p>
            </div>
            {/* <div>
              <label className="text-xs font-semibold text-gray-600 block mb-2">Full Address</label>
              <p className="text-lg font-semibold text-gray-900">{venueDetails?.address}</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Courts Grid Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Available Courts</h2>
            <p className="text-sm text-gray-600">Review each sport court and its pricing.</p>
          </div>
          <button className="flex items-center gap-2 font-sm text-blue-600 hover:underline transition-all">
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courts.map(court => {
            const images = media[court.id] ?? [];
            const cover = images[0]?.previewUrl;

            return (
              <div key={court.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {cover ? (
                    <img alt={court.name} src={cover} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No image uploaded</div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-lg">sports_soccer</span>
                    <span className="text-sm font-bold">{court.sportType}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{court.name}</h3>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-blue-600">${court.pricePerHour.toFixed(2)}</span>
                      <span className="text-xs text-gray-600">per hour</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {images.slice(0, 3).map(image => (
                      <div key={image.previewUrl} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <img alt={court.name} src={image.previewUrl} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {images.length > 3 && (
                      <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                        +{images.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Amenities</h2>
            <p className="text-sm text-gray-600">Services available at your venue.</p>
          </div>
          <button className="flex items-center gap-2 font-sm text-blue-600 hover:underline transition-all">
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map(amenity => (
            <div key={amenity} className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">check_circle</span>
              <span className="font-semibold text-gray-900">{amenity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">✓ All Set!</h3>
        <p className="text-blue-900 mb-4">
          Your venue information is complete and ready for submission. Click "Complete Registration" to finalize your venue setup and start accepting bookings.
        </p>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check</span>
            <span>Venue details verified</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check</span>
            <span>Courts configured</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check</span>
            <span>Media uploaded</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check</span>
            <span>Documents verified</span>
          </li>
        </ul>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-red-800 font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 font-semibold"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={onComplete}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 active:scale-95 transition-all shadow-md font-semibold"
        >
          <span>{isSubmitting ? 'Submitting...' : 'Complete Registration'}</span>
          <span className="material-symbols-outlined">rocket_launch</span>
        </button>
      </nav>
    </main>
  );
}
