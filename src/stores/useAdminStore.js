import { create } from "zustand";

const useAdminStore = create((set) => ({
  email: "",
  setEmail: (e) => set(() => ({ email: e.target.value })),
  password: "",
  setPassword: (e) => set(() => ({ password: e.target.value })),
  isEmailSelected: false,
  emailFocused: () => set(() => ({ isEmailSelected: true })),
  emailBlurred: () => set(() => ({ isEmailSelected: false })),
  isEmailFilled: false,
  handleEmailFilled: () =>
    set((state) => {
      if (state.email) {
        return { isEmailFilled: true };
      }

      return { isEmailFilled: false };
    }),
  isPasswordSelected: false,
  passwordFocused: () => set(() => ({ isPasswordSelected: true })),
  passwordBlurred: () => set(() => ({ isPasswordSelected: false })),
  isPasswordFilled: false,
  handlePasswordFilled: () =>
    set((state) => {
      if (state.password) {
        return { isPasswordFilled: true };
      }

      return { isPasswordFilled: false };
    }),
  passwordViewType: "password",
  togglePasswordViewType: () =>
    set((state) => {
      if (state.passwordViewType === "password") {
        return { passwordViewType: "text" };
      }

      return { passwordViewType: "password" };
    }),
  submitting: false,
  isSubmitting: () => set(() => ({ submitting: true })),
  isNotSubmitting: () => set(() => ({ submitting: false })),
  reset: () =>
    set(() => ({
      email: "",
      password: "",
      isEmailSelected: false,
      isEmailFilled: false,
      isPasswordSelected: false,
      isPasswordFilled: false,
      passwordViewType: "password",
      submitting: false,
    })),
}));

export default useAdminStore;
