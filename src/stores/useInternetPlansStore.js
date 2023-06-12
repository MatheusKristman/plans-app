import { create } from 'zustand';

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
  internetPlans: [],
  setInternetPlans: (plans) => set(() => ({ internetPlans: plans })),
  sliceBegin: 0,
  setSliceBegin: (value) => set(() => ({ sliceBegin: value })),
  sliceEnd: 5,
  setSliceEnd: (value) => set(() => ({ sliceEnd: value })),
  filterValues: {
    cep: '',
    cost: 0,
    download: '',
    technology: [],
    provider: [],
  },
  setFilterValues: (option, value) =>
    set((state) => ({ filterValues: { ...state.filterValues, [option]: value } })),
  handleTechnologyFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.technology.includes(value)) {
        const newValue = state.filterValues.technology.filter((tech) => tech !== value);
        return { filterValues: { ...state.filterValues, technology: newValue } };
      }

      const newValue = [...state.filterValues.technology];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, technology: newValue } };
    }),
  handleProviderFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.provider.includes(value)) {
        const newValue = state.filterValues.provider.filter((prov) => prov !== value);
        return { filterValues: { ...state.filterValues, provider: newValue } };
      }

      const newValue = [...state.filterValues.provider];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, provider: newValue } };
    }),
}));

export default useInternetPlansStore;
