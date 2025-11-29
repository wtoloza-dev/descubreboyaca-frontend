/**
 * Login Operation
 * 
 * Handles user authentication via email and password.
 * 
 * Single Responsibility:
 * - ONLY handles login operation
 * - Does NOT handle registration, token refresh, or other auth operations
 * - Makes code easier to test, understand, and maintain
 * 
 * Why "operation" instead of "service"?
 * - Clear: This is an operation you can perform
 * - Not redundant with parent "services" folder
 * - Common in enterprise architectures
 * - Indicates a discrete action/transaction
 */

import type { LoginRequest, LoginResponse } from '../types/auth.types';
import { API_URL, AUTH_ENDPOINTS, HTTP_HEADERS, AUTH_ERROR_MESSAGES } from '../constants/auth.constants';

/**
 * Authenticate user with email and password
 * 
 * Makes a POST request to /auth/login/ with credentials.
 * Returns JWT tokens and user data on success.
 * 
 * @param email - User's email address
 * @param password - User's password (sent as plain text, encrypted by HTTPS)
 * @returns Promise with login response containing tokens and user data
 * @throws Error if login fails (invalid credentials, network error, etc.)
 * 
 * @example
 * ```typescript
 * try {
 *   const response = await login('user@example.com', 'password123');
 *   console.log('Logged in as:', response.user.email);
 *   console.log('Access token:', response.access_token);
 * } catch (error) {
 *   console.error('Login failed:', error.message);
 * }
 * ```
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({ email, password } as LoginRequest),
    });

    // Check if request was successful
    if (!response.ok) {
      // Try to extract error message from API response
      const error = await response.json().catch(() => ({ 
        detail: AUTH_ERROR_MESSAGES.LOGIN_FAILED 
      }));
      
      throw new Error(error.detail || AUTH_ERROR_MESSAGES.LOGIN_FAILED);
    }

    // Parse and return the successful response
    return response.json();
  } catch (error) {
    // Re-throw with user-friendly message if it's a network error
    if (error instanceof TypeError) {
      throw new Error(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    // Re-throw the original error
    throw error;
  }
};

