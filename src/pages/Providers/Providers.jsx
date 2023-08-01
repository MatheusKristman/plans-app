import React, { useEffect } from "react";
import useProviderStore from "../../stores/useProviderStore";
import useGeneralStore from "../../stores/useGeneralStore";
import useDashboardPageStore from "../../stores/useDashboardPageStore";
import api from "../../services/api";
import { shallow } from "zustand/shallow";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

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
    sliceEnd,
    setSliceEnd,
    resetSlice,
    idSelectedForDetails,
    setProviderSelectedForDetails,
    idSelectedForEditing,
    setProviderSelectedForEditing,
  } = useProviderStore(
    (state) => ({
      isNewProviderFormOpen: state.isNewProviderFormOpen,
      isDetailsBoxOpen: state.isDetailsBoxOpen,
      isEditProviderFormOpen: state.isEditProviderFormOpen,
      providers: state.providers,
      setProviders: state.setProviders,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      resetSlice: state.resetSlice,
      idSelectedForDetails: state.idSelectedForDetails,
      setProviderSelectedForDetails: state.setProviderSelectedForDetails,
      idSelectedForEditing: state.idSelectedForEditing,
      setProviderSelectedForEditing: state.setProviderSelectedForEditing,
    }),
    shallow,
  );
  const { isLoading, setLoading, unsetLoading } = useGeneralStore(
    (state) => ({
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      unsetLoading: state.unsetLoading,
    }),
    shallow,
  );
  const { searchValue } = useDashboardPageStore(
    (state) => ({
      searchValue: state.searchValue,
    }),
    shallow,
  );

  const filteredProviders = providers.filter((prov) =>
    prov.providerName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSeeMore = () => {
    if (sliceEnd >= providers.lenght) {
      return;
    }

    setSliceEnd();
  };

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

  useEffect(() => {
    if (searchValue.length !== 0) {
      resetSlice();
    }
  }, [searchValue]);

  useEffect(() => {
    if (idSelectedForDetails) {
      const provider = providers.filter(
        (provider) => provider._id === idSelectedForDetails,
      );

      setProviderSelectedForDetails(provider[0]);
    }
  }, [idSelectedForDetails]);

  useEffect(() => {
    if (idSelectedForEditing) {
      const provider = providers.filter(
        (provider) => provider._id === idSelectedForEditing,
      );

      setProviderSelectedForEditing(provider[0]);
    }
  }, [idSelectedForEditing]);

  return (
    <div className="providers-component-container">
      {isNewProviderFormOpen && <NewProviderForm />}
      {isDetailsBoxOpen && <ProviderDetailsBox />}
      {isEditProviderFormOpen && <EditProviderForm />}
      <ToastContainer />
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
            {searchValue.length !== 0 && filteredProviders.length === 0 ? (
              <span className="providers-component-no-provider-adviser">
                Nenhuma operadora encontrada
              </span>
            ) : searchValue.length !== 0 && providers.length !== 0 ? (
              filteredProviders
                .slice(0, sliceEnd)
                .map((provider) => (
                  <ProviderBox
                    key={provider._id}
                    providerLogo={provider.providerLogo}
                    providerName={provider.providerName}
                    plansQuant={provider.plansQuant}
                    id={provider._id}
                  />
                ))
            ) : providers.length !== 0 ? (
              providers
                .slice(0, sliceEnd)
                .map((provider) => (
                  <ProviderBox
                    key={provider._id}
                    providerLogo={provider.providerLogo}
                    providerName={provider.providerName}
                    plansQuant={provider.plansQuant}
                    id={provider._id}
                  />
                ))
            ) : (
              <span className="providers-component-no-provider-adviser">
                Nenhuma Operadora cadastrada
              </span>
            )}
            {sliceEnd < providers.length && searchValue.length === 0 ? (
              <button
                type="button"
                className="providers-component-see-more-button"
                onClick={handleSeeMore}
              >
                Mostrar Mais
              </button>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
