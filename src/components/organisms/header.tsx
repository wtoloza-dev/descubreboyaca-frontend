/**
 * Header Component (Organism)
 * 
 * Main application header component.
 * It's an organism because it combines multiple molecules and atoms.
 */

import Link from 'next/link';

/**
 * Main site header
 */
export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Descubre Boyacá</Link>
        {/* TODO: Implement navigation */}
      </nav>
    </header>
  );
}

