/**
 * useLocalStorage Hook
 * 
 * Hook to handle localStorage reactively.
 */

'use client';

import { useState } from 'react';

/**
 * Hook to sync state with localStorage
 * 
 * @param key - localStorage key
 * @param initialValue - Initial value
 * @returns [value, setValue]
 * 
 * @example
 * const [name, setName] = useLocalStorage('userName', 'Guest');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // TODO: Implement localStorage logic
  const setValue = (value: T) => {
    console.log(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

