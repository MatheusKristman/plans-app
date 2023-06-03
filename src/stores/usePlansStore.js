import { create } from "zustand";

const usePlansStore = create((set) => ({
  planCategory: {
    all: true,
    internet: false,
    cel: false,
    tv: false,
  },
  handleCategory: (category) =>
    set((state) => {
      const categories = { ...state.planCategory };

      Object.keys(categories).forEach((cat) =>
        cat === category ? (categories[cat] = true) : (categories[cat] = false)
      );

      return { planCategory: categories };
    }),
  plansFilter: {
    recent: true,
    old: false,
    priorityCrescent: false,
    priorityDecrescent: false,
  },
  handleFilter: (filter) =>
    set((state) => {
      const filters = { ...state.plansFilter };

      Object.keys(filters).forEach((fil) =>
        fil === filter ? (filters[fil] = true) : (filters[fil] = false)
      );

      return { plansFilter: filters };
    }),
  isFilterBoxOpen: false,
  openFilterBox: () => set(() => ({ isFilterBoxOpen: true })),
  closeFilterBox: () => set(() => ({ isFilterBoxOpen: false })),
  isEditInternetFormOpen: false,
  openEditInternetForm: () => set(() => ({ isEditInternetFormOpen: true })),
  closeEditInternetForm: () => set(() => ({ isEditInternetFormOpen: false })),
  isEditCelFormOpen: false,
  openEditCelForm: () => set(() => ({ isEditCelFormOpen: true })),
  closeEditCelForm: () => set(() => ({ isEditCelFormOpen: false })),
  isEditTVFormOpen: false,
  openEditTVForm: () => set(() => ({ isEditTVFormOpen: true })),
  closeEditTVForm: () => set(() => ({ isEditTVFormOpen: false })),
  isInternetDetailsBoxOpen: false,
  openInternetDetailsBox: () => set(() => ({ isInternetDetailsBoxOpen: true })),
  closeInternetDetailsBox: () =>
    set(() => ({ isInternetDetailsBoxOpen: false })),
  isCelDetailsBoxOpen: false,
  openCelDetailsBox: () => set(() => ({ isCelDetailsBoxOpen: true })),
  closeCelDetailsBox: () => set(() => ({ isCelDetailsBoxOpen: false })),
  isTVDetailsBoxOpen: false,
  openTVDetailsBox: () => set(() => ({ isTVDetailsBoxOpen: true })),
  closeTVDetailsBox: () => set(() => ({ isTVDetailsBoxOpen: false })),
  isArchivedPlansVisible: false,
  enablePlansVisibility: () => set(() => ({ isArchivedPlansVisible: true })),
  disablePlansVisibility: () => set(() => ({ isArchivedPlansVisible: false })),
  isArchivedPlansAnimation: false,
  enableArchivedPlansAnimation: () =>
    set(() => ({ isArchivedPlansAnimation: true })),
  disableArchivedPlansAnimation: () =>
    set(() => ({ isArchivedPlansAnimation: false })),
  plans: [],
  setPlans: (value) => set(() => ({ plans: value })),
  filteredPlans: [],
  setFilteredPlans: (value) => set(() => ({ filteredPlans: value })),
  internetPlans: [],
  setInternetPlans: (value) => set(() => ({ internetPlans: value })),
  celPlans: [],
  setCelPlans: (value) => set(() => ({ celPlans: value })),
  tvPlans: [],
  setTVPlans: (value) => set(() => ({ tvPlans: value })),
  activePlansSliceValue: 5,
  setActivePlansSliceValue: () =>
    set((state) => ({
      activePlansSliceValue: state.activePlansSliceValue + 5,
    })),
  archivedPlansSliceValue: 5,
  setArchivedPlansSliceValue: () =>
    set((state) => ({
      archivedPlansSliceValue: state.archivedPlansSliceValue + 5,
    })),
  idSelectedForDetails: "",
  setIdSelectedForDetails: (value) =>
    set(() => ({ idSelectedForDetails: value })),
  planSelectedForDetails: {},
  setPlanSelectedForDetails: (value) =>
    set(() => ({ planSelectedForDetails: value })),
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
  defaultValuesForInternetForm: () =>
    set((state) => ({
      internetTitle: state.planSelectedForDetails.title,
      internetCost: state.planSelectedForDetails.cost,
      internetInstallationCost: state.planSelectedForDetails.installationCost,
      internetDownload: state.planSelectedForDetails.download?.substring(
        0,
        state.planSelectedForDetails.download?.length - 2
      ),
      internetDownloadUnit: state.planSelectedForDetails.download?.substring(
        state.planSelectedForDetails.download?.length - 2,
        state.planSelectedForDetails.download?.length
      ),
      internetUpload: state.planSelectedForDetails.upload?.substring(
        0,
        state.planSelectedForDetails.upload?.length - 2
      ),
      internetUploadUnit: state.planSelectedForDetails.upload?.substring(
        state.planSelectedForDetails.upload?.length - 2,
        state.planSelectedForDetails.upload?.length
      ),
      internetFranchiseLimit: state.planSelectedForDetails.franchiseLimit,
      internetTechnology: state.planSelectedForDetails.technology,
      internetHasWifi: state.planSelectedForDetails.hasWifi,
      internetPriority: state.planSelectedForDetails.priority,
      internetDescription: state.planSelectedForDetails.description,
    })),
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
  defaultValuesForCelForm: () =>
    set((state) => ({
      celTitle: state.planSelectedForDetails.title,
      celCost: state.planSelectedForDetails.cost,
      celFranchise: state.planSelectedForDetails.franchise?.substring(
        0,
        state.planSelectedForDetails.franchise?.length - 2
      ),
      celFranchiseUnit: state.planSelectedForDetails.franchise?.substring(
        state.planSelectedForDetails.franchise?.length - 2,
        state.planSelectedForDetails.franchise?.length
      ),
      celUnlimitedCall: state.planSelectedForDetails.unlimitedCall,
      celPlanType: state.planSelectedForDetails.planType,
      celPriority: state.planSelectedForDetails.priority,
      celDescription: state.planSelectedForDetails.description,
    })),
  celResetInputs: () =>
    set(() => ({
      celTitle: "",
      celCost: "",
      celFranchise: "",
      celFranchiseUnit: "MB",
      celUnlimitedCall: true,
      celPlanType: "Controle",
      celPriority: 1,
      celDescription: "",
    })),
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
  defaultValuesForTVForm: () =>
    set((state) => ({
      tvTitle: state.planSelectedForDetails.title,
      tvCost: state.planSelectedForDetails.cost,
      tvCostChangesConfirmation:
        state.planSelectedForDetails.afterCost !== null &&
        state.planSelectedForDetails.periodToChangeCost !== null,
      tvAfterCost: state.planSelectedForDetails.afterCost || "",
      tvPeriodToChangeCost:
        state.planSelectedForDetails.periodToChangeCost || "",
      tvInstallationCost: state.planSelectedForDetails.installationCost,
      tvDevices: state.planSelectedForDetails.devicesQuant,
      tvPriority: state.planSelectedForDetails.priority,
      tvDescription: state.planSelectedForDetails.description,
    })),
  tvInstallationCostError: false,
  setTVInstallationCostError: () =>
    set(() => ({ tvInstallationCostError: true })),
  unsetTVInstallationCostError: () =>
    set(() => ({ tvInstallationCostError: false })),
  tvResetInputs: () =>
    set(() => ({
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

export default usePlansStore;
