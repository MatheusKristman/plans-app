import React, { useEffect } from "react";
import useLeadStore from "../../stores/useLeadStore";
import useDashboardPageStore from "../../stores/useDashboardPageStore";
import { shallow } from "zustand/shallow";
import api from "../../services/api";

import DashboardHeader from "../components/DashboardHeader";
import LeadsStatusBox from "./components/LeadsStatusBox";
import LeadBox from "./components/LeadBox";
import LeadDetailsBox from "./components/LeadDetailsBox";

const Leads = () => {
  const {
    isLeadDetailBoxOpen,
    clientsPF,
    setClientsPF,
    setPlans,
    plans,
    idSelectedForDetails,
    setClientSelectedForDetails,
    clientSelectedForDetails,
  } = useLeadStore(
    (state) => ({
      isLeadDetailBoxOpen: state.isLeadDetailBoxOpen,
      clientsPF: state.clientsPF,
      setClientsPF: state.setClientsPF,
      setPlans: state.setPlans,
      plans: state.plans,
      idSelectedForDetails: state.idSelectedForDetails,
      setClientSelectedForDetails: state.setClientSelectedForDetails,
      clientSelectedForDetails: state.clientSelectedForDetails,
    }),
    shallow
  );
  const { searchValue } = useDashboardPageStore(
    (state) => ({
      searchValue: state.searchValue,
    }),
    shallow
  );

  const filteredClientsPF = clientsPF.filter((client) =>
    client.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    api
      .get("client-pf/all")
      .then((res) => setClientsPF(res.data))
      .catch((error) => console.error(error.message.response.data));

    api
      .get("plan/all-plans/all")
      .then((res) => setPlans(res.data))
      .catch((error) => console.error(error.message.response.data));
  }, []);

  useEffect(() => {
    console.log(plans.filter((plan) => plan._id === clientsPF[0].plan));
  }, [plans, clientsPF]);

  useEffect(() => {
    if (idSelectedForDetails) {
      setClientSelectedForDetails(
        clientsPF.filter((client) => client._id === idSelectedForDetails)[0]
      );
    }
  }, [idSelectedForDetails]);

  useEffect(() => {
    console.log(clientSelectedForDetails);
  }, [clientSelectedForDetails]);

  return (
    <div className="leads-component-container">
      {isLeadDetailBoxOpen && <LeadDetailsBox />}
      <div className="leads-component-wrapper">
        <DashboardHeader
          pageName="Clientes"
          searchPlaceholder="Pesquise o nome do cliente..."
        />

        <div className="leads-component-info">
          <LeadsStatusBox />

          <div className="leads-component-leads-wrapper">
            {searchValue.length !== 0 && filteredClientsPF.length !== 0 ? (
              filteredClientsPF.map((client) => (
                <LeadBox
                  accountOwner={client.accountOwner}
                  address={client.address}
                  addressNumber={client.addressNumber}
                  agency={client.agency}
                  bank={client.bank}
                  bankAccount={client.bankAccount}
                  cep={client.cep}
                  city={client.city}
                  complement={client.complement}
                  cpf={client.cpf}
                  dateOfBirth={client.dateOfBirth}
                  installationDate1={client.installationDate1}
                  installationDate2={client.installationDate2}
                  installationPeriod={client.installationPeriod}
                  motherName={client.motherName}
                  name={client.name}
                  paymentDate={client.paymentDate}
                  paymentMethod={client.paymentMethod}
                  plan={
                    plans.filter((plan) => plan._id === client.plan)[0]?.title
                  }
                  rg={client.rg}
                  state={client.state}
                  tel1={client.tel1}
                  tel2={client.tel2}
                  clientId={client._id}
                />
              ))
            ) : searchValue.length !== 0 && filteredClientsPF.length === 0 ? (
              <span className="leads-component-leads-no-client-found">
                Nenhum cliente encontrado
              </span>
            ) : (
              clientsPF.map((client) => (
                <LeadBox
                  accountOwner={client.accountOwner}
                  address={client.address}
                  addressNumber={client.addressNumber}
                  agency={client.agency}
                  bank={client.bank}
                  bankAccount={client.bankAccount}
                  cep={client.cep}
                  city={client.city}
                  complement={client.complement}
                  cpf={client.cpf}
                  dateOfBirth={client.dateOfBirth}
                  installationDate1={client.installationDate1}
                  installationDate2={client.installationDate2}
                  installationPeriod={client.installationPeriod}
                  motherName={client.motherName}
                  name={client.name}
                  paymentDate={client.paymentDate}
                  paymentMethod={client.paymentMethod}
                  plan={
                    plans.filter((plan) => plan._id === client.plan)[0]?.title
                  }
                  rg={client.rg}
                  state={client.state}
                  tel1={client.tel1}
                  tel2={client.tel2}
                  clientId={client._id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
