import { create } from "zustand";

const useInternetPlansStore = create((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set(() => ({ isMobileMenuOpen: true })),
  closeMobileMenu: () => set(() => ({ isMobileMenuOpen: false })),
  isSeeMoreOpen: false,
  activateSeeMore: () => set(() => ({ isSeeMoreOpen: true })),
  deactivateSeeMore: () => set(() => ({ isSeeMoreOpen: false })),
  isFilterOpen: false,
  openFilterBox: () => set(() => ({ isFilterOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterOpen: false })),
}));

export default useInternetPlansStore;
