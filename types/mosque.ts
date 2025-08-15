import { JamaahTimes } from "./prayer";

export enum MosqueAmenity {
  PARKING = 'parking',
  WHEELCHAIR_ACCESS = 'wheelchair_access',
  WOMENS_SECTION = 'womens_section',
  ABLUTION_FACILITIES = 'ablution_facilities',
  LIBRARY = 'library',
  BOOKSTORE = 'bookstore',
  CAFE = 'cafe',
  CHILDCARE = 'childcare'
}

export interface MosqueContact {
  phone?: string;
  email?: string;
  website?: string;
  emasjidLive?: string;
}

export interface Mosque {
  id: string;
  name: string;
  address: {
    name: string;
    street: string;
    city: string;
    postcode: string;
  };
  coordinates: { latitude: number; longitude: number };
  distance: number; // km from user
  congregationTimes: JamaahTimes;
  amenities: Array<MosqueAmenity>;
  contact: MosqueContact;
  lastUpdated: string;
  imageUrl?: string;
}

export type Mosques = Array<Mosque>;

export interface MosqueApiResponse {
  mosques: Mosques;
  total: number;
  page: number;
  limit: number;
}