/**
 * Restaurants View - Presentational Component
 *
 * ARCHITECTURE LESSON - "Dumb Component":
 * This component is PURE PRESENTATION. It:
 * ✅ Receives data as props
 * ✅ Displays the UI
 * ✅ Doesn't know about APIs, loading, errors
 * ✅ Can be reused anywhere with any data
 *
 * WHY THIS IS BETTER:
 * - Easy to test (just pass mock data)
 * - Reusable (works with any restaurant data)
 * - Single responsibility (just display, nothing else)
 * - Can use in Storybook, different pages, etc.
 *
 * ANALOGY:
 * Think of this like a picture frame. The frame (View) doesn't care
 * where the photo (data) came from - it just displays it beautifully!
 */

import './styles.scss';

/**
 * RestaurantsView Component
 *
 * @param {Object} props
 * @param {Array} props.restaurants - Array of restaurant objects to display
 *
 * USAGE EXAMPLE:
 * <RestaurantsView restaurants={[{id: "123", name: "Pizza Place", ...}]} />
 */
export const RestaurantsView = ({ restaurants = [] }) => {
  return (
    <div className="restaurants-view">
      <h1>Descubre Boyacá - Restaurants</h1>

      {/* Show message if no restaurants */}
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="restaurants-list">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p className="description">{restaurant.description}</p>
              <div className="location">
                <span>📍 {restaurant.city}, {restaurant.state}</span>
              </div>
              <div className="phone">
                <span>📞 {restaurant.phone}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
