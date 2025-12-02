/**
 * useGET - A simple custom hook for fetching data
 *
 * WHY THIS EXISTS:
 * Instead of writing fetch() code everywhere, this hook gives you:
 * - data: The information from the API
 * - loading: True while fetching, false when done
 * - error: Any error message if something goes wrong
 *
 * SMART URL HANDLING:
 * - If you pass a path (/api/v1/users), it uses config.apiUrl as base
 * - If you pass a full URL (https://...), it uses it directly
 *
 * This means when your API domain changes, just update the config!
 * No need to update every component. 🎉
 */

import { useState, useEffect } from 'react';
import { config } from '@/config';

/**
 * Return type for the useGET hook
 * This tells TypeScript what shape our return object has
 */
interface UseGETReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Builds the complete URL
 *
 * SMART URL LOGIC:
 * - Full URL (starts with http:// or https://) → use as-is
 * - Path only (starts with /) → prepend config.apiUrl
 *
 * @param {string} urlOrPath - Either a full URL or a path
 * @returns {string} - The complete URL
 *
 * EXAMPLES:
 * buildUrl('/api/v1/users') → 'http://localhost:8000/api/v1/users'
 * buildUrl('https://external.com/data') → 'https://external.com/data'
 */
const buildUrl = (urlOrPath: string): string => {
  // Check if it's already a full URL
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }

  // It's a path, so prepend the API base URL
  return `${config.apiUrl}${urlOrPath}`;
};

/**
 * Basic GET request hook with TypeScript generics
 *
 * @template T - The type of data you expect from the API
 * @param {string | null} url - The API endpoint to fetch from
 * @returns {UseGETReturn<T>} - { data, loading, error }
 *
 * EXAMPLE:
 * interface User { id: number; name: string; }
 * const { data, loading, error } = useGET<User[]>('https://api.example.com/users');
 *
 * TYPESCRIPT EXPLANATION:
 * The <T> is a "generic" - it means "any type you want"
 * When you call useGET<User[]>, T becomes User[]
 * So data will be of type User[] | null
 */
export const useGET = <T = any>(url: string | null): UseGETReturn<T> => {
  // STEP 1: Create state to store our data
  // Think of state as "boxes" that hold information
  const [data, setData] = useState<T | null>(null);       // Box for the data
  const [loading, setLoading] = useState<boolean>(true);  // Box for loading status
  const [error, setError] = useState<string | null>(null); // Box for errors

  // STEP 2: Use useEffect to fetch when component mounts
  // useEffect runs code when the component appears or when dependencies change
  useEffect(() => {
    // This function does the actual fetching
    const fetchData = async () => {
      try {
        // STEP 3: Reset states before fetching
        setLoading(true);  // Show loading spinner
        setError(null);    // Clear any previous errors

        // STEP 4: Build the complete URL (smart handling!)
        const fullUrl = buildUrl(url as string);

        // STEP 5: Make the actual fetch request
        const response = await fetch(fullUrl);

        // STEP 6: Check if the response was successful
        if (!response.ok) {
          // If not successful (404, 500, etc), throw an error
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // STEP 7: Convert response to JSON
        const result = await response.json();

        // STEP 8: Store the data
        setData(result as T);
      } catch (err) {
        // STEP 9: If anything goes wrong, store the error
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        // STEP 10: Always stop loading, whether success or failure
        setLoading(false);
      }
    };

    // Only fetch if we have a URL
    if (url) {
      fetchData();
    }
  }, [url]); // Run this effect again if URL changes

  // STEP 11: Return the data, loading, and error states
  // Components can now use these values!
  return { data, loading, error };
};
