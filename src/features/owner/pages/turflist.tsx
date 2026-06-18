import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { turfApi } from "@/api/turf.api";
import type { TurfListItem } from "@/types/turf.types";

export default function TurfList() {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();

  // Fetch venue and its turfs
  const {
    data: venue, // rename directly in destructuring
    isLoading,
    error,
  } = useQuery({
    queryKey: ["venue", venueId],
    queryFn: async () => {
      if (!venueId) throw new Error("Venue ID not provided");
      return turfApi.getVenue(venueId);
    },
    enabled: !!venueId,
  });
  console.log("venue data", venue?.turfs);
  if (!venueId) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please select a venue</p>
          <button
            onClick={() => navigate("/owner/venues")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Venues
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">Loading venue and turfs...</p>
        </div>
      </main>
    );
  }

  if (error || !venue) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
          <p className="font-semibold">Error loading venue</p>
          <p className="text-sm mt-1">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            onClick={() => navigate("/owner/venues")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Venues
          </button>
        </div>
      </main>
    );
  }

  const turfs = venue?.turfs ?? [];
  const activeTurfs = turfs.filter((t) => t.status === "active").length;
  const maintenanceTurfs = turfs.filter((t) => t.status === "inactive").length;

  return (
    <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
      {/* Breadcrumb and Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-xxl">
        <div>
          <nav className="flex items-center gap-xs text-on-surface-variant mb-xs">
            <span
              onClick={() => navigate("/owner/venues")}
              className="font-caption text-caption cursor-pointer hover:underline"
            >
              My Venues
            </span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="font-caption text-caption font-bold text-primary">
              {venue.name}
            </span>
          </nav>
          <h1 className="font-h1 text-h1 text-primary">Venue Courts</h1>
        </div>
        <button className="bg-primary text-on-primary px-xl py-lg rounded-xl flex items-center gap-sm font-semibold hover:opacity-90 transition-opacity active:scale-95">
          <span className="material-symbols-outlined">add</span>
          Add New Court
        </button>
      </div>

      {/* Dashboard Overview Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-xxl">
        <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant flex items-center gap-xl">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-secondary-container">
              check_circle
            </span>
          </div>
          <div>
            <p className="font-caption text-caption text-on-surface-variant">
              Active Courts
            </p>
            <p className="font-h2 text-h2 text-primary">{activeTurfs}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant flex items-center gap-xl">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">
              build
            </span>
          </div>
          <div>
            <p className="font-caption text-caption text-on-surface-variant">
              Under Maintenance/Inactive
            </p>
            <p className="font-h2 text-h2 text-primary">{maintenanceTurfs}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant flex items-center gap-xl">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-secondary-container">
              trending_up
            </span>
          </div>
          <div>
            <p className="font-caption text-caption text-on-surface-variant">
              Avg. Rating
            </p>
            <p className="font-h2 text-h2 text-primary">
              {turfs.length > 0
                ? (
                    turfs.reduce(
                      (sum, t: TurfListItem) =>
                        sum +
                        (parseFloat(t.avg_rating?.toString() || "0") || 0),
                      0,
                    ) / turfs.length
                  ).toFixed(1)
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Court Grid */}
      {turfs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-5xl mb-4">🏟️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Courts Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add your first court to start accepting bookings
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Court
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {turfs.map((turf: TurfListItem) => (
            <div
              key={turf.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {turf.coverImage ? (
                  <img
                    src={turf.coverImage}
                    alt={turf.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute top-md left-md">
                  <span
                    className={`text-[10px] font-bold px-md py-xs rounded-full uppercase tracking-wider ${
                      turf.status === "active"
                        ? "bg-secondary text-on-secondary"
                        : "bg-outline text-on-surface"
                    }`}
                  >
                    {turf.status}
                  </span>
                </div>
              </div>
              <div className="p-lg">
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="font-h2 text-h2 text-primary">{turf.name}</h3>
                  <span className="font-h2 text-h2 text-secondary">
                    ₹{turf.price_per_hour}
                    <span className="text-caption font-normal text-on-surface-variant">
                      /hr
                    </span>
                  </span>
                </div>
                <div className="space-y-sm mb-xl">
                  <div className="flex items-center gap-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      sports_soccer
                    </span>
                    <span className="font-body-sm text-body-sm capitalize">
                      {turf.sport}
                    </span>
                  </div>
                  <div className="flex items-center gap-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      groups
                    </span>
                    <span className="font-body-sm text-body-sm">
                      Max {turf.max_players} Players
                    </span>
                  </div>
                  {turf.avg_rating && (
                    <div className="flex items-center gap-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                      <span className="font-body-sm text-body-sm">
                        {turf.avg_rating} Rating
                      </span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-md pt-lg border-t border-outline-variant">
                  <button className="flex items-center justify-center gap-sm py-md rounded-lg border border-outline text-primary font-semibold hover:bg-surface-container-low transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-sm py-md rounded-lg border border-error text-error font-semibold hover:bg-error-container transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
