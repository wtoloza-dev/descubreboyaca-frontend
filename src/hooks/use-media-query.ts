/**
 * useMediaQuery Hook
 * 
 * Hook para detectar media queries de forma reactiva.
 * Útil para responsive design.
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si una media query coincide
 * 
 * @param query - Media query string (ej: "(min-width: 768px)")
 * @returns boolean indicando si la query coincide
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Verifica si estamos en el cliente
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Actualiza el estado inicial
    setMatches(mediaQuery.matches);

    // Handler para cambios
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Agrega el listener
    mediaQuery.addEventListener('change', handleChange);

    // Limpieza
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Breakpoints predefinidos de Tailwind
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;

