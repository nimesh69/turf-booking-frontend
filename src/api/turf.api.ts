import axiosInstance from "./axios";
import type {
  Sport,
  TimeSlot,
  Turf,
  TurfAvailability,
  TurfCreate,
  TurfFilters,
  TurfImage,
  TurfImageUpdate,
  TurfListItem,
  TurfReview,
  TurfReviewCreate,
  TurfReviewUpdate,
  TurfUpdate,
  Venue,
  VenueCreate,
  VenueListItem,
  VenueUpdate,
  VenueVerification,
  VenueVerificationSubmit,
} from "@/types/turf.types";

type RawVenue = {
  id: string;
  owner?: string;
  name: string;
  location: string;
  amenities?: Record<string, boolean>;
  status: Venue["status"];
  cover_image?: string | null;
  turfs?: RawTurfListItem[];
  turfs_count?: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
};

type RawTurfImage = {
  id: number;
  turf?: string;
  image: string;
  order: number;
  created_at: string;
  updated_at?: string;
};

type RawTurfListItem = {
  id: string;
  venue: string;
  venue_name?: string;
  venue_location?: string;
  sport: Sport;
  name: string;
  price_per_hour: string;
  max_players: number;
  court_count?: number;
  opening_time?: string;
  closing_time?: string;
  avg_rating: string;
  total_reviews?: number;
  reviews_count?: number;
  status: TurfListItem["status"];
  cover_image?: RawTurfImage | string | null;
  created_at: string;
  updated_at?: string;
};

type RawTurf = RawTurfListItem & {
  description?: string;
  venue_amenities?: Record<string, boolean>;
  images?: RawTurfImage[];
  deleted_at?: string | null;
};

type RawTurfReview = {
  id: number;
  turf?: string;
  client: string;
  client_name?: string;
  client_avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  created_at: string;
  updated_at?: string;
};

type RawVenueVerification = {
  id?: string;
  venue?: string;
  citizenship_front?: string;
  citizenship_back?: string;
  pan_card?: string;
  business_registration?: string;
  verified: boolean;
  verified_at?: string | null;
  rejection_reason?: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
};

const venuesUrl = "api/venues/";
const turfsUrl = "api/turfs/";

const toVenue = (raw: RawVenue): Venue => ({
  id: raw.id,
  owner: raw.owner ?? "",
  name: raw.name,
  location: raw.location,
  amenities: raw.amenities ?? {},
  status: raw.status,
  coverImage: raw.cover_image ?? null,
  turfs: raw.turfs?.map(toTurfListItem),
  deletedAt: raw.deleted_at ?? null,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at ?? raw.created_at,
});

const toVenueListItem = (raw: RawVenue): VenueListItem => ({
  id: raw.id,
  owner: raw.owner ?? "",
  name: raw.name,
  location: raw.location,
  status: raw.status,
  coverImage: raw.cover_image ?? null,
  turfCount: raw.turfs_count ?? raw.turfs?.length ?? 0,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at ?? raw.created_at,
});

const toTurfImage = (raw: RawTurfImage, turfId = ""): TurfImage => ({
  id: raw.id,
  turf: raw.turf ?? turfId,
  image: raw.image,
  order: raw.order,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at ?? raw.created_at,
});

const coverImageUrl = (
  cover: RawTurfListItem["cover_image"],
): string | null => {
  if (!cover) return null;
  return typeof cover === "string" ? cover : cover.image;
};

const toTurfListItem = (raw: RawTurfListItem): TurfListItem => ({
  id: raw.id,
  venue: raw.venue,
  venueName: raw.venue_name ?? "",
  venueLocation: raw.venue_location ?? "",
  sport: raw.sport,
  name: raw.name,
  pricePerHour: raw.price_per_hour,
  maxPlayers: raw.max_players,
  courtCount: raw.court_count ?? 1,
  openingTime: raw.opening_time ?? "",
  closingTime: raw.closing_time ?? "",
  avgRating: raw.avg_rating,
  totalReviews: raw.total_reviews ?? raw.reviews_count ?? 0,
  status: raw.status,
  coverImage: coverImageUrl(raw.cover_image),
  createdAt: raw.created_at,
  updatedAt: raw.updated_at ?? raw.created_at,
});

