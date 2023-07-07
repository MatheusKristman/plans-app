import { create } from "zustand";

const useAlternativeHomeStore = create((set) => ({
  isMobileNavOpen: false,
  openMobileNav: () => set(() => ({ isMobileNavOpen: true })),
  closeMobileNav: () => set(() => ({ isMobileNavOpen: false })),
  answers: {
    answer1: false,
    answer2: false,
    answer3: false,
  },
  setAnswers: (value) =>
    set((state) => {
      const answersArr = { ...state.answers };

      if (answersArr[value]) {
        answersArr[value] = false;
        return { answers: answersArr };
      }

      Object.keys(answersArr).forEach((answer) =>
        answer === value ? (answersArr[answer] = true) : (answersArr[answer] = false)
      );

      return { answers: answersArr };
    }),
  isFormBoxOpen: false,
  openFormBox: () => set(() => ({ isFormBoxOpen: true })),
  closeFormBox: () => set(() => ({ isFormBoxOpen: false })),
}));

export default useAlternativeHomeStore;
