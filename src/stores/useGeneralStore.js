import { create } from 'zustand';

const useGeneralStore = create((set) => ({
  modalAnimation: false,
  activateModalAnimation: () => set(() => ({ modalAnimation: true })),
  deactivateModalAnimation: () => set(() => ({ modalAnimation: false })),
}));

export default useGeneralStore;
