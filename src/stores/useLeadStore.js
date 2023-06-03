import { create } from 'zustand';

const useLeadStore = create((set) => ({
  isLeadDetailBoxOpen: false,
  openLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: true })),
  closeLeadDetailBox: () => set(() => ({ isLeadDetailBoxOpen: false })),
  clientsPF: [],
  setClientsPF: (value) => set(() => ({ clientsPF: value })),
  plans: [],
  setPlans: (value) => set(() => ({ plans: value })),
  idSelectedForDetails: '',
  setIdSelectedForDetails: (id) => set(() => ({ idSelectedForDetails: id })),
  clientSelectedForDetails: {},
  setClientSelectedForDetails: (client) => set(() => ({ clientSelectedForDetails: client })),
}));

export default useLeadStore;
