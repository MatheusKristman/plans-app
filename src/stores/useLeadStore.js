import { create } from "zustand";

const useLeadStore = create((set) => ({
  isLeadDetailBoxOpen: false,
  openLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: true })),
  closeLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: false })),
}));

export default useLeadStore;
