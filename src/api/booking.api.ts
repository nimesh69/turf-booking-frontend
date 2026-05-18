import api from './axios';
import type { Booking } from '@/types/booking.types';

export const bookingApi = {
  create: (data: Partial<Booking>) => api.post<Booking>('/bookings', data),
  getMyBookings: () => api.get<Booking[]>('/bookings/me'),
  getById: (id: string) => api.get<Booking>(`/bookings/${id}`),
  cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
  getAvailableSlots: (turfId: string, date: string) =>
    api.get(`/bookings/slots`, { params: { turfId, date } }),
};
