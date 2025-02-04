import { create } from "zustand";

const useDashboardPageStore = create((set) => ({
  id: "",
  setId: (value) => set(() => ({ id: value })),
  isMenuOpen: true,
  openMenu: () =>
    set(() => {
      scrollTo(0, 0);
      return { isMenuOpen: true };
    }),
  closeMenu: () => set(() => ({ isMenuOpen: false })),
  size: 0,
  setSize: (value) => set(() => ({ size: value })),
  searchValue: "",
  setSearchValue: (event) => set(() => ({ searchValue: event.target.value })),
  resetSearchValue: () => set(() => ({ searchValue: "" })),
}));

export default useDashboardPageStore;
