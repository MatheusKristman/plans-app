import React, { useEffect } from "react";
import useLeadStore from "../../stores/useLeadStore";
import useDashboardPageStore from "../../stores/useDashboardPageStore";
import useGeneralStore from "../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

import DashboardHeader from "../components/DashboardHeader";
import LeadsStatusBox from "./components/LeadsStatusBox";
import LeadBox from "./components/LeadBox";
import LeadDetailsBox from "./components/LeadDetailsBox";
import Loading from "../components/Loading";

const Leads = () => {
  const {
    isLeadDetailBoxOpen,
    clientsPF,
    setClientsPF,
    setPlans,
    plans,
    idSelectedForDetails,
    setClientSelectedForDetails,
    sliceEnd,
    setSliceEnd,
    resetSlice,
  } = useLeadStore(
    (state) => ({
      isLeadDetailBoxOpen: state.isLeadDetailBoxOpen,
      clientsPF: state.clientsPF,
      setClientsPF: state.setClientsPF,
      setPlans: state.setPlans,
      plans: state.plans,
      idSelectedForDetails: state.idSelectedForDetails,
      setClientSelectedForDetails: state.setClientSelectedForDetails,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      resetSlice: state.resetSlice,
    }),
    shallow,
  );
  const { searchValue } = useDashboardPageStore(
    (state) => ({
      searchValue: state.searchValue,
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

  const filteredClientsPF = clientsPF.filter((client) =>
    client.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSeeMore = () => {
    if (sliceEnd >= clientsPF.length) {
      return;
    }

    setSliceEnd();
  };

  useEffect(() => {
    setLoading();

    api
      .get("client-pf/all")
      .then((res) => {
        setClientsPF(res.data);

        api
          .get("plan/all-plans/all")
          .then((res) => setPlans(res.data))
          .catch((error) => console.error(error.message.response.data))
          .finally(() => unsetLoading());
      })
      .catch((error) => console.error(error.message.response.data));
  }, []);

  useEffect(() => {
    if (idSelectedForDetails) {
      setClientSelectedForDetails(
        clientsPF.filter((client) => client._id === idSelectedForDetails)[0],
      );
    }
  }, [idSelectedForDetails]);

  useEffect(() => {
    if (searchValue !== "") {
      resetSlice();
    }
  }, [searchValue]);

  return (
    <div className="leads-component-container">
      {isLeadDetailBoxOpen && <LeadDetailsBox />}
      <ToastContainer />
      <div className="leads-component-wrapper">
        <DashboardHeader
          pageName="Clientes"
          searchPlaceholder="Pesquise o nome do cliente..."
        />

        <div className="leads-component-info">
          <LeadsStatusBox />

          <div className="leads-component-leads-wrapper">
            <AnimatePresence>
              {isLoading && (
                <Loading type="spokes" color="#d40066" key={isLoading} />
              )}
            </AnimatePresence>
            {searchValue.length !== 0 && filteredClientsPF.length !== 0 ? (
              filteredClientsPF
                .slice(0, sliceEnd)
                .map((client) => (
                  <LeadBox
                    cpf={client.cpf}
                    dateOfBirth={client.dateOfBirth}
                    name={client.name}
                    plan={
                      plans.filter((plan) => plan._id === client.plan)[0]?.title
                    }
                    tel1={client.tel1}
                    tel2={client.tel2}
                    clientId={client._id}
                    contactDate={client.createdAt}
                    contacted={client.contacted}
                  />
                ))
            ) : searchValue.length !== 0 && filteredClientsPF.length === 0 ? (
              <span className="leads-component-leads-no-client-found">
                Nenhum cliente encontrado
              </span>
            ) : clientsPF.length !== 0 ? (
              clientsPF
                .slice(0, sliceEnd)
                .map((client) => (
                  <LeadBox
                    cpf={client.cpf}
                    dateOfBirth={client.dateOfBirth}
                    name={client.name}
                    plan={
                      plans.filter((plan) => plan._id === client.plan)[0]?.title
                    }
                    tel1={client.tel1}
                    tel2={client.tel2}
                    clientId={client._id}
                    contactDate={client.createdAt}
                    contacted={client.contacted}
                  />
                ))
            ) : (
              <span className="leads-component-leads-no-client-found">
                Nenhum client cadastrado
              </span>
            )}
            {clientsPF.length > sliceEnd && searchValue.length === 0 ? (
              <button
                type="button"
                className="leads-component-leads-see-more-button"
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

export default Leads;
