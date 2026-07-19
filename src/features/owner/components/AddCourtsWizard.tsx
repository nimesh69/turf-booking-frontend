import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Step2AddCourts, { type Court, type CourtsData } from './VenueOnboarding/Step2AddCourts';
import Step3MediaUpload, { type MediaData } from './VenueOnboarding/Step3MediaUpload';
import { turfApi } from '@/api/turf.api';
import { venueQueryKeys, turfQueryKeys } from '../hooks/useTurfs';
import  {sportMap, type TurfCreate } from '@/types/turf.types'; // adjust path


interface AddCourtsWizardProps {
  venueId: string;
  onClose: () => void;
}

function toTurfCreate(court: Court, venueId: string): TurfCreate {
  return {
    venue: venueId,
    sport: sportMap[court.sportType],
    name: court.name,
    description: court.description,
    price_per_hour: court.pricePerHour,
    max_players: court.maxPlayers,
    opening_time: court.openingTime,
    closing_time: court.closingTime,
  };
}

export default function AddCourtsWizard({ venueId, onClose }: AddCourtsWizardProps) {
  const [step, setStep] = useState<2 | 3>(2);
  const [courts, setCourts] = useState<Court[]>([]);

  const queryClient = useQueryClient();

  const createCourtsMutation = useMutation({
    mutationFn: async ({ courts, courtImages }: CourtsData & MediaData) => {
      const createdTurfs = await Promise.all(
        courts.map((court) => turfApi.createTurf(toTurfCreate(court, venueId))),
      );

      await Promise.all(
        createdTurfs.map((turf, index) => {
          const originalCourtId = courts[index].id;
          const images = courtImages[originalCourtId];
          if (!images || images.length === 0) return Promise.resolve();
          return turfApi.uploadTurfImages(
            turf.id,
            images.map((img) => img.file),
          );
        }),
      );

      return createdTurfs;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: venueQueryKeys.detail(venueId) });
      queryClient.invalidateQueries({ queryKey: turfQueryKeys.lists() });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {step === 2 && (
          <Step2AddCourts
            venueId={venueId}
            onNext={(data: CourtsData) => {
              setCourts(data.courts);
              setStep(3);
            }}
            onBack={onClose}
          />
        )}

        {step === 3 && (
          <Step3MediaUpload
            courts={courts}
            venueId={venueId}
            onNext={(mediaData: MediaData) => {
              createCourtsMutation.mutate({ courts, ...mediaData });
            }}
            onBack={() => setStep(2)}
          />
        )}

        {createCourtsMutation.isPending && (
          <div className="p-4 text-center text-sm text-gray-500">Saving courts…</div>
        )}
        {createCourtsMutation.isError && (
          <div className="p-4 text-center text-sm text-red-600">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}