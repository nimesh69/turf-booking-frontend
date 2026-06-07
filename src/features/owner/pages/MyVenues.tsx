import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import VenueOnboarding from "../components/VenueOnboarding/VenueOnboarding";
import { useOwnerVenues, useVenueVerification } from "../hooks/useTurfs";
import { turfApi } from "@/api/turf.api";
import type {
  VenueListItem,
  VenueUpdate,
} from "@/types/turf.types"; // adjust import path
import { VerificationModal } from "../modals/verificationModal";
import { VenueEditModal } from "../modals/venueEditModal";
import { venueQueryKeys } from "../hooks/useTurfs";


function VenueCard({ venue }: { venue: VenueListItem }) {
  const [canRecheck, setCanRecheck] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: verificationStatus,
    refetch,
    isFetching,
  } = useVenueVerification(venue.id);

const updateVenueMutation = useMutation({
  mutationFn: async (data: {
    name: string;
    location: string;
    amenities: Record<string, boolean>; // ✅ was string[]
    coverImage?: File;
  }) => {
    const updateData: VenueUpdate = {
      name: data.name,
      location: data.location,
      amenities: data.amenities, // ✅ already correct format, no conversion needed
      ...(data.coverImage && { coverImage: data.coverImage }),
    };
    return turfApi.updateVenue(venue.id, updateData);
  },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: venueQueryKeys.all });
      setShowEditModal(false);
      alert("Venue updated successfully!");
    },
    onError: (error: Error) => {
      alert(`Failed to update venue: ${error.message}`);
    },
  });

  const handleCheckVerification = useCallback(() => {
    if (isFetching) return;

    // if already verified, no point re-checking — just show modal
    if (verificationStatus?.verified) {
      setShowVerificationModal(true);
      return;
    }

    // not verified: show cached result if checked recently
    if (verificationStatus && !canRecheck) {
      setShowVerificationModal(true);
      return;
    }

    setCanRecheck(false);
    refetch().then(() => setShowVerificationModal(true));
    setTimeout(() => setCanRecheck(true), 2 * 60 * 1000);
  }, [canRecheck, isFetching, verificationStatus, refetch]);

  // button label logic
  const buttonLabel = isFetching
    ? "Checking..."
    : !verificationStatus?.verified && !canRecheck
      ? "View Status"
      : "Check Verification";

  // only show "View Status" button if not verified and checked recently
  const showCheckButton = verificationStatus?.verified
    ? false // hide button entirely if verified
    : true;
  const showEditButton = verificationStatus?.verified === true;

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
              {verificationStatus.verified ? "✓ Verified on" : "Under Review"}
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
          <span className="text-sm font-medium text-gray-500 mb-1">
            Status: {venue.status}
          </span>
          <p className="text-gray-600 text-sm mb-4">Location: {venue.location}</p>
          <p className="text-gray-500 text-xs mb-4">{venue.turfCount} courts</p>

          <div className="flex gap-2">
            {showEditButton && (
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium"
              >
                Edit
              </button>
            )}
            {showCheckButton && (
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

      {showEditModal && (
        <VenueEditModal
          venue={venue}
          onSubmit={(data) => {
            updateVenueMutation.mutate(data);
          }}
          onCancel={() => setShowEditModal(false)}
          isLoading={updateVenueMutation.isPending}
        />
      )}

      {showVerificationModal && verificationStatus && (
        <VerificationModal
          status={verificationStatus}
          onClose={() => setShowVerificationModal(false)}
          onRefresh={() => refetch()}
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
