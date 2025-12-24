'use client';

/**
 * Restaurant Detail View - Container Component
 *
 * Displays full details of a single restaurant.
 * Receives data from Server Component.
 */

import Link from 'next/link';
import type { RestaurantDetail } from '@/types/restaurant.types';
import './styles.scss';

interface RestaurantDetailViewProps {
  restaurant: RestaurantDetail;
}

export const RestaurantDetailView = ({ restaurant }: RestaurantDetailViewProps) => {
  return (
    <div className="restaurant-detail">
      {/* Back link */}
      <Link href="/restaurants" className="restaurant-detail__back">
        ← Volver a restaurantes
      </Link>

      {/* Header */}
      <header className="restaurant-detail__header">
        <h1 className="restaurant-detail__title">{restaurant.name}</h1>
        <p className="restaurant-detail__location">
          📍 {restaurant.city}, {restaurant.state}, {restaurant.country}
        </p>
      </header>

      {/* Main content */}
      <div className="restaurant-detail__content">
        {/* Description */}
        <section className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">Descripción</h2>
          <p className="restaurant-detail__description">{restaurant.description}</p>
        </section>

        {/* Contact info */}
        <section className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">Contacto</h2>
          <ul className="restaurant-detail__contact-list">
            {restaurant.address && (
              <li className="restaurant-detail__contact-item">
                <span className="restaurant-detail__contact-icon">🏠</span>
                <span>{restaurant.address}</span>
              </li>
            )}
            {restaurant.phone && (
              <li className="restaurant-detail__contact-item">
                <span className="restaurant-detail__contact-icon">📞</span>
                <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
              </li>
            )}
            {restaurant.email && (
              <li className="restaurant-detail__contact-item">
                <span className="restaurant-detail__contact-icon">✉️</span>
                <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
              </li>
            )}
            {restaurant.website && (
              <li className="restaurant-detail__contact-item">
                <span className="restaurant-detail__contact-icon">🌐</span>
                <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                  {restaurant.website}
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* Tags & Features */}
        {(restaurant.cuisine_types.length > 0 || restaurant.features.length > 0) && (
          <section className="restaurant-detail__section">
            <h2 className="restaurant-detail__section-title">Características</h2>

            {restaurant.cuisine_types.length > 0 && (
              <div className="restaurant-detail__tags">
                <span className="restaurant-detail__tags-label">Cocina:</span>
                {restaurant.cuisine_types.map((type) => (
                  <span key={type} className="restaurant-detail__tag">
                    {type}
                  </span>
                ))}
              </div>
            )}

            {restaurant.features.length > 0 && (
              <div className="restaurant-detail__tags">
                <span className="restaurant-detail__tags-label">Servicios:</span>
                {restaurant.features.map((feature) => (
                  <span key={feature} className="restaurant-detail__tag">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Price level */}
        {restaurant.price_level && (
          <section className="restaurant-detail__section">
            <h2 className="restaurant-detail__section-title">Precio</h2>
            <div className="restaurant-detail__price">
              {'$'.repeat(restaurant.price_level)}
              <span className="restaurant-detail__price-inactive">
                {'$'.repeat(4 - restaurant.price_level)}
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