const toTurf = (raw: RawTurf): Turf => ({
  ...toTurfListItem(raw),
  description: raw.description ?? "",
  venueAmenities: raw.venue_amenities ?? {},
  images: raw.images?.map((image) => toTurfImage(image, raw.id)) ?? [],
  deletedAt: raw.deleted_at ?? null,
});

const toTurfReview = (raw: RawTurfReview, turfId = ""): TurfReview => ({
  id: raw.id,
  turf: raw.turf ?? turfId,
  client: raw.client,
  clientName: raw.client_name ?? "",
  clientAvatar: raw.client_avatar,
  rating: raw.rating,
  comment: raw.comment,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at ?? raw.created_at,
});

const toVenueVerification = (
  raw: RawVenueVerification,
  venueId = "",
): VenueVerification => ({
  id: raw.id ?? "",
  venue: raw.venue ?? venueId,
  citizenshipFront: raw.citizenship_front ?? "",
  citizenshipBack: raw.citizenship_back ?? "",
  panCard: raw.pan_card ?? "",
  businessRegistration: raw.business_registration ?? "",
  verified: raw.verified,
  verifiedAt: raw.verified_at ?? null,
  rejectionReason: raw.rejection_reason ?? "",
  createdAt: raw.created_at ?? raw.submitted_at ?? "",
  updatedAt: raw.updated_at ?? raw.created_at ?? raw.submitted_at ?? "",
});

const venuePayload = (data: VenueCreate | VenueUpdate) => ({
  name: data.name,
  location: data.location,
  amenities: data.amenities,
  status: "status" in data ? data.status : undefined,
});

const turfPayload = (data: TurfCreate | TurfUpdate) => ({
  venue: "venue" in data ? data.venue : undefined,
  sport: "sport" in data ? data.sport : undefined,
  name: data.name,
  description: data.description,
  price_per_hour: data.pricePerHour,
  max_players: data.maxPlayers,
  court_count: data.courtCount,
  opening_time: data.openingTime,
  closing_time: data.closingTime,
  status: "status" in data ? data.status : undefined,
});

const verificationFormData = (data: VenueVerificationSubmit) => {
  const formData = new FormData();
  formData.append("citizenship_front", data.citizenshipFront);
  formData.append("citizenship_back", data.citizenshipBack);
  formData.append("pan_card", data.panCard);
  formData.append("business_registration", data.businessRegistration);
  return formData;
};

const imageFormData = (images: File[]) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  return formData;
};

