import React, { useEffect } from "react";
import useProviderStore from "../../stores/useProviderStore";
import useGeneralStore from "../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { AnimatePresence } from "framer-motion";
import api from "../../services/api";

import DashboardHeader from "../components/DashboardHeader";
import ProvidersStatusBox from "./components/ProvidersStatusBox";
import ProviderBox from "./components/ProviderBox";
import NewProviderForm from "./components/NewProviderForm";
import ProviderDetailsBox from "./components/ProviderDetailsBox";
import EditProviderForm from "./components/EditProviderForm";
import Loading from "../components/Loading";

const Providers = () => {
  const {
    isNewProviderFormOpen,
    isDetailsBoxOpen,
    isEditProviderFormOpen,
    providers,
    setProviders,
    filteredProviders,
  } = useProviderStore(
    (state) => ({
      isNewProviderFormOpen: state.isNewProviderFormOpen,
      isDetailsBoxOpen: state.isDetailsBoxOpen,
      isEditProviderFormOpen: state.isEditProviderFormOpen,
      providers: state.providers,
      setProviders: state.setProviders,
      filteredProviders: state.filterdProviders,
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

  useEffect(() => {
    setLoading();
    api
      .get("/provider/all")
      .then((res) => {
        setProviders(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => unsetLoading());
  }, []);

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
            <AnimatePresence>
              {isLoading && (
                <Loading type="spokes" color="#d40066" key={isLoading} />
              )}
            </AnimatePresence>
            {providers.map((provider) => (
              <ProviderBox
                key={provider._id}
                providerLogo={provider.providerLogo}
                providerName={provider.providerName}
                plansQuant={provider.plansQuant}
                id={provider._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
