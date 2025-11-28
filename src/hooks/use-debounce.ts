/**
 * useDebounce Hook
 * 
 * Hook for value debouncing (useful for searches).
 */

'use client';

/**
 * Hook to apply debounce to a value
 * 
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 * 
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  // TODO: Implement debounce logic
  console.log(delay);
  return value;
}

