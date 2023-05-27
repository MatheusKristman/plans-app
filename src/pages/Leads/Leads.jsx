import React from "react";

import DashboardHeader from "../components/DashboardHeader";
import LeadsStatusBox from "./components/LeadsStatusBox";
import LeadBox from "./components/LeadBox";

const Leads = () => {
  return (
    <div className="leads-component-container">
      <div className="leads-component-wrapper">
        <DashboardHeader
          pageName="Clientes"
          searchPlaceholder="Pesquise o nome do cliente..."
        />

        <div className="leads-component-info">
          <LeadsStatusBox />

          <div className="leads-component-leads-wrapper">
            <LeadBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
