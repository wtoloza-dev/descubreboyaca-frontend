/**
 * Restaurant Detail Loading State
 *
 * Skeleton shown while fetching restaurant details.
 */

import '@/views/RestaurantDetail/styles.scss';

export default function RestaurantDetailLoading() {
  return (
    <div className="restaurant-detail restaurant-detail--skeleton">
      {/* Back link skeleton */}
      <div style={{ width: '150px', height: '20px', background: '#e0e0e0', borderRadius: '4px', marginBottom: '1.5rem' }} />

      {/* Header skeleton */}
      <header className="restaurant-detail__header">
        <div className="restaurant-detail__skeleton-title" />
        <div className="restaurant-detail__skeleton-text" />
      </header>

      {/* Content skeleton */}
      <div className="restaurant-detail__content">
        <section className="restaurant-detail__section">
          <div className="restaurant-detail__skeleton-block" />
        </section>
        <section className="restaurant-detail__section">
          <div className="restaurant-detail__skeleton-block" />
        </section>
      </div>
    </div>
  );
}

