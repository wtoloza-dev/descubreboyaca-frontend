/**
 * Token Operations
 * 
 * Handles JWT token operations (refresh, validation, parsing).
 * 
 * Single Responsibility:
 * - Token refresh logic
 * - Token validation
 * - Token parsing and lifecycle management
 * 
 * Why separate?
 * - Token operations are distinct from login/register
 * - May need complex logic (auto-refresh, token rotation, etc.)
 * - Can be used by interceptors/middleware
 */

import type { RefreshTokenRequest, RefreshTokenResponse } from '../types/auth.types';
import { API_URL, AUTH_ENDPOINTS, HTTP_HEADERS, AUTH_ERROR_MESSAGES } from '../constants/auth.constants';

/**
 * Refresh access token using refresh token
 * 
 * When the access token expires (usually after 15 minutes),
 * use the refresh token to get a new access token without
 * requiring the user to log in again.
 * 
 * Flow:
 * 1. Access token expires
 * 2. API returns 401 Unauthorized
 * 3. Call this function with refresh token
 * 4. Get new access token
 * 5. Retry original request
 * 
 * @param refreshToken - Valid refresh token
 * @returns Promise with new access token
 * @throws Error if refresh token is invalid or expired
 * 
 * @example
 * ```typescript
 * try {
 *   const { access_token } = await refreshAccessToken(oldRefreshToken);
 *   // Use new access token for subsequent requests
 * } catch (error) {
 *   // Refresh token expired, need to login again
 *   redirectToLogin();
 * }
 * ```
 */
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({ 
        refresh_token: refreshToken 
      } as RefreshTokenRequest),
    });

    if (!response.ok) {
      throw new Error(AUTH_ERROR_MESSAGES.REFRESH_FAILED);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    throw error;
  }
};

/**
 * Parse JWT token payload (without verification)
 * 
 * Decodes the JWT to read claims like expiration time.
 * Note: This does NOT verify the token signature!
 * Only use for reading metadata, not for security checks.
 * 
 * @param token - JWT token string
 * @returns Decoded token payload
 * 
 * @example
 * ```typescript
 * const payload = parseToken(accessToken);
 * console.log('Token expires at:', new Date(payload.exp * 1000));
 * ```
 */
export const parseToken = (token: string): Record<string, unknown> => {
  try {
    // JWT format: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token format');
  }
};

/**
 * Check if token is expired
 * 
 * @param token - JWT token string
 * @returns true if token is expired, false otherwise
 * 
 * @example
 * ```typescript
 * if (isTokenExpired(accessToken)) {
 *   // Refresh token
 * }
 * ```
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = parseToken(token);
    const exp = payload.exp as number;
    
    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= exp * 1000;
  } catch (error) {
    // If we can't parse it, consider it expired
    return true;
  }
};

