/**
 * Footer Component (Organism)
 *
 * Application footer component.
 * It's an organism because it combines multiple molecules and atoms.
 */

/**
 * Main site footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Descubre Boyacá. All rights reserved.</p>
      {/* TODO: Implement complete footer */}
    </footer>
  );
}
