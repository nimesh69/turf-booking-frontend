import { GrFormNextLink } from "react-icons/gr";
import { VenueFormFields } from "../VenueForm";
import { useVenueForm } from "../../hooks/useVenueForm";

interface Step1Props {
  onNext: (data: VenueDetailsData) => void;
  onCancel: () => void;
}

export interface VenueDetailsData {
  venueName: string;
  location: string;
  venue_cover: File | null;
  amenities: string[];
}

export default function Step1VenueDetails({ onNext, onCancel }: Step1Props) {
  const { formData, setField, toggleAmenity, isValid } = useVenueForm();

  const handleNext = () => {
    if (!isValid()) return; // requireAddress = true
    onNext({
      venueName: formData.name,
      location: formData.location,
      venue_cover: formData.coverImage,
      amenities: formData.amenities,
    });
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
          <div className="h-full bg-blue-500 w-1/5 rounded-full transition-all duration-700" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-full bg-gray-300 w-1/5 rounded-full" />
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Basic Information</h3>
          <p className="text-gray-600 text-sm">
            Tell us about your facility to help athletes find you easily.
          </p>
        </div>

        <VenueFormFields
          formData={formData}
          onFieldChange={setField}
          onToggleAmenity={toggleAmenity}
          // showAddress
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          disabled={!isValid()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition font-semibold flex items-center gap-2"
        >
          Next <GrFormNextLink />
        </button>
      </div>
    </main>
  );
}