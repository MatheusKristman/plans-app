import React from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

import BenefitsLabel from "./BenefitsLabel";

const NewTVPlanModal = () => {
  const { closeTVForm } = useDashboardComponentStore(
    (state) => ({
      closeTVForm: state.closeTVForm,
    }),
    shallow
  );
  const { desactivateModalAnimation, modalAnimation } = useGeneralStore(
    (state) => ({
      desactivateModalAnimation: state.desactivateModalAnimation,
      modalAnimation: state.modalAnimation,
    })
  );

  const handleCloseModal = () => {
    desactivateModalAnimation();

    setTimeout(() => {
      closeTVForm();
    }, 800);
  };

  const handleBlurToCloseModal = (e) => {
    if (e.target.classList.contains("new-tv-plan-modal-overlay")) {
      handleCloseModal();
    }
  };

  return (
    <div
      onClick={handleBlurToCloseModal}
      className={
        modalAnimation
          ? "new-tv-plan-modal-overlay animate__animated animate__fast animate__fadeIn"
          : "new-tv-plan-modal-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-tv-plan-modal-container">
        <div className="new-tv-plan-modal-wrapper">
          <div className="new-tv-plan-modal-header">
            <button
              type="button"
              onClick={handleCloseModal}
              className="new-tv-plan-modal-close-button"
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

            <h3 className="new-tv-plan-modal-title">Novo Plano</h3>
          </div>

          <div className="new-tv-plan-modal-body">
            <form className="new-tv-plan-modal-form">
              <div className="new-tv-plan-modal-provider-box">
                <span className="new-tv-plan-modal-provider-title">
                  Operadora
                </span>
                <div className="new-tv-plan-modal-provider-options">
                  <label
                    htmlFor="id1"
                    className="new-tv-plan-modal-provider-label provider-selected"
                  >
                    <div className="new-tv-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-tv-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id1"
                      type="radio"
                      className="new-tv-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id2"
                    className="new-tv-plan-modal-provider-label"
                  >
                    <div className="new-tv-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-tv-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id2"
                      type="radio"
                      className="new-tv-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id3"
                    className="new-tv-plan-modal-provider-label"
                  >
                    <div className="new-tv-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-tv-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id3"
                      type="radio"
                      className="new-tv-plan-modal-provider-item"
                    />
                  </label>
                  <label
                    htmlFor="id4"
                    className="new-tv-plan-modal-provider-label"
                  >
                    <div className="new-tv-plan-modal-provider-label-logo">
                      <img
                        src="/assets/icons/claro.png"
                        alt="Claro"
                        className="new-tv-plan-modal-provider-image"
                      />
                    </div>
                    <input
                      name="provider"
                      id="id4"
                      type="radio"
                      className="new-tv-plan-modal-provider-item"
                    />
                  </label>
                </div>
              </div>

              <div className="new-tv-plan-modal-title-box">
                <span className="new-tv-plan-modal-title-label">Título</span>
                <input
                  type="text"
                  name="title"
                  className="new-tv-plan-modal-title-input"
                />
              </div>

              <div className="new-tv-plan-modal-cost-box">
                <span className="new-tv-plan-modal-cost-title">Valor</span>
                <input
                  type="text"
                  name="cost"
                  className="new-tv-plan-modal-cost-input"
                />
              </div>

              <div className="new-tv-plan-modal-cost-changes-after-period-box">
                <span className="new-tv-plan-modal-cost-changes-after-period-title">
                  Valor muda depois de um periodo?
                </span>

                <div className="new-tv-plan-modal-cost-changes-after-period-options">
                  <label
                    htmlFor="yes"
                    className="new-tv-plan-modal-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="costChangesAfterPeriod"
                      className="new-tv-plan-modal-cost-changes-after-period-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="new-tv-plan-modal-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="costChangesAfterPeriod"
                      className="new-tv-plan-modal-cost-changes-after-period-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="new-tv-plan-modal-after-cost-box">
                <span className="new-tv-plan-modal-after-cost-title">
                  Valor depois do periodo
                </span>
                <input
                  type="text"
                  name="afterCost"
                  className="new-tv-plan-modal-after-cost-input"
                />
              </div>

              <div className="new-tv-plan-modal-period-to-change-cost-box">
                <span className="new-tv-plan-modal-period-to-change-cost-title">
                  A partir de qual mês?
                </span>
                <div className="new-tv-plan-modal-period-to-change-cost-wrapper">
                  <input
                    type="text"
                    name="periodToChangeCost"
                    className="new-tv-plan-modal-period-to-change-cost-input"
                  />
                  <span className="new-tv-plan-modal-period-to-change-cost-tag">
                    °
                  </span>
                </div>
              </div>

              <div className="new-tv-plan-modal-installation-cost-box">
                <span className="new-tv-plan-modal-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  type="text"
                  name="installationCost"
                  className="new-tv-plan-modal-installation-cost-input"
                />

                <label
                  htmlFor="freeInstallationCost"
                  className="new-tv-plan-modal-installation-cost-label"
                >
                  <input
                    type="checkbox"
                    id="freeInstallationCost"
                    name="installationCost"
                    className="new-tv-plan-modal-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="new-tv-plan-modal-devices-box">
                <span className="new-tv-plan-modal-devices-title">
                  Pontos de TV
                </span>
                <select
                  name="devices"
                  className="new-tv-plan-modal-devices-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="new-tv-plan-modal-benefits-box">
                <span className="new-tv-plan-modal-benefits-title">
                  Benefícios
                </span>
                <div className="new-tv-plan-modal-benefits-options">
                  <BenefitsLabel
                    htmlFor="audiobookTim"
                    imageSrc="/assets/icons/audiobook-tim.png"
                    imageAlt="Audiobook Tim"
                    inputId="audiobookTim"
                  />
                  <BenefitsLabel
                    htmlFor="babbel"
                    imageSrc="/assets/icons/babbel.png"
                    imageAlt="Babbel"
                    inputId="babbel"
                  />
                  <BenefitsLabel
                    htmlFor="bandNews"
                    imageSrc="/assets/icons/band-news.png"
                    imageAlt="Band News"
                    inputId="bandNews"
                  />
                  <BenefitsLabel
                    htmlFor="bandSports"
                    imageSrc="/assets/icons/band-sports.png"
                    imageAlt="Band Sports"
                    inputId="bandSports"
                  />
                  <BenefitsLabel
                    htmlFor="paramoundChannel"
                    imageSrc="/assets/icons/paramount-channel.png"
                    imageAlt="Paramount Channel"
                    inputId="paramountChannel"
                  />
                  <BenefitsLabel
                    htmlFor="timGames"
                    imageSrc="/assets/icons/tim-games.png"
                    imageAlt="Tim Games"
                    inputId="timGames"
                  />
                  <BenefitsLabel
                    htmlFor="bancah"
                    imageSrc="/assets/icons/bancah.png"
                    imageAlt="Bancah"
                    inputId="bancah"
                  />
                  <BenefitsLabel
                    htmlFor="timSegurancaDigital"
                    imageSrc="/assets/icons/tim-seguranca-digital.png"
                    imageAlt="Tim Segurança Digital"
                    inputId="timSegurancaDigital"
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
                    htmlFor="twitter"
                    imageSrc="/assets/icons/twitter.png"
                    imageAlt="Twitter"
                    inputId="twitter"
                  />
                  <BenefitsLabel
                    htmlFor="whatsapp"
                    imageSrc="/assets/icons/whatsapp.png"
                    imageAlt="Whatsapp"
                    inputId="whatsapp"
                  />
                  <BenefitsLabel
                    htmlFor="waze"
                    imageSrc="/assets/icons/waze.png"
                    imageAlt="Waze"
                    inputId="waze"
                  />
                  <BenefitsLabel
                    htmlFor="skeeloAudiobooks"
                    imageSrc="/assets/icons/skeelo-audiobooks.png"
                    imageAlt="Skeelo Audiobooks"
                    inputId="skeeloAudiobooks"
                  />
                  <BenefitsLabel
                    htmlFor="funKids"
                    imageSrc="/assets/icons/funkids.png"
                    imageAlt="FunKids"
                    inputId="funKids"
                  />
                  <BenefitsLabel
                    htmlFor="ubookJornais"
                    imageSrc="/assets/icons/ubook-jornais.png"
                    imageAlt="Ubook Jornais"
                    inputId="ubookJornais"
                  />
                  <BenefitsLabel
                    htmlFor="estadioTntSports"
                    imageSrc="/assets/icons/estadio-tnt-sports.png"
                    imageAlt="Estadio TNT Sports"
                    inputId="estadioTntSports"
                  />
                  <BenefitsLabel
                    htmlFor="newCoPlus"
                    imageSrc="/assets/icons/new-co-plus.png"
                    imageAlt="New Co+"
                    inputId="newCoPlus"
                  />
                  <BenefitsLabel
                    htmlFor="lionsgatePlus"
                    imageSrc="/assets/icons/lionsgate-plus.png"
                    imageAlt="Lionsgate+"
                    inputId="lionsgatePlus"
                  />
                  <BenefitsLabel
                    htmlFor="clubeDeRevistas"
                    imageSrc="/assets/icons/clube-de-revistas.png"
                    imageAlt="Clube de Revistas"
                    inputId="clubeDeRevistas"
                  />
                  <BenefitsLabel
                    htmlFor="oiPlay"
                    imageSrc="/assets/icons/oi-play.png"
                    imageAlt="Oi Play"
                    inputId="oiPlay"
                  />
                  <BenefitsLabel
                    htmlFor="oiExpert"
                    imageSrc="/assets/icons/oi-expert.png"
                    imageAlt="Oi Expert"
                    inputId="oiExpert"
                  />
                  <BenefitsLabel
                    htmlFor="mcafee"
                    imageSrc="/assets/icons/mcafee.png"
                    imageAlt="McAfee"
                    inputId="mcafee"
                  />
                  <BenefitsLabel
                    htmlFor="playKids"
                    imageSrc="/assets/icons/playkids.png"
                    imageAlt="PlayKids"
                    inputId="playKids"
                  />
                  <BenefitsLabel
                    htmlFor="dgo"
                    imageSrc="/assets/icons/dgo.png"
                    imageAlt="GBO"
                    inputId="dgo"
                  />
                </div>
              </div>

              <div className="new-tv-plan-modal-priority-box">
                <span className="new-tv-plan-modal-priority-title">
                  Prioridade
                </span>
                <select
                  name="priority"
                  className="new-tv-plan-modal-priority-select"
                >
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="1"
                  >
                    1
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="2"
                  >
                    2
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="3"
                  >
                    3
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="4"
                  >
                    4
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="5"
                  >
                    5
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="6"
                  >
                    6
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="7"
                  >
                    7
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="8"
                  >
                    8
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="9"
                  >
                    9
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value="10"
                  >
                    10
                  </option>
                </select>
              </div>

              <div className="new-tv-plan-modal-description-box">
                <span className="new-tv-plan-modal-description-title">
                  Descrição
                </span>
                <textarea
                  name="description"
                  className="new-tv-plan-modal-description-textarea"
                />
              </div>

              <button type="submit" className="new-tv-plan-modal-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTVPlanModal;
