import React from "react";
import usePlansStore from "../../stores/usePlansStore";
import { shallow } from "zustand/shallow";

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

const Plans = () => {
  const { isEditInternetFormOpen } = usePlansStore(
    (state) => ({
      isEditInternetFormOpen: state.isEditInternetFormOpen,
    }),
    shallow
  );

  return (
    <div className="plans-component-container">
      {isEditInternetFormOpen && <EditInternetPlanForm />}

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
              <CelPlanBox />
              <InternetPlanBox />
              <TVPlanBox />
            </div>
          </div>

          <div className="plans-component-archived-plans">
            <PlansArchivedStatusBox />

            <div className="plans-component-archived-plans-wrapper">
              <CelPlansArchivedBox />
              <InternetPlansArchivedBox />
              <TVPlansArchivedBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
