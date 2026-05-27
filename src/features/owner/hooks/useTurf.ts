import { useQuery } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import { turfQueryKeys, venueQueryKeys } from './useTurfs';

export function useTurf(turfId?: string) {
  return useQuery({
    queryKey: turfQueryKeys.detail(turfId ?? ''),
    queryFn: () => turfApi.getTurf(turfId ?? ''),
    enabled: Boolean(turfId),
  });
}

export function useVenue(venueId?: string) {
  return useQuery({
    queryKey: venueQueryKeys.detail(venueId ?? ''),
    queryFn: () => turfApi.getVenue(venueId ?? ''),
    enabled: Boolean(venueId),
  });
}
