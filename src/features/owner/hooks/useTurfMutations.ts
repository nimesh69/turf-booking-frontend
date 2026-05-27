import { useMutation, useQueryClient } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import type { TurfCreate, TurfUpdate, VenueCreate, VenueUpdate } from '@/types/turf.types';
import { turfQueryKeys, venueQueryKeys } from './useTurfs';

export function useVenueMutations() {
  const queryClient = useQueryClient();

  const invalidateVenues = () => {
    void queryClient.invalidateQueries({ queryKey: venueQueryKeys.all });
  };

  return {
    createVenue: useMutation({
      mutationFn: (data: VenueCreate) => turfApi.createVenue(data),
      onSuccess: invalidateVenues,
    }),
    updateVenue: useMutation({
      mutationFn: ({ id, data }: { id: string; data: VenueUpdate }) => turfApi.updateVenue(id, data),
      onSuccess: invalidateVenues,
    }),
    deleteVenue: useMutation({
      mutationFn: (id: string) => turfApi.deleteVenue(id),
      onSuccess: invalidateVenues,
    }),
  };
}

export function useTurfMutations() {
  const queryClient = useQueryClient();

  const invalidateTurfs = () => {
    void queryClient.invalidateQueries({ queryKey: turfQueryKeys.all });
    void queryClient.invalidateQueries({ queryKey: venueQueryKeys.all });
  };

  return {
    createTurf: useMutation({
      mutationFn: (data: TurfCreate) => turfApi.createTurf(data),
      onSuccess: invalidateTurfs,
    }),
    updateTurf: useMutation({
      mutationFn: ({ id, data }: { id: string; data: TurfUpdate }) => turfApi.updateTurf(id, data),
      onSuccess: invalidateTurfs,
    }),
    deleteTurf: useMutation({
      mutationFn: (id: string) => turfApi.deleteTurf(id),
      onSuccess: invalidateTurfs,
    }),
  };
}
