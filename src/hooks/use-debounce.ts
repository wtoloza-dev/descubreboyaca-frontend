/**
 * useDebounce Hook
 * 
 * Hook para debounce de valores (útil para búsquedas).
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para aplicar debounce a un valor
 * 
 * @param value - Valor a aplicar debounce
 * @param delay - Delay en milisegundos
 * @returns Valor con debounce aplicado
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // Hacer búsqueda con debouncedSearchTerm
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Actualiza el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancela el timeout si value cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

