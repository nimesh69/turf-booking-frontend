import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { turfApi } from "@/api/turf.api";
import type {
  TurfCreate,
  VenueAmenities,
  VenueVerificationSubmit,
} from "@/types/turf.types";
import Step1VenueDetails from "./Step1VenueDetails";
import type { VenueDetailsData } from "./Step1VenueDetails";
import Step2AddCourts from "./Step2AddCourts";
import type { Court, CourtsData } from "./Step2AddCourts";
import Step3MediaUpload from "./Step3MediaUpload";
import type { MediaData } from "./Step3MediaUpload";
import Step4Verification from "./Step4Verification";
import type { VerificationData } from "./Step4Verification";
import Step5PreviewReview from "./Step5PreviewReview";
import { turfQueryKeys, venueQueryKeys } from "../../hooks/useTurfs";
import { sportMap } from '@/types/turf.types';
interface VenueOnboardingProps {
  onClose: () => void;
}

export interface OnboardingData {
  venueDetails?: VenueDetailsData;
  courts?: CourtsData;
  media?: MediaData;
  verification?: VerificationData;
}

const amenityMap: Record<string, keyof VenueAmenities> = {
  Parking: "parking",
  washroom: "washroom",
  change_room: "change_room",
  Showers: "Showers",
  Cafeteria: "cafeteria",
  WiFi: "wifi",
  "Spectator Area": "spectator_area",
  "Swimming Pool": "swimming_pool",
  FloodLight: "flood_light",
  CCTV: "cctv",
  "Drinking Water": "drinking_water",
};

const toTime = (time: string) => (time.length === 5 ? `${time}:00` : time);

const buildAmenities = (amenities: string[]): VenueAmenities =>
  amenities.reduce<VenueAmenities>((acc, amenity) => {
    acc[amenityMap[amenity] ?? amenity.toLowerCase()] = true;
    return acc;
  }, {});

const buildTurfPayload = (court: Court): TurfCreate => ({
  sport: sportMap[court.sportType] ?? 'futsal',
  name: court.name,
  description: court.description,
  price_per_hour: court.pricePerHour,
  max_players: court.maxPlayers,
  court_count: 1,
  opening_time: toTime(court.openingTime),
  closing_time: toTime(court.closingTime),
});

const buildVerificationPayload = (
  verification: VerificationData,
): VenueVerificationSubmit => {
  const { citizenshipFront, citizenshipBack, panCard, businessRegistration } =
    verification.documents;

  if (
    !citizenshipFront ||
    !citizenshipBack ||
    !panCard ||
    !businessRegistration
  ) {
    throw new Error("All verification documents are required.");
  }

  return {
    citizenshipFront,
    citizenshipBack,
    panCard,
    businessRegistration,
  };
};

export default function VenueOnboarding({ onClose }: VenueOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const registrationMutation = useMutation({
    mutationFn: async (data: OnboardingData) => {
      if (!data.venueDetails || !data.courts || !data.verification) {
        throw new Error(
          "Venue details, courts, and verification documents are required.",
        );
      }

      // Build images array aligned to courts array index
      const turfImages = data.courts.courts.map((court) => {
        return (
          data.media?.courtImages[court.id]?.map((image) => image.file) ?? []
        );
      });

      // One atomic call — if images fail, venue + turfs are rolled back automatically
      const venue = await turfApi.createFullVenue({
        venue: {
          name: data.venueDetails.venueName,
          location: data.venueDetails.location,
          amenities: buildAmenities(data.venueDetails.amenities),
          coverImage: data.venueDetails.venue_cover ?? undefined,
        },
        turfs: data.courts.courts.map((court) => buildTurfPayload(court)),
        // ↑ pass empty string for venueId — backend sets it, frontend no longer needs it
        turfImages,
      });
      // const venueId = {
      //   id: venue.venue_id,
      // }
      // console.log("Venue created with ID:", venue.id);
      // Verification is separate — it's not part of the turf/venue atomicity concern
      await turfApi.submitVenueVerification(
        venue.id,
        buildVerificationPayload(data.verification),
      );

      return venue;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: venueQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: turfQueryKeys.all });
      alert("Venue registration completed successfully!");
      onClose();
    },
    onError: (error: Error) => {
      setSubmitError(error.message || "Unable to complete venue registration.");
    },
  });

  const handleStep1Next = (data: VenueDetailsData) => {
    setOnboardingData((prev) => ({ ...prev, venueDetails: data }));
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleStep2Next = (data: CourtsData) => {
    setOnboardingData((prev) => ({ ...prev, courts: data }));
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleStep3Next = (data: MediaData) => {
    setOnboardingData((prev) => ({ ...prev, media: data }));
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  const handleStep4Next = (data: VerificationData) => {
    setOnboardingData((prev) => ({ ...prev, verification: data }));
    setCurrentStep(5);
    window.scrollTo(0, 0);
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    setSubmitError(null);
    registrationMutation.mutate(onboardingData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="font-bold text-2xl text-blue-600">AthletiMatch</div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition">
            help_outline
          </button>
          <button className="material-symbols-outlined text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition">
            notifications
          </button>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
          >
            close
          </button>
        </div>
      </header>

      {/* Step Content */}
      <div className="pt-20">
        {currentStep === 1 && (
          <Step1VenueDetails onNext={handleStep1Next} onCancel={onClose} />
        )}
        {currentStep === 2 && (
          <Step2AddCourts onNext={handleStep2Next} onBack={handleStepBack} />
        )}
        {currentStep === 3 && (
          <Step3MediaUpload
            courts={onboardingData.courts?.courts ?? []}
            onNext={handleStep3Next}
            onBack={handleStepBack}
          />
        )}
        {currentStep === 4 && (
          <Step4Verification onNext={handleStep4Next} onBack={handleStepBack} />
        )}
        {currentStep === 5 && (
          <Step5PreviewReview
            data={onboardingData}
            isSubmitting={registrationMutation.isPending}
            errorMessage={submitError}
            onBack={handleStepBack}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
