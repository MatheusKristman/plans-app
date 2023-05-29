import React from "react";

import BenefitsLabel from "../../DashboardComponent/components/BenefitsLabel";

const EditInternetPlanForm = () => {
  return (
    <div className="edit-internet-plan-overlay">
      <div className="edit-internet-plan-container">
        <div className="edit-internet-plan-wrapper">
          <div className="edit-internet-plan-header">
            <button type="button" className="edit-internet-plan-close-button">
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
            <h3 className="edit-internet-plan-title">Editar Plano</h3>
          </div>

          <div className="edit-internet-plan-body">
            <form className="edit-internet-plan-form">
              <div className="edit-internet-plan-title-box">
                <span className="edit-internet-plan-title-label">Título</span>
                <input
                  type="text"
                  name="title"
                  className="edit-internet-plan-title-input"
                />
              </div>

              <div className="edit-internet-plan-cost-box">
                <span className="edit-internet-plan-cost-title">Valor</span>
                <input
                  type="text"
                  name="cost"
                  className="edit-internet-plan-cost-input"
                />
              </div>

              <div className="edit-internet-plan-installation-cost-box">
                <span className="edit-internet-plan-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  type="text"
                  name="installationCost"
                  className="edit-internet-plan-installation-cost-input"
                />
                <label
                  htmlFor="freeInstallationCost"
                  className="edit-internet-plan-installation-cost-label"
                >
                  <input
                    type="checkbox"
                    name="installationCost"
                    id="freeInstallationCost"
                    className="edit-internet-plan-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="edit-internet-plan-download-box">
                <span className="edit-internet-plan-download-title">
                  Velocidade de download
                </span>

                <input
                  type="text"
                  name="download"
                  className="edit-internet-plan-download-input"
                />

                <div className="edit-internet-plan-download-unit-wrapper">
                  <label
                    htmlFor="downloadMB"
                    className="edit-internet-plan-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadMB"
                      name="downloadUnit"
                      className="edit-internet-plan-download-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="downloadGB"
                    className="edit-internet-plan-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadGB"
                      name="downloadUnit"
                      className="edit-internet-plan-download-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-upload-box">
                <span className="edit-internet-plan-upload-title">
                  Velocidade de upload
                </span>

                <input
                  type="text"
                  name="upload"
                  className="edit-internet-plan-upload-input"
                />

                <div className="edit-internet-plan-upload-unit-wrapper">
                  <label
                    htmlFor="uploadMB"
                    className="edit-internet-plan-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadMB"
                      name="uploadUnit"
                      className="edit-internet-plan-upload-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="uploadGB"
                    className="edit-internet-plan-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadGB"
                      name="uploadUnit"
                      className="edit-internet-plan-upload-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-franchise-limit-box">
                <span className="edit-internet-plan-franchise-limit-title">
                  Franquia de download
                </span>

                <input
                  type="text"
                  name="franchiseLimit"
                  className="edit-internet-plan-franchise-limit-input"
                />

                <label
                  htmlFor="unlimitedFranchise"
                  className="edit-internet-plan-franchise-limit-label"
                >
                  <input
                    type="checkbox"
                    id="unlimitedFranchise"
                    name="franchiseLimit"
                    className="edit-internet-plan-franchise-limit-checkbox"
                  />
                  Franquia ilimitada
                </label>
              </div>

              <div className="edit-internet-plan-technology-box">
                <span className="edit-internet-plan-technology-title">
                  Tecnologia da internet
                </span>

                <select
                  name="technology"
                  className="edit-internet-plan-technology-select"
                >
                  <option value="Fibra Ótica">Fibra Ótica</option>

                  <option value="Cabo metálico">Cabo metálico</option>

                  <option value="Via Rádio">Via Rádio</option>

                  <option value="Via Satélite">Via Satélite</option>
                </select>
              </div>

              <div className="edit-internet-plan-has-wifi-box">
                <span className="edit-internet-plan-has-wifi-title">
                  Wifi incluso?
                </span>

                <div className="edit-internet-plan-has-wifi-wrapper">
                  <label
                    htmlFor="yes"
                    className="edit-internet-plan-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="hasWifi"
                      className="edit-internet-plan-has-wifi-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="edit-internet-plan-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="hasWifi"
                      className="edit-internet-plan-has-wifi-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-benefits-box">
                <span className="edit-internet-plan-benefits-title">
                  Benefícios
                </span>
                <div className="edit-internet-plan-benefits-options">
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

              <div className="edit-internet-plan-priority-box">
                <span className="edit-internet-plan-priority-title">
                  Prioridade
                </span>

                <select
                  name="priority"
                  className="edit-internet-plan-priority-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="edit-internet-plan-description-box">
                <span className="edit-internet-plan-description-title">
                  Descrição
                </span>
                <textarea
                  name="description"
                  className="edit-internet-plan-description-textarea"
                />
              </div>

              <button
                type="submit"
                className="edit-internet-plan-submit-button"
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

export default EditInternetPlanForm;
