import React, { useEffect, useState } from "react";
import useTVPlansStore from "../../stores/useTVPlansStore";
import useRegisterStore from "../../stores/useRegisterStore";
import useGeneralStore from "../../stores/useGeneralStore";
import useWhatsappStore from "../../stores/useWhatsappStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { useParams } from "react-router-dom";

import PlansHeader from "../components/PlansHeader";
import TVPlansBody from "./components/TVPlansBody";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import WhatsappLink from "../components/WhatsappLink";

const TVPlans = () => {
  const {
    tvPlans,
    setTvPlans,
    allProviders,
    setAllProviders,
    setProviders,
    resetOnLoad,
    filteredTvPlans,
    setFilteredTvPlans,
    plansProviders,
    setPlansProviders,
  } = useTVPlansStore(
    (state) => ({
      tvPlans: state.tvPlans,
      setTvPlans: state.setTvPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      filteredTvPlans: state.filteredTvPlans,
      setFilteredTvPlans: state.setFilteredTvPlans,
      plansProviders: state.plansProviders,
      setPlansProviders: state.setPlansProviders,
    }),
    shallow,
  );
  const { isRegisterFormOpen } = useRegisterStore(
    (state) => ({
      isRegisterFormOpen: state.isRegisterFormOpen,
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
  const { isLinkEnabled, enableLink } = useWhatsappStore(
    (state) => ({
      isLinkEnabled: state.isLinkEnabled,
      enableLink: state.enableLink,
    }),
    shallow,
  );
  const [filterValues, setFilterValues] = useState({
    cep: "",
    provider: [],
    cost: 250,
    devicesQuant: 1,
  });
  const [filterValuesValidator, setFilterValuesValidator] = useState({
    ...filterValues,
  });

  const cep = useParams()?.cep || "";

  useEffect(() => {
    const fetchPlans = () => {
      setLoading();

      api
        .get("plan/tv-plan/all")
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setPlansProviders(res.data.map((plan) => plan.provider));

          if (cep !== "" && cep.length === 9 && cep.includes("-")) {
            const data = {
              cep,
              provider: [],
              cost: 250,
              devicesQuant: 1,
            };

            setFilterValues((prev) => ({ ...prev, cep: cep }));
            setFilterValuesValidator(data);

            api
              .post("plan/tv-plan/filter", data)
              .then((res) => {
                const sortedPlans = res.data.sort(
                  (a, b) => a.priority - b.priority,
                );

                setFilteredTvPlans(sortedPlans);
              })
              .catch((err) => console.error(err))
              .finally(() => {
                setTvPlans([]);
                unsetLoading();
              });
          } else {
            setTvPlans(sortedPlans.filter((plan) => !plan.archived));
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          api
            .get("provider/all")
            .then((res) => setAllProviders(res.data))
            .catch((err) => console.error(err));

          if (!cep) {
            unsetLoading();
          }
        });
    };

    window.scrollTo(0, 0);
    resetOnLoad();
    fetchPlans();
  }, []);

  useEffect(() => {
    if (isRegisterFormOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isRegisterFormOpen]);

  useEffect(() => {
    if (allProviders.length !== 0 && plansProviders.length !== 0) {
      const providerSelected = [];

      for (let i = 0; i < plansProviders.length; i++) {
        for (let j = 0; j < allProviders.length; j++) {
          if (
            plansProviders[i] === allProviders[j]._id &&
            !providerSelected.includes(allProviders[j].providerName)
          ) {
            providerSelected.push(allProviders[j].providerName);
          }
        }
      }

      setProviders(providerSelected);
    }
  }, [tvPlans, filteredTvPlans, allProviders]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        enableLink();
      }, 10000);
    }
  }, [isLoading]);

  return (
    <div className="tv-plans-container">
      <PlansHeader
        headerTitle="Planos de TV"
        headerDesc="A melhor programação na sua tela. Descubra nossos planos de TV e viva momentos incríveis em casa."
      />
      <TVPlansBody
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        filterValuesValidator={filterValuesValidator}
        setFilterValuesValidator={setFilterValuesValidator}
      />
      {isRegisterFormOpen && <RegisterForm />}
      {isLinkEnabled && <WhatsappLink />}
      <Footer />
    </div>
  );
};

export default TVPlans;
