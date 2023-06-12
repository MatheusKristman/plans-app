import { create } from 'zustand';

const useTVPlansStore = create((set) => ({
  isSeeMoreOpen: false,
  activateSeeMore: () => set(() => ({ isSeeMoreOpen: true })),
  deactivateSeeMore: () => set(() => ({ isSeeMoreOpen: false })),
  isFilterOpen: false,
  openFilterBox: () => set(() => ({ isFilterOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterOpen: false })),
}));

export default useTVPlansStore;
