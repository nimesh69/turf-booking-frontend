export const TOKEN_KEY = 'turf_access_token';
export const REFRESH_TOKEN_KEY = 'turf_refresh_token';
export const USER_KEY = 'turf_user';

export const SPORTS = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Badminton', 'Volleyball'];
export const AMENITIES = ['Parking', 'Changing Room', 'Shower', 'Lighting', 'Drinking Water', 'First Aid'];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const USER_ROLES = {
  PLAYER: 'player',
  OWNER: 'owner',
  ADMIN: 'admin',
} as const;
