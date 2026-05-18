export interface Turf {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  images: string[];
  amenities: string[];
  sports: string[];
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  ownerId: string;
  isAvailable: boolean;
  openTime: string;
  closeTime: string;
}
