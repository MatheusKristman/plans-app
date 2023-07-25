import React, { useEffect, useState } from "react";
import api from "../../services/api";
import useInternetPlansStore from "../../stores/useInternetPlansStore";
import useRegisterStore from "../../stores/useRegisterStore";
import useGeneralStore from "../../stores/useGeneralStore";
import useWhatsappStore from "../../stores/useWhatsappStore";
import { useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";

import PlansHeader from "../components/PlansHeader";
import InternetPlansBody from "./components/InternetPlansBody";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import WhatsappLink from "../components/WhatsappLink";

const InternetPlans = () => {
  const {
    internetPlans,
    setInternetPlans,
    allProviders,
    setAllProviders,
    setProviders,
    resetOnLoad,
    filteredInternetPlans,
    setFilteredInternetPlans,
    plansProviders,
    setPlansProviders,
  } = useInternetPlansStore(
    (state) => ({
      internetPlans: state.internetPlans,
      setInternetPlans: state.setInternetPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      filteredInternetPlans: state.filteredInternetPlans,
      setFilteredInternetPlans: state.setFilteredInternetPlans,
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
      disableLink: state.disableLink,
    }),
    shallow,
  );
  const [filterValues, setFilterValues] = useState({
    cep: "",
    cost: 500,
    download: "1000MB",
    technology: [],
    provider: [],
  });
  const [filterValuesValidator, setFilterValuesValidator] = useState({ ...filterValues });

  const cep = useParams()?.cep || "";

  useEffect(() => {
    const fetchPlans = () => {
      setLoading();

      api
        .get("plan/internet-plan/all")
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setPlansProviders(res.data.map((plan) => plan.provider));

          if (cep !== "" && cep.length === 9 && cep.includes("-")) {
            const data = {
              cep,
              provider: [],
              cost: 500,
              download: "1000MB",
              technology: [],
            };

            setFilterValues({ ...filterValues, cep: cep });
            setFilterValuesValidator(data);

            api
              .post("plan/internet-plan/filter", data)
              .then((res) => {
                const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

                setFilteredInternetPlans(sortedPlans);
              })
              .catch((err) => console.error(err))
              .finally(() => setInternetPlans([]));
          } else {
            setInternetPlans(sortedPlans.filter((plan) => !plan.archived));
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          api
            .get("provider/all")
            .then((res) => setAllProviders(res.data))
            .catch((err) => console.error(err));
        });
    };

    window.scrollTo(0, 0);
    resetOnLoad();
    fetchPlans();
  }, []);

  useEffect(() => {
    if (
      (internetPlans.length !== 0 || filteredInternetPlans.length !== 0) &&
      allProviders.length !== 0 &&
      plansProviders.length !== 0
    ) {
      const providersSelected = [];

      for (let i = 0; i < plansProviders.length; i++) {
        for (let j = 0; j < allProviders.length; j++) {
          if (
            plansProviders[i] === allProviders[j]._id &&
            !providersSelected.includes(allProviders[j].providerName)
          ) {
            providersSelected.push(allProviders[j].providerName);
          }
        }
      }
      setProviders(providersSelected);

      unsetLoading();
    }
  }, [internetPlans, filteredInternetPlans, allProviders]);

  useEffect(() => {
    if (isRegisterFormOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isRegisterFormOpen]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        enableLink();
      }, 10000);
    }
  }, [isLoading]);

  return (
    <div className="internet-plans-container">
      <PlansHeader
        headerTitle="Planos de Banda Larga"
        headerDesc="Navegue com velocidade e estabilidade. Escolha o plano de Banda Larga perfeito para suas necessidades."
      />
      <InternetPlansBody
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

export default InternetPlans;
