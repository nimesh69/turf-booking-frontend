import { useQuery } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import type { TurfFilters } from '@/types/turf.types';

export const turfQueryKeys = {
  all: ['turfs'] as const,
  lists: () => [...turfQueryKeys.all, 'list'] as const,
  list: (filters?: TurfFilters) => [...turfQueryKeys.lists(), filters ?? {}] as const,
  detail: (id: string) => [...turfQueryKeys.all, 'detail', id] as const,
  availability: (id: string, date: string) => [...turfQueryKeys.detail(id), 'availability', date] as const,
  images: (id: string) => [...turfQueryKeys.detail(id), 'images'] as const,
  reviews: (id: string) => [...turfQueryKeys.detail(id), 'reviews'] as const,
};

export const venueQueryKeys = {
  all: ['venues'] as const,
  owner: () => [...venueQueryKeys.all, 'owner'] as const,
  detail: (id: string) => [...venueQueryKeys.all, 'detail', id] as const,
  verification: (id: string) => [...venueQueryKeys.detail(id), 'verification'] as const,
};

export function useTurfs(filters?: TurfFilters) {
  return useQuery({
    queryKey: turfQueryKeys.list(filters),
    queryFn: () => turfApi.listTurfs(filters),
  });
}

export function useOwnerVenues() {
  return useQuery({
    queryKey: venueQueryKeys.owner(),
    queryFn: turfApi.listOwnerVenues,
    staleTime: Infinity,
  });
}

export function useVenueVerification(venueId: string) {
  return useQuery({
    queryKey: venueQueryKeys.verification(venueId),
    queryFn: () => turfApi.checkVenueVerificationStatus(venueId),
    enabled: !!venueId,
    staleTime: Infinity,
  });
}