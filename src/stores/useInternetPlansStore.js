import { create } from "zustand";

const useInternetPlansStore = create((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set(() => ({ isMobileMenuOpen: true })),
  closeMobileMenu: () => set(() => ({ isMobileMenuOpen: false })),
  idActiveToSeeMore: "",
  handleIdActiveToSeeMore: (id) =>
    set((state) => {
      if (id === state.idActiveToSeeMore) {
        return { idActiveToSeeMore: "" };
      }

      return { idActiveToSeeMore: id };
    }),
  isFilterOpen: false,
  openFilterBox: () => set(() => ({ isFilterOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterOpen: false })),
  internetPlans: [],
  setInternetPlans: (plans) => set(() => ({ internetPlans: plans })),
  filteredInternetPlans: [],
  setFilteredInternetPlans: (plans) =>
    set(() => ({ filteredInternetPlans: plans })),
  sliceBegin: 0,
  setSliceBegin: (value) => set(() => ({ sliceBegin: value })),
  sliceEnd: 5,
  setSliceEnd: (value) => set(() => ({ sliceEnd: value })),
  filterValues: {
    cep: "",
    cost: 0,
    download: "",
    technology: [],
    provider: [],
  },
  setFilterValues: (option, value) =>
    set((state) => ({
      filterValues: { ...state.filterValues, [option]: value },
    })),
  handleTechnologyFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.technology.includes(value)) {
        const newValue = state.filterValues.technology.filter(
          (tech) => tech !== value
        );
        return {
          filterValues: { ...state.filterValues, technology: newValue },
        };
      }

      const newValue = [...state.filterValues.technology];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, technology: newValue } };
    }),
  handleProviderFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.provider.includes(value)) {
        const newValue = state.filterValues.provider.filter(
          (prov) => prov !== value
        );
        return { filterValues: { ...state.filterValues, provider: newValue } };
      }

      const newValue = [...state.filterValues.provider];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, provider: newValue } };
    }),
  allProviders: [],
  setAllProviders: (value) => set(() => ({ allProviders: value })),
  providers: [],
  setProviders: (value) => set(() => ({ providers: value })),
  submittingFilter: false,
  setSubmittingFilter: () => set(() => ({ submittingFilter: true })),
  unsetSubmittingFilter: () => set(() => ({ submittingFilter: false })),
  validFilterOptions: false,
  setValidFilterOptions: () =>
    set(() => ({
      validFilterOptions: true,
    })),
  unsetValidFilterOptions: () => set(() => ({ validFilterOptions: false })),
  resetOnLoad: () =>
    set(() => ({
      idActiveToSeeMore: "",
      isFilterOpen: false,
      filteredInternetPlans: [],
      sliceBegin: 0,
      sliceEnd: 5,
      filterValues: {
        cep: "",
        cost: 0,
        download: "",
        technology: [],
        provider: [],
      },
      submittingFilter: false,
      validFilterOptions: false,
    })),
}));

export default useInternetPlansStore;
