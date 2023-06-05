import { create } from 'zustand';

const useHomeStore = create((set) => ({
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
  mousePos: {},
  setMousePos: (obj) => set(() => ({ mousePos: obj })),
  isFilterBoxOpen: false,
  openFilterBox: () => set(() => ({ isFilterBoxOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterBoxOpen: false })),
  isProviderQuestionRendered: false,
  setProviderQuestionRendered: () => set(() => ({ isProviderQuestionRendered: true })),
  unsetProviderQuestionRendered: () => set(() => ({ isProviderQuestionRendered: false })),
  isProviderAnimation: false,
  setProviderAnimation: () => set(() => ({ isProviderAnimation: true })),
  unsetProviderAnimation: () => set(() => ({ isProviderAnimation: false })),
  providerValue: 'banda-larga',
  setProviderValue: (event) => set(() => ({ providerValue: event.target.value })),
  resetProviderValue: () => set(() => ({ providerValue: 'banda-larga' })),
  isCepQuestionRendered: false,
  setCepQuestionRendered: () => set(() => ({ isCepQuestionRendered: true })),
  unsetCepQuestionRendered: () => set(() => ({ isCepQuestionRendered: false })),
  isCepAnimation: false,
  setCepAnimation: () => set(() => ({ isCepAnimation: true })),
  unsetCepAnimation: () => set(() => ({ isCepAnimation: false })),
  cepValue: '',
  setCepValue: (event) =>
    set(() => {
      let cep = event.target.value.replace(/\D/g, '');

      if (cep.length === 8) {
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
      }

      return { cepValue: cep };
    }),
  resetCepValue: () => set(() => ({ cepValue: '' })),
  footerMessage: '',
  setFooterMessage: (event) => set(() => ({ footerMessage: event.target.value })),
}));

export default useHomeStore;
