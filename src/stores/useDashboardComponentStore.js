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

      return { internetFranchiseLimit: event.target.value };
    }),
  internetTechnology: "Fibra Ótica",
  setInternetTechnology: (event) =>
    set(() => ({ internetTechnology: event.target.value })),
  internetHasWifi: false,
  setInternetHasWifi: (event) =>
    set(() => ({
      internetHasWifi: event.target.value,
    })),
  internetBenefits: [],
  setInternetBenefits: (value) =>
    set((state) => {
      let benefits = [...state.internetBenefits];

      if (benefits.includes(value)) {
        benefits = benefits.filter((benefit) => benefit !== value);

        return { internetBenefits: benefits };
      }

      benefits.push(value);

      return { internetBenefits: benefits };
    }),
  internetPriority: 1,
  setInternetPriority: (event) =>
    set(() => ({ internetPriority: event.target.value })),
  internetDescription: "",
  setInternetDescription: (event) =>
    set(() => ({ internetDescription: event.target.value })),
}));

export default useDashboardComponentStore;
