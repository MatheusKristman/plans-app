import { create } from "zustand";

const useTVPlansStore = create((set) => ({
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
  tvPlans: [],
  setTvPlans: (plans) => set(() => ({ tvPlans: plans })),
  filteredTvPlans: [],
  setFilteredTvPlans: (plans) => set(() => ({ filteredTvPlans: plans })),
  sliceBegin: 0,
  setSliceBegin: (value) => set(() => ({ sliceBegin: value })),
  sliceEnd: 5,
  setSliceEnd: (value) => set(() => ({ sliceEnd: value })),
  allProviders: [],
  setAllProviders: (prov) => set(() => ({ allProviders: prov })),
  providers: [],
  setProviders: (prov) => set(() => ({ providers: prov })),
  submittingFilter: false,
  setSubmittingFilter: () => set(() => ({ submittingFilter: true })),
  unsetSubmittingFilter: () => set(() => ({ submittingFilter: false })),
  filterValues: {
    cep: "",
    provider: [],
    cost: 0,
    devicesQuant: 0,
  },
  setFilterValues: (option, value) =>
    set((state) => ({
      filterValues: { ...state.filterValues, [option]: value },
    })),
  handleProviderFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.provider.includes(value)) {
        const newValue = state.filterValues.provider.filter(
          (prov) => prov !== value
        );
        return {
          filterValues: { ...state.filterValues, provider: newValue },
        };
      }

      const newValue = [...state.filterValues.provider];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, provider: newValue } };
    }),
  validFilterOptions: false,
  setValidFilterOptions: () => set(() => ({ validFilterOptions: true })),
  unsetValidFilterOptions: () => set(() => ({ validFilterOptions: false })),
  resetOnLoad: () =>
    set(() => ({
      idActiveToSeeMore: "",
      isFilterOpen: false,
      filteredTvPlans: [],
      sliceBegin: 0,
      sliceEnd: 5,
      submittingFilter: false,
      filterValues: {
        cep: "",
        provider: [],
        cost: 0,
        devicesQuant: 0,
      },
      validFilterOptions: false,
    })),
}));

export default useTVPlansStore;
