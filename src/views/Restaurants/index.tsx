'use client';

/**
 * Restaurants View - Container Component
 *
 * Displays list of restaurants with city filter.
 * Uses query params for filtering (shareable URLs).
 */

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Restaurant } from '@/types/restaurant.types';
import './styles.scss';

// Available cities for filter (could come from API in the future)
const CITIES = ['Tunja', 'Villa de Leyva', 'Paipa', 'Duitama', 'Sogamoso'];

interface RestaurantsViewProps {
  initialData: Restaurant[];
  currentCity?: string;
}

export const RestaurantsView = ({ initialData, currentCity }: RestaurantsViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const restaurants = initialData;

  /**
   * Handle city filter change
   * Updates URL with query param, triggering server re-fetch
   */
  const handleCityChange = (city: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (city === '') {
      params.delete('city');
    } else {
      params.set('city', city);
    }

    const query = params.toString();
    router.push(query ? `/restaurants?${query}` : '/restaurants');
  };

  return (
    <div className="restaurants">
      <h1 className="restaurants__title">Descubre Boyacá - Restaurants</h1>

      {/* City Filter */}
      <div className="restaurants__filters">
        <label className="restaurants__filter-label" htmlFor="city-filter">
          Filtrar por ciudad:
        </label>
        <select
          id="city-filter"
          className="restaurants__filter-select"
          value={currentCity || ''}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="">Todas las ciudades</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {restaurants.length === 0 ? (
        <p className="restaurants__empty">
          No se encontraron restaurantes{currentCity ? ` en ${currentCity}` : ''}.
        </p>
      ) : (
        <div className="restaurants__list">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="restaurants__card-link"
            >
              <article className="restaurants__card">
                <h3 className="restaurants__card-title">{restaurant.name}</h3>
                <p className="restaurants__card-description">{restaurant.description}</p>
                <div className="restaurants__card-location">
                  <span>
                    📍 {restaurant.city}, {restaurant.state}
                  </span>
                </div>
                <div className="restaurants__card-phone">
                  <span>📞 {restaurant.phone}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
