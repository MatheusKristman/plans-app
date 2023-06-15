import { create } from 'zustand';

const useRegisterStore = create((set) => ({
  isRegisterFormOpen: true, // false default
  openRegisterForm: () => set(() => ({ isRegisterFormOpen: true })),
  closeRegisterForm: () => set(() => ({ isRegisterFormOpen: false })),
}));

export default useRegisterStore;
