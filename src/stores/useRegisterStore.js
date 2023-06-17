import { create } from 'zustand';
import { addDays, format } from 'date-fns';

const useRegisterStore = create((set) => ({
  isRegisterFormOpen: false,
  openRegisterForm: () => set(() => ({ isRegisterFormOpen: true })),
  closeRegisterForm: () => set(() => ({ isRegisterFormOpen: false })),
  planSelected: {},
  setPlanSelected: (plan) => set(() => ({ planSelected: plan })),
  steps: {},
  generateSteps: (stps) => set(() => ({ steps: stps })),
  updateStep: (step) =>
    set((state) => {
      const stepsObj = { ...state.steps };

      Object.keys(stepsObj).forEach((stp) =>
        stp === step ? (stepsObj[stp] = true) : (stepsObj[stp] = false)
      );

      return { steps: stepsObj };
    }),
  stepsAnimation: false,
  activateStepsAnimation: () => set(() => ({ stepsAnimation: true })),
  deactivateStepsAnimation: () => set(() => ({ stepsAnimation: false })),
  clientData: {
    name: '',
    rg: '',
    cpf: '',
    dateOfBirth: '',
    motherName: '',
    tel1: '',
    tel2: '',
    state: '',
    city: '',
    cep: '',
    address: '',
    addressNumber: '',
    complement: '',
    paymentDate: '5',
    paymentMethod: 'Boleto',
    bank: '',
    agency: '',
    bankAccount: '',
    accountOwner: '',
    installationDate1: format(addDays(new Date(), 1), 'dd/MM/yyyy'),
    installationDate2: format(addDays(new Date(), 2), 'dd/MM/yyyy'),
    installationPeriod: 'Período manhã (8h às 12h)',
    plan: '',
  },
  setClientData: (option, value) =>
    set((state) => ({ clientData: { ...state.clientData, [option]: value } })),
  stateOptions: [],
  setStateOptions: (state) => set(() => ({ stateOptions: state })),
  cityOptions: [],
  setCityOptions: (city) => set(() => ({ cityOptions: city })),
  firstDate: addDays(new Date(), 1),
  setFirstDate: (date) => set(() => ({ firstDate: date })),
  secondDate: addDays(new Date(), 2),
  setSecondDate: (date) => set(() => ({ secondDate: date })),
  isSubmitting: false,
  setSubmit: () => set(() => ({ isSubmitting: true })),
  unsetSubmit: () => set(() => ({ isSubmitting: false })),
  message: '',
  setMessage: (msg) => set(() => ({ message: msg })),
}));

export default useRegisterStore;
