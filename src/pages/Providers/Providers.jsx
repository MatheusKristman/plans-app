import React from "react";
import useProviderStore from "../../stores/useProviderStore";
import { shallow } from "zustand/shallow";

import DashboardHeader from "../components/DashboardHeader";
import ProvidersStatusBox from "./components/ProvidersStatusBox";
import ProviderBox from "./components/ProviderBox";
import NewProviderForm from "./components/NewProviderForm";

const Providers = () => {
  const { isNewProviderFormOpen } = useProviderStore(
    (state) => ({
      isNewProviderFormOpen: state.isNewProviderFormOpen,
    }),
    shallow
  );

  return (
    <div className="providers-component-container">
      {isNewProviderFormOpen && <NewProviderForm />}
      <div className="providers-component-wrapper">
        <DashboardHeader
          pageName="Operadoras"
          searchPlaceholder="Pesquise o nome da operadora..."
        />

        <div className="providers-component-info">
          <ProvidersStatusBox />

          <div className="providers-component-providers-wrapper">
            <ProviderBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
