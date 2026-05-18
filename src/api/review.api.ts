import api from './axios';
import type { Review } from '@/types/review.types';

export const reviewApi = {
  getByTurf: (turfId: string) => api.get<Review[]>(`/reviews/turf/${turfId}`),
  create: (data: Partial<Review>) => api.post<Review>('/reviews', data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};
