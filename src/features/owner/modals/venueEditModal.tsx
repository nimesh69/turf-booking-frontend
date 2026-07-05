import { X, ChevronRight } from "lucide-react";
import { VenueFormFields } from "../components/VenueForm";
import {
  useVenueForm,
  amenityObjectToLabels,
  amenityLabelsToObject,
} from "../hooks/useVenueForm";
import type { VenueListItem } from "@/types/turf.types";

interface VenueEditModalProps {
  venue: VenueListItem;
  onSubmit: (data: {
    name: string;
    location: string;
    amenities: Record<string, boolean>;
    coverImage?: File;
    status?:string;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function VenueEditModal({
  venue,
  onSubmit,
  onCancel,
  isLoading = false,
}: VenueEditModalProps) {
  // console.log("venueedit modal",venue)
  const { formData, setField, toggleAmenity, isValid } = useVenueForm({
    mode: "edit",
    initialValues: {
      name: venue.name,
      location: venue.location,
      amenities: amenityObjectToLabels(venue.amenities),
      status: venue.status,
    },
  });
  const hasChanges =
    formData.name !== venue.name ||
    formData.location !== venue.location ||
    JSON.stringify(formData.amenities.sort()) !==
      JSON.stringify(amenityObjectToLabels(venue.amenities).sort()) ||
    formData.coverImage ||
    formData.status !== venue.status;

    // console.log("chsnges detected", hasChanges)
  const handleSubmit = () => {
    if (!isValid()) return;
    onSubmit({
      name: formData.name,
      location: formData.location,
      amenities: amenityLabelsToObject(formData.amenities),
      coverImage: formData.coverImage ?? undefined,
      status: formData.status,
    });
  };
//   console.log({
//   isValid: isValid(),
//   hasChanges,
//   disabled: !isValid() || !hasChanges || isLoading,
// });
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
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Shared form fields — no address field in edit mode */}
        <div className="mb-6">
          <VenueFormFields
            formData={formData}
            onFieldChange={setField}
            onToggleAmenity={toggleAmenity}
            disabled={isLoading}
          />
        </div>
        {/* Actions */}
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
            disabled={!isValid() || !hasChanges || isLoading}
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
