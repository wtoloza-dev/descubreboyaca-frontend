/**
 * Auth Store
 * 
 * Authentication store using Zustand.
 * Handles user state and login/logout functions.
 */

import { create } from 'zustand';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

/**
 * Authentication store
 */
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,

  // Actions
  login: (email: string, password: string) => {
    // TODO: Implement login logic
    console.log('Login:', email, password);
  },

  logout: () => {
    // TODO: Implement logout logic
    set({ user: null, isAuthenticated: false });
  },
}));

