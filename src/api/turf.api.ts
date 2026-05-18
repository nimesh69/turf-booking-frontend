import api from './axios';
import type { Turf } from '@/types/turf.types';

export const turfApi = {
  getAll: (params?: Record<string, unknown>) => api.get<Turf[]>('/turfs', { params }),
  getById: (id: string) => api.get<Turf>(`/turfs/${id}`),
  create: (data: Partial<Turf>) => api.post<Turf>('/turfs', data),
  update: (id: string, data: Partial<Turf>) => api.put<Turf>(`/turfs/${id}`, data),
  delete: (id: string) => api.delete(`/turfs/${id}`),
  search: (query: string) => api.get<Turf[]>('/turfs/search', { params: { q: query } }),
};
