import React, { useState } from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";
import api from "../../../services/api";

const CelDetailsBox = ({ archivedAt }) => {
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
    closeCelDetailsBox,
    openEditCelForm,
    planSelectedForDetails,
    setIdSelectedForDetails,
    setIdSelectedForEdit,
    setPlans,
    planCategory,
  } = usePlansStore(
    (state) => ({
      closeCelDetailsBox: state.closeCelDetailsBox,
      openEditCelForm: state.openEditCelForm,
      planSelectedForDetails: state.planSelectedForDetails,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
      setPlans: state.setPlans,
      planCategory: state.planCategory,
    }),
    shallow,
  );
  const [isArchiving, setIsArchiving] = useState(false);
  const [isUnarchiving, setIsUnarchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCloseDetailBox = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeCelDetailsBox();
      setIdSelectedForDetails("");
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains("cel-details-box-overlay")) {
      handleCloseDetailBox();
    }
  };

  const handleOpenEditForm = () => {
    const idSelected = planSelectedForDetails?._id;

    deactivateModalAnimation();
    setIdSelectedForEdit(idSelected);

    setTimeout(() => {
      closeCelDetailsBox();
      setIdSelectedForDetails("");
      openEditCelForm();
      activateModalAnimation();
    }, 800);
  };

  const handleArchive = () => {
    setIsArchiving(true);

    api
      .put("plan/cel-plan/archive", {
        id: planSelectedForDetails._id,
        isAll: planCategory.all,
      })
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailBox();

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

  const handleUnarchive = () => {
    setIsUnarchiving(true);

    api
      .put("plan/cel-plan/archive", {
        id: planSelectedForDetails._id,
        isAll: planCategory.all,
      })
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailBox();

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
      })
      .finally(() => {
        setIsUnarchiving(false);
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);

    api
      .put("plan/cel-plan/delete", {
        id: planSelectedForDetails._id,
        isAll: planCategory.all,
      })
      .then((res) => {
        setPlans(res.data);
        handleCloseDetailBox();

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
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? "cel-details-box-overlay animate__animated animate__fast animate__fadeIn"
          : "cel-details-box-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="cel-details-box-container">
        <div className="cel-details-box-wrapper">
          <div className="cel-details-box-header">
            <button
              type="button"
              onClick={handleCloseDetailBox}
              className="cel-details-box-close-button"
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

            <h3 className="cel-details-box-title">Detalhes</h3>
          </div>

          <div className="cel-details-box-body">
            <div className="cel-details-box-info-wrapper">
              <div className="cel-details-box-info">
                <div className="cel-details-box-title-box">
                  <span className="cel-details-box-title-label">Título</span>
                  <span className="cel-details-box-title-desc">
                    {planSelectedForDetails.title}
                  </span>
                </div>

                <div className="cel-details-box-created-at-box">
                  <span className="cel-details-box-created-at-label">
                    Criado em
                  </span>
                  <span className="cel-details-box-created-at-desc">
                    {planSelectedForDetails.createdAt}
                  </span>
                </div>
              </div>

              <div className="cel-details-box-info">
                <div className="cel-details-box-provider-box">
                  <span className="cel-details-box-provider-label">
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
                    className="cel-details-box-provider-logo"
                  />
                </div>

                <div className="cel-details-box-contacts-box">
                  <span className="cel-details-box-contacts-label">
                    Contatos
                  </span>
                  <span className="cel-details-box-contacts-desc">
                    {planSelectedForDetails.contacts}
                  </span>
                </div>
              </div>

              <div className="cel-details-box-info">
                <div className="cel-details-box-cost-box">
                  <span className="cel-details-box-cost-label">Valor</span>
                  <span className="cel-details-box-cost-desc">
                    R${" "}
                    {planSelectedForDetails.cost?.toFixed(2)?.replace(".", ",")}
                  </span>
                </div>

                <div className="cel-details-box-total-box">
                  <span className="cel-details-box-total-label">Total</span>
                  <span className="cel-details-box-total-desc">
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

              <div className="cel-details-box-info">
                <div className="cel-details-box-priority-box">
                  <span className="cel-details-box-priority-label">
                    Prioridade
                  </span>
                  <span className="cel-details-box-priority-desc">
                    {planSelectedForDetails.priority}
                  </span>
                </div>

                <div className="cel-details-box-unlimited-apps-box">
                  <span className="cel-details-box-unlimited-apps-label">
                    Apps ilimitados
                  </span>
                  <span className="cel-details-box-unlimited-apps-desc">
                    {planSelectedForDetails.unlimitedApps
                      ?.toString()
                      ?.replaceAll(",", ", ")}
                  </span>
                </div>
              </div>

              <div className="cel-details-box-info">
                <div className="cel-details-box-plan-type-box">
                  <span className="cel-details-box-plan-type-label">
                    Tipo do plano
                  </span>
                  <span className="cel-details-box-plan-type-desc">
                    {planSelectedForDetails.planType}
                  </span>
                </div>

                <div className="cel-details-box-franchise-box">
                  <span className="cel-details-box-franchise-label">
                    Franquia de internet
                  </span>
                  <span className="cel-details-box-franchise-desc">
                    {planSelectedForDetails.franchise}
                  </span>
                </div>
              </div>

              <div className="cel-details-box-info">
                <div className="cel-details-box-unlimited-call-box">
                  <span className="cel-details-box-unlimited-call-label">
                    Ligações ilimitadas
                  </span>
                  <span className="cel-details-box-unlimited-call-desc">
                    {planSelectedForDetails.unlimitedCall ? "Sim" : "Não"}
                  </span>
                </div>
                {archivedAt && (
                  <div className="cel-details-box-archived-at-box">
                    <span className="cel-details-box-archived-at-label">
                      Arquivado em
                    </span>
                    <span className="cel-details-box-archived-at-desc">
                      {planSelectedForDetails?.archivedAt}
                    </span>
                  </div>
                )}
              </div>

              <div className="cel-details-box-description-box">
                <span className="cel-details-box-description-label">
                  Descrição
                </span>

                {planSelectedForDetails.description?.map((desc, index) => (
                  <span
                    key={`desc-${index}`}
                    className="cel-details-box-description-desc"
                  >
                    {desc}
                  </span>
                ))}
              </div>

              <div className="cel-details-box-buttons-wrapper">
                {planSelectedForDetails.archived ? (
                  <>
                    <button
                      type="button"
                      onClick={handleUnarchive}
                      disabled={isUnarchiving}
                      className="cel-details-box-restore-button"
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
                      disabled={isDeleting}
                      className="cel-details-box-delete-button"
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleOpenEditForm}
                      className="cel-details-box-edit-button"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={handleArchive}
                      disabled={isArchiving}
                      className="cel-details-box-archive-button"
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

export default CelDetailsBox;
