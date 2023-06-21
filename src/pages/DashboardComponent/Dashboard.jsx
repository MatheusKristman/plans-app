import React, { useEffect } from "react";
import useDashboardComponentStore from "../../stores/useDashboardComponentStore";
import useDashboardPageStore from "../../stores/useDashboardPageStore";
import useGeneralStore from "../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";

import DashboardHeader from "../components/DashboardHeader";
import DashboardPlanBox from "./components/DashboardPlanBox";
import DashboardPlanActiveStatus from "./components/DashboardPlanActiveStatus";
import DashboardPlanArchivedStatus from "./components/DashboardPlanArchivedStatus";
import NewCelPlanModal from "./components/NewCelPlanModal";
import NewInternetPlanModal from "./components/NewInternetPlanModal";
import NewTVPlanModal from "./components/NewTVPlanModal";
import Loading from "../components/Loading";

const Dashboard = () => {
  const {
    isInternetFormOpen,
    isCelFormOpen,
    isTVFormOpen,
    isArchivedPlansAnimation,
    isArchivedPlansVisible,
    activePlans,
    setActivePlans,
    archivedPlans,
    setArchivedPlans,
    setAllProviders,
  } = useDashboardComponentStore(
    (state) => ({
      isInternetFormOpen: state.isInternetFormOpen,
      isCelFormOpen: state.isCelFormOpen,
      isTVFormOpen: state.isTVFormOpen,
      isArchivedPlansAnimation: state.isArchivedPlansAnimation,
      isArchivedPlansVisible: state.isArchivedPlansVisible,
      activePlans: state.activePlans,
      setActivePlans: state.setActivePlans,
      archivedPlans: state.archivedPlans,
      setArchivedPlans: state.setArchivedPlans,
      setAllProviders: state.setAllProviders,
    }),
    shallow
  );
  const { searchValue } = useDashboardPageStore(
    (state) => ({
      searchValue: state.searchValue,
    }),
    shallow
  );
  const { isLoading, setLoading, unsetLoading } = useGeneralStore(
    (state) => ({
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      unsetLoading: state.unsetLoading,
    }),
    shallow
  );

  const filteredActivePlans = activePlans.filter((plan) =>
    plan.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredArchivedPlans = archivedPlans.filter((plan) =>
    plan.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setLoading();
    api
      .get("/plan/all-plans/all")
      .then((res) => {
        setActivePlans(res.data.filter((plan) => !plan.archived));
        setArchivedPlans(res.data.filter((plan) => plan.archived));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => unsetLoading());
  }, []);

  useEffect(() => {
    api
      .get("/provider/all")
      .then((res) => {
        setAllProviders(res.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    if (isInternetFormOpen || isCelFormOpen || isTVFormOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isInternetFormOpen, isCelFormOpen]);

  return (
    <div className="dashboard-component-container">
      {isInternetFormOpen && <NewInternetPlanModal />}
      {isCelFormOpen && <NewCelPlanModal />}
      {isTVFormOpen && <NewTVPlanModal />}
      <ToastContainer />
      <div className="dashboard-component-wrapper">
        <DashboardHeader
          pageName="Dashboard"
          searchPlaceholder="Pesquise o nome do plano..."
        />

        <div className="dashboard-component-info">
          <div className="dashboard-component-active-wrapper">
            <h3 className="dashboard-component-mobile-title">Dashboard</h3>
            <DashboardPlanActiveStatus />

            <div className="dashboard-component-plans-wrapper">
              <AnimatePresence>
                {isLoading && (
                  <Loading type="spokes" color="#d40066" key={isLoading} />
                )}
              </AnimatePresence>

              {searchValue.length !== 0 && filteredActivePlans.length === 0 ? (
                <span className="dashboard-component-no-plan-adviser">
                  Nenhum plano encontrado
                </span>
              ) : searchValue.length !== 0 && activePlans.length !== 0 ? (
                filteredActivePlans.map((plan, index) => (
                  <DashboardPlanBox
                    key={`plan-${index}`}
                    providerIconPath={plan.providerIcon}
                    planTitle={plan.title}
                    contactValue={plan.contacts}
                    totalValue={plan.cost * plan.contacts}
                    createdValue={plan.createdAt}
                  />
                ))
              ) : activePlans.length !== 0 ? (
                activePlans.map((plan, index) => (
                  <DashboardPlanBox
                    key={`plan-${index}`}
                    providerIconPath={plan.providerIcon}
                    planTitle={plan.title}
                    contactValue={plan.contacts}
                    totalValue={plan.cost * plan.contacts}
                    createdValue={plan.createdAt}
                  />
                ))
              ) : (
                <span className="dashboard-component-no-plan-adviser">
                  Nenhum plano ativo no momento
                </span>
              )}
            </div>
          </div>

          <div className="dashboard-component-archived-wrapper">
            <DashboardPlanArchivedStatus />

            {isArchivedPlansVisible && (
              <div
                className={
                  isArchivedPlansAnimation
                    ? "dashboard-component-archived-plans-wrapper animate__animated animate__faster animate__fadeIn"
                    : "dashboard-component-archived-plans-wrapper animate__animated animate__faster animate__fadeOut"
                }
              >
                {searchValue.length !== 0 &&
                filteredArchivedPlans.length === 0 ? (
                  <span className="dashboard-component-archived-plans-no-plan-adviser">
                    Nenhum plano encontrado
                  </span>
                ) : searchValue.length !== 0 && archivedPlans.length !== 0 ? (
                  filteredArchivedPlans.map((plan, index) => (
                    <DashboardPlanBox
                      key={`plan-${index}`}
                      providerIconPath={plan.providerIcon}
                      planTitle={plan.title}
                      contactValue={plan.contacts}
                      totalValue={plan.cost * plan.contacts}
                      createdValue={plan.createdAt}
                      archivedValue={plan.archivedAt}
                    />
                  ))
                ) : archivedPlans.length !== 0 ? (
                  archivedPlans.map((plan, index) => (
                    <DashboardPlanBox
                      key={`plan-${index}`}
                      providerIconPath={plan.providerIcon}
                      planTitle={plan.title}
                      contactValue={plan.contacts}
                      totalValue={plan.cost * plan.contacts}
                      createdValue={plan.createdAt}
                      archivedValue={plan.archivedAt}
                    />
                  ))
                ) : (
                  <span className="dashboard-component-archived-plans-no-plan-adviser">
                    Nenhum plano arquivado no momento
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
