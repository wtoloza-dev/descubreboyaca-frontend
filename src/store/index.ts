/**
 * Store Index
 * 
 * Exporta todos los stores de la aplicación.
 * Usa Zustand para manejo de estado global.
 */

export { useAuthStore } from './auth-store';
export { useUIStore } from './ui-store';

// Re-exporta tipos
export type { AuthState, AuthActions } from './auth-store';
export type { UIState, UIActions } from './ui-store';

