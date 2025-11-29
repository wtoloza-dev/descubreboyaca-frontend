/**
 * User Operations
 *
 * Handles user-related operations (get current user, profile, etc.).
 *
 * Single Responsibility:
 * - ONLY handles user data operations
 * - Does NOT handle authentication
 *
 * Why separate?
 * - User operations are different from auth operations
 * - May need to add profile updates, preferences, etc.
 * - Can be extended without touching auth code
 */

import type { CurrentUserResponse } from '../types/auth.types';
import {
  API_URL,
  AUTH_ENDPOINTS,
  HTTP_HEADERS,
  AUTH_ERROR_MESSAGES,
} from '../constants/auth.constants';

/**
 * Get current authenticated user information
 *
 * Fetches the user profile for the currently authenticated user
 * using their access token.
 *
 * @param accessToken - Valid JWT access token
 * @returns Promise with user data
 * @throws Error if token is invalid or request fails
 *
 * @example
 * ```typescript
 * try {
 *   const { user } = await getCurrentUser(accessToken);
 *   console.log('Current user:', user.email);
 *   console.log('Role:', user.role);
 * } catch (error) {
 *   console.error('Failed to get user:', error.message);
 *   // Token might be expired, try refreshing
 * }
 * ```
 */
export const getCurrentUser = async (accessToken: string): Promise<CurrentUserResponse> => {
  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.ME}`, {
      method: 'GET',
      headers: {
        Authorization: `${HTTP_HEADERS.BEARER_PREFIX} ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(AUTH_ERROR_MESSAGES.GET_USER_FAILED);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }

    throw error;
  }
};
