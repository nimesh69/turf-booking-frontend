import { useCallback, useState } from "react";
import VenueOnboarding from "../components/VenueOnboarding/VenueOnboarding";
import { useOwnerVenues, useVenueVerification } from "../hooks/useTurfs";
import type {
  VenueListItem,
} from "@/types/turf.types"; // adjust import path
// import type { VenueVerification } from "../types"; // adjust import path
import { VerificationModal } from "../modals/verificationModal";


function VenueCard({ venue }: { venue: VenueListItem }) {
  const [canRecheck, setCanRecheck] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const {
    data: verificationStatus,
    refetch,
    isFetching,
  } = useVenueVerification(venue.id);

  const handleCheckVerification = useCallback(() => {
    if (isFetching) return;

    // if already verified, no point re-checking — just show modal
    if (verificationStatus?.verified) {
      setShowModal(true);
      return;
    }

    // not verified: show cached result if checked recently
    if (verificationStatus && !canRecheck) {
      setShowModal(true);
      return;
    }

    setCanRecheck(false);
    refetch().then(() => setShowModal(true));
    setTimeout(() => setCanRecheck(true), 2 * 60 * 1000);
  }, [canRecheck, isFetching, verificationStatus, refetch]);

  // button label logic
  const buttonLabel = isFetching
    ? "Checking..."
    : !verificationStatus?.verified && !canRecheck
      ? "View Status"
      : "Check Verification";

  // only show "View Status" button if not verified and checked recently
  const showButton = verificationStatus?.verified
    ? false // hide button entirely if verified
    : true;

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
        <div className="h-48 bg-gray-200 relative">
          {venue.coverImage && (
            <img
              src={venue.coverImage}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          )}
          {verificationStatus && (
            <div
              className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow backdrop-blur-md border border-white/20
              ${
                verificationStatus.verified
                  ? "bg-green-500/30 text-white"
                  : "bg-red-500/30 text-white"
              }`}
            >
              {verificationStatus.verified ? "✓ Verified on" : "✗ Unverified"}
              <span>
                {verificationStatus.verifiedAt &&
                  new Date(verificationStatus.verifiedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {venue.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{venue.location}</p>
          <p className="text-gray-500 text-xs mb-4">{venue.turfCount} courts</p>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium">
              Edit
            </button>
            {showButton && (
              <button
                onClick={handleCheckVerification}
                disabled={isFetching}
                className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buttonLabel}
              </button>
            )}
            <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && verificationStatus && (
        <VerificationModal
          status={verificationStatus}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default function MyVenues() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { data: venues = [], isLoading, isError } = useOwnerVenues();

  if (showOnboarding) {
    return <VenueOnboarding onClose={() => setShowOnboarding(false)} />;
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Venues Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first venue to start accepting bookings
          </p>
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
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
