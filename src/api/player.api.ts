import api from './axios';
import type { PlayerProfile } from '@/types/player.types';

export const playerApi = {
  getProfile: (id: string) => api.get<PlayerProfile>(`/players/${id}`),
  updateProfile: (data: Partial<PlayerProfile>) => api.put('/players/me', data),
  getAll: () => api.get<PlayerProfile[]>('/players'),
};
