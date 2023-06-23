import { create } from 'zustand';

const useGeneralStore = create((set) => ({
  modalAnimation: false,
  activateModalAnimation: () => set(() => ({ modalAnimation: true })),
  deactivateModalAnimation: () => set(() => ({ modalAnimation: false })),
  benefits: [],
  setBenefits: (value) =>
    set((state) => {
      let benefits = [...state.benefits];

      if (benefits.includes(value)) {
        benefits = benefits.filter((benefit) => benefit !== value);

        return { benefits: benefits };
      }

      benefits.push(value);

      return { benefits: benefits };
    }),
  resetBenefits: () => set(() => ({ benefits: [] })),
  defaultBenefits: (value) => set(() => ({ benefits: value })),
  isLoading: false,
  setLoading: () => set(() => ({ isLoading: true })),
  unsetLoading: () => set(() => ({ isLoading: false })),
}));

export default useGeneralStore;
