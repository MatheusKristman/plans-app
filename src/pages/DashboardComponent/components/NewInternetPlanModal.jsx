import React, { useEffect } from 'react';
import useDashboardComponentStore from '../../../stores/useDashboardComponentStore';
import useGeneralStore from '../../../stores/useGeneralStore';
import { shallow } from 'zustand/shallow';

import BenefitsLabel from './BenefitsLabel';

const NewInternetPlanModal = () => {
  const { closeInternetForm } = useDashboardComponentStore(
    (state) => ({
      closeInternetForm: state.closeInternetForm,
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

  const handleCloseModal = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeInternetForm();
    }, 800);
  };

  const handleBlurToCloseModal = (e) => {
    if (e.target.classList.contains('new-internet-plan-modal-overlay')) {
      handleCloseModal();
    }
  };

  return (
    <div
      className={
        modalAnimation
          ? 'new-internet-plan-modal-overlay animate__animated animate__fast animate__fadeIn'
          : 'new-internet-plan-modal-overlay animate__animated animate__fast animate__fadeOut'
      }
      onClick={handleBlurToCloseModal}
    >
      <div className='new-internet-plan-modal-container'>
        <div className='new-internet-plan-modal-wrapper'>
          <div className='new-internet-plan-modal-header'>
            <button
              type='button'
              className='new-internet-plan-modal-close-button'
              onClick={handleCloseModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            <h3 className='new-internet-plan-modal-title'>Novo Plano</h3>
          </div>

          <div className='new-internet-plan-modal-body'>
            <form className='new-internet-plan-modal-form'>
              <div className='new-internet-plan-modal-provider-box'>
                <span className='new-internet-plan-modal-provider-title'>Operadora</span>
                <div className='new-internet-plan-modal-provider-options'>
                  <label
                    htmlFor='id1'
                    className='new-internet-plan-modal-provider-label provider-selected'
                  >
                    <div className='new-internet-plan-modal-provider-label-logo'>
                      <img
                        src='/assets/icons/claro.png'
                        alt='Claro'
                        className='new-internet-plan-modal-provider-image'
                      />
                    </div>
                    <input
                      name='provider'
                      id='id1'
                      type='radio'
                      className='new-internet-plan-modal-provider-item'
                    />
                  </label>
                  <label htmlFor='id2' className='new-internet-plan-modal-provider-label'>
                    <div className='new-internet-plan-modal-provider-label-logo'>
                      <img
                        src='/assets/icons/claro.png'
                        alt='Claro'
                        className='new-internet-plan-modal-provider-image'
                      />
                    </div>
                    <input
                      name='provider'
                      id='id2'
                      type='radio'
                      className='new-internet-plan-modal-provider-item'
                    />
                  </label>
                  <label htmlFor='id3' className='new-internet-plan-modal-provider-label'>
                    <div className='new-internet-plan-modal-provider-label-logo'>
                      <img
                        src='/assets/icons/claro.png'
                        alt='Claro'
                        className='new-internet-plan-modal-provider-image'
                      />
                    </div>
                    <input
                      name='provider'
                      id='id3'
                      type='radio'
                      className='new-internet-plan-modal-provider-item'
                    />
                  </label>
                  <label htmlFor='id4' className='new-internet-plan-modal-provider-label'>
                    <div className='new-internet-plan-modal-provider-label-logo'>
                      <img
                        src='/assets/icons/claro.png'
                        alt='Claro'
                        className='new-internet-plan-modal-provider-image'
                      />
                    </div>
                    <input
                      name='provider'
                      id='id4'
                      type='radio'
                      className='new-internet-plan-modal-provider-item'
                    />
                  </label>
                </div>
              </div>

              <div className='new-internet-plan-modal-title-box'>
                <span className='new-internet-plan-modal-title-label'>Título</span>
                <input type='text' name='title' className='new-internet-plan-modal-title-input' />
              </div>

              <div className='new-internet-plan-modal-cost-box'>
                <span className='new-internet-plan-modal-cost-title'>Valor</span>
                <input type='text' name='cost' className='new-internet-plan-modal-cost-input' />
              </div>

              <div className='new-internet-plan-modal-installation-cost-box'>
                <span className='new-internet-plan-modal-installation-cost-title'>
                  Valor da instalação
                </span>
                <input
                  type='text'
                  name='installationCost'
                  className='new-internet-plan-modal-installation-cost-input'
                />
                <label className='new-internet-plan-modal-installation-cost-label'>
                  <input
                    type='checkbox'
                    name='installationCost'
                    className='new-internet-plan-modal-installation-cost-checkbox'
                  />
                  Instalação grátis
                </label>
              </div>

              <div className='new-internet-plan-modal-download-box'>
                <span className='new-internet-plan-modal-download-title'>
                  Velocidade de download
                </span>
                <input
                  type='text'
                  name='download'
                  className='new-internet-plan-modal-download-input'
                />

                <div className='new-internet-plan-modal-download-unit-wrapper'>
                  <label
                    htmlFor='downloadMB'
                    className='new-internet-plan-modal-download-unit-label'
                  >
                    <input
                      type='radio'
                      id='downloadMB'
                      name='downloadUnit'
                      className='new-internet-plan-modal-download-unit-input'
                    />
                    MB
                  </label>

                  <label
                    htmlFor='downloadGB'
                    className='new-internet-plan-modal-download-unit-label'
                  >
                    <input
                      type='radio'
                      id='downloadGB'
                      name='downloadUnit'
                      className='new-internet-plan-modal-download-unit-input'
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className='new-internet-plan-modal-upload-box'>
                <span className='new-internet-plan-modal-upload-title'>Velocidade de upload</span>
                <input type='text' name='upload' className='new-internet-plan-modal-upload-input' />

                <div className='new-internet-plan-modal-upload-unit-wrapper'>
                  <label htmlFor='uploadMB' className='new-internet-plan-modal-upload-unit-label'>
                    <input
                      type='radio'
                      id='uploadMB'
                      name='uploadUnit'
                      className='new-internet-plan-modal-upload-unit-input'
                    />
                    MB
                  </label>
                  <label htmlFor='uploadGB' className='new-internet-plan-modal-upload-unit-label'>
                    <input
                      type='radio'
                      id='uploadGB'
                      name='uploadUnit'
                      className='new-internet-plan-modal-upload-unit-input'
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className='new-internet-plan-modal-franchise-limit-box'>
                <span className='new-internet-plan-modal-franchise-limit-title'>
                  Franquia de download
                </span>
                <input
                  type='text'
                  name='franchiseLimit'
                  className='new-internet-plan-modal-franchise-limit-input'
                />
                <label className='new-internet-plan-modal-franchise-limit-label'>
                  <input
                    type='checkbox'
                    name='franchiseLimit'
                    className='new-internet-plan-modal-franchise-limit-checkbox'
                  />
                  Franquia ilimitada
                </label>
              </div>

              <div className='new-internet-plan-modal-technology-box'>
                <span className='new-internet-plan-modal-technology-title'>
                  Tecnologia do modem
                </span>
                <select name='technology' className='new-internet-plan-modal-technology-select'>
                  <option className='new-internet-plan-modal-technology-option' value='Fibra Ótica'>
                    Fibra Ótica
                  </option>

                  <option
                    className='new-internet-plan-modal-technology-option'
                    value='Cabo metálico'
                  >
                    Cabo metálico
                  </option>

                  <option className='new-internet-plan-modal-technology-option' value='Via Rádio'>
                    Via Rádio
                  </option>

                  <option
                    className='new-internet-plan-modal-technology-option'
                    value='Via Satélite'
                  >
                    Via Satélite
                  </option>
                </select>
              </div>

              <div className='new-internet-plan-modal-has-wifi-box'>
                <span className='new-internet-plan-modal-has-wifi-title'>Wifi incluso</span>

                <div className='new-internet-plan-modal-has-wifi-options'>
                  <label htmlFor='yes' className='new-internet-plan-modal-has-wifi-label'>
                    <input
                      type='radio'
                      id='yes'
                      name='hasWifi'
                      className='new-internet-plan-modal-has-wifi-input'
                    />
                    Sim
                  </label>

                  <label htmlFor='no' className='new-internet-plan-modal-has-wifi-label'>
                    <input
                      type='radio'
                      id='no'
                      name='hasWifi'
                      className='new-internet-plan-modal-has-wifi-input'
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className='new-internet-plan-modal-benefits-box'>
                <span className='new-internet-plan-modal-benefits-title'>Benefícios</span>

                <div className='new-internet-plan-modal-benefits-options'>
                  <BenefitsLabel
                    htmlFor='audiobookTim'
                    imageSrc='/assets/icons/audiobook-tim.png'
                    imageAlt='Audiobook Tim'
                    inputId='audiobookTim'
                  />
                  <BenefitsLabel
                    htmlFor='babbel'
                    imageSrc='/assets/icons/babbel.png'
                    imageAlt='Babbel'
                    inputId='babbel'
                  />
                  <BenefitsLabel
                    htmlFor='bandNews'
                    imageSrc='/assets/icons/band-news.png'
                    imageAlt='Band News'
                    inputId='bandNews'
                  />
                  <BenefitsLabel
                    htmlFor='bandSports'
                    imageSrc='/assets/icons/band-sports.png'
                    imageAlt='Band Sports'
                    inputId='bandSports'
                  />
                  <BenefitsLabel
                    htmlFor='paramoundChannel'
                    imageSrc='/assets/icons/paramount-channel.png'
                    imageAlt='Paramount Channel'
                    inputId='paramountChannel'
                  />
                  <BenefitsLabel
                    htmlFor='timGames'
                    imageSrc='/assets/icons/tim-games.png'
                    imageAlt='Tim Games'
                    inputId='timGames'
                  />
                  <BenefitsLabel
                    htmlFor='bancah'
                    imageSrc='/assets/icons/bancah.png'
                    imageAlt='Bancah'
                    inputId='bancah'
                  />
                  <BenefitsLabel
                    htmlFor='timSegurancaDigital'
                    imageSrc='/assets/icons/tim-seguranca-digital.png'
                    imageAlt='Tim Segurança Digital'
                    inputId='timSegurancaDigital'
                  />
                  <BenefitsLabel
                    htmlFor='instagram'
                    imageSrc='/assets/icons/instagram.png'
                    imageAlt='Instagram'
                    inputId='instagram'
                  />
                  <BenefitsLabel
                    htmlFor='facebook'
                    imageSrc='/assets/icons/facebook.png'
                    imageAlt='Facebook'
                    inputId='facebook'
                  />
                  <BenefitsLabel
                    htmlFor='twitter'
                    imageSrc='/assets/icons/twitter.png'
                    imageAlt='Twitter'
                    inputId='twitter'
                  />
                  <BenefitsLabel
                    htmlFor='whatsapp'
                    imageSrc='/assets/icons/whatsapp.png'
                    imageAlt='Whatsapp'
                    inputId='whatsapp'
                  />
                  <BenefitsLabel
                    htmlFor='waze'
                    imageSrc='/assets/icons/waze.png'
                    imageAlt='Waze'
                    inputId='waze'
                  />
                  <BenefitsLabel
                    htmlFor='skeeloAudiobooks'
                    imageSrc='/assets/icons/skeelo-audiobooks.png'
                    imageAlt='Skeelo Audiobooks'
                    inputId='skeeloAudiobooks'
                  />
                  <BenefitsLabel
                    htmlFor='funKids'
                    imageSrc='/assets/icons/funkids.png'
                    imageAlt='FunKids'
                    inputId='funKids'
                  />
                  <BenefitsLabel
                    htmlFor='ubookJornais'
                    imageSrc='/assets/icons/ubook-jornais.png'
                    imageAlt='Ubook Jornais'
                    inputId='ubookJornais'
                  />
                  <BenefitsLabel
                    htmlFor='estadioTntSports'
                    imageSrc='/assets/icons/estadio-tnt-sports.png'
                    imageAlt='Estadio TNT Sports'
                    inputId='estadioTntSports'
                  />
                  <BenefitsLabel
                    htmlFor='newCoPlus'
                    imageSrc='/assets/icons/new-co-plus.png'
                    imageAlt='New Co+'
                    inputId='newCoPlus'
                  />
                  <BenefitsLabel
                    htmlFor='lionsgatePlus'
                    imageSrc='/assets/icons/lionsgate-plus.png'
                    imageAlt='Lionsgate+'
                    inputId='lionsgatePlus'
                  />
                  <BenefitsLabel
                    htmlFor='clubeDeRevistas'
                    imageSrc='/assets/icons/clube-de-revistas.png'
                    imageAlt='Clube de Revistas'
                    inputId='clubeDeRevistas'
                  />
                  <BenefitsLabel
                    htmlFor='oiPlay'
                    imageSrc='/assets/icons/oi-play.png'
                    imageAlt='Oi Play'
                    inputId='oiPlay'
                  />
                  <BenefitsLabel
                    htmlFor='oiExpert'
                    imageSrc='/assets/icons/oi-expert.png'
                    imageAlt='Oi Expert'
                    inputId='oiExpert'
                  />
                  <BenefitsLabel
                    htmlFor='mcafee'
                    imageSrc='/assets/icons/mcafee.png'
                    imageAlt='McAfee'
                    inputId='mcafee'
                  />
                  <BenefitsLabel
                    htmlFor='playKids'
                    imageSrc='/assets/icons/playkids.png'
                    imageAlt='PlayKids'
                    inputId='playKids'
                  />
                  <BenefitsLabel
                    htmlFor='dgo'
                    imageSrc='/assets/icons/dgo.png'
                    imageAlt='GBO'
                    inputId='dgo'
                  />
                </div>
              </div>

              <div className='new-internet-plan-modal-priority-box'>
                <span className='new-internet-plan-modal-priority-title'>Prioridade</span>
                <select name='priority' className='new-internet-plan-modal-priority-select'>
                  <option className='new-internet-plan-modal-priority-option' value='1'>
                    1
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='2'>
                    2
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='3'>
                    3
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='4'>
                    4
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='5'>
                    5
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='6'>
                    6
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='7'>
                    7
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='8'>
                    8
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='9'>
                    9
                  </option>
                  <option className='new-internet-plan-modal-priority-option' value='10'>
                    10
                  </option>
                </select>
              </div>

              <div className='new-internet-plan-modal-description-box'>
                <span className='new-internet-plan-modal-description-title'>Descrição</span>

                <textarea
                  name='description'
                  className='new-internet-plan-modal-description-textarea'
                />
              </div>

              <button type='submit' className='new-internet-plan-modal-submit-button'>
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInternetPlanModal;
