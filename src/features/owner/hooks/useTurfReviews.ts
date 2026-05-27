import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import type { TurfReviewCreate, TurfReviewUpdate } from '@/types/turf.types';
import { turfQueryKeys } from './useTurfs';

export function useTurfReviews(turfId?: string) {
  return useQuery({
    queryKey: turfQueryKeys.reviews(turfId ?? ''),
    queryFn: () => turfApi.listTurfReviews(turfId ?? ''),
    enabled: Boolean(turfId),
  });
}

export function useTurfReviewMutations(turfId: string) {
  const queryClient = useQueryClient();
  const invalidateReviews = () => {
    void queryClient.invalidateQueries({ queryKey: turfQueryKeys.reviews(turfId) });
    void queryClient.invalidateQueries({ queryKey: turfQueryKeys.detail(turfId) });
  };

  return {
    createReview: useMutation({
      mutationFn: (data: TurfReviewCreate) => turfApi.createTurfReview(turfId, data),
      onSuccess: invalidateReviews,
    }),
    updateReview: useMutation({
      mutationFn: ({ reviewId, data }: { reviewId: number; data: TurfReviewUpdate }) =>
        turfApi.updateTurfReview(turfId, reviewId, data),
      onSuccess: invalidateReviews,
    }),
    deleteReview: useMutation({
      mutationFn: (reviewId: number) => turfApi.deleteTurfReview(turfId, reviewId),
      onSuccess: invalidateReviews,
    }),
  };
}
