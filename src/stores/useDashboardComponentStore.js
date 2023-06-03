import { create } from "zustand";

const useDashboardComponentStore = create((set) => ({
  isStatusMenuOpen: false,
  openStatusMenu: () => set(() => ({ isStatusMenuOpen: true })),
  closeStatusMenu: () => set(() => ({ isStatusMenuOpen: false })),
  statusMenuAnimation: false,
  openStatusAnimation: () => set(() => ({ statusMenuAnimation: true })),
  closeStatusAnimation: () => set(() => ({ statusMenuAnimation: false })),
  isInternetFormOpen: false,
  openInternetForm: () => set(() => ({ isInternetFormOpen: true })),
  closeInternetForm: () => set(() => ({ isInternetFormOpen: false })),
  isCelFormOpen: false,
  openCelForm: () => set(() => ({ isCelFormOpen: true })),
  closeCelForm: () => set(() => ({ isCelFormOpen: false })),
  isTVFormOpen: false,
  openTVForm: () => set(() => ({ isTVFormOpen: true })),
  closeTVForm: () => set(() => ({ isTVFormOpen: false })),
  isArchivedPlansVisible: false,
  enablePlansVisibility: () => set(() => ({ isArchivedPlansVisible: true })),
  disablePlansVisibility: () => set(() => ({ isArchivedPlansVisible: false })),
  isArchivedPlansAnimation: false,
  enableArchivedPlansAnimation: () =>
    set(() => ({ isArchivedPlansAnimation: true })),
  disableArchivedPlansAnimation: () =>
    set(() => ({ isArchivedPlansAnimation: false })),
  activePlans: [],
  setActivePlans: (plans) => set(() => ({ activePlans: plans })),
  archivedPlans: [],
  setArchivedPlans: (plans) => set(() => ({ archivedPlans: plans })),
  allProviders: [],
  setAllProviders: (providers) => set(() => ({ allProviders: providers })),
  internetProviderId: "",
  setInternetProviderId: (event) =>
    set(() => ({ internetProviderId: event.target.value })),
  internetTitle: "",
  setInternetTitle: (event) =>
    set(() => ({ internetTitle: event.target.value })),
  internetCost: "",
  setInternetCost: (event) =>
    set(() => {
      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { internetCost: formattedValue };
    }),
  internetInstallationCost: "",
  setInternetInstallationCost: (event) =>
    set(() => {
      if (event.target.checked) {
        return { internetInstallationCost: "Grátis" };
      }

      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { internetInstallationCost: formattedValue };
    }),
  internetDownload: "",
  setInternetDownload: (event) =>
    set(() => ({ internetDownload: event.target.value })),

  internetDownloadUnit: "MB",
  setInternetDownloadUnit: (event) =>
    set(() => ({ internetDownloadUnit: event.target.value })),
  internetUpload: "",
  setInternetUpload: (event) =>
    set(() => ({ internetUpload: event.target.value })),
  internetUploadUnit: "MB",
  setInternetUploadUnit: (event) =>
    set(() => ({ internetUploadUnit: event.target.value })),
  internetFranchiseLimit: "",
  setInternetFranchiseLimit: (event) =>
    set(() => {
      if (event.target.checked) {
        return { internetFranchiseLimit: "Ilimitado" };
      }

      if (event.target.value === "on") {
        return { internetFranchiseLimit: "" };
      }

      return { internetFranchiseLimit: event.target.value };
    }),
  internetTechnology: "Fibra Ótica",
  setInternetTechnology: (event) =>
    set(() => ({ internetTechnology: event.target.value })),
  internetHasWifi: true,
  setInternetHasWifi: (event) =>
    set(() => ({
      internetHasWifi: event.target.value,
    })),
  internetPriority: 1,
  setInternetPriority: (event) =>
    set(() => ({ internetPriority: event.target.value })),
  internetDescription: "",
  setInternetDescription: (event) =>
    set(() => ({ internetDescription: event.target.value })),
  isSubmitting: false,
  setToSubmit: () => set(() => ({ isSubmitting: true })),
  cancelSubmit: () => set(() => ({ isSubmitting: false })),
  internetProviderError: false,
  setInternetProviderError: () => set(() => ({ internetProviderError: true })),
  unsetInternetProviderError: () =>
    set(() => ({ internetProviderError: false })),
  internetResetInputs: () =>
    set(() => ({
      internetProviderId: "",
      internetTitle: "",
      internetCost: "",
      internetInstallationCost: "",
      internetDownload: "",
      internetUpload: "",
      internetFranchiseLimit: "",
      internetTechnology: "Fibra Ótica",
      internetHasWifi: true,
      internetPriority: 1,
      internetDescription: "",
    })),
  celProviderId: "",
  setCelProviderId: (event) =>
    set(() => ({ celProviderId: event.target.value })),
  celTitle: "",
  setCelTitle: (event) => set(() => ({ celTitle: event.target.value })),
  celCost: "",
  setCelCost: (event) =>
    set(() => {
      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { celCost: formattedValue };
    }),
  celFranchise: "",
  setCelFranchise: (event) => set(() => ({ celFranchise: event.target.value })),
  celFranchiseUnit: "MB",
  setCelFranchiseUnit: (event) =>
    set(() => ({ celFranchiseUnit: event.target.value })),
  celUnlimitedCall: true,
  setCelUnlimitedCall: (event) =>
    set(() => ({ celUnlimitedCall: event.target.value })),
  celPlanType: "Controle",
  setCelPlanType: (event) => set(() => ({ celPlanType: event.target.value })),
  celPriority: 1,
  setCelPriority: (event) => set(() => ({ celPriority: event.target.value })),
  celDescription: "",
  setCelDescription: (event) =>
    set(() => ({ celDescription: event.target.value })),
  celProviderError: false,
  setCelProviderError: () => set(() => ({ celProviderError: true })),
  unsetCelProviderError: () => set(() => ({ celProviderError: false })),
  celResetInputs: () =>
    set(() => ({
      celProviderId: "",
      celTitle: "",
      celCost: "",
      celFranchise: "",
      celFranchiseUnit: "MB",
      celUnlimitedCall: true,
      celPlanType: "Controle",
      celPriority: 1,
      celDescription: "",
    })),
  tvProviderId: "",
  setTVProviderId: (event) => set(() => ({ tvProviderId: event.target.value })),
  tvTitle: "",
  setTVTitle: (event) => set(() => ({ tvTitle: event.target.value })),
  tvCost: "",
  setTVCost: (event) =>
    set(() => {
      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { tvCost: formattedValue };
    }),
  tvCostChangesConfirmation: true,
  setTVCostChangesConfirmation: (event) =>
    set(() => ({ tvCostChangesConfirmation: event.target.value })),
  tvAfterCost: "",
  setTVAfterCost: (event) =>
    set(() => {
      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { tvAfterCost: formattedValue };
    }),
  tvPeriodToChangeCost: "",
  setTVPeriodToChangeCost: (event) =>
    set((state) => {
      if (event.target.value.length <= 2) {
        return { tvPeriodToChangeCost: event.target.value };
      }

      return { tvPeriodToChangeCost: state.tvPeriodToChangeCost };
    }),
  tvInstallationCost: "",
  setTVInstallationCost: (event) =>
    set(() => {
      if (event.target.checked) {
        return { tvInstallationCost: "Grátis" };
      }

      const numericValue = event.target.value;

      const cleanedValue = numericValue.replace(/[^0-9.,]/g, "");

      const parts = cleanedValue.split(/[.,]/);
      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      const limitedDecimalPart = decimalPart.slice(0, 2);

      const formattedValue =
        integerPart + (limitedDecimalPart ? "." + limitedDecimalPart : "");

      return { tvInstallationCost: formattedValue };
    }),
  tvDevices: 1,
  setTVDevices: (event) => set(() => ({ tvDevices: event.target.value })),
  tvPriority: 1,
  setTVPriority: (event) => set(() => ({ tvPriority: event.target.value })),
  tvDescription: "",
  setTVDescription: (event) =>
    set(() => ({ tvDescription: event.target.value })),
  tvProviderError: false,
  setTVProviderError: () => set(() => ({ tvProviderError: true })),
  unsetTVProviderError: () => set(() => ({ tvProviderError: false })),
  tvInstallationCostError: false,
  setTVInstallationCostError: () =>
    set(() => ({ tvInstallationCostError: true })),
  unsetTVInstallationCostError: () =>
    set(() => ({ tvInstallationCostError: false })),
  tvResetInputs: () =>
    set(() => ({
      tvProviderId: "",
      tvTitle: "",
      tvCost: "",
      tvCostChangesConfirmation: true,
      tvAfterCost: "",
      tvPeriodToChangeCost: "",
      tvInstallationCost: "",
      tvDevices: 1,
      tvPriority: 1,
      tvDescription: "",
    })),
}));

export default useDashboardComponentStore;
