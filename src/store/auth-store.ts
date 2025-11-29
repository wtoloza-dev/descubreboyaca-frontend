/**
 * Auth Store
 * 
 * Authentication store using Zustand.
 * Handles user state and login/logout functions.
 * 
 * Architecture:
 * - Store manages global state (user, loading, errors)
 * - Operations handle API calls (imported from @/services/auth)
 * - Store orchestrates operations and updates state
 */

import { create } from 'zustand';
import { 
  login as loginOperation, 
  getCurrentUser,
  storeTokens,
  getAccessToken,
  clearTokens,
  type UserResponse 
} from '@/services/auth';

// Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  auth_provider: string;
  profile_picture_url?: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

/**
 * Authentication store
 */
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Login user with email and password
   * 
   * @param email - User's email address
   * @param password - User's password
   */
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Call login operation
      const response = await loginOperation(email, password);
      
      // Store tokens using utility
      storeTokens(response.access_token, response.refresh_token);
      
      // Update state with user data
      set({ 
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({ 
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
      throw error;
    }
  },

  /**
   * Logout user and clear tokens
   */
  logout: () => {
    // Clear tokens using utility
    clearTokens();
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null,
    });
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Initialize auth state from stored tokens
   * Checks if user has valid tokens and loads user data
   */
  initializeAuth: async () => {
    // Get token using utility
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      return;
    }

    set({ isLoading: true });

    try {
      // Get current user using operation
      const { user } = await getCurrentUser(accessToken);
      set({ 
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // Token is invalid, clear it
      clearTokens();
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
