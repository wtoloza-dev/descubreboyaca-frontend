/**
 * Authentication Constants
 * 
 * Centralized configuration values for the authentication service.
 * 
 * Why separate constants file?
 * - Easy to change configuration in one place
 * - Can be overridden for testing
 * - Clear separation of config from logic
 * - Environment-specific values
 * - No magic strings scattered throughout code
 */

import { config } from '@/config';

/**
 * Base API URL
 * 
 * Loaded from config based on SCOPE environment variable.
 * 
 * Example:
 * - SCOPE=local       → http://localhost:8000
 * - SCOPE=development → https://api-dev.descubreboyaca.com
 * - SCOPE=test        → https://api-test.descubreboyaca.com
 * - SCOPE=production  → https://api.descubreboyaca.com
 */
export const API_URL = config.apiUrl;

/**
 * Authentication endpoints
 * 
 * All auth-related API endpoints in one place.
 * Makes it easy to update if backend routes change.
 * 
 * Using "as const" for:
 * - Type inference (TypeScript knows exact string values)
 * - Immutability (can't accidentally modify)
 * - Better autocomplete
 */
export const AUTH_ENDPOINTS = {
  /** Login endpoint - POST */
  LOGIN: '/auth/login/',
  
  /** Register endpoint - POST */
  REGISTER: '/auth/register/',
  
  /** Token refresh endpoint - POST */
  REFRESH: '/auth/refresh/',
  
  /** Current user endpoint - GET */
  ME: '/auth/me/',
  
  /** Google OAuth login - GET */
  GOOGLE_LOGIN: '/auth/google/login/',
  
  /** Google OAuth callback - GET */
  GOOGLE_CALLBACK: '/auth/google/callback/',
} as const;

/**
 * LocalStorage keys
 * 
 * Consistent key names for storing data in localStorage.
 * Prevents typos and makes refactoring easier.
 */
export const STORAGE_KEYS = {
  /** Access token key */
  ACCESS_TOKEN: 'access_token',
  
  /** Refresh token key */
  REFRESH_TOKEN: 'refresh_token',
} as const;

/**
 * HTTP headers
 * 
 * Common headers used in API requests.
 */
export const HTTP_HEADERS = {
  /** JSON content type */
  CONTENT_TYPE_JSON: 'application/json',
  
  /** Authorization header prefix */
  BEARER_PREFIX: 'Bearer',
} as const;

/**
 * Error messages
 * 
 * User-friendly error messages in Spanish.
 * Can be translated/localized later by moving to i18n system.
 * 
 * Why centralized error messages?
 * - Consistent messaging across the app
 * - Easy to update all messages at once
 * - Preparation for internationalization (i18n)
 */
export const AUTH_ERROR_MESSAGES = {
  /** Generic login failure */
  LOGIN_FAILED: 'Error al iniciar sesión. Verifica tus credenciales.',
  
  /** Generic registration failure */
  REGISTER_FAILED: 'Error al registrar usuario. Intenta de nuevo.',
  
  /** Token refresh failure */
  REFRESH_FAILED: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
  
  /** Network error */
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  
  /** Get current user failure */
  GET_USER_FAILED: 'Error al obtener información del usuario.',
} as const;

