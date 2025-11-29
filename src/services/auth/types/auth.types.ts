/**
 * Authentication Types
 * 
 * Type definitions for authentication-related data structures.
 * These interfaces define the shape of data coming from and going to the API.
 * 
 * Organization Philosophy:
 * - All types in one place for easy discovery
 * - Can be imported without importing service logic
 * - TypeScript types are removed at compile time (zero runtime cost)
 * - Single source of truth for type definitions
 */

/**
 * User response interface from API
 * 
 * Represents a user entity as returned by the authentication endpoints.
 * This is the core user model used throughout the application.
 */
export interface UserResponse {
  /** Unique identifier (ULID format) */
  id: string;
  
  /** User's email address */
  email: string;
  
  /** User's full name */
  full_name: string;
  
  /** User's role (admin, owner, user, guest) */
  role: string;
  
  /** Whether the user account is active */
  is_active: boolean;
  
  /** Authentication provider (email, google, etc.) */
  auth_provider: string;
  
  /** Optional profile picture URL */
  profile_picture_url?: string | null;
  
  /** Account creation timestamp (ISO 8601) */
  created_at: string;
}

/**
 * Login response interface from API
 * 
 * Contains JWT tokens and user data returned after successful authentication.
 */
export interface LoginResponse {
  /** JWT access token (short-lived, ~15 minutes) */
  access_token: string;
  
  /** JWT refresh token (long-lived, ~7 days) */
  refresh_token: string;
  
  /** Token type (always "bearer") */
  token_type: string;
  
  /** Authenticated user data */
  user: UserResponse;
}

/**
 * Login request interface
 * 
 * Credentials required to authenticate a user.
 */
export interface LoginRequest {
  /** User's email address */
  email: string;
  
  /** User's password (plain text, will be hashed by backend) */
  password: string;
}

/**
 * Register request interface
 * 
 * Data required to create a new user account.
 */
export interface RegisterRequest {
  /** User's email address (must be unique) */
  email: string;
  
  /** User's password (minimum 8 characters) */
  password: string;
  
  /** User's full name */
  full_name: string;
}

/**
 * Register response interface
 * 
 * Response after successful user registration.
 */
export interface RegisterResponse {
  /** Newly created user data */
  user: UserResponse;
  
  /** Success message */
  message: string;
}

/**
 * Token refresh request interface
 * 
 * Used to obtain a new access token using a refresh token.
 */
export interface RefreshTokenRequest {
  /** Valid refresh token */
  refresh_token: string;
}

/**
 * Token refresh response interface
 * 
 * Contains a new access token.
 */
export interface RefreshTokenResponse {
  /** New JWT access token */
  access_token: string;
  
  /** Token type (always "bearer") */
  token_type: string;
}

/**
 * Current user response interface
 * 
 * Response from the /auth/me/ endpoint.
 */
export interface CurrentUserResponse {
  /** Current authenticated user data */
  user: UserResponse;
}

