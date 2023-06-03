import { create } from "zustand";

const useHomeStore = create((set) => ({
  isMobileNavOpen: false,
  openMobileNav: () => set(() => ({ isMobileNavOpen: true })),
  closeMobileNav: () => set(() => ({ isMobileNavOpen: false })),
}));

export default useHomeStore;
