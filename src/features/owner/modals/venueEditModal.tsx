import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import {
  GiShower,
  GiCoffeeCup,
  GiWifiRouter,
  GiPoolDive,
  GiWaterBottle,
  GiCctvCamera,
} from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoFlashlight } from "react-icons/io5";
import ImageUpload from "../components/common/ImageUpload";
import type { VenueListItem } from "@/types/turf.types";

interface VenueEditModalProps {
  venue: VenueListItem;
  onSubmit: (data: {
    name: string;
    location: string;
    amenities: Record<string, boolean>; // ✅ was string[]
    coverImage?: File;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
// Add this conversion map outside the component
const AMENITY_KEY_TO_LABEL: Record<string, string> = {
  cctv: "CCTV",
  wifi: "WiFi",
  parking: "Parking",
  showers: "Showers",
  cafeteria: "Cafeteria",
  washrooms: "Washrooms",
  floodlight: "FloodLight",
  change_rooms: "Change Rooms",
  swimming_pool: "Swimming Pool",
  drinking_water: "Drinking Water",
  spectator_area: "Spectator Area",
};
export function VenueEditModal({
  venue,
  onSubmit,
  onCancel,
  isLoading = false,
}: VenueEditModalProps) {
  const [formData, setFormData] = useState({
    name: venue.name,
    location: venue.location,
    amenities: Object.entries(venue.amenities ?? {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => AMENITY_KEY_TO_LABEL[key])
      .filter(Boolean),
    coverImage: null as File | null,
  });
  const amenitiesOptions = [
    { icon: LuCircleParking, label: "Parking" },
    { icon: GiShower, label: "Showers" },
    { icon: GiShower, label: "Change Rooms" },
    { icon: GiShower, label: "Washrooms" },
    { icon: GiCoffeeCup, label: "Cafeteria" },
    { icon: GiWifiRouter, label: "WiFi" },
    { icon: FaPeopleRobbery, label: "Spectator Area" },
    { icon: GiPoolDive, label: "Swimming Pool" },
    { icon: GiWaterBottle, label: "Drinking Water" },
    { icon: GiCctvCamera, label: "CCTV" },
    { icon: IoFlashlight, label: "FloodLight" },
  ];

  const toggleAmenity = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(label)
        ? prev.amenities.filter((a) => a !== label)
        : [...prev.amenities, label],
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.location) {
      // ✅ Convert label array → API object before submitting
      const amenitiesObject = Object.fromEntries(
        Object.entries(AMENITY_KEY_TO_LABEL).map(([apiKey, label]) => [
          apiKey, // ✅ use the exact API key
          formData.amenities.includes(label),
        ]),
      );

      onSubmit({
        name: formData.name,
        location: formData.location,
        amenities: amenitiesObject, // ✅ sends { cctv: true, wifi: false, ... }
        coverImage: formData.coverImage ?? undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">Edit Venue</h2>
            <p className="text-sm text-gray-600 mt-1">
              Update your venue information
            </p>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 text-2xl disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-6">
          {/* Venue Name */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Venue Name
            </label>
            <input
              type="text"
              placeholder="e.g. Riverside Tennis Center"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              disabled={isLoading}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Location
            </label>
            <div className="relative mb-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                location_on
              </span>
              <input
                type="text"
                placeholder="Enter venue location..."
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <ImageUpload
                label="Cover Image"
                value={formData.coverImage}
                onChange={(file) =>
                  setFormData((prev) => ({
                    ...prev,
                    coverImage: file,
                  }))
                }
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Amenities
            </label>
            <p className="text-gray-600 text-sm mb-3">
              Select all that apply to your venue.
            </p>
            <div className="flex flex-wrap gap-3">
              {amenitiesOptions.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <button
                    key={`${amenity.label}-${index}`}
                    onClick={() => toggleAmenity(amenity.label)}
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.amenities.includes(amenity.label)
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {Icon && <Icon className="text-base" />}
                    {amenity.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.location || isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition font-semibold disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
