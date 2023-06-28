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
    idSelected,
    setProviderSelected,
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
      idSelected: state.idSelected,
      setProviderSelected: state.setProviderSelected,
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
  const { searchValue } = useDashboardPageStore(
    (state) => ({
      searchValue: state.searchValue,
    }),
    shallow
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
    if (idSelected) {
      const provider = providers.filter(
        (provider) => provider._id === idSelected
      );

      setProviderSelected(provider[0]);
    }
  }, [idSelected]);

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
            {providers.slice(0, sliceEnd).map((provider) => (
              <ProviderBox
                key={provider._id}
                providerLogo={provider.providerLogo}
                providerName={provider.providerName}
                plansQuant={provider.plansQuant}
                id={provider._id}
              />
            ))}
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
