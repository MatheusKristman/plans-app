import { create } from "zustand";

const usePlansStore = create((set) => ({
  planCategory: {
    all: true,
    internet: false,
    cel: false,
    tv: false,
  },
  handleCategory: (category) =>
    set((state) => {
      const categories = { ...state.planCategory };

      Object.keys(categories).forEach((cat) =>
        cat === category ? (categories[cat] = true) : (categories[cat] = false)
      );

      return { planCategory: categories };
    }),
  plansFilter: {
    recent: true,
    old: false,
    priorityCrescent: false,
    priorityDecrescent: false,
  },
  handleFilter: (filter) =>
    set((state) => {
      const filters = { ...state.plansFilter };

      Object.keys(filters).forEach((fil) =>
        fil === filter ? (filters[fil] = true) : (filters[fil] = false)
      );

      return { plansFilter: filters };
    }),
  isFilterBoxOpen: false,
  openFilterBox: () => set(() => ({ isFilterBoxOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterBoxOpen: false })),
  isEditInternetFormOpen: false,
  openEditInternetForm: () => set(() => ({ isEditInternetFormOpen: true })),
  closeEditInternetForm: () => set(() => ({ isEditInternetFormOpen: false })),
}));

export default usePlansStore;
