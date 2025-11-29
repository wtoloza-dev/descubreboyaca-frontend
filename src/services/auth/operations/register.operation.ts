/**
 * Register Operation
 * 
 * Handles new user registration.
 * 
 * Single Responsibility:
 * - ONLY handles user registration
 * - Does NOT handle login or other auth operations
 * 
 * Why separate?
 * - Registration might have different validation rules
 * - May need to add email verification, captcha, etc.
 * - Can evolve independently from login
 */

import type { RegisterRequest, RegisterResponse } from '../types/auth.types';
import { API_URL, AUTH_ENDPOINTS, HTTP_HEADERS, AUTH_ERROR_MESSAGES } from '../constants/auth.constants';

/**
 * Register a new user account
 * 
 * Creates a new user with email, password, and full name.
 * 
 * @param email - User's email address (must be unique)
 * @param password - User's password (minimum 8 characters)
 * @param fullName - User's full name
 * @returns Promise with registration response containing user data
 * @throws Error if registration fails (email already exists, weak password, etc.)
 * 
 * @example
 * ```typescript
 * try {
 *   const response = await register(
 *     'newuser@example.com',
 *     'SecurePass123!',
 *     'John Doe'
 *   );
 *   console.log('User created:', response.user.email);
 *   console.log('Message:', response.message);
 * } catch (error) {
 *   console.error('Registration failed:', error.message);
 * }
 * ```
 */
export const register = async (
  email: string, 
  password: string, 
  fullName: string
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({ 
        email, 
        password, 
        full_name: fullName 
      } as RegisterRequest),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        detail: AUTH_ERROR_MESSAGES.REGISTER_FAILED 
      }));
      
      throw new Error(error.detail || AUTH_ERROR_MESSAGES.REGISTER_FAILED);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    throw error;
  }
};

