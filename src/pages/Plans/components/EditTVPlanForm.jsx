import React from 'react';
import usePlansStore from '../../../stores/usePlansStore';
import useGeneralStore from '../../../stores/useGeneralStore';

import BenefitsLabel from '../../DashboardComponent/components/BenefitsLabel';

const EditTVPlanForm = () => {
  const { closeEditTVForm } = usePlansStore((state) => ({
    closeEditTVForm: state.closeEditTVForm,
  }));
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore((state) => ({
    modalAnimation: state.modalAnimation,
    deactivateModalAnimation: state.deactivateModalAnimation,
  }));

  const handleCloseForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeEditTVForm();
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains('edit-tv-plan-overlay')) {
      handleCloseForm();
    }
  };

  return (
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? 'edit-tv-plan-overlay animate__animated animate__fast animate__fadeIn'
          : 'edit-tv-plan-overlay animate__animated animate__fast animate__fadeOut'
      }
    >
      <div className='edit-tv-plan-container'>
        <div className='edit-tv-plan-wrapper'>
          <div className='edit-tv-plan-header'>
            <button type='button' onClick={handleCloseForm} className='edit-tv-plan-close-button'>
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

            <h3 className='edit-tv-plan-title'>Editar Plano</h3>
          </div>

          <div className='edit-tv-plan-body'>
            <form className='edit-tv-plan-form'>
              <div className='edit-tv-plan-title-box'>
                <span className='edit-tv-plan-title-label'>Título</span>
                <input type='text' name='title' className='edit-tv-plan-title-input' />
              </div>

              <div className='edit-tv-plan-cost-box'>
                <span className='edit-tv-plan-cost-title'>Valor</span>
                <input type='text' name='cost' className='edit-tv-plan-cost-input' />
              </div>

              <div className='edit-tv-plan-cost-changes-after-period-box'>
                <span className='edit-tv-plan-cost-changes-after-period-title'>
                  Valor muda depois de um período?
                </span>

                <div className='edit-tv-plan-cost-changes-after-period-options'>
                  <label htmlFor='yes' className='edit-tv-plan-cost-changes-after-period-label'>
                    <input
                      type='radio'
                      id='yes'
                      name='costChangesAfterPeriod'
                      className='edit-tv-plan-cost-changes-after-period-input'
                    />
                    Sim
                  </label>

                  <label htmlFor='no' className='edit-tv-plan-cost-changes-after-period-label'>
                    <input
                      type='radio'
                      id='no'
                      name='costChangesAfterPeriod'
                      className='edit-tv-plan-cost-changes-after-period-input'
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className='edit-tv-plan-after-cost-box'>
                <span className='edit-tv-plan-after-cost-title'>Valor depois do período</span>
                <input type='text' name='afterCost' className='edit-tv-plan-after-cost-input' />
              </div>

              <div className='edit-tv-plan-period-to-change-cost-box'>
                <span className='edit-tv-plan-period-to-change-cost-title'>
                  A partir de qual mês?
                </span>
                <div className='edit-tv-plan-period-to-change-cost-wrapper'>
                  <input
                    type='text'
                    name='periodToChangeCost'
                    className='edit-tv-plan-period-to-change-cost-input'
                  />
                  <span className='edit-tv-plan-period-to-change-cost-tag'>°</span>
                </div>
              </div>

              <div className='edit-tv-plan-installation-cost-box'>
                <span className='edit-tv-plan-installation-cost-title'>Valor da instalação</span>
                <input
                  type='text'
                  name='installationCost'
                  className='edit-tv-plan-installation-cost-input'
                />

                <label
                  htmlFor='freeInstallationCost'
                  className='edit-tv-plan-installation-cost-label'
                >
                  <input
                    type='checkbox'
                    id='freeInstallationCost'
                    name='installationCost'
                    className='edit-tv-plan-installation-cost-checkbox'
                  />
                  Instalação grátis
                </label>
              </div>

              <div className='edit-tv-plan-devices-box'>
                <span className='edit-tv-plan-devices-title'>Pontos de TV</span>
                <select name='devices' className='edit-tv-plan-devices-select'>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>

              <div className='edit-tv-plan-benefits-box'>
                <span className='edit-tv-plan-benefits-title'>Benefícios</span>
                <div className='edit-tv-plan-benefits-options'>
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

              <div className='edit-tv-plan-priority-box'>
                <span className='edit-tv-plan-priority-title'>Prioridade</span>
                <select name='priority' className='edit-tv-plan-priority-select'>
                  <option className='edit-tv-plan-priority-option' value='1'>
                    1
                  </option>
                  <option className='edit-tv-plan-priority-option' value='2'>
                    2
                  </option>
                  <option className='edit-tv-plan-priority-option' value='3'>
                    3
                  </option>
                  <option className='edit-tv-plan-priority-option' value='4'>
                    4
                  </option>
                  <option className='edit-tv-plan-priority-option' value='5'>
                    5
                  </option>
                  <option className='edit-tv-plan-priority-option' value='6'>
                    6
                  </option>
                  <option className='edit-tv-plan-priority-option' value='7'>
                    7
                  </option>
                  <option className='edit-tv-plan-priority-option' value='8'>
                    8
                  </option>
                  <option className='edit-tv-plan-priority-option' value='9'>
                    9
                  </option>
                  <option className='edit-tv-plan-priority-option' value='10'>
                    10
                  </option>
                </select>
              </div>

              <div className='edit-tv-plan-description-box'>
                <span className='edit-tv-plan-description-title'>Descrição</span>
                <textarea name='description' className='edit-tv-plan-description-textarea' />
              </div>

              <button type='submit' className='edit-tv-plan-submit-button'>
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTVPlanForm;
