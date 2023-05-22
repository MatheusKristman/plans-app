import { create } from "zustand";

const useDashboardPageStore = create((set) => ({
  id: "",
  setId: (value) => set(() => ({ id: value })),
}));

export default useDashboardPageStore;
