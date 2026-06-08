import { useState } from "react";
import {
  GiShower,
  GiCoffeeCup,
  GiWifiRouter,
  GiPoolDive,
  GiWaterBottle,
  GiCctvCamera,
} from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoFlashlight } from "react-icons/io5";

export const AMENITY_OPTIONS = [
  { icon: LuCircleParking, label: "Parking" },
  { icon: GiShower, label: "Showers" },
  { icon: GiShower, label: "Change Rooms" },
  { icon: GiShower, label: "Washrooms" },
  { icon: GiCoffeeCup, label: "Cafeteria" },
  { icon: GiWifiRouter, label: "WiFi" },
  { icon: FaPeopleRobbery, label: "Spectator Area" },
  { icon: GiPoolDive, label: "Swimming Pool" },
  { icon: GiWaterBottle, label: "Drinking Water" },
  { icon: GiCctvCamera, label: "CCTV" },
  { icon: IoFlashlight, label: "FloodLight" },
] as const;

// Maps backend snake_case keys ↔ display labels
export const AMENITY_KEY_TO_LABEL: Record<string, string> = {
  cctv: "CCTV",
  wifi: "WiFi",
  parking: "Parking",
  showers: "Showers",
  cafeteria: "Cafeteria",
  washrooms: "Washrooms",
  floodlight: "FloodLight",
  change_rooms: "Change Rooms",
  swimming_pool: "Swimming Pool",
  drinking_water: "Drinking Water",
  spectator_area: "Spectator Area",
};

/** Convert a backend amenities object { cctv: true, wifi: false } → label array ["CCTV"] */
export function amenityObjectToLabels(
  amenities: Record<string, boolean | undefined> = {}
): string[] {
  return Object.entries(amenities)
    .filter(([, enabled]) => enabled)
    .map(([key]) => AMENITY_KEY_TO_LABEL[key])
    .filter(Boolean);
}

/** Convert a label array ["CCTV", "WiFi"] → backend object { cctv: true, wifi: true, parking: false, ... } */
export function amenityLabelsToObject(
  labels: string[]
): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(AMENITY_KEY_TO_LABEL).map(([apiKey, label]) => [
      apiKey,
      labels.includes(label),
    ])
  );
}

export interface VenueFormState {
  name: string;
  location: string;
  address: string;
  coverImage: File | null;
  amenities: string[]; // array of display labels
}

export interface UseVenueFormOptions {
  initialValues?: Partial<VenueFormState>;
}

export function useVenueForm({ initialValues = {} }: UseVenueFormOptions = {}) {
  const [formData, setFormData] = useState<VenueFormState>({
    name: initialValues.name ?? "",
    location: initialValues.location ?? "",
    address: initialValues.address ?? "",
    coverImage: initialValues.coverImage ?? null,
    amenities: initialValues.amenities ?? [],
  });

  const setField = <K extends keyof VenueFormState>(
    key: K,
    value: VenueFormState[K]
  ) => setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleAmenity = (label: string) =>
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(label)
        ? prev.amenities.filter((a) => a !== label)
        : [...prev.amenities, label],
    }));

  const isValid = (requireAddress = false) =>
    Boolean(formData.name && formData.location && (!requireAddress || formData.address));

  return { formData, setField, toggleAmenity, isValid };
}