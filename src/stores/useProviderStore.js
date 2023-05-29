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
}));

export default useProviderStore;
