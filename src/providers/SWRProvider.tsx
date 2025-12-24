'use client';

/**
 * SWR Provider
 *
 * Global configuration for SWR.
 * Handles API URL building and default fetch options.
 */

import { SWRConfig } from 'swr';
import { config } from '@/config';

/**
 * Builds the complete URL from path or full URL
 */
const buildUrl = (urlOrPath: string): string => {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }
  return `${config.apiUrl}${urlOrPath}`;
};

/**
 * Global fetcher with smart URL handling
 */
const fetcher = async (url: string) => {
  const fullUrl = buildUrl(url);
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
};
