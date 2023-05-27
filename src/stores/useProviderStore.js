import { create } from "zustand";

const useProviderStore = create((set) => ({
  isNewProviderFormOpen: false,
  openNewProviderForm: () => set(() => ({ isNewProviderFormOpen: true })),
  closeNewProviderForm: () => set(() => ({ isNewProviderFormOpen: false })),
}));

export default useProviderStore;
