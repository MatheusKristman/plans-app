import React, { useEffect } from "react";
import usePlansStore from "../../stores/usePlansStore";
import useGeneralStore from "../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { ToastContainer } from "react-toastify";

import DashboardHeader from "../components/DashboardHeader";
import PlansCategories from "./components/PlansCategories";
import PlansStatusBox from "./components/PlansStatusBox";
import CelPlanBox from "./components/CelPlanBox";
import InternetPlanBox from "./components/InternetPlanBox";
import TVPlanBox from "./components/TVPlanBox";
import PlansArchivedStatusBox from "./components/PlansArchivedStatusBox";
import CelPlansArchivedBox from "./components/CelPlansArchivedBox.jsx";
import InternetPlansArchivedBox from "./components/InternetPlansArchivedBox";
import TVPlansArchivedBox from "./components/TVPlansArchivedBox";
import EditInternetPlanForm from "./components/EditInternetPlanForm";
import EditCelPlanForm from "./components/EditCelPlanForm";
import EditTVPlanForm from "./components/EditTVPlanForm";
import InternetDetailsBox from "./components/InternetDetailsBox";
import CelDetailsBox from "./components/CelDetailsBox";
import TVDetailsBox from "./components/TVDetailsBox";

const Plans = () => {
  const {
    isEditInternetFormOpen,
    isEditCelFormOpen,
    isEditTVFormOpen,
    isInternetDetailsBoxOpen,
    isCelDetailsBoxOpen,
    isTVDetailsBoxOpen,
    isArchivedPlansVisible,
    isArchivedPlansAnimation,
    plans,
    setPlans,
    planCategory,
    internetPlans,
    setInternetPlans,
    celPlans,
    setCelPlans,
    tvPlans,
    setTVPlans,
    plansFilter,
    filteredPlans,
    setFilteredPlans,
    activePlansSliceValue,
    setActivePlansSliceValue,
    archivedPlansSliceValue,
    setArchivedPlansSliceValue,
    idSelectedForDetails,
    setPlanSelectedForDetails,
    planSelectedForDetails,
  } = usePlansStore(
    (state) => ({
      isEditInternetFormOpen: state.isEditInternetFormOpen,
      isEditCelFormOpen: state.isEditCelFormOpen,
      isEditTVFormOpen: state.isEditTVFormOpen,
      isInternetDetailsBoxOpen: state.isInternetDetailsBoxOpen,
      isCelDetailsBoxOpen: state.isCelDetailsBoxOpen,
      isTVDetailsBoxOpen: state.isTVDetailsBoxOpen,
      isArchivedPlansVisible: state.isArchivedPlansVisible,
      isArchivedPlansAnimation: state.isArchivedPlansAnimation,
      plans: state.plans,
      setPlans: state.setPlans,
      planCategory: state.planCategory,
      internetPlans: state.internetPlans,
      setInternetPlans: state.setInternetPlans,
      celPlans: state.celPlans,
      setCelPlans: state.setCelPlans,
      tvPlans: state.tvPlans,
      setTVPlans: state.setTVPlans,
      plansFilter: state.plansFilter,
      filteredPlans: state.filteredPlans,
      setFilteredPlans: state.setFilteredPlans,
      activePlansSliceValue: state.activePlansSliceValue,
      setActivePlansSliceValue: state.setActivePlansSliceValue,
      archivedPlansSliceValue: state.archivedPlansSliceValue,
      setArchivedPlansSliceValue: state.setArchivedPlansSliceValue,
      idSelectedForDetails: state.idSelectedForDetails,
      setPlanSelectedForDetails: state.setPlanSelectedForDetails,
      planSelectedForDetails: state.planSelectedForDetails,
    }),
    shallow
  );
  const { modalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
    }),
    shallow
  );

  useEffect(() => {
    api
      .get("/plan/internet-plan/all")
      .then((res) => setInternetPlans(res.data))
      .catch((error) => console.error(error.message));

    api
      .get("/plan/cel-plan/all")
      .then((res) => setCelPlans(res.data))
      .catch((error) => console.error(error.message));

    api
      .get("/plan/tv-plan/all")
      .then((res) => setTVPlans(res.data))
      .catch((error) => console.error(error.message));

    console.log("plansRefreshed");
  }, [isEditInternetFormOpen, isEditCelFormOpen, isEditTVFormOpen]);

  useEffect(() => {
    if (planCategory.all) {
      setPlans([...internetPlans, ...celPlans, ...tvPlans]);
    }

    if (planCategory.internet) {
      setPlans([...internetPlans]);
    }

    if (planCategory.cel) {
      setPlans([...celPlans]);
    }

    if (planCategory.tv) {
      setPlans([...tvPlans]);
    }
  }, [planCategory, internetPlans, celPlans, tvPlans]);

  useEffect(() => {
    const applyPlansFilter = () => {
      if (plansFilter.recent) {
        let filteredPlans = [...plans];

        filteredPlans = filteredPlans.sort((a, b) => {
          a = a.createdAt.split("/").reverse().join("");
          b = b.createdAt.split("/").reverse().join("");

          return a < b ? 1 : a > b ? -1 : 0;
        });

        setFilteredPlans(filteredPlans);
      }

      if (plansFilter.old) {
        let filteredPlans = [...plans];

        filteredPlans = filteredPlans.sort((a, b) => {
          a = a.createdAt.split("/").reverse().join("");
          b = b.createdAt.split("/").reverse().join("");

          return a > b ? 1 : a < b ? -1 : 0;
        });

        setFilteredPlans(filteredPlans);
      }

      if (plansFilter.priorityCrescent) {
        let filteredPlans = [...plans];

        filteredPlans = filteredPlans.sort((a, b) => a.priority - b.priority);

        setFilteredPlans(filteredPlans);
      }

      if (plansFilter.priorityDecrescent) {
        let filteredPlans = [...plans];

        filteredPlans = filteredPlans.sort((a, b) => b.priority - a.priority);

        setFilteredPlans(filteredPlans);
      }
    };

    applyPlansFilter();

    console.log(plansFilter);
    console.log(plans);
  }, [plansFilter, plans]);

  useEffect(() => {
    if (idSelectedForDetails) {
      const planSelected = filteredPlans.filter(
        (plan) => plan._id === idSelectedForDetails
      );

      setPlanSelectedForDetails(planSelected[0]);
    }
  }, [idSelectedForDetails]);

  useEffect(() => {
    console.log(planSelectedForDetails);
  }, [planSelectedForDetails]);

  return (
    <div className="plans-component-container">
      {isEditInternetFormOpen && <EditInternetPlanForm />}
      {isEditCelFormOpen && <EditCelPlanForm />}
      {isEditTVFormOpen && <EditTVPlanForm />}
      {isInternetDetailsBoxOpen && <InternetDetailsBox />}
      {isCelDetailsBoxOpen && <CelDetailsBox />}
      {isTVDetailsBoxOpen && <TVDetailsBox />}
      <ToastContainer />

      <div className="plans-component-wrapper">
        <DashboardHeader
          pageName="Planos"
          searchPlaceholder="Pesquise o nome do plano..."
        />

        <div className="plans-component-info">
          <h3 className="plans-component-mobile-title">Planos</h3>
          <PlansCategories />

          <div className="plans-component-active-plans">
            <PlansStatusBox />

            <div className="plans-component-plans-wrapper">
              {filteredPlans.filter((plan) => !plan.archived).length !== 0 ? (
                filteredPlans
                  .filter((plan) => !plan.archived)
                  .slice(0, activePlansSliceValue)
                  .map((plan, index) =>
                    plan.category === "Internet" ? (
                      <InternetPlanBox
                        key={`internet-plan-${index}`}
                        providerIcon={plan.providerIcon}
                        title={plan.title}
                        cost={plan.cost}
                        installationCost={plan.installationCost}
                        benefits={plan.benefits}
                        contacts={plan.contacts}
                        createdAt={plan.createdAt}
                        description={plan.description}
                        download={plan.download}
                        franchiseLimit={plan.franchiseLimit}
                        hasWifi={plan.hasWifi}
                        priority={plan.priority}
                        technology={plan.technology}
                        upload={plan.upload}
                        planId={plan._id}
                        category={plan.category}
                      />
                    ) : plan.category === "Cel" ? (
                      <CelPlanBox
                        key={`cel-plan-${index}`}
                        contacts={plan.contacts}
                        cost={plan.cost}
                        createdAt={plan.createdAt}
                        description={plan.description}
                        franchise={plan.franchise}
                        planType={plan.planType}
                        priority={plan.priority}
                        providerIcon={plan.providerIcon}
                        title={plan.title}
                        unlimitedApps={plan.unlimitedApps}
                        unlimitedCall={plan.unlimitedCall}
                        planId={plan._id}
                        category={plan.category}
                      />
                    ) : plan.category === "TV" ? (
                      <TVPlanBox
                        key={`tv-plan-${index}`}
                        afterCost={plan.afterCost}
                        benefits={plan.benefits}
                        category={plan.category}
                        cost={plan.cost}
                        createdAt={plan.createdAt}
                        description={plan.description}
                        devicesQuant={plan.devicesQuant}
                        installationCost={plan.installationCost}
                        periodToChangeCost={plan.periodToChangeCost}
                        priority={plan.priority}
                        providerIcon={plan.providerIcon}
                        title={plan.title}
                        planId={plan._id}
                        contacts={plan.contacts}
                      />
                    ) : null
                  )
              ) : (
                <span className="plans-component-no-plan-adviser">
                  Nenhum plano ativo no momento
                </span>
              )}
              {filteredPlans.filter((plan) => !plan.archived).length >=
                activePlansSliceValue &&
                filteredPlans.filter((plan) => !plan.archived).length !== 0 && (
                  <button
                    type="button"
                    onClick={setActivePlansSliceValue}
                    className="plans-component-active-show-more-button"
                  >
                    Mais Planos
                  </button>
                )}
            </div>
          </div>

          <div className="plans-component-archived-plans">
            <PlansArchivedStatusBox />

            {isArchivedPlansVisible && (
              <div
                className={
                  isArchivedPlansAnimation
                    ? "plans-component-archived-plans-wrapper animate__animated animate__faster animate__fadeIn"
                    : "plans-component-archived-plans-wrapper animate__animated animate__faster animate__fadeOut"
                }
              >
                {filteredPlans.filter((plan) => plan.archived).length !== 0 ? (
                  filteredPlans
                    .filter((plan) => plan.archived)
                    .slice(0, archivedPlansSliceValue)
                    .map((plan, index) =>
                      plan.category === "Internet" ? (
                        <InternetPlansArchivedBox
                          key={`internet-plan-${index}`}
                          providerIcon={plan.providerIcon}
                          title={plan.title}
                          cost={plan.cost}
                          installationCost={plan.installationCost}
                          benefits={plan.benefits}
                          contacts={plan.contacts}
                          createdAt={plan.createdAt}
                          description={plan.description}
                          download={plan.download}
                          franchiseLimit={plan.franchiseLimit}
                          hasWifi={plan.hasWifi}
                          priority={plan.priority}
                          technology={plan.technology}
                          upload={plan.upload}
                          planId={plan._id}
                          category={plan.category}
                          archivedAt={plan.archivedAt}
                        />
                      ) : plan.category === "Cel" ? (
                        <CelPlansArchivedBox
                          key={`cel-plan-${index}`}
                          contacts={plan.contacts}
                          cost={plan.cost}
                          createdAt={plan.createdAt}
                          description={plan.description}
                          franchise={plan.franchise}
                          planType={plan.planType}
                          priority={plan.priority}
                          providerIcon={plan.providerIcon}
                          title={plan.title}
                          unlimitedApps={plan.unlimitedApps}
                          unlimitedCall={plan.unlimitedCall}
                          planId={plan._id}
                          category={plan.category}
                          archivedAt={plan.archivedAt}
                        />
                      ) : plan.category === "TV" ? (
                        <TVPlansArchivedBox
                          key={`tv-plan-${index}`}
                          afterCost={plan.afterCost}
                          benefits={plan.benefits}
                          category={plan.category}
                          cost={plan.cost}
                          createdAt={plan.createdAt}
                          description={plan.description}
                          devicesQuant={plan.devicesQuant}
                          installationCost={plan.installationCost}
                          periodToChangeCost={plan.periodToChangeCost}
                          priority={plan.priority}
                          providerIcon={plan.providerIcon}
                          title={plan.title}
                          planId={plan._id}
                          contacts={plan.contacts}
                          archivedAt={plan.archivedAt}
                        />
                      ) : null
                    )
                ) : (
                  <span className="plans-component-archived-plans-no-plan-adviser">
                    Nenhum plano arquivado no momento
                  </span>
                )}
                {filteredPlans.filter((plan) => plan.archived).length >=
                  archivedPlansSliceValue &&
                  filteredPlans.filter((plan) => plan.archived).length !==
                    0 && (
                    <button
                      type="button"
                      onClick={setArchivedPlansSliceValue}
                      className="plans-component-archived-show-more-button"
                    >
                      Mais Planos
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
