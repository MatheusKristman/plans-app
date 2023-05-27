import React from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

import BenefitsLabel from "./BenefitsLabel";

const NewCelPlanModal = () => {
  const { closeCelForm } = useDashboardComponentStore(
    (state) => ({
      closeCelForm: state.closeCelForm,
    }),
    shallow
  );
  const { desactivateModalAnimation, modalAnimation } = useGeneralStore(
    (state) => ({
      desactivateModalAnimation: state.desactivateModalAnimation,
      modalAnimation: state.modalAnimation,
    }),
    shallow
  );

  const handleCloseModal = () => {
    desactivateModalAnimation();

    setTimeout(() => {
      closeCelForm();
    }, 800);
  };

  const handleBlurToCloseModal = (e) => {
    if (e.target.classList.contains("new-cel-plan-modal-overlay")) {
      handleCloseModal();
    }
  };

  return (
    <div
      onClick={handleBlurToCloseModal}
      className={
        modalAnimation
          ? "new-cel-plan-modal-overlay animate__animated animate__fast animate__fadeIn"
          : "new-cel-plan-modal-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-cel-plan-modal-container">
        <div className="new-cel-plan-modal-wrapper">
          <div className="new-cel-plan-modal-header">
            <button
              type="button"
              onClick={handleCloseModal}
              className="new-cel-plan-modal-close-button"
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

            <h3 className="new-cel-plan-modal-title">Novo Plano</h3>
          </div>

          <div className="new-cel-plan-modal-body">
            <form className="new-cel-plan-modal-form">
              <div className="new-cel-plan-modal-provider-box">
                <span className="new-cel-plan-modal-provider-title">
                  Operadora
                </span>
                <div className="new-cel-plan-modal-provider-options">
                  <label
                    htmlFor="id1"
                    className="new-cel-plan-modal-provider-label provider-selected"
                  >
                    <div className="new-cel-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-cel-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id1"
                      type="radio"
                      className="new-cel-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id2"
                    className="new-cel-plan-modal-provider-label"
                  >
                    <div className="new-cel-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-cel-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id2"
                      type="radio"
                      className="new-cel-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id3"
                    className="new-cel-plan-modal-provider-label"
                  >
                    <div className="new-cel-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-cel-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id3"
                      type="radio"
                      className="new-cel-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id4"
                    className="new-cel-plan-modal-provider-label"
                  >
                    <div className="new-cel-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-cel-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id4"
                      type="radio"
                      className="new-cel-plan-modal-provider-item"
                    />
                  </label>
                </div>
              </div>

              <div className="new-cel-plan-modal-title-box">
                <span className="new-cel-plan-modal-title-label">Título</span>
                <input
                  type="text"
                  name="title"
                  className="new-cel-plan-modal-title-input"
                />
              </div>

              <div className="new-cel-plan-modal-cost-box">
                <span className="new-cel-plan-modal-cost-title">Valor</span>
                <input
                  type="text"
                  name="cost"
                  className="new-cel-plan-modal-cost-input"
                />
              </div>

              <div className="new-cel-plan-modal-franchise-box">
                <span className="new-cel-plan-modal-franchise-title">
                  Franquia de cel
                </span>
                <input
                  type="text"
                  name="franchise"
                  className="new-cel-plan-modal-franchise-input"
                />
                <div className="new-cel-plan-modal-franchise-unit-wrapper">
                  <label
                    htmlFor="franchiseMB"
                    className="new-cel-plan-modal-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseMB"
                      name="franchise"
                      className="new-cel-plan-modal-franchise-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="franchiseGB"
                    className="new-cel-plan-modal-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseGB"
                      name="franchise"
                      className="new-cel-plan-modal-franchise-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="new-cel-plan-modal-unlimited-apps-box">
                <span className="new-cel-plan-modal-unlimited-apps-title">
                  Apps ilimitados
                </span>

                <div className="new-cel-plan-modal-unlimited-apps-options">
                  <BenefitsLabel
                    htmlFor="whatsapp"
                    imageSrc="/assets/icons/whatsapp.png"
                    imageAlt="Whatsapp"
                    inputId="whatsapp"
                  />
                  <BenefitsLabel
                    htmlFor="telegram"
                    imageSrc="/assets/icons/telegram.png"
                    imageAlt="Telegram"
                    inputId="telegram"
                  />
                  <BenefitsLabel
                    htmlFor="instagram"
                    imageSrc="/assets/icons/instagram.png"
                    imageAlt="Instagram"
                    inputId="instagram"
                  />
                  <BenefitsLabel
                    htmlFor="facebook"
                    imageSrc="/assets/icons/facebook.png"
                    imageAlt="Facebook"
                    inputId="facebook"
                  />
                  <BenefitsLabel
                    htmlFor="messenger"
                    imageSrc="/assets/icons/messenger.png"
                    imageAlt="Messenger"
                    inputId="messenger"
                  />
                  <BenefitsLabel
                    htmlFor="twitter"
                    imageSrc="/assets/icons/twitter.png"
                    imageAlt="Twitter"
                    inputId="twitter"
                  />
                  <BenefitsLabel
                    htmlFor="waze"
                    imageSrc="/assets/icons/waze.png"
                    imageAlt="Waze"
                    inputId="waze"
                  />
                  <BenefitsLabel
                    htmlFor="cabify"
                    imageSrc="/assets/icons/cabify.png"
                    imageAlt="Cabify"
                    inputId="cabify"
                  />
                  <BenefitsLabel
                    htmlFor="easyTaxi"
                    imageSrc="/assets/icons/easy-taxi.png"
                    imageAlt="Easy Taxi"
                    inputId="easyTaxi"
                  />
                  <BenefitsLabel
                    htmlFor="moovit"
                    imageSrc="/assets/icons/moovit.png"
                    imageAlt="Moovit"
                    inputId="moovit"
                  />
                  <BenefitsLabel
                    htmlFor="tikTok"
                    imageSrc="/assets/icons/tik-tok.png"
                    imageAlt="TikTok"
                    inputId="tikTok"
                  />
                  <BenefitsLabel
                    htmlFor="netflix"
                    imageSrc="/assets/icons/netflix.png"
                    imageAlt="Netflix"
                    inputId="netflix"
                  />
                  <BenefitsLabel
                    htmlFor="youtube"
                    imageSrc="/assets/icons/youtube.png"
                    imageAlt="Youtube"
                    inputId="youtube"
                  />
                  <BenefitsLabel
                    htmlFor="claroMusica"
                    imageSrc="/assets/icons/claro-musica.png"
                    imageAlt="Claro Música"
                    inputId="claroMusica"
                  />
                </div>
              </div>

              <div className="new-cel-plan-modal-unlimited-call-box">
                <span className="new-cel-plan-modal-unlimited-call-title">
                  Ligação ilimitada
                </span>

                <div className="new-cel-plan-modal-unlimited-call-options">
                  <label
                    htmlFor="yes"
                    className="new-cel-plan-modal-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="unlimitedCall"
                      className="new-cel-plna-modal-unlimited-call-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="new-cel-plan-modal-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="unlimitedCall"
                      className="new-cel-plan-modal-unlimited-call-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="new-cel-plan-modal-plan-type-box">
                <span className="new-cel-plan-modal-plan-type-title">
                  Tipo do plano
                </span>
                <select className="new-cel-plan-modal-plan-type-select">
                  <option value="Controle">Controle</option>
                  <option value="Pós-pago">Pós-pago</option>
                  <option value="Pré-pago">Pré-pago</option>
                </select>
              </div>

              <div className="new-cel-plan-modal-priority-box">
                <span className="new-cel-plan-modal-priority-title">
                  Prioridade
                </span>
                <select
                  name="priority"
                  className="new-cel-plan-modal-priority-select"
                >
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="1"
                  >
                    1
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="2"
                  >
                    2
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="3"
                  >
                    3
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="4"
                  >
                    4
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="5"
                  >
                    5
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="6"
                  >
                    6
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="7"
                  >
                    7
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="8"
                  >
                    8
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="9"
                  >
                    9
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value="10"
                  >
                    10
                  </option>
                </select>
              </div>

              <div className="new-cel-plan-modal-description-box">
                <span className="new-cel-plan-modal-description-title">
                  Descrição
                </span>

                <textarea
                  name="description"
                  className="new-cel-plan-modal-description-textarea"
                />
              </div>

              <button
                type="submit"
                className="new-cel-plan-modal-submit-button"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCelPlanModal;
