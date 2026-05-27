import { useQuery } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import { turfQueryKeys } from './useTurfs';

export function useTurfAvailability(turfId?: string, date?: string) {
  return useQuery({
    queryKey: turfQueryKeys.availability(turfId ?? '', date ?? ''),
    queryFn: () => turfApi.getTurfAvailability(turfId ?? '', date ?? ''),
    enabled: Boolean(turfId && date),
  });
}
