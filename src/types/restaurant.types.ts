/**
 * Restaurant Type Definitions
 *
 * TUTORIAL: Why TypeScript Types?
 *
 * Types help you:
 * 1. Get autocomplete (IntelliSense) in your IDE
 * 2. Catch errors before runtime
 * 3. Document the data structure
 * 4. Refactor safely
 *
 * Think of it like a blueprint for your data!
 */

/**
 * Location coordinates
 */
export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Single Restaurant object
 *
 * This matches EXACTLY what the API returns
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
 * Pagination metadata
 */
export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}

/**
 * API Response wrapper
 *
 * IMPORTANT: The API returns data wrapped in this structure!
 * The actual restaurants are in response.data, not at the root.
 */
export interface RestaurantsResponse {
  data: Restaurant[];
  pagination: Pagination;
}

