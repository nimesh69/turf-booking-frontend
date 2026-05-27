import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TurfFilters } from '@/types/turf.types';

interface TurfFilterState {
  filters: TurfFilters;
  setFilters: (filters: Partial<TurfFilters>) => void;
  resetFilters: () => void;
}

export const useTurfFilterStore = create<TurfFilterState>()(
  persist(
    (set) => ({
      filters: {},
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: {} }),
    }),
    { name: 'turf-filters' },
  ),
);
