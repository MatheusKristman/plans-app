import { create } from "zustand";

const useGeneralStore = create((set) => ({
  modalAnimation: false,
  activateModalAnimation: () => set(() => ({ modalAnimation: true })),
  desactivateModalAnimation: () => set(() => ({ modalAnimation: false })),
}));

export default useGeneralStore;
