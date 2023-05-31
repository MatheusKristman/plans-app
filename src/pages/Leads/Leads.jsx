import React from "react";
import useLeadStore from "../../stores/useLeadStore";
import { shallow } from "zustand/shallow";

import DashboardHeader from "../components/DashboardHeader";
import LeadsStatusBox from "./components/LeadsStatusBox";
import LeadBox from "./components/LeadBox";
import LeadDetailsBox from "./components/LeadDetailsBox";

const Leads = () => {
  const { isLeadDetailBoxOpen } = useLeadStore(
    (state) => ({
      isLeadDetailBoxOpen: state.isLeadDetailBoxOpen,
    }),
    shallow
  );

  return (
    <div className="leads-component-container">
      {isLeadDetailBoxOpen && <LeadDetailsBox />}
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
