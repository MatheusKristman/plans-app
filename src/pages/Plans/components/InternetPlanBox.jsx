import React, { useState } from "react";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { toast } from "react-toastify";

const InternetPlanBox = ({
  contacts,
  cost,
  createdAt,
  download,
  priority,
  providerIcon,
  title,
  upload,
  planId,
}) => {
  const {
    openEditInternetForm,
    openInternetDetailsBox,
    setIdSelectedForDetails,
    setIdSelectedForEdit,
    setPlans,
    planCategory,
  } = usePlansStore(
    (state) => ({
      openEditInternetForm: state.openEditInternetForm,
      openInternetDetailsBox: state.openInternetDetailsBox,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
      setPlans: state.setPlans,
      planCategory: state.planCategory,
    }),
    shallow,
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow,
  );

  const [isArchiving, setIsArchiving] = useState(false);

  const handleOpenForm = () => {
    openEditInternetForm();
    activateModalAnimation();
    setIdSelectedForEdit(planId);
  };

  const handleOpenDetailsBox = () => {
    openInternetDetailsBox();
    activateModalAnimation();
    setIdSelectedForDetails(planId);
  };

  const handleArchive = (id) => {
    setIsArchiving(true);

    api
      .put("plan/internet-plan/archive", { id, isAll: planCategory.all })
      .then((res) => {
        setPlans(res.data);

        toast.success("Plano arquivado com sucesso!", {
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
        toast.error(error.response.data.message, {
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
        setIsArchiving(false);
      });
  };

  return (
    <div className="plans-component-plan-container">
      <div className="plans-component-plan-wrapper">
        <div className="plans-component-plan-info">
          <div className="plans-component-image-title-box">
            <div className="plans-component-image-box">
              <img
                src={`${import.meta.env.VITE_API_KEY}/assets/${providerIcon}`}
                alt={providerIcon.substring(0, providerIcon.length - 4)}
                className="plans-component-image"
              />
            </div>

            <h3 className="plans-component-plan-name">{title}</h3>
          </div>

          <div className="plans-component-cost-box">
            <span className="plans-component-cost-value">
              R$ {cost.toFixed(2).replace(".", ",")}
            </span>
            <span className="plans-component-cost-desc">Valor</span>
          </div>

          <div className="plans-component-download-box">
            <span className="plans-component-download-value">{download}</span>
            <span className="plans-component-download-desc">
              Velocidade de download
            </span>
          </div>

          <div className="plans-component-upload-box">
            <span className="plans-component-upload-value">{upload}</span>
            <span className="plans-component-upload-desc">
              Velocidade de upload
            </span>
          </div>

          <div className="plans-component-priority-box">
            <div className="plans-component-priority-polygon">
              <span className="plans-component-priority-value">{priority}</span>
            </div>
            <span className="plans-component-priority-desc">Prioridade</span>
          </div>

          <div className="plans-component-contact-box">
            <span className="plans-component-contact-value">{contacts}</span>
            <span className="plans-component-contact-desc">Contatos</span>
          </div>

          <div className="plans-component-total-box">
            <span className="plans-component-total-value">
              R$ {(cost * contacts).toFixed(2).replace(".", ",")}
            </span>
            <span className="plans-component-total-desc">Total</span>
          </div>

          <div className="plans-component-created-at-box">
            <span className="plans-component-created-at-value">
              {createdAt}
            </span>
            <span className="plans-component-created-at-desc">Criado em</span>
          </div>
        </div>

        <div className="plans-component-plan-buttons">
          <button
            onClick={handleOpenForm}
            className="plans-component-edit-button"
          >
            Editar
          </button>

          <button
            onClick={handleOpenDetailsBox}
            className="plans-component-details-button"
          >
            Ver Detalhes
          </button>

          <button
            disabled={isArchiving}
            onClick={() => handleArchive(planId)}
            className="plans-component-archive-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Arquivar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternetPlanBox;
