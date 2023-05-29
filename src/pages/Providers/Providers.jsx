import React, { useEffect } from "react";
import useProviderStore from "../../stores/useProviderStore";
import { shallow } from "zustand/shallow";

import DashboardHeader from "../components/DashboardHeader";
import ProvidersStatusBox from "./components/ProvidersStatusBox";
import ProviderBox from "./components/ProviderBox";
import NewProviderForm from "./components/NewProviderForm";
import ProviderDetailsBox from "./components/ProviderDetailsBox";
import EditProviderForm from "./components/EditProviderForm";

const Providers = () => {
  const { isNewProviderFormOpen, isDetailsBoxOpen, isEditProviderFormOpen } =
    useProviderStore(
      (state) => ({
        isNewProviderFormOpen: state.isNewProviderFormOpen,
        isDetailsBoxOpen: state.isDetailsBoxOpen,
        isEditProviderFormOpen: state.isEditProviderFormOpen,
      }),
      shallow
    );

  useEffect(() => {
    if (isNewProviderFormOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isNewProviderFormOpen]);

  return (
    <div className="providers-component-container">
      {isNewProviderFormOpen && <NewProviderForm />}
      {isDetailsBoxOpen && <ProviderDetailsBox />}
      {isEditProviderFormOpen && <EditProviderForm />}
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
