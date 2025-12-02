/**
 * Restaurants Page - Route Level Component
 *
 * ARCHITECTURE LESSON:
 * This is the "Smart Component" - it handles:
 * ✅ Data fetching (uses our custom hook)
 * ✅ Loading states
 * ✅ Error handling
 * ✅ Business logic
 *
 * Then it passes clean data to the "Dumb Component" (View)
 *
 * WHY THIS PATTERN?
 * - Separation of concerns
 * - The View can be reused with different data sources
 * - Easier to test (mock data in View)
 * - Follows Next.js best practices
 */

'use client'; // Need this because we're using hooks

import { useGET } from '@/hooks';
import { RestaurantsView } from '@/views/Restaurants';
import type { RestaurantsResponse } from '@/types/restaurant.types';

export default function RestaurantsPage() {
  // 🎯 DATA FETCHING HAPPENS HERE (at the route level)
  // Notice: We only pass the PATH, not the full URL!
  // The hook automatically prepends config.apiUrl
  //
  // IMPORTANT: We specify the type <RestaurantsResponse>
  // This tells TypeScript what structure to expect
  const { data: response, loading, error } = useGET<RestaurantsResponse>('/api/v1/restaurants/');

  // HANDLE LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Restaurants</h1>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  // HANDLE ERROR STATE
  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Restaurants</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  // PASS CLEAN DATA TO VIEW
  // The view doesn't know or care where this data came from!
  //
  // IMPORTANT: Extract the restaurants from response.data
  // The API wraps data like: { data: [...], pagination: {...} }
  const restaurants = response?.data || [];

  return <RestaurantsView restaurants={restaurants} />;
}
