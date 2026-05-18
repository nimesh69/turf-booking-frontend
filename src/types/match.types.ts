export interface Match {
  id: string;
  turfId: string;
  organizerId: string;
  sport: string;
  date: string;
  time: string;
  maxPlayers: number;
  currentPlayers: number;
  status: 'open' | 'full' | 'completed' | 'cancelled';
}
