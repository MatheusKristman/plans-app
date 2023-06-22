import React, { useEffect } from "react";
import useTVPlansStore from "../../stores/useTVPlansStore";
import useRegisterStore from "../../stores/useRegisterStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { useParams } from "react-router-dom";

import PlansHeader from "../components/PlansHeader";
import TVPlansBody from "./components/TVPlansBody";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const TVPlans = () => {
  const {
    tvPlans,
    setTvPlans,
    allProviders,
    setAllProviders,
    providers,
    setProviders,
    resetOnLoad,
    setFilteredTvPlans,
  } = useTVPlansStore(
    (state) => ({
      tvPlans: state.tvPlans,
      setTvPlans: state.setTvPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      providers: state.providers,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      setFilteredTvPlans: state.setFilteredTvPlans,
    }),
    shallow
  );
  const { isRegisterFormOpen } = useRegisterStore(
    (state) => ({
      isRegisterFormOpen: state.isRegisterFormOpen,
    }),
    shallow
  );

  const cep = useParams()?.cep || "";

  useEffect(() => {
    const fetchPlans = () => {
      if (cep !== "" && cep.length === 9 && cep.includes("-")) {
        const data = {
          cep,
          provider: [],
          cost: 250,
          devicesQuant: 1,
        };

        api
          .post("plan/tv-plan/filter", data)
          .then((res) => setFilteredTvPlans(res.data))
          .catch((err) => console.log(err))
          .finally(() => {
            setTvPlans([]);
          });

        return;
      }

      api
        .get("plan/tv-plan/all")
        .then((res) => setTvPlans(res.data.filter((plan) => !plan.archived)))
        .catch((err) => console.error(err));

      api
        .get("provider/all")
        .then((res) => setAllProviders(res.data))
        .catch((err) => console.error(err));
    };

    window.scrollTo(0, 0);
    resetOnLoad();
    fetchPlans();
  }, []);

  useEffect(() => {
    if (allProviders && tvPlans.length !== 0) {
      const providerSelected = [];

      for (let i = 0; i < tvPlans.length; i++) {
        for (let j = 0; j < allProviders.length; j++) {
          if (
            tvPlans[i].provider === allProviders[j]._id &&
            !providerSelected.includes(allProviders[j].providerName)
          ) {
            providerSelected.push(allProviders[j].providerName);
          }
        }
      }

      setProviders(providerSelected);
    }
  }, [allProviders, tvPlans]);

  useEffect(() => {
    if (isRegisterFormOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isRegisterFormOpen]);

  return (
    <div className="tv-plans-container">
      <PlansHeader
        headerTitle="Planos de TV"
        headerDesc="Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
      />
      <TVPlansBody />
      {isRegisterFormOpen && <RegisterForm />}
      <Footer />
    </div>
  );
};

export default TVPlans;

// TODO Testar planos e verificar se os planos estão sendo adicionados nos contatos
