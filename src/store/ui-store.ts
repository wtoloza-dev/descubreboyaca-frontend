/**
 * UI Store
 * 
 * Store para el estado de la UI (sidebar, modales, tema, etc.)
 */

import { create } from 'zustand';

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  modalOpen: string | null;
}

export interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  // Estado inicial
  sidebarOpen: false,
  theme: 'system',
  modalOpen: null,

  // Acciones
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setTheme: (theme) => set({ theme }),
  
  openModal: (modalId) => set({ modalOpen: modalId }),
  
  closeModal: () => set({ modalOpen: null }),
}));

