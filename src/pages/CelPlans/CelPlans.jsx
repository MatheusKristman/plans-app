import React, { useEffect, useState } from "react";
import useCelPlansStore from "../../stores/useCelPlansStore";
import useRegisterStore from "../../stores/useRegisterStore";
import useGeneralStore from "../../stores/useGeneralStore";
import useWhatsappStore from "../../stores/useWhatsappStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { useParams } from "react-router-dom";

import PlansHeader from "../components/PlansHeader";
import CelPlansBody from "./components/CelPlansBody.jsx";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import WhatsappLink from "../components/WhatsappLink";

const CelPlans = () => {
  const {
    celPlans,
    setCelPlans,
    allProviders,
    setAllProviders,
    setProviders,
    resetOnLoad,
    filteredCelPlans,
    setFilteredCelPlans,
    plansProviders,
    setPlansProviders,
  } = useCelPlansStore(
    (state) => ({
      celPlans: state.celPlans,
      setCelPlans: state.setCelPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      filteredCelPlans: state.filteredCelPlans,
      setFilteredCelPlans: state.setFilteredCelPlans,
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
    cost: 0,
    franchise: "",
    provider: [],
    planType: [],
  });
  const [filterValuesValidator, setFilterValuesValidator] = useState({ ...filterValues });

  const cep = useParams()?.cep || "";

  useEffect(() => {
    const fetchPlans = () => {
      setLoading();

      api
        .get("plan/cel-plan/all")
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setPlansProviders(res.data.map((plan) => plan.provider));

          if (cep !== "" && cep.length === 9 && cep.includes("-")) {
            const data = {
              cep,
              provider: [],
              cost: 300,
              franchise: "300GB",
              planType: [],
            };

            setFilterValues({ ...filterValues, cep: cep });
            setFilterValuesValidator(data);

            api
              .post("plan/cel-plan/filter", data)
              .then((res) => {
                const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

                setFilteredCelPlans(sortedPlans);
              })
              .catch((err) => console.error(err))
              .finally(() => {
                setCelPlans([]);
              });
          } else {
            setCelPlans(sortedPlans.filter((plan) => !plan.archived));
          }
        })
        .catch((err) => console.error(err))
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
      (celPlans.length !== 0 || filteredCelPlans.length !== 0) &&
      allProviders.length !== 0 &&
      plansProviders.length !== 0
    ) {
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

      unsetLoading();
    }
  }, [celPlans, filteredCelPlans, allProviders]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        enableLink();
      }, 10000);
    }
  }, [isLoading]);

  return (
    <div className="cel-plans-container">
      <PlansHeader
        headerTitle="Planos de Celular"
        headerDesc="Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
      />
      <CelPlansBody
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

export default CelPlans;
