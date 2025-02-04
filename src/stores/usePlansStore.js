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
        cat === category ? (categories[cat] = true) : (categories[cat] = false),
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
        fil === filter ? (filters[fil] = true) : (filters[fil] = false),
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
  resetSliceValues: () =>
    set(() => ({ activePlansSliceValue: 5, archivedPlansSliceValue: 5 })),
  idSelectedForDetails: "",
  setIdSelectedForDetails: (value) =>
    set(() => ({ idSelectedForDetails: value })),
  planSelectedForDetails: {},
  setPlanSelectedForDetails: (value) =>
    set(() => ({ planSelectedForDetails: value })),
  idSelectedForEdit: "",
  setIdSelectedForEdit: (value) => set(() => ({ idSelectedForEdit: value })),
  planSelectedForEdit: {},
  setPlanSelectedForEdit: (plan) => set(() => ({ planSelectedForEdit: plan })),
  internetTitle: "",
  setInternetTitle: (event) =>
    set(() => ({ internetTitle: event.target.value })),
  internetCost: "",
  setInternetCost: (event) =>
    set(() => {
      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { internetCost: value };
    }),
  internetInstallationCost: "",
  setInternetInstallationCost: (event) =>
    set(() => {
      if (event.target.checked) {
        return { internetInstallationCost: "Grátis" };
      }

      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { internetInstallationCost: value };
    }),
  internetDownload: "",
  setInternetDownload: (event) =>
    set(() => {
      let value = event.target.value.replace(/[^\d]/g, "");

      value = value.replace(/^0+(?=\d)/, "");

      return { internetDownload: value };
    }),

  internetDownloadUnit: "MB",
  setInternetDownloadUnit: (event) =>
    set(() => ({ internetDownloadUnit: event.target.value })),
  internetUpload: "",
  setInternetUpload: (event) =>
    set(() => {
      let value = event.target.value.replace(/[^\d]/g, "");

      value = value.replace(/^0+(?=\d)/, "");

      return { internetUpload: value };
    }),
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
      internetHasWifi: event.target.value === "true",
    })),
  internetPriority: 1,
  setInternetPriority: (event) =>
    set(() => ({ internetPriority: Number(event.target.value) })),
  internetDescription: "",
  setInternetDescription: (event) =>
    set(() => ({ internetDescription: event.target.value })),
  internetInstallationCostError: false,
  setInternetInstallationCostError: () =>
    set(() => ({ internetInstallationCostError: true })),
  unsetInternetInstallationCostError: () =>
    set(() => ({ internetInstallationCostError: false })),
  internetFranchiseLimitError: false,
  setInternetFranchiseLimitError: () =>
    set(() => ({ internetFranchiseLimitError: true })),
  unsetInternetFranchiseLimitError: () =>
    set(() => ({ internetFranchiseLimitError: false })),
  isSubmitting: false,
  setToSubmit: () => set(() => ({ isSubmitting: true })),
  cancelSubmit: () => set(() => ({ isSubmitting: false })),
  defaultValuesForInternetForm: () =>
    set((state) => ({
      internetTitle: state.planSelectedForEdit.title,
      internetCost: state.planSelectedForEdit.cost
        ?.toFixed(2)
        ?.replace(".", ","),
      internetInstallationCost: state.planSelectedForEdit.installationCost,
      internetDownload: state.planSelectedForEdit.download?.substring(
        0,
        state.planSelectedForEdit.download?.length - 2,
      ),
      internetDownloadUnit: state.planSelectedForEdit.download?.substring(
        state.planSelectedForEdit.download?.length - 2,
        state.planSelectedForEdit.download?.length,
      ),
      internetUpload: state.planSelectedForEdit.upload?.substring(
        0,
        state.planSelectedForEdit.upload?.length - 2,
      ),
      internetUploadUnit: state.planSelectedForEdit.upload?.substring(
        state.planSelectedForEdit.upload?.length - 2,
        state.planSelectedForEdit.upload?.length,
      ),
      internetFranchiseLimit: state.planSelectedForEdit.franchiseLimit,
      internetTechnology: state.planSelectedForEdit.technology,
      internetHasWifi: state.planSelectedForEdit.hasWifi,
      internetPriority: state.planSelectedForEdit.priority,
      internetDescription: state.planSelectedForEdit.description?.join("\n"),
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
      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { celCost: value };
    }),
  celFranchise: "",
  setCelFranchise: (event) =>
    set(() => {
      let value = event.target.value.replace(/[^\d]/g, "");

      value = value.replace(/^0+(?=\d)/, "");

      return { celFranchise: value };
    }),
  celFranchiseUnit: "MB",
  setCelFranchiseUnit: (event) =>
    set(() => ({ celFranchiseUnit: event.target.value })),
  celUnlimitedCall: true,
  setCelUnlimitedCall: (event) =>
    set(() => ({ celUnlimitedCall: event.target.value === "true" })),
  celPlanType: "Controle",
  setCelPlanType: (event) => set(() => ({ celPlanType: event.target.value })),
  celPriority: 1,
  setCelPriority: (event) =>
    set(() => ({ celPriority: Number(event.target.value) })),
  celDescription: "",
  setCelDescription: (event) =>
    set(() => ({ celDescription: event.target.value })),
  defaultValuesForCelForm: () =>
    set((state) => ({
      celTitle: state.planSelectedForEdit.title,
      celCost: state.planSelectedForEdit.cost?.toFixed(2)?.replace(".", ","),
      celFranchise: state.planSelectedForEdit.franchise?.substring(
        0,
        state.planSelectedForEdit.franchise?.length - 2,
      ),
      celFranchiseUnit: state.planSelectedForEdit.franchise?.substring(
        state.planSelectedForEdit.franchise?.length - 2,
        state.planSelectedForEdit.franchise?.length,
      ),
      celUnlimitedCall: state.planSelectedForEdit.unlimitedCall,
      celPlanType: state.planSelectedForEdit.planType,
      celPriority: state.planSelectedForEdit.priority,
      celDescription: state.planSelectedForEdit.description?.join("\n"),
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
      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { tvCost: value };
    }),
  tvCostChangesConfirmation: true,
  setTVCostChangesConfirmation: (event) =>
    set(() => ({ tvCostChangesConfirmation: event.target.value === "true" })),
  tvAfterCost: "",
  setTVAfterCost: (event) =>
    set(() => {
      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { tvAfterCost: value };
    }),
  tvPeriodToChangeCost: "",
  setTVPeriodToChangeCost: (event) =>
    set((state) => {
      if (event.target.value.length <= 2) {
        if (Number(event.target.value) > 12) {
          return { tvPeriodToChangeCost: "12" };
        }

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

      let value = event.target.value.replace(/[^\d,]/g, "");

      value = value.replace(/^0+(?=\d)/, "");
      value = value.replace(".", ",");
      value = value.replace(/\./g, "");
      value = value.replace(/,(?=.*?,)/g, "");

      const parts = value.split(",");

      if (parts.length > 1) {
        value = parts[0] + "," + parts[1].slice(0, 2);
      }

      return { tvInstallationCost: value };
    }),
  tvDevices: 1,
  setTVDevices: (event) =>
    set(() => ({ tvDevices: Number(event.target.value) })),
  tvPriority: 1,
  setTVPriority: (event) =>
    set(() => ({ tvPriority: Number(event.target.value) })),
  tvDescription: "",
  setTVDescription: (event) =>
    set(() => ({ tvDescription: event.target.value })),
  defaultValuesForTVForm: () =>
    set((state) => ({
      tvTitle: state.planSelectedForEdit.title,
      tvCost: state.planSelectedForEdit.cost?.toFixed(2)?.replace(".", ","),
      tvCostChangesConfirmation:
        state.planSelectedForEdit.afterCost !== null &&
        state.planSelectedForEdit.periodToChangeCost !== null,
      tvAfterCost:
        state.planSelectedForEdit.afterCost?.toFixed(2)?.replace(".", ",") ||
        "",
      tvPeriodToChangeCost: state.planSelectedForEdit.periodToChangeCost || "",
      tvInstallationCost: state.planSelectedForEdit.installationCost,
      tvDevices: state.planSelectedForEdit.devicesQuant,
      tvPriority: state.planSelectedForEdit.priority,
      tvDescription: state.planSelectedForEdit.description?.join("\n"),
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
