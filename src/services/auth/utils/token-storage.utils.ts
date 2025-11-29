/**
 * Token Storage Utilities
 * 
 * Utilities for managing JWT tokens in localStorage.
 * 
 * Why separate file?
 * - Single Responsibility: Only handles storage, not API calls
 * - Reusable: Can be used by different services
 * - Testable: Easy to mock in tests
 * - Flexible: Can switch storage mechanism (localStorage → cookies) in one place
 * 
 * Security Considerations:
 * - localStorage is vulnerable to XSS attacks
 * - In production, consider httpOnly cookies
 * - Always use HTTPS in production
 * - Consider encrypting tokens before storage
 */

import { STORAGE_KEYS } from '../constants/auth.constants';

/**
 * Check if we're in browser environment
 * 
 * Next.js does Server-Side Rendering (SSR), so we need to check
 * if we're in the browser before accessing localStorage.
 * 
 * @returns true if in browser, false if on server
 */
const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Store JWT tokens in localStorage
 * 
 * Saves both access and refresh tokens for authentication.
 * 
 * @param accessToken - JWT access token (short-lived)
 * @param refreshToken - JWT refresh token (long-lived)
 * 
 * @example
 * ```typescript
 * storeTokens('eyJhbGc...', 'eyJhbGc...');
 * ```
 */
export const storeTokens = (accessToken: string, refreshToken: string): void => {
  if (!isBrowser()) return;
  
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Get stored access token
 * 
 * Retrieves the access token from localStorage.
 * 
 * @returns Access token string or null if not found
 * 
 * @example
 * ```typescript
 * const token = getAccessToken();
 * if (token) {
 *   // Use token for API request
 * }
 * ```
 */
export const getAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Get stored refresh token
 * 
 * Retrieves the refresh token from localStorage.
 * 
 * @returns Refresh token string or null if not found
 */
export const getRefreshToken = (): string | null => {
  if (!isBrowser()) return null;
  
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Clear all stored tokens
 * 
 * Removes both access and refresh tokens from localStorage.
 * Called on logout or when tokens are invalid.
 * 
 * @example
 * ```typescript
 * // On logout
 * clearTokens();
 * ```
 */
export const clearTokens = (): void => {
  if (!isBrowser()) return;
  
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Check if user has stored tokens
 * 
 * Useful for checking if user might be authenticated
 * (though token could be expired).
 * 
 * @returns true if access token exists, false otherwise
 * 
 * @example
 * ```typescript
 * if (hasTokens()) {
 *   // Try to restore session
 * }
 * ```
 */
export const hasTokens = (): boolean => {
  return getAccessToken() !== null;
};

