/**
 * Store Index
 *
 * Exports all application stores.
 * Uses Zustand for global state management.
 */

export { useAuthStore } from './auth-store';
export { useUIStore } from './ui-store';

// Re-export types
export type { AuthState, AuthActions } from './auth-store';
export type { UIState, UIActions } from './ui-store';