export const turfApi = {
  listVenues: async (params?: {
    location?: string;
    status?: string;
    search?: string;
  }) => {
    const { data } = await axiosInstance.get<RawVenue[]>(venuesUrl, { params });
    return data.map(toVenueListItem);
  },
  listOwnerVenues: async () => {
    const { data } = await axiosInstance.get<RawVenue[]>(
      `${venuesUrl}my_venues/`,
    );
    return data.map(toVenueListItem);
  },
  getVenue: async (id: string) => {
    const { data } = await axiosInstance.get<RawVenue>(`${venuesUrl}${id}/`);
    return toVenue(data);
  },
  createVenue: async (data: VenueCreate) => {
    const response = await axiosInstance.post<RawVenue>(
      venuesUrl,
      venuePayload(data),
    );
    return toVenue(response.data);
  },
  createFullVenue: async (data: {
    venue: VenueCreate;
    turfs: TurfCreate[];
    turfImages: File[][];
  }) => {
    const formData = new FormData();

    // Venue fields — append manually instead of using venuePayload
    if (data.venue.name) formData.append("venue_name", data.venue.name);
    if (data.venue.location)
      formData.append("venue_location", data.venue.location);
    if (data.venue.amenities)
      formData.append("venue_amenities", JSON.stringify(data.venue.amenities));
    if (data.venue.coverImage)
      formData.append("venue_cover", data.venue.coverImage);

    // Turfs as JSON string
    formData.append("turfs", JSON.stringify(data.turfs));

    // Images keyed by turf index
    data.turfImages.forEach((images, index) => {
      images.forEach((img: File) =>
        formData.append(`turf_images_${index}`, img),
      );
    });

    const response = await axiosInstance.post<RawVenue>(
      `${venuesUrl}create-full/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return toVenue(response.data);
  },
  updateVenue: async (id: string, data: VenueUpdate) => {
    const response = await axiosInstance.patch<RawVenue>(
      `${venuesUrl}${id}/`,
      venuePayload(data),
    );
    return toVenue(response.data);
  },
  deleteVenue: (id: string) => axiosInstance.delete(`${venuesUrl}${id}/`),
  getVenueVerification: async (venueId: string) => {
    const { data } = await axiosInstance.get<RawVenueVerification>(
      `${venuesUrl}${venueId}/verification/`,
    );
    return toVenueVerification(data, venueId);
  },
  submitVenueVerification: async (
    venueId: string,
    data: VenueVerificationSubmit,
  ) => {
    const response = await axiosInstance.post<RawVenueVerification>(
      `${venuesUrl}${venueId}/verification/`,
      verificationFormData(data),
    );
    return toVenueVerification(response.data, venueId);
  },
  listTurfs: async (filters?: TurfFilters) => {
    const params = {
      sport: filters?.sport,
      location: filters?.location,
      date: filters?.date,
      min_rating: filters?.minRating,
      max_price: filters?.maxPrice,
      search: filters?.search,
      status: filters?.status,
      ordering: filters?.ordering,
      page: filters?.page,
    };
    const { data } = await axiosInstance.get<RawTurfListItem[]>(turfsUrl, {
      params,
    });
    return data.map(toTurfListItem);
  },
  getTurf: async (id: string) => {
    const { data } = await axiosInstance.get<RawTurf>(`${turfsUrl}${id}/`);
    return toTurf(data);
  },
  createTurf: async (data: TurfCreate) => {
    const response = await axiosInstance.post<RawTurf>(
      turfsUrl,
      turfPayload(data),
    );
    return toTurf(response.data);
  },
  updateTurf: async (id: string, data: TurfUpdate) => {
    const response = await axiosInstance.patch<RawTurf>(
      `${turfsUrl}${id}/`,
      turfPayload(data),
    );
    return toTurf(response.data);
  },
  deleteTurf: (id: string) => axiosInstance.delete(`${turfsUrl}${id}/`),
  getTurfAvailability: async (
    turfId: string,
    date: string,
  ): Promise<TurfAvailability> => {
    const { data } = await axiosInstance.get<TimeSlot[]>(
      `${turfsUrl}${turfId}/availability/`,
      { params: { date } },
    );
    return {
      turf: turfId,
      date,
      slots: data.map((slot) => ({
        ...slot,
        bookingId: slot.bookingId ?? null,
      })),
    };
  },
  listTurfImages: async (turfId: string) => {
    const { data } = await axiosInstance.get<RawTurfImage[]>(
      `${turfsUrl}${turfId}/images/`,
    );
    return data.map((image) => toTurfImage(image, turfId));
  },
  uploadTurfImages: async (turfId: string, images: File[]) => {
    const { data } = await axiosInstance.post<RawTurfImage[]>(
      `${turfsUrl}${turfId}/images/`,
      imageFormData(images),
    );
    return data.map((image) => toTurfImage(image, turfId));
  },
  updateTurfImage: async (
    turfId: string,
    imageId: number,
    data: TurfImageUpdate,
  ) => {
    const response = await axiosInstance.patch<RawTurfImage>(
      `${turfsUrl}${turfId}/images/${imageId}/`,
      data,
    );
    return toTurfImage(response.data, turfId);
  },
  deleteTurfImage: (turfId: string, imageId: number) =>
    axiosInstance.delete(`${turfsUrl}${turfId}/images/${imageId}/`),
  listTurfReviews: async (turfId: string) => {
    const { data } = await axiosInstance.get<RawTurfReview[]>(
      `${turfsUrl}${turfId}/reviews/`,
    );
    return data.map((review) => toTurfReview(review, turfId));
  },
  createTurfReview: async (turfId: string, data: TurfReviewCreate) => {
    const response = await axiosInstance.post<RawTurfReview>(
      `${turfsUrl}${turfId}/reviews/`,
      data,
    );
    return toTurfReview(response.data, turfId);
  },
  updateTurfReview: async (
    turfId: string,
    reviewId: number,
    data: TurfReviewUpdate,
  ) => {
    const response = await axiosInstance.patch<RawTurfReview>(
      `${turfsUrl}${turfId}/reviews/${reviewId}/`,
      data,
    );
    return toTurfReview(response.data, turfId);
  },
  deleteTurfReview: (turfId: string, reviewId: number) =>
    axiosInstance.delete(`${turfsUrl}${turfId}/reviews/${reviewId}/`),
};
