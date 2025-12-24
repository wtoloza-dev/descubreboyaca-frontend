/**
 * Restaurant Detail Page - Server Component
 *
 * Dynamic route: /restaurants/[id]
 * Fetches single restaurant by ID and passes to view.
 */

import { notFound } from 'next/navigation';
import { config } from '@/config';
import type { RestaurantDetail } from '@/types/restaurant.types';
import { RestaurantDetailView } from '@/views/RestaurantDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Fetch single restaurant from API
 */
async function getRestaurant(id: string): Promise<RestaurantDetail | null> {
  try {
    const response = await fetch(`${config.apiUrl}/api/v1/restaurants/${id}/`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  } catch {
    return null;
  }
}

/**
 * Server Component - Fetches restaurant and renders view
 */
export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetailView restaurant={restaurant} />;
}

