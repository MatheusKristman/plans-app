import React, { useState } from "react";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { toast } from "react-toastify";

import useLeadStore from "../../../stores/useLeadStore";
import useGeneralStore from "../../../stores/useGeneralStore";

const LeadBox = ({
  cpf,
  dateOfBirth,
  name,
  plan,
  tel1,
  tel2,
  clientId,
  contactDate,
  contacted,
}) => {
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow,
  );
  const { openLeadDetailBox, setIdSelectedForDetails, setClientsPF } =
    useLeadStore(
      (state) => ({
        openLeadDetailBox: state.openLeadDetailBox,
        setIdSelectedForDetails: state.setIdSelectedForDetails,
        setClientsPF: state.setClientsPF,
      }),
      shallow,
    );
  const [isContactedConfirmationActive, setIsContactedConfirmationActive] =
    useState(false);

  const handleOpenDetailBox = () => {
    openLeadDetailBox();
    activateModalAnimation();
    setIdSelectedForDetails(clientId);
  };

  const activateConfirmation = () => {
    setIsContactedConfirmationActive(true);
  };

  const deactivateConfirmation = () => {
    setIsContactedConfirmationActive(false);
  };

  const handleContacted = () => {
    api
      .put("/client-pf/contacted", { id: clientId })
      .then((res) => {
        setClientsPF(res.data);
        toast.success("Contato registrado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao registrar a ação de contato", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => {
        deactivateConfirmation();
      });
  };

  return (
    <div className="leads-component-lead-box">
      <div className="leads-component-lead-wrapper">
        <div className="leads-component-info-box">
          <div className="leads-component-lead-name-box">
            <h3 className="leads-component-lead-name">{name}</h3>
            <span className="leads-component-lead-name-desc">Nome</span>
          </div>

          <div className="leads-component-tel1-box">
            <span className="leads-component-tel1-value">{tel1}</span>
            <span className="leads-component-tel1-desc">Telefone 1</span>
          </div>

          <div className="leads-component-tel2-box">
            <span className="leads-component-tel2-value">
              {tel2 ? tel2 : "Não possui"}
            </span>
            <span className="leads-component-tel2-desc">Telefone 2</span>
          </div>

          <div className="leads-component-cpf-box">
            <span className="leads-component-cpf-value">{cpf}</span>
            <span className="leads-component-cpf-desc">CPF</span>
          </div>

          <div className="leads-component-date-of-birth-box">
            <span className="leads-component-date-of-birth-value">
              {dateOfBirth}
            </span>
            <span className="leads-component-date-of-birth-desc">
              Data de nascimento
            </span>
          </div>

          <div className="leads-component-plan-box">
            <span className="leads-component-plan-value">
              {plan ? plan : "Não está registrado"}
            </span>
            <span className="leads-component-plan-desc">Plano</span>
          </div>

          <div className="leads-component-contact-at-box">
            <span className="leads-component-contact-at-value">
              {contactDate}
            </span>
            <span className="leads-component-contact-at-desc">
              Data do contato
            </span>
          </div>
        </div>

        <div className="leads-component-button-wrapper">
          <button
            type="button"
            onClick={handleOpenDetailBox}
            className="leads-component-details-button"
          >
            Ver Detalhes
          </button>

          <div className="leads-component-contacted-wrapper">
            <small
              className={
                isContactedConfirmationActive
                  ? "leads-component-contacted-text confirmation-text"
                  : "leads-component-contacted-text"
              }
            >
              {isContactedConfirmationActive
                ? "Deseja marcar que já entrou em contato?"
                : "Já entrou em contato?"}
            </small>

            {!isContactedConfirmationActive && (
              <button
                type="button"
                disabled={contacted}
                onClick={activateConfirmation}
                className={
                  contacted
                    ? "leads-component-contacted-button has-contacted"
                    : "leads-component-contacted-button has-not-contacted"
                }
              >
                {contacted ? "Sim" : "Não"}
              </button>
            )}

            {isContactedConfirmationActive && (
              <div className="leads-component-contacted-confirmation-wrapper">
                <button
                  type="button"
                  onClick={handleContacted}
                  className="leads-component-contacted-button-confirm"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={deactivateConfirmation}
                  className="leads-component-contacted-button-cancel"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadBox;
