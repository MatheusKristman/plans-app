import { create } from "zustand";

const useProviderStore = create((set) => ({
  isNewProviderFormOpen: false,
  openNewProviderForm: () => set(() => ({ isNewProviderFormOpen: true })),
  closeNewProviderForm: () => set(() => ({ isNewProviderFormOpen: false })),
  isDetailsBoxOpen: false,
  openDetailsBox: () => set(() => ({ isDetailsBoxOpen: true })),
  closeDetailsBox: () => set(() => ({ isDetailsBoxOpen: false })),
  isEditProviderFormOpen: false,
  openEditProviderForm: () => set(() => ({ isEditProviderFormOpen: true })),
  closeEditProviderForm: () => set(() => ({ isEditProviderFormOpen: false })),
  providers: [],
  setProviders: (prov) => set(() => ({ providers: prov })),
  filteredProviders: [],
  setFilteredProviders: (prov) => set(() => ({ filteredProviders: prov })),
  sliceEnd: 5,
  setSliceEnd: () => set((state) => ({ sliceEnd: state.sliceEnd + 5 })),
  resetSlice: () => set(() => ({ sliceEnd: 5 })),
}));

export default useProviderStore;
