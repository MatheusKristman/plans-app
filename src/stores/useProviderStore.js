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
  providerData: {
    providerLogo: null,
    providerName: "",
    ceps: [],
  },
  setProviderData: (value, property) =>
    set((state) => ({
      providerData: { ...state.providerData, [property]: value },
    })),
  resetProviderData: () =>
    set((state) => ({
      providerData: { providerLogo: null, providerName: "", ceps: [] },
    })),
  actualProviderLogo: "",
  setActualProviderLogo: (url) => set(() => ({ actualProviderLogo: url })),
  cepError: "",
  setCepError: (value) => set(() => ({ cepError: value })),
  logoError: "",
  setLogoError: (value) => set(() => ({ logoError: value })),
  providerNameError: "",
  setProviderNameError: (value) => set(() => ({ providerNameError: value })),
  submitting: false,
  setSubmit: () => set(() => ({ submitting: true })),
  unsetSubmit: () => set(() => ({ submitting: false })),
  isLoading: false,
  setLoading: () => set(() => ({ isLoading: true })),
  unsetLoading: () => set(() => ({ isLoading: false })),
}));

export default useProviderStore;
