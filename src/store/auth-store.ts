/**
 * Auth Store
 * 
 * Store de autenticación usando Zustand.
 * Maneja el estado del usuario y funciones de login/logout.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

/**
 * Store de autenticación con persistencia en localStorage
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Acciones
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Aquí irá tu lógica de login con la API
          // Ejemplo simulado:
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: '1',
            email,
            name: 'Usuario Demo',
            role: 'user',
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage', // nombre en localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

