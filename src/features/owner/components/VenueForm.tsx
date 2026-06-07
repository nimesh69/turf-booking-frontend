const venueForm = () => {
  return (
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
  );
};

export default venueForm;
