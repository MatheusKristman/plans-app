import React from 'react';

const TVDetailsBox = () => {
  return (
    <div className='tv-details-box-overlay'>
      <div className='tv-details-box-container'>
        <div className='tv-details-box-wrapper'>
          <div className='tv-details-box-header'>
            <button className='tv-details-box-close-button'>
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

            <h3 className='tv-details-box-title'></h3>
          </div>

          <div className='tv-details-box-body'>
            <div className='tv-details-box-info-wrapper'>
              <div className='tv-details-box-info'>
                <div className='tv-details-box-title-box'>
                  <span className='tv-details-box-title-label'>Título</span>
                  <span className='tv-details-box-title-desc'>Claro TV 150 Canais</span>
                </div>

                <div className='tv-details-box-created-at-box'>
                  <span className='tv-details-box-created-at-label'>Criado em</span>
                  <span className='tv-details-box-created-at-desc'>24/03/2023</span>
                </div>
              </div>

              <div className='tv-details-box-info'>
                <div className='tv-details-box-provider-box'>
                  <span className='tv-details-box-provider-label'>Operadora</span>
                  <img
                    src='/assets/icons/claro.png'
                    alt='Claro'
                    className='tv-details-box-provider-logo'
                  />
                </div>

                <div className='tv-details-box-contacts-box'>
                  <span className='tv-details-box-contacts-label'>Contatos</span>
                  <span className='tv-details-box-contacts-desc'>5</span>
                </div>
              </div>

              <div className='tv-details-box-info'>
                <div className='tv-details-box-cost-box'>
                  <span className='tv-details-box-cost-label'>Valor</span>
                  <span className='tv-details-box-cost-desc'>R$ 39,90</span>
                </div>

                <div className='tv-details-box-total-box'>
                  <span className='tv-details-box-total-label'>Total</span>
                  <span className='tv-details-box-total-desc'>R$ 100,00</span>
                </div>
              </div>

              <div className='tv-details-box-info'>
                <div className='tv-details-box-after-cost-box'>
                  <span className='tv-details-box-after-cost-label'>Valor original</span>
                  <span className='tv-details-box-after-cost-desc'>R$ 59,90</span>
                </div>

                <div className='tv-details-box-period-to-change-cost-box'>
                  <span className='tv-details-box-period-to-change-cost-label'>
                    Período para mudar o valor
                  </span>
                  <span className='tv-details-box-period-to-change-cost-desc'>
                    Depois do 5° mês
                  </span>
                </div>
              </div>

              <div className='tv-details-box-info'>
                <div className='tv-details-box-priority-box'>
                  <span className='tv-details-box-priority-label'>Prioridade</span>
                  <span className='tv-details-box-priority-desc'>2</span>
                </div>

                <div className='tv-details-box-benefits-box'>
                  <span className='tv-details-box-benefits-label'>Benefícios</span>
                  <span className='tv-details-box-benefits-desc'>
                    Skeelo Audiobook, Paramount Channel
                  </span>
                </div>
              </div>

              <div className='tv-details-box-info'>
                <div className='tv-details-box-installation-cost-box'>
                  <span className='tv-details-box-installation-cost-label'>
                    Valor da instalação
                  </span>
                  <span className='tv-details-box-installation-cost-desc'>Grátis</span>
                </div>

                <div className='tv-details-box-devices-box'>
                  <span className='tv-details-box-devices-label'>Pontos de tv</span>
                  <span className='tv-details-box-devices-desc'>2</span>
                </div>
              </div>

              <div className='tv-details-box-description-box'>
                <span className='tv-details-box-description-label'>Descrição</span>
                <span className='tv-details-box-description-desc'>
                  **6GB no plano + 3GB bônus do pagamento por débito automático + 3GB bônus do
                  pagamento por fatura digital + 6GB bônus para Instagram, Tiktok, Twitter,
                  Facebook, Pinterest, Tinder, Messenger, Youtube. *Assinaturas inclusas: GoRead,
                  Babbel, Vivo Pay, Skeelo, Hube Jornais{' '}
                </span>
              </div>

              <div className='tv-details-box-buttons-wrapper'>
                <button type='button' className='tv-details-box-edit-button'>
                  Editar
                </button>
                <button type='button' className='tv-details-box-archive-button'>
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

export default TVDetailsBox;
