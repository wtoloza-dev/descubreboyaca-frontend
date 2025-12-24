/**
 * useGET - Data fetching hook powered by SWR
 *
 * Uses global SWR configuration from SWRProvider.
 * Just pass the URL/path and get your data!
 */

import useSWR, { type SWRConfiguration } from 'swr';

/**
 * Return type for the useGET hook
 */
interface UseGETReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  isValidating: boolean;
  mutate: () => Promise<T | undefined>;
}

/**
 * GET request hook
 *
 * @template T - The type of data you expect from the API
 * @param url - The API endpoint (path or full URL)
 * @param options - Optional SWR configuration overrides
 *
 * @example
 * ```typescript
 * const { data, loading, error } = useGET<User[]>('/api/v1/users');
 * ```
 */
export const useGET = <T = unknown>(
  url: string | null,
  options?: SWRConfiguration<T>,
): UseGETReturn<T> => {
  const { data, error, isValidating, mutate } = useSWR<T, Error>(url, {
    ...options,
  });

  return {
    data,
    loading: !data && !error,
    error,
    isValidating,
    mutate: () => mutate(),
  };
};
