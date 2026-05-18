import api from './axios';
import type { Match } from '@/types/match.types';

export const matchApi = {
  getAll: () => api.get<Match[]>('/matches'),
  getById: (id: string) => api.get<Match>(`/matches/${id}`),
  create: (data: Partial<Match>) => api.post<Match>('/matches', data),
  join: (id: string) => api.post(`/matches/${id}/join`),
  leave: (id: string) => api.post(`/matches/${id}/leave`),
};
