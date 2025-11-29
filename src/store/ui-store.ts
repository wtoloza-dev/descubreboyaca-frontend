/**
 * UI Store
 *
 * Store for UI state (sidebar, modals, theme, etc.)
 */

import { create } from 'zustand';

export interface UIState {
  sidebarOpen: boolean;
}

export interface UIActions {
  toggleSidebar: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  sidebarOpen: false,

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
