import React from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";

const InternetDetailsBox = ({ archivedAt }) => {
  const { modalAnimation, deactivateModalAnimation, activateModalAnimation } =
    useGeneralStore(
      (state) => ({
        modalAnimation: state.modalAnimation,
        deactivateModalAnimation: state.deactivateModalAnimation,
        activateModalAnimation: state.activateModalAnimation,
      }),
      shallow
    );
  const { closeInternetDetailsBox, openEditInternetForm } = usePlansStore(
    (state) => ({
      closeInternetDetailsBox: state.closeInternetDetailsBox,
      openEditInternetForm: state.openEditInternetForm,
    }),
    shallow
  );

  const handleCloseDetailsBox = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeInternetDetailsBox();
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains("internet-details-box-overlay")) {
      handleCloseDetailsBox();
    }
  };

  const handleOpenEditForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeInternetDetailsBox();
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
      }
    >
      <div className="internet-details-box-container">
        <div className="internet-details-box-wrapper">
          <div className="internet-details-box-header">
            <button
              type="button"
              onClick={handleCloseDetailsBox}
              className="internet-details-box-close-button"
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

            <h3 className="internet-details-box-title">Detalhes</h3>
          </div>

          <div className="internet-details-box-body">
            <div className="internet-details-box-info-wrapper">
              <div className="internet-details-box-info">
                <div className="internet-details-box-title-box">
                  <span className="internet-details-box-title-label">
                    Título
                  </span>
                  <span className="internet-details-box-title-desc">
                    Claro Banda Larga 250MB
                  </span>
                </div>

                <div className="internet-details-box-created-at-box">
                  <span className="internet-details-box-created-at-label">
                    Criado em
                  </span>
                  <span className="internet-details-box-created-at-desc">
                    24/03/2023
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-provider-box">
                  <span className="internet-details-box-provider-label">
                    Operadora
                  </span>
                  <img
                    src="/assets/icons/claro.png"
                    alt="Claro"
                    className="internet-details-box-provider-logo"
                  />
                </div>

                <div className="internet-details-box-contacts-box">
                  <span className="internet-details-box-contacts-label">
                    Contatos
                  </span>
                  <span className="internet-details-box-contacts-desc">5</span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-cost-box">
                  <span className="internet-details-box-cost-label">Valor</span>
                  <span className="internet-details-box-cost-desc">
                    R$ 49,90
                  </span>
                </div>

                <div className="internet-details-box-total-box">
                  <span className="internet-details-box-total-label">
                    Total
                  </span>
                  <span className="internet-details-box-total-desc">
                    R$ 49,90
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-priority-box">
                  <span className="internet-details-box-priority-label">
                    Prioridade
                  </span>
                  <span className="internet-details-box-priority-desc">2</span>
                </div>

                <div className="internet-details-box-franchise-limit-box">
                  <span className="internet-details-box-franchise-limit-label">
                    Franquia de download
                  </span>
                  <span className="internet-details-box-franchise-limit-desc">
                    Ilimitado
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-download-box">
                  <span className="internet-details-box-download-label">
                    Velocidade de download
                  </span>
                  <span className="internet-details-box-download-desc">
                    250MB
                  </span>
                </div>

                <div className="internet-details-box-upload-box">
                  <span className="internet-details-box-upload-label">
                    Velocidade de upload
                  </span>
                  <span className="internet-details-box-upload-desc">
                    100MB
                  </span>
                </div>
              </div>

              <div className="internet-details-box-info">
                <div className="internet-details-box-has-wifi-box">
                  <span className="internet-details-box-has-wifi-label">
                    Wifi ilimitado?
                  </span>
                  <span className="internet-details-box-has-wifi-desc">
                    Sim
                  </span>
                </div>

                <div className="internet-details-box-technology-box">
                  <span className="internet-details-box-technology-label">
                    Tecnologia do modem
                  </span>
                  <span className="internet-details-box-technology-desc">
                    Fibra ótica
                  </span>
                </div>
              </div>

              {archivedAt && (
                <div className="internet-details-box-info">
                  <div className="internet-details-box-archived-at-box">
                    <span className="internet-details-box-archived-at-label">
                      Arquivado em
                    </span>
                    <span className="internet-details-box-archived-at-desc">
                      30/05/2023
                    </span>
                  </div>
                </div>
              )}

              <div className="internet-details-box-description-box">
                <span className="internet-details-box-description-label">
                  Descrição
                </span>
                <span className="internet-details-box-description-desc">
                  Descrição teste
                </span>
              </div>

              <div className="internet-details-box-buttons-wrapper">
                <button
                  type="button"
                  onClick={handleOpenEditForm}
                  className="internet-details-box-edit-button"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="internet-details-box-archive-button"
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
        </div>
      </div>
    </div>
  );
};

export default InternetDetailsBox;
