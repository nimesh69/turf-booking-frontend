import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { turfApi } from '@/api/turf.api';
import type { TurfImageUpdate } from '@/types/turf.types';
import { turfQueryKeys } from './useTurfs';

export function useTurfImages(turfId?: string) {
  return useQuery({
    queryKey: turfQueryKeys.images(turfId ?? ''),
    queryFn: () => turfApi.listTurfImages(turfId ?? ''),
    enabled: Boolean(turfId),
  });
}

export function useTurfImageMutations(turfId: string) {
  const queryClient = useQueryClient();
  const invalidateImages = () => {
    void queryClient.invalidateQueries({ queryKey: turfQueryKeys.images(turfId) });
    void queryClient.invalidateQueries({ queryKey: turfQueryKeys.detail(turfId) });
  };

  return {
    uploadImages: useMutation({
      mutationFn: (images: File[]) => turfApi.uploadTurfImages(turfId, images),
      onSuccess: invalidateImages,
    }),
    updateImage: useMutation({
      mutationFn: ({ imageId, data }: { imageId: number; data: TurfImageUpdate }) =>
        turfApi.updateTurfImage(turfId, imageId, data),
      onSuccess: invalidateImages,
    }),
    deleteImage: useMutation({
      mutationFn: (imageId: number) => turfApi.deleteTurfImage(turfId, imageId),
      onSuccess: invalidateImages,
    }),
  };
}
