import { create } from "zustand";

const useLeadStore = create((set) => ({
  isLeadDetailBoxOpen: false,
  openLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: true })),
  closeLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: false })),
  clientsPF: [],
  setClientsPF: (value) => set(() => ({ clientsPF: value })),
  plans: [],
  setPlans: (value) => set(() => ({ plans: value })),
  idSelectedForDetails: "",
  setIdSelectedForDetails: (id) => set(() => ({ idSelectedForDetails: id })),
  clientSelectedForDetails: {},
  setClientSelectedForDetails: (client) =>
    set(() => ({ clientSelectedForDetails: client })),
  sliceEnd: 5,
  setSliceEnd: () => set((state) => ({ sliceEnd: state.sliceEnd + 5 })),
  resetSlice: () => set(() => ({ sliceEnd: 5 })),
}));

export default useLeadStore;
