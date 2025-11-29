/**
 * Authentication Module - Barrel Export
 * 
 * This is a "barrel file" that re-exports everything from the auth module.
 * It provides a clean, organized public API for the authentication module.
 * 
 * Benefits of Barrel Files:
 * 
 * ✅ Clean imports:
 * ```typescript
 * // Without barrel
 * import { login } from '@/services/auth/operations/login.operation';
 * import { register } from '@/services/auth/operations/register.operation';
 * import type { LoginResponse } from '@/services/auth/types/auth.types';
 * 
 * // With barrel
 * import { login, register } from '@/services/auth';
 * import type { LoginResponse } from '@/services/auth';
 * ```
 * 
 * ✅ Encapsulation:
 * - Internal structure can change without breaking imports
 * - Can control what's exposed publicly
 * 
 * ✅ Organization:
 * - Grouped related exports
 * - Single import statement for related items
 */

// ============================================================================
// TYPES - Export all TypeScript interfaces
// ============================================================================
// Using "export type" to make it clear these are types only (no runtime code)
// This helps TypeScript optimize and makes intentions clear

export type {
  UserResponse,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  CurrentUserResponse,
} from './types/auth.types';

// ============================================================================
// CONSTANTS - Export all configuration values
// ============================================================================
// These are runtime values included in the final bundle

export {
  API_URL,
  AUTH_ENDPOINTS,
  STORAGE_KEYS,
  HTTP_HEADERS,
  AUTH_ERROR_MESSAGES,
} from './constants/auth.constants';

// ============================================================================
// OPERATIONS - Export all operation functions
// ============================================================================
// These are the main public API of the auth module

// Login operations
export { login } from './operations/login.operation';

// Registration operations
export { register } from './operations/register.operation';

// Token operations
export { 
  refreshAccessToken,
  parseToken,
  isTokenExpired,
} from './operations/token.operation';

// User operations
export { getCurrentUser } from './operations/user.operation';

// ============================================================================
// UTILITIES - Export utility functions
// ============================================================================
// Token storage utilities

export {
  storeTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  hasTokens,
} from './utils/token-storage.utils';

/**
 * Usage Examples:
 * 
 * 1. Login flow:
 * ```typescript
 * import { login, storeTokens } from '@/services/auth';
 * 
 * const response = await login(email, password);
 * storeTokens(response.access_token, response.refresh_token);
 * ```
 * 
 * 2. Get current user:
 * ```typescript
 * import { getCurrentUser, getAccessToken } from '@/services/auth';
 * 
 * const token = getAccessToken();
 * const { user } = await getCurrentUser(token);
 * ```
 * 
 * 3. Refresh token:
 * ```typescript
 * import { refreshAccessToken, getRefreshToken, storeTokens } from '@/services/auth';
 * 
 * const refreshToken = getRefreshToken();
 * const { access_token } = await refreshAccessToken(refreshToken);
 * storeTokens(access_token, refreshToken);
 * ```
 */
