import React from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import useProviderStore from "../../../stores/useProviderStore";

const ProviderDetailsBox = () => {
  const { modalAnimation, desactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      desactivateModalAnimation: state.desactivateModalAnimation,
    })
  );
  const { closeDetailsBox } = useProviderStore((state) => ({
    closeDetailsBox: state.closeDetailsBox,
  }));

  const handleCloseButton = () => {
    desactivateModalAnimation();

    setTimeout(() => {
      closeDetailsBox();
    }, 800);
  };

  const handleBlurToCloseBox = (e) => {
    if (e.target.classList.contains("provider-details-overlay")) {
      handleCloseButton();
    }
  };

  return (
    <div
      onClick={handleBlurToCloseBox}
      className={
        modalAnimation
          ? "provider-details-overlay animate__animated animate__fast animate__fadeIn"
          : "provider-details-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="provider-details-container">
        <div className="provider-details-wrapper">
          <div className="provider-details-header">
            <button
              type="button"
              onClick={handleCloseButton}
              className="provider-details-close-button"
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
            <h3 className="provider-details-title">Detalhes</h3>
          </div>

          <div className="provider-details-body">
            <div className="provider-details-body-wrapper">
              <div className="provider-details-provider-plans-box">
                <div className="provider-details-provider-box">
                  <span className="provider-details-provider-subtitle">
                    Operadora
                  </span>
                  <img
                    src="/assets/icons/claro.png"
                    alt="Claro"
                    className="provider-details-provider-logo"
                  />
                </div>

                <div className="provider-details-plans-box">
                  <span className="provider-details-plans-subtitle">
                    Planos cadastrados
                  </span>
                  <span className="provider-details-plans-desc">6</span>
                </div>
              </div>

              <div className="provider-details-cep-box">
                <span className="provider-details-cep-subtitle">
                  Ceps cadastrados
                </span>
                <textarea
                  className="provider-details-cep-values"
                  autoCorrect="off"
                  autoComplete="off"
                  readOnly
                />
              </div>

              <div className="provider-details-button-box">
                <button type="button" className="provider-details-edit-button">
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsBox;
