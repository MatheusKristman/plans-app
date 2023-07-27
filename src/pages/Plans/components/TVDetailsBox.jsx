import React from "react";
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";

import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import api from "../../../services/api";

const TVDetailsBox = ({ archivedAt }) => {
  const { modalAnimation, deactivateModalAnimation, activateModalAnimation } =
    useGeneralStore(
      (state) => ({
        modalAnimation: state.modalAnimation,
        deactivateModalAnimation: state.deactivateModalAnimation,
        activateModalAnimation: state.activateModalAnimation,
      }),
      shallow,
    );
  const {
    closeTVDetailsBox,
    openEditTVForm,
    planSelectedForDetails,
    setIdSelectedForDetails,
    setIdSelectedForEdit,
    setPlans,
  } = usePlansStore(
    (state) => ({
      closeTVDetailsBox: state.closeTVDetailsBox,
      openEditTVForm: state.openEditTVForm,
      planSelectedForDetails: state.planSelectedForDetails,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
      setPlans: state.setPlans,
    }),
    shallow,
  );

  // OK
  const handleCloseDetailsBox = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeTVDetailsBox();
      setIdSelectedForDetails("");
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains("tv-details-box-overlay")) {
      handleCloseDetailsBox();
    }
  };

  // OK
  const handleOpenEditForm = () => {
    const idSelected = planSelectedForDetails._id;

    deactivateModalAnimation();
    setIdSelectedForEdit(idSelected);

    setTimeout(() => {
      closeTVDetailsBox();
      setIdSelectedForDetails("");
      openEditTVForm();
      activateModalAnimation();
    }, 800);
  };

  // OK
  const handleArchive = () => {
    api
      .put("plan/tv-plan/archive", { id: planSelectedForDetails._id })
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailsBox();

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
      });
  };

  // OK
  const handleUnarchive = () => {
    api
      .put("plan/tv-plan/archive", { id: planSelectedForDetails._id })
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailsBox();

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

  // OK
  const handleDelete = () => {
    api
      .delete(`plan/tv-plan/delete/${planSelectedForDetails._id}`)
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailsBox();

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
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? "tv-details-box-overlay animate__animated animate__fast animate__fadeIn"
          : "tv-details-box-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="tv-details-box-container">
        <div className="tv-details-box-wrapper">
          <div className="tv-details-box-header">
            <button
              onClick={handleCloseDetailsBox}
              className="tv-details-box-close-button"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="tv-details-box-title">Detalhes</h3>
          </div>

          <div className="tv-details-box-body">
            <div className="tv-details-box-info-wrapper">
              <div className="tv-details-box-info">
                <div className="tv-details-box-title-box">
                  <span className="tv-details-box-title-label">Título</span>
                  <span className="tv-details-box-title-desc">
                    {planSelectedForDetails.title}
                  </span>
                </div>

                <div className="tv-details-box-created-at-box">
                  <span className="tv-details-box-created-at-label">
                    Criado em
                  </span>
                  <span className="tv-details-box-created-at-desc">
                    {planSelectedForDetails.createdAt}
                  </span>
                </div>
              </div>

              <div className="tv-details-box-info">
                <div className="tv-details-box-provider-box">
                  <span className="tv-details-box-provider-label">
                    Operadora
                  </span>
                  <img
                    src={`${import.meta.env.VITE_API_KEY}/assets/${
                      planSelectedForDetails.providerIcon
                    }`}
                    alt={planSelectedForDetails.providerIcon?.substring(
                      0,
                      planSelectedForDetails.providerIcon?.length - 4,
                    )}
                    className="tv-details-box-provider-logo"
                  />
                </div>

                <div className="tv-details-box-contacts-box">
                  <span className="tv-details-box-contacts-label">
                    Contatos
                  </span>
                  <span className="tv-details-box-contacts-desc">
                    {planSelectedForDetails.contacts}
                  </span>
                </div>
              </div>

              <div className="tv-details-box-info">
                <div className="tv-details-box-cost-box">
                  <span className="tv-details-box-cost-label">Valor</span>
                  <span className="tv-details-box-cost-desc">
                    R${" "}
                    {planSelectedForDetails.cost?.toFixed(2)?.replace(".", ",")}
                  </span>
                </div>

                <div className="tv-details-box-total-box">
                  <span className="tv-details-box-total-label">Total</span>
                  <span className="tv-details-box-total-desc">
                    R${" "}
                    {(
                      planSelectedForDetails.cost *
                      planSelectedForDetails.contacts
                    )
                      ?.toFixed(2)
                      ?.replace(".", ",")}
                  </span>
                </div>
              </div>

              {planSelectedForDetails?.afterCost &&
                planSelectedForDetails?.periodToChangeCost && (
                  <div className="tv-details-box-info">
                    <div className="tv-details-box-after-cost-box">
                      <span className="tv-details-box-after-cost-label">
                        Valor original
                      </span>
                      <span className="tv-details-box-after-cost-desc">
                        R${" "}
                        {planSelectedForDetails.afterCost
                          ?.toFixed(2)
                          ?.replace(".", ",")}
                      </span>
                    </div>

                    <div className="tv-details-box-period-to-change-cost-box">
                      <span className="tv-details-box-period-to-change-cost-label">
                        Período para mudar o valor
                      </span>
                      <span className="tv-details-box-period-to-change-cost-desc">
                        Depois do {planSelectedForDetails.periodToChangeCost}°
                        mês
                      </span>
                    </div>
                  </div>
                )}

              <div className="tv-details-box-info">
                <div className="tv-details-box-priority-box">
                  <span className="tv-details-box-priority-label">
                    Prioridade
                  </span>
                  <span className="tv-details-box-priority-desc">
                    {planSelectedForDetails.priority}
                  </span>
                </div>

                <div className="tv-details-box-benefits-box">
                  <span className="tv-details-box-benefits-label">
                    Benefícios
                  </span>
                  <span className="tv-details-box-benefits-desc">
                    {planSelectedForDetails.benefits
                      ?.toString()
                      ?.replaceAll(",", ", ")}
                  </span>
                </div>
              </div>

              <div className="tv-details-box-info">
                <div className="tv-details-box-installation-cost-box">
                  <span className="tv-details-box-installation-cost-label">
                    Valor da instalação
                  </span>
                  <span className="tv-details-box-installation-cost-desc">
                    {planSelectedForDetails.installationCost}
                  </span>
                </div>

                <div className="tv-details-box-devices-box">
                  <span className="tv-details-box-devices-label">
                    Pontos de tv
                  </span>
                  <span className="tv-details-box-devices-desc">
                    {planSelectedForDetails.devicesQuant}
                  </span>
                </div>
              </div>

              {archivedAt && (
                <div className="tv-details-box-info">
                  <div className="tv-details-box-archived-at-box">
                    <span className="tv-details-box-archived-at-label">
                      Arquivado em
                    </span>
                    <span className="tv-details-box-archived-at-desc">
                      {planSelectedForDetails?.archivedAt}
                    </span>
                  </div>
                </div>
              )}

              <div className="tv-details-box-description-box">
                <span className="tv-details-box-description-label">
                  Descrição
                </span>

                {planSelectedForDetails.description?.map((desc, index) => (
                  <span
                    key={`desc-${index}`}
                    className="tv-details-box-description-desc"
                  >
                    {desc}
                  </span>
                ))}
              </div>

              <div className="tv-details-box-buttons-wrapper">
                {planSelectedForDetails.archived ? (
                  <>
                    <button
                      type="button"
                      onClick={handleUnarchive}
                      className="tv-details-box-restore-button"
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
                      type="button"
                      onClick={handleDelete}
                      className="tv-details-box-delete-button"
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleOpenEditForm}
                      className="tv-details-box-edit-button"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={handleArchive}
                      className="tv-details-box-archive-button"
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetailsBox;
