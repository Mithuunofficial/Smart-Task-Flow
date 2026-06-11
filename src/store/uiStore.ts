import type { StateCreator } from 'zustand';

export interface UISlice {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
}

export const createUISlice: StateCreator<any, [], [], UISlice> = (set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  searchModalOpen: false,
  setSearchModalOpen: (open) => set({ searchModalOpen: open })
});
