import React from "react";
import BenefitsLabel from "../../DashboardComponent/components/BenefitsLabel";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const EditCelPlanForm = () => {
  const { closeEditCelForm } = usePlansStore(
    (state) => ({
      closeEditCelForm: state.closeEditCelForm,
    }),
    shallow
  );
  const { deactivateModalAnimation, modalAnimation } = useGeneralStore(
    (state) => ({
      deactivateModalAnimation: state.deactivateModalAnimation,
      modalAnimation: state.modalAnimation,
    }),
    shallow
  );

  const handleCloseForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeEditCelForm();
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains("edit-cel-plan-overlay")) {
      handleCloseForm();
    }
  };

  return (
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? "edit-cel-plan-overlay animate__animated animate__fast animate__fadeIn"
          : "edit-cel-plan-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="edit-cel-plan-container">
        <div className="edit-cel-plan-wrapper">
          <div className="edit-cel-plan-header">
            <button
              type="button"
              onClick={handleCloseForm}
              className="edit-cel-plan-close-button"
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

            <h3 className="edit-cel-plan-title">Editar plano</h3>
          </div>

          <div className="edit-cel-plan-body">
            <form className="edit-cel-plan-form">
              <div className="edit-cel-plan-title-box">
                <span className="edit-cel-plan-title-label">Título</span>
                <input
                  type="text"
                  name="title"
                  className="edit-cel-plan-title-input"
                />
              </div>

              <div className="edit-cel-plan-cost-box">
                <span className="edit-cel-plan-cost-title">Valor</span>
                <input
                  type="text"
                  name="cost"
                  className="edit-cel-plan-cost-input"
                />
              </div>

              <div className="edit-cel-plan-franchise-box">
                <span className="edit-cel-plan-franchise-title">
                  Franquia de cel
                </span>
                <input
                  type="text"
                  name="franchise"
                  className="edit-cel-plan-franchise-input"
                />
                <div className="edit-cel-plan-franchise-unit-wrapper">
                  <label
                    htmlFor="franchiseMB"
                    className="edit-cel-plan-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseMB"
                      name="franchise"
                      className="edit-cel-plan-franchise-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="franchiseGB"
                    className="edit-cel-plan-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseGB"
                      name="franchise"
                      className="edit-cel-plan-franchise-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-cel-plan-unlimited-apps-box">
                <span className="edit-cel-plan-unlimited-apps-title">
                  Apps ilimitados
                </span>

                <div className="edit-cel-plan-unlimited-apps-options">
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

              <div className="edit-cel-plan-unlimited-call-box">
                <span className="edit-cel-plan-unlimited-call-title">
                  Ligação ilimitada
                </span>

                <div className="edit-cel-plan-unlimited-call-options">
                  <label
                    htmlFor="yes"
                    className="edit-cel-plan-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="unlimitedCall"
                      className="edit-cel-plna-unlimited-call-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="edit-cel-plan-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="unlimitedCall"
                      className="edit-cel-plan-unlimited-call-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="edit-cel-plan-plan-type-box">
                <span className="edit-cel-plan-plan-type-title">
                  Tipo do plano
                </span>
                <select className="edit-cel-plan-plan-type-select">
                  <option value="Controle">Controle</option>
                  <option value="Pós-pago">Pós-pago</option>
                  <option value="Pré-pago">Pré-pago</option>
                </select>
              </div>

              <div className="edit-cel-plan-priority-box">
                <span className="edit-cel-plan-priority-title">Prioridade</span>
                <select
                  name="priority"
                  className="edit-cel-plan-priority-select"
                >
                  <option className="edit-cel-plan-priority-option" value="1">
                    1
                  </option>
                  <option className="edit-cel-plan-priority-option" value="2">
                    2
                  </option>
                  <option className="edit-cel-plan-priority-option" value="3">
                    3
                  </option>
                  <option className="edit-cel-plan-priority-option" value="4">
                    4
                  </option>
                  <option className="edit-cel-plan-priority-option" value="5">
                    5
                  </option>
                  <option className="edit-cel-plan-priority-option" value="6">
                    6
                  </option>
                  <option className="edit-cel-plan-priority-option" value="7">
                    7
                  </option>
                  <option className="edit-cel-plan-priority-option" value="8">
                    8
                  </option>
                  <option className="edit-cel-plan-priority-option" value="9">
                    9
                  </option>
                  <option className="edit-cel-plan-priority-option" value="10">
                    10
                  </option>
                </select>
              </div>

              <div className="edit-cel-plan-description-box">
                <span className="edit-cel-plan-description-title">
                  Descrição
                </span>

                <textarea
                  name="description"
                  className="edit-cel-plan-description-textarea"
                />
              </div>

              <button type="submit" className="edit-cel-plan-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCelPlanForm;
