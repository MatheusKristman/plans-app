import { create } from "zustand";

const useDashboardComponentStore = create((set) => ({
  isStatusMenuOpen: false,
  openStatusMenu: () => set(() => ({ isStatusMenuOpen: true })),
  closeStatusMenu: () => set(() => ({ isStatusMenuOpen: false })),
  statusMenuAnimation: false,
  openStatusAnimation: () => set(() => ({ statusMenuAnimation: true })),
  closeStatusAnimation: () => set(() => ({ statusMenuAnimation: false })),
  isInternetFormOpen: false,
  openInternetForm: () => set(() => ({ isInternetFormOpen: true })),
  closeInternetForm: () => set(() => ({ isInternetFormOpen: false })),
  isCelFormOpen: false,
  openCelForm: () => set(() => ({ isCelFormOpen: true })),
  closeCelForm: () => set(() => ({ isCelFormOpen: false })),
  isTVFormOpen: false,
  openTVForm: () => set(() => ({ isTVFormOpen: true })),
  closeTVForm: () => set(() => ({ isTVFormOpen: false })),
}));

export default useDashboardComponentStore;
