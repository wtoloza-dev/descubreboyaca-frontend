/**
 * useMediaQuery Hook
 *
 * Hook to detect media queries reactively.
 */

'use client';

import { useState } from 'react';

/**
 * Hook to detect if a media query matches
 *
 * @param query - Media query string (e.g.: "(min-width: 768px)")
 * @returns boolean indicating if the query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  // TODO: Implement media query logic
  console.log(query, setMatches);

  return matches;
}
