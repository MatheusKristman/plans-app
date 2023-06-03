import React from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { toast } from "react-toastify";

const TVPlansArchivedBox = ({
  afterCost,
  benefits,
  category,
  cost,
  createdAt,
  description,
  devicesQuant,
  installationCost,
  periodToChangeCost,
  priority,
  providerIcon,
  title,
  planId,
  contacts,
  archivedAt,
}) => {
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );
  const { openTVDetailsBox, setIdSelectedForDetails, setPlans } = usePlansStore(
    (state) => ({
      openTVDetailsBox: state.openTVDetailsBox,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setPlans: state.setPlans,
    }),
    shallow
  );

  const handleOpenDetailsBox = () => {
    openTVDetailsBox();
    activateModalAnimation();
    setIdSelectedForDetails(planId);
  };

  const handleUnarchive = (id) => {
    api
      .put("plan/tv-plan/archive", { id })
      .then((res) => {
        setPlans(res.data);

        toast.success("Plano restaurado com sucesso!", {
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
      });
  };

  const handleDelete = (id) => {
    api
      .delete(`plan/tv-plan/delete/${id}`)
      .then((res) => {
        setPlans(res.data);

        toast.success("Plano deletado com sucesso!", {
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
      });
  };

  return (
    <div className="plans-component-archived-plan-container">
      <div className="plans-component-archived-plan-wrapper">
        <div className="plans-component-archived-plan-info">
          <div className="plans-component-image-title-box">
            <div className="plans-component-image-box">
              <img
                src={`https://planos-backend.onrender.com/assets/${providerIcon}`}
                alt={providerIcon?.substring(0, providerIcon?.length - 4)}
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

          <div className="plans-component-devices-box">
            <span className="plans-component-devices-value">
              {devicesQuant}
            </span>
            <span className="plans-component-devices-desc">Pontos de tv</span>
          </div>

          <div className="plans-component-priority-box">
            <div className="plans-component-priority-polygon">
              <span className="plans-component-priority-value">{priority}</span>
            </div>
            <span className="plans-component-priority-desc">Prioridade</span>
          </div>

          <div className="plans-component-contact-box">
            <span className="plans-component-contact-value">{contacts}</span>
            <span className="plans-component-contact-desc">Contato</span>
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

          <div className="plans-component-archived-at-box">
            <span className="plans-component-archived-at-value">
              {archivedAt}
            </span>
            <span className="plans-component-archived-at-desc">
              Arquivado em
            </span>
          </div>
        </div>

        <div className="plans-component-archived-plan-buttons">
          <button
            onClick={() => handleUnarchive(planId)}
            className="plans-component-restore-button"
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Restaurar
          </button>

          <button
            onClick={handleOpenDetailsBox}
            className="plans-component-details-button"
          >
            Ver Detalhes
          </button>

          <button
            onClick={() => handleDelete(planId)}
            className="plans-component-delete-button"
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVPlansArchivedBox;
