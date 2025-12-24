/**
 * Restaurant Type Definitions
 *
 * Types for restaurant data from the API.
 * - Restaurant: Fields returned in list view
 * - RestaurantDetail: All fields returned in detail view
 */

/**
 * Location coordinates
 */
export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Social media links
 */
export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
}

/**
 * Restaurant object (list view)
 *
 * Fields returned when fetching multiple restaurants
 */
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  location: Location | null;
  phone: string;
  establishment_types: string[];
  cuisine_types: string[];
  price_level: number | null;
  features: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Restaurant detail object (single view)
 *
 * All fields returned when fetching a single restaurant
 */
export interface RestaurantDetail extends Restaurant {
  address: string;
  postal_code: string | null;
  country: string;
  email: string | null;
  website: string | null;
  social_media: SocialMedia | null;
  created_by: string;
  updated_by: string;
}

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}

/**
 * API Response wrapper for list
 */
export interface RestaurantsResponse {
  data: Restaurant[];
  pagination: Pagination;
}
