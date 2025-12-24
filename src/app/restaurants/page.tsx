/**
 * Restaurants Page - Server Component
 *
 * Supports filtering via query params:
 * - /restaurants              → All restaurants
 * - /restaurants?city=Tunja   → Filtered by city
 * - /restaurants?page=2       → Paginated
 */

import { config } from '@/config';
import type { RestaurantsResponse } from '@/types/restaurant.types';
import { RestaurantsView } from '@/views/Restaurants';

interface PageProps {
  searchParams: Promise<{ city?: string; page?: string; page_size?: string }>;
}

/**
 * Fetch restaurants from API with query params
 */
async function getRestaurants(params: {
  city?: string;
  page?: string;
  page_size?: string;
}): Promise<RestaurantsResponse> {
  const searchParams = new URLSearchParams();

  if (params.city) searchParams.set('city', params.city);
  if (params.page) searchParams.set('page', params.page);
  if (params.page_size) searchParams.set('page_size', params.page_size);

  const query = searchParams.toString();
  const url = `${config.apiUrl}/api/v1/restaurants/${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}

/**
 * Server Component
 * Reads searchParams and fetches accordingly
 */
export default async function RestaurantsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { data: restaurants } = await getRestaurants(params);

  return <RestaurantsView initialData={restaurants} currentCity={params.city} />;
}
