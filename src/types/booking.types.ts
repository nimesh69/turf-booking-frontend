export interface Booking {
  id: string;
  turfId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}
