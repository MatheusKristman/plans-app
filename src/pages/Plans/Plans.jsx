import React from "react";

import DashboardHeader from "../components/DashboardHeader";
import PlansCategories from "./components/PlansCategories";
import PlansStatusBox from "./components/PlansStatusBox";
import PlanBox from "./components/PlanBox";
import PlansArchivedStatusBox from "./components/PlansArchivedStatusBox";
import PlansArchivedBox from "./components/PlansArchivedBox.jsx";

const Plans = () => {
  return (
    <div className="plans-component-container">
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
              <PlanBox />
            </div>
          </div>

          <div className="plans-component-archived-plans">
            <PlansArchivedStatusBox />

            <div className="plans-component-archived-plans-wrapper">
              <PlansArchivedBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
