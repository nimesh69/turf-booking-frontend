import ImageUpload from "../components/common/ImageUpload";
import { AMENITY_OPTIONS } from "../hooks/useVenueForm";
import type { VenueFormState } from "../hooks/useVenueForm";

interface VenueFormFieldsProps {
  formData: VenueFormState;
  /** Called when any single field changes */
  onFieldChange: <K extends keyof VenueFormState>(
    key: K,
    value: VenueFormState[K],
  ) => void;
  onToggleAmenity: (label: string) => void;
  /** Show the "Full Address" field — only needed during venue creation (Step 1) */
  // showAddress?: boolean;
  disabled?: boolean;
}

export function VenueFormFields({
  formData,
  onFieldChange,
  onToggleAmenity,
  disabled = false,
}: VenueFormFieldsProps) {
  const inputClass =
    "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 " +
    "focus:border-blue-500 focus:outline-none transition-all " +
    "disabled:bg-gray-50 disabled:cursor-not-allowed";
  // console.log("Rendering VenueFormFields with formData:", formData);
  return (
    <div className="space-y-6">
      {/* Venue Name */}
      <div>
        <label className="block font-semibold text-gray-900 mb-2">
          Venue Name
        </label>
        <input
          type="text"
          placeholder="e.g. Riverside Tennis Center"
          value={formData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          disabled={disabled}
          className={inputClass}
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
            placeholder="Please add from google maps"
            value={formData.location}
            onChange={(e) => onFieldChange("location", e.target.value)}
            disabled={disabled}
            className={`${inputClass} pl-10 pr-4`}
          />
        </div>

        <ImageUpload
          label="Cover Image"
          value={formData.coverImage}
          onChange={(file) => onFieldChange("coverImage", file)}
          disabled={disabled}
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
          {AMENITY_OPTIONS.map((amenity, index) => {
            const Icon = amenity.icon;
            const selected = formData.amenities.includes(amenity.label);
            return (
              <button
                key={`${amenity.label}-${index}`}
                onClick={() => onToggleAmenity(amenity.label)}
                type="button"
                disabled={disabled}
                className={`px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    selected
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon className="text-base" />
                {amenity.label}
              </button>
            );
          })}
        </div>
      </div>
      {formData.status === "draft" ? (
        <div className="text-sm text-gray-500">
          Your venue will be in draft mode. Once admin verifies your venue, it will be published and visible to users.
        </div>
      ) : (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Status
          </label>
          {formData.status === "suspended" ? (
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-red-100 text-red-700
              `}
              >
                {formData.status}
              </span>
              <span className="text-xs text-gray-400">
                Controlled by admin — cannot be changed
              </span>
            </div>
          ) : (
            <div className="flex gap-3">
              {(["active", "inactive"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onFieldChange("status", s)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${
                    formData.status === s
                      ? s === "active"
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "bg-gray-100 border-gray-400 text-gray-700"
                      : "border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s === "active" ? "● Active" : "○ Inactive"}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
