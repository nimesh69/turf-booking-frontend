// import { ChevronRight } from 'lucide-react';
import { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { LuCircleParking } from "react-icons/lu";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoFlashlight } from "react-icons/io5";
import {
  GiShower,
  GiCoffeeCup,
  GiWifiRouter,
  GiPoolDive,
  GiWaterBottle,
  GiCctvCamera,
} from "react-icons/gi";
import ImageUpload from "../common/ImageUpload";

interface Step1Props {
  onNext: (data: VenueDetailsData) => void;
  onCancel: () => void;
}

export interface VenueDetailsData {
  venueName: string;
  location: string;
  address: string;
  venue_cover: File | null;
  amenities: string[];
}

export default function Step1VenueDetails({ onNext, onCancel }: Step1Props) {
  const [formData, setFormData] = useState<VenueDetailsData>({
    venueName: "",
    location: "",
    venue_cover: null as File | null,
    address: "",
    amenities: [],
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

  const handleNext = () => {
    if (formData.venueName && formData.location && formData.address) {
      onNext(formData);
    }
  };

  return (
    <main className="pt-[88px] pb-xxl min-h-screen max-w-4xl mx-auto px-lg">
      {/* Progress Indicator */}
      <div className="mb-xxl mt-lg">
        <div className="flex justify-between items-end mb-sm">
          <div>
            <span className="font-caption text-secondary uppercase tracking-wider font-bold">
              Step 1 of 5
            </span>
            <h2 className="font-h2 text-h2 block text-2xl font-bold mt-2">
              Venue Details
            </h2>
          </div>
          <span className="font-body-sm text-on-surface-variant">
            20% Complete
          </span>
        </div>
        <div className="flex gap-sm h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-1/5 rounded-full transition-all duration-700"></div>
          <div className="h-full bg-gray-300 w-1/5 rounded-full"></div>
          <div className="h-full bg-gray-300 w-1/5 rounded-full"></div>
          <div className="h-full bg-gray-300 w-1/5 rounded-full"></div>
          <div className="h-full bg-gray-300 w-1/5 rounded-full"></div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Basic Information</h3>
            <p className="text-gray-600 text-sm">
              Tell us about your facility to help athletes find you easily.
            </p>
          </div>

          {/* Input Groups */}
          <div className="grid grid-cols-1 gap-6">
            {/* Venue Name */}
            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Venue Name
              </label>
              <input
                type="text"
                placeholder="e.g. Riverside Tennis Center"
                value={formData.venueName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    venueName: e.target.value,
                  }))
                }
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-all"
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
                  placeholder="Search facility address..."
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <ImageUpload
                  label="Cover Image"
                  value={formData.venue_cover}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      venue_cover: file,
                    }))
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Full Address
              </label>
              <input
                type="text"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-all"
              />
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
                      className={`px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2 ${
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
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          disabled={
            !formData.venueName || !formData.location || !formData.address
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition font-semibold flex items-center gap-2"
        >
          Next <GrFormNextLink />
        </button>
      </div>
    </main>
  );
}
