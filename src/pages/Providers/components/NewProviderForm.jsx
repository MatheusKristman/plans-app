import React from "react";
import useProviderStore from "../../../stores/useProviderStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const NewProviderForm = () => {
  const { closeNewProviderForm } = useProviderStore(
    (state) => ({
      closeNewProviderForm: state.closeNewProviderForm,
    }),
    shallow
  );
  const { modalAnimation, desactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      desactivateModalAnimation: state.desactivateModalAnimation,
    }),
    shallow
  );

  const handleCloseButton = () => {
    desactivateModalAnimation();

    setTimeout(() => {
      closeNewProviderForm();
    }, 800);
  };

  const handleBlurCloseForm = (e) => {
    if (e.target.classList.contains("new-provider-form-overlay")) {
      handleCloseButton();
    }
  };

  return (
    <div
      onClick={handleBlurCloseForm}
      className={
        modalAnimation
          ? "new-provider-form-overlay animate__animated animate__fast animate__fadeIn"
          : "new-provider-form-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-provider-form-container">
        <div className="new-provider-form-wrapper">
          <div className="new-provider-form-header">
            <button
              type="button"
              onClick={handleCloseButton}
              className="new-provider-form-close-button"
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

            <h3 className="new-provider-form-title">Nova Operadora</h3>
          </div>

          <div className="new-provider-form-body">
            <form className="new-provider-form-form">
              <div className="new-provider-form-logo-box">
                <span className="new-provider-form-logo-title">Logo</span>
                <label
                  htmlFor="providerLogo"
                  className="new-provider-form-logo-label"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>

                  <input
                    type="file"
                    id="providerLogo"
                    name="providerLogo"
                    className="new-provider-form-logo-input"
                  />
                </label>
              </div>

              <div className="new-provider-form-provider-name-box">
                <span className="new-provider-form-provider-name-label">
                  Nome da operadora
                </span>

                <input
                  type="text"
                  autoCorrect="off"
                  autoComplete="off"
                  name="providerName"
                  className="new-provider-form-provider-name-input"
                />
              </div>

              <div className="new-provider-form-cep-box">
                <span className="new-provider-form-cep-title">
                  Ceps de cobertura
                </span>

                <label className="new-provider-form-cep-label">
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Converter lista XML
                  <input
                    type="file"
                    name="providerCepXML"
                    className="new-provider-form-cep-xml-converter-input"
                  />
                </label>

                <textarea
                  name="providerCep"
                  autoComplete="off"
                  autoCorrect="off"
                  className="new-provider-form-cep-textarea"
                />
              </div>

              <button type="submit" className="new-provider-form-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProviderForm;
