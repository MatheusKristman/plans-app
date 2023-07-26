import React from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";

const InternetDetailsBox = ({ archivedAt }) => {
  const { modalAnimation, deactivateModalAnimation, activateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow,
  );
  const {
    closeInternetDetailsBox,
    openEditInternetForm,
    planSelectedForDetails,
    setIdSelectedForDetails,
    setIdSelectedForEdit,
  } = usePlansStore(
    (state) => ({
      closeInternetDetailsBox: state.closeInternetDetailsBox,
      openEditInternetForm: state.openEditInternetForm,
      planSelectedForDetails: state.planSelectedForDetails,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
    }),
    shallow,
  );

  const handleCloseDetailsBox = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeInternetDetailsBox();
      setIdSelectedForDetails("");
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains("internet-details-box-overlay")) {
      handleCloseDetailsBox();
    }
  };

  const handleOpenEditForm = () => {
    const idSelected = planSelectedForDetails?._id;

    deactivateModalAnimation();
    setIdSelectedForEdit(idSelected);

    setTimeout(() => {
      closeInternetDetailsBox();
      setIdSelectedForDetails("");
      openEditInternetForm();
      activateModalAnimation();
    }, 800);
  };

  return (
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? "internet-details-box-overlay animate__animated animate__fast animate__fadeIn"
          : "internet-details-box-overlay animate__animated animate__fast animate__fadeOut"
      }>
      <div className="internet-details-box-container">
        <div className="internet-details-box-wrapper">
          <div className="internet-details-box-header">
            <button
              type="button"
              onClick={handleCloseDetailsBox}
              className="internet-details-box-close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="internet-details-box-title">Detalhes</h3>
          </div>

          <div className="internet-details-box-body">
            <div className="internet-details-box-info-wrapper">
              <div className="internet-details-box-info">
                <div className="internet-details-box-title-box">
                  <span className="internet-details-box-title-label">Título</span>
                  <span className="internet-details-box-title-desc">
                    {planSelectedForDetails.title}
                  </span>
                </div>

                <div className="internet-details-box-created-at-box">
                  <span className="internet-details-box-created-at-label">Criado em</span>
                  <span className="internet-details-box-created-at-desc">
                    {planSelectedForDetails.createdAt}
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-provider-box">
                  <span className="internet-details-box-provider-label">Operadora</span>
                  <img
                    src={`${import.meta.env.VITE_API_KEY}/assets/${
                      planSelectedForDetails.providerIcon
                    }`}
                    alt={planSelectedForDetails.providerIcon?.substring(
                      0,
                      planSelectedForDetails.providerIcon?.length - 4,
                    )}
                    className="internet-details-box-provider-logo"
                  />
                </div>

                <div className="internet-details-box-contacts-box">
                  <span className="internet-details-box-contacts-label">Contatos</span>
                  <span className="internet-details-box-contacts-desc">
                    {planSelectedForDetails.contacts}
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-cost-box">
                  <span className="internet-details-box-cost-label">Valor</span>
                  <span className="internet-details-box-cost-desc">
                    R$ {planSelectedForDetails.cost?.toFixed(2)?.replace(".", ",")}
                  </span>
                </div>

                <div className="internet-details-box-total-box">
                  <span className="internet-details-box-total-label">Total</span>
                  <span className="internet-details-box-total-desc">
                    R${" "}
                    {(planSelectedForDetails.cost * planSelectedForDetails.contacts)
                      ?.toFixed(2)
                      ?.replace(".", ",")}
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-priority-box">
                  <span className="internet-details-box-priority-label">Prioridade</span>
                  <span className="internet-details-box-priority-desc">
                    {planSelectedForDetails.priority}
                  </span>
                </div>

                <div className="internet-details-box-franchise-limit-box">
                  <span className="internet-details-box-franchise-limit-label">
                    Franquia de download
                  </span>
                  <span className="internet-details-box-franchise-limit-desc">
                    {planSelectedForDetails.franchiseLimit}
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-download-box">
                  <span className="internet-details-box-download-label">
                    Velocidade de download
                  </span>
                  <span className="internet-details-box-download-desc">
                    {planSelectedForDetails.download}
                  </span>
                </div>

                <div className="internet-details-box-upload-box">
                  <span className="internet-details-box-upload-label">Velocidade de upload</span>
                  <span className="internet-details-box-upload-desc">
                    {planSelectedForDetails.upload}
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-has-wifi-box">
                  <span className="internet-details-box-has-wifi-label">Wifi ilimitado?</span>
                  <span className="internet-details-box-has-wifi-desc">
                    {planSelectedForDetails.hasWifi ? "Sim" : "Não"}
                  </span>
                </div>

                <div className="internet-details-box-technology-box">
                  <span className="internet-details-box-technology-label">Tecnologia do modem</span>
                  <span className="internet-details-box-technology-desc">
                    {planSelectedForDetails.technology}
                  </span>
                </div>
              </div>

              {archivedAt && (
                <div className="internet-details-box-info">
                  <div className="internet-details-box-archived-at-box">
                    <span className="internet-details-box-archived-at-label">Arquivado em</span>
                    <span className="internet-details-box-archived-at-desc">
                      {planSelectedForDetails?.archivedAt}
                    </span>
                  </div>
                </div>
              )}

              <div className="internet-details-box-description-box">
                <span className="internet-details-box-description-label">Descrição</span>

                {planSelectedForDetails.description?.map((desc, index) => (
                  <span key={`desc-${index}`} className="internet-details-box-description-desc">
                    {desc}
                  </span>
                ))}
              </div>

              <div className="internet-details-box-buttons-wrapper">
                <button
                  type="button"
                  onClick={handleOpenEditForm}
                  className="internet-details-box-edit-button">
                  Editar
                </button>
                <button type="button" className="internet-details-box-archive-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
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
        </div>
      </div>
    </div>
  );
};

export default InternetDetailsBox;
