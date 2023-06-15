import { create } from "zustand";

const useCelPlansStore = create((set) => ({
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
  celPlans: [],
  setCelPlans: (plans) => set(() => ({ celPlans: plans })),
  filteredCelPlans: [],
  setFilteredCelPlans: (plans) => set(() => ({ filteredCelPlans: plans })),
  sliceBegin: 0,
  setSliceBegin: () => set((state) => ({ sliceBegin: state.sliceBegin + 5 })),
  sliceEnd: 5,
  setSliceEnd: () => set((state) => ({ sliceEnd: state.sliceEnd + 5 })),
  allProviders: [],
  setAllProviders: (prov) => set(() => ({ allProviders: prov })),
  providers: [],
  setProviders: (prov) => set(() => ({ providers: prov })),
  submittingFilter: false,
  setSubmittingFilter: () => set(() => ({ submittingFilter: true })),
  unsetSubmittingFilter: () => set(() => ({ submittingFilter: false })),
  filterValues: {
    cep: "",
    cost: 0,
    franchise: "",
    provider: [],
    planType: [],
  },
  setFilterValues: (option, value) =>
    set((state) => ({
      filterValues: { ...state.filterValues, [option]: value },
    })),
  handlePlanTypeFilterOption: (value) =>
    set((state) => {
      if (state.filterValues.planType.includes(value)) {
        const newValue = state.filterValues.planType.filter(
          (type) => type !== value
        );
        return {
          filterValues: { ...state.filterValues, planType: newValue },
        };
      }

      const newValue = [...state.filterValues.planType];
      newValue.push(value);
      return { filterValues: { ...state.filterValues, planType: newValue } };
    }),
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
  setValidFilterOptions: () =>
    set(() => ({
      validFilterOptions: true,
    })),
  unsetValidFilterOptions: () => set(() => ({ validFilterOptions: false })),
  resetOnLoad: () =>
    set(() => ({
      idActiveToSeeMore: "",
      isFilterOpen: false,
      filteredCelPlans: [],
      sliceBegin: 0,
      sliceEnd: 5,
      submittingFilter: false,
      filterValues: {
        cep: "",
        cost: 0,
        franchise: "",
        provider: [],
        planType: [],
      },
      validFilterOptions: false,
    })),
}));

export default useCelPlansStore;
