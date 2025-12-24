/**
 * Restaurants Loading State
 *
 * Shown automatically while page.tsx fetches data.
 * Uses BEM naming scoped to restaurants block.
 */

import '@/views/Restaurants/styles.scss';

export default function RestaurantsLoading() {
  return (
    <div className="restaurants">
      <h1 className="restaurants__title">Descubre Boyacá - Restaurants</h1>

      <div className="restaurants__list">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="restaurants__card restaurants__card--skeleton">
            <div className="restaurants__skeleton-title" />
            <div className="restaurants__skeleton-text" />
            <div className="restaurants__skeleton-text restaurants__skeleton-text--short" />
          </div>
        ))}
      </div>
    </div>
  );
}
