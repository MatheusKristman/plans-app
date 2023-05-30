import React from 'react';

const CelDetailsBox = () => {
  return (
    <div className='cel-details-box-overlay'>
      <div className='cel-details-box-container'>
        <div className='cel-details-box-wrapper'>
          <div className='cel-details-box-header'>
            <button type='button' className='cel-details-box-close-button'>
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

            <h3 className='cel-details-box-title'>Detalhes</h3>
          </div>

          <div className='cel-details-box-body'>
            <div className='cel-details-box-info-wrapper'>
              <div className='cel-details-box-info'>
                <div className='cel-details-box-title-box'>
                  <span className='cel-details-box-title-label'>Título</span>
                  <span className='cel-details-box-title-desc'>Claro Controle 25GB Fidelizado</span>
                </div>

                <div className='cel-details-box-created-at-box'>
                  <span className='cel-details-box-created-at-label'>Criado em</span>
                  <span className='cel-details-box-created-at-desc'>23/03/2023</span>
                </div>
              </div>

              <div className='cel-details-box-info'>
                <div className='cel-details-box-provider-box'>
                  <span className='cel-details-box-provider-label'>Operadora</span>
                  <img src='/assets/icons/claro.png' className='cel-details-box-provider-logo' />
                </div>

                <div className='cel-details-box-contacts-box'>
                  <span className='cel-details-box-contacts-label'>Contatos</span>
                  <span className='cel-details-box-contacts-desc'>5</span>
                </div>
              </div>

              <div className='cel-details-box-info'>
                <div className='cel-details-box-cost-box'>
                  <span className='cel-details-box-cost-label'>Valor</span>
                  <span className='cel-details-box-cost-desc'>R$ 49,90</span>
                </div>

                <div className='cel-details-box-total-box'>
                  <span className='cel-details-box-total-label'>Total</span>
                  <span className='cel-details-box-total-desc'>R$ 100,00</span>
                </div>
              </div>

              <div className='cel-details-box-info'>
                <div className='cel-details-box-priority-box'>
                  <span className='cel-details-box-priority-label'>Prioridade</span>
                  <span className='cel-details-box-priority-desc'>2</span>
                </div>

                <div className='cel-details-box-unlimited-apps-box'>
                  <span className='cel-details-box-unlimited-apps-label'>Apps ilimitados</span>
                  <span className='cel-details-box-unlimited-apps-desc'>Whatsapp, Instagram</span>
                </div>
              </div>

              <div className='cel-details-box-info'>
                <div className='cel-details-box-plan-type-box'>
                  <span className='cel-details-box-plan-type-label'>Tipo do plano</span>
                  <span className='cel-details-box-plan-type-desc'>Controle</span>
                </div>

                <div className='cel-details-box-franchise-box'>
                  <span className='cel-details-box-franchise-label'>Franquia de internet</span>
                  <span className='cel-details-box-franchise-desc'>25GB</span>
                </div>
              </div>

              <div className='cel-details-box-info'>
                <div className='cel-details-box-unlimited-call-box'>
                  <span className='cel-details-box-unlimited-call-label'>Ligações ilimitadas</span>
                  <span className='cel-details-box-unlimited-call-desc'>Sim</span>
                </div>
              </div>

              <div className='cel-details-box-description-box'>
                <span className='cel-details-box-description-label'>Descrição</span>
                <span className='cel-details-box-description-desc'>
                  **6GB no plano + 3GB bônus do pagamento por débito automático + 3GB bônus do
                  pagamento por fatura digital + 6GB bônus para Instagram, Tiktok, Twitter,
                  Facebook, Pinterest, Tinder, Messenger, Youtube. *Assinaturas inclusas: GoRead,
                  Babbel, Vivo Pay, Skeelo, Hube Jornais{' '}
                </span>
              </div>

              <div className='cel-details-box-buttons-wrapper'>
                <button type='button' className='cel-details-box-edit-button'>
                  Editar
                </button>
                <button type='button' className='cel-details-box-archive-button'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
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

export default CelDetailsBox;
