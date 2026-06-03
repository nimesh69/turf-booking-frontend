// ─── Enums & Literals ────────────────────────────────────

export type Sport =
  | "futsal"
  | "basketball"
  | "badminton"
  | "cricket"
  | "volleyball"
  | "tennis"
  | "pickleball"
  | "table_tennis";

export type VenueStatus = "draft" | "active" | "inactive" | "suspended";
export type TurfStatus  = "draft" | "active" | "inactive" | "suspended";


// ─── Base ────────────────────────────────────────────────

interface BaseModel {
  id: string;        // UUID
  createdAt: string; // ISO datetime
  updatedAt: string;
}


// ─── Amenities ───────────────────────────────────────────

export interface VenueAmenities {
  parking?: boolean;
  washroom?: boolean;
  showers?: boolean;
  changing_room?: boolean;
  cafeteria?: boolean;
  wifi?:boolean;
  spectator_area?:boolean;
  swimming_pool?:boolean;
  flood_light?:boolean;
  cctv?:boolean;
  drinking_water?:boolean;
  [key: string]: boolean | undefined; // extensible JSONField
}


// ─── Venue ───────────────────────────────────────────────

export interface Venue extends BaseModel {
  owner: string;              // User UUID
  name: string;
  location: string;
  amenities: VenueAmenities;
  status: VenueStatus;
  deletedAt: string | null;
  coverImage: string | null;  // URL
  verification?: VenueVerification;
  turfs?: TurfListItem[];     // nested on detail endpoint only
}

export interface VenueListItem extends BaseModel {
  owner: string;
  name: string;
  location: string;
  status: VenueStatus;
  coverImage: string | null;
  turfCount: number;
}

export interface VenueCreate {
  name: string;
  location: string;
  amenities?: VenueAmenities;
  coverImage?: File;
}

export interface VenueUpdate {
  name?: string;
  location?: string;
  amenities?: VenueAmenities;
  status?: VenueStatus;
  coverImage?: File;
}


// ─── Venue Verification ──────────────────────────────────

export interface VenueVerification extends BaseModel {
  venue: string;                  // Venue UUID
  citizenshipFront: string;       // URL
  citizenshipBack: string;        // URL
  panCard: string;                // URL
  businessRegistration: string;   // URL
  verified: boolean;
  verifiedAt: string | null;
  rejectionReason: string;
}

// for submitting verification docs (multipart/form-data)
export interface VenueVerificationSubmit {
  citizenshipFront: File;
  citizenshipBack: File;
  panCard: File;
  businessRegistration: File;
}


// ─── Turf Image ──────────────────────────────────────────

export interface TurfImage {
  id: number;         // AutoField (int, not UUID)
  turf: string;       // Turf UUID
  image: string;      // URL
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TurfImageUpdate {
  order?: number;
}


// ─── Turf ────────────────────────────────────────────────

export interface Turf extends BaseModel {
  venue: string;          // Venue UUID
  venueName: string;      // flattened for convenience
  venueLocation: string;
  venueAmenities: VenueAmenities;
  sport: Sport;
  name: string;
  description: string;
  price_per_hour: string;   // DecimalField → string from DRF
  max_players: number;
  court_count: number;
  opening_time: string;    // "HH:MM:SS"
  closing_time: string;
  avg_rating: string;      // DecimalField → string from DRF
  total_reviews: number;   // annotated
  status: TurfStatus;
  deletedAt: string | null;
  images: TurfImage[];    // no isCover anymore — use order=0 for cover
}

export interface TurfListItem extends BaseModel {
  venue: string;
  venueName: string;
  venueLocation: string;
  sport: Sport;
  name: string;
  price_per_hour: string;
  max_players: number;
  court_count: number;
  opening_time: string;
  closing_time: string;
  avg_rating: string;
  total_reviews: number;
  status: TurfStatus;
  coverImage: string | null; // first image by order, flattened
}

export interface TurfCreate {
  venue?: string;
  sport: Sport;
  name: string;
  description?: string;
  price_per_hour: number;
  max_players: number;
  court_count?: number;
  opening_time: string;
  closing_time: string;
}

export interface TurfUpdate {
  name?: string;
  description?: string;
  price_per_hour?: number;
  max_players?: number;
  court_count?: number;
  opening_time?: string;
  closing_time?: string;
  status?: TurfStatus;
}


// ─── Turf Filters ────────────────────────────────────────

export interface TurfFilters {
  sport?: Sport;
  location?: string;
  date?: string;          // "YYYY-MM-DD"
  minRating?: number;
  maxPrice?: number;
  search?: string;
  status?: TurfStatus;
  ordering?:
    | "price_per_hour"
    | "-price_per_hour"
    | "avg_rating"
    | "-avg_rating";
  page?: number;
}


// ─── Availability ────────────────────────────────────────

export interface TimeSlot {
  start: string;          // "HH:MM"
  end: string;
  available: boolean;
  bookingId: string | null;
}

export interface TurfAvailability {
  turf: string;           // Turf UUID
  date: string;           // "YYYY-MM-DD"
  slots: TimeSlot[];
}


// ─── Review ──────────────────────────────────────────────

export interface TurfReview {
  id: number;             // AutoField (int, not UUID)
  turf: string;           // Turf UUID
  client: string;         // User UUID
  clientName: string;     // flattened
  clientAvatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface TurfReviewCreate {
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

export interface TurfReviewUpdate {
  rating?: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}


// ─── Booking ─────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled";

export interface Booking extends BaseModel {
  turf: string;
  turfName: string;
  venueName: string;
  client: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: string;
  status: BookingStatus;
  notes: string;
}

export interface BookingCreate {
  turf: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface BookingStatusUpdate {
  status: "confirmed" | "rejected";
}


// ─── API Utilities ───────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [field: string]: string | string[] | undefined;
}