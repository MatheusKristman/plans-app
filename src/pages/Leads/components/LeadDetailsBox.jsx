import React from 'react';
import useGeneralStore from '../../../stores/useGeneralStore';
import useLeadStore from '../../../stores/useLeadStore';
import { shallow } from 'zustand/shallow';

const LeadDetailsBox = () => {
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow
  );
  const { closeLeadDetailBox } = useLeadStore(
    (state) => ({
      closeLeadDetailBox: state.closeLeadDetailBox,
    }),
    shallow
  );

  const handleCloseDetailBox = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeLeadDetailBox();
    }, 800);
  };

  const handleCloseOnBlur = (e) => {
    if (e.target.classList.contains('lead-details-box-overlay')) {
      handleCloseDetailBox();
    }
  };

  return (
    <div
      onClick={handleCloseOnBlur}
      className={
        modalAnimation
          ? 'lead-details-box-overlay animate__animated animate__fast animate__fadeIn'
          : 'lead-details-box-overlay animate__animated animate__fast animate__fadeOut'
      }
    >
      <div className='lead-details-box-container'>
        <div className='lead-details-box-wrapper'>
          <div className='lead-details-box-header'>
            <button
              type='button'
              onClick={handleCloseDetailBox}
              className='lead-details-box-close-button'
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

            <h3 className='lead-details-box-title'>Detalhes</h3>
          </div>

          <div className='lead-details-box-body'>
            <div className='lead-details-box-info-wrapper'>
              <div className='lead-details-box-info'>
                <div className='lead-details-box-name-box'>
                  <span className='lead-details-box-name-label'>Nome</span>
                  <span className='lead-details-box-name-desc'>Nome teste</span>
                </div>

                <div className='lead-details-box-plan-box'>
                  <span className='lead-details-box-plan-label'>Plano</span>
                  <span className='lead-details-box-plan-desc'>Claro Controle 35GB Fidelizado</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-rg-box'>
                  <span className='lead-details-box-rg-label'>RG</span>
                  <span className='lead-details-box-rg-desc'>50.123.455-8</span>
                </div>

                <div className='lead-details-box-cpf-box'>
                  <span className='lead-details-box-cpf-label'>CPF</span>
                  <span className='lead-details-box-cpf-desc'>123.456.789-01</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-date-of-birth-box'>
                  <span className='lead-details-box-date-of-birth-label'>Data de nascimento</span>
                  <span className='lead-details-box-date-of-birth-desc'>23/02/1896</span>
                </div>

                <div className='lead-details-box-mother-name-box'>
                  <span className='lead-details-box-mother-name-label'>Nome da mãe</span>
                  <span className='lead-details-box-mother-name-desc'>Nome teste</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-tel-box'>
                  <span className='lead-details-box-tel-label'>Telefone 1</span>
                  <span className='lead-details-box-tel-desc'>(11) 23456-7890</span>
                </div>

                <div className='lead-details-box-tel-box'>
                  <span className='lead-details-box-tel-label'>Telefone 2</span>
                  <span className='lead-details-box-tel-desc'>(11) 23456-7890</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-state-box'>
                  <span className='lead-details-box-state-label'>Estado</span>
                  <span className='lead-details-box-state-desc'>São Paulo</span>
                </div>

                <div className='lead-details-box-city-box'>
                  <span className='lead-details-box-city-label'>Cidade</span>
                  <span className='lead-details-box-city-desc'>São Paulo</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-cep-box'>
                  <span className='lead-details-box-cep-label'>CEP</span>
                  <span className='lead-details-box-cep-desc'>03918-000</span>
                </div>

                <div className='lead-details-box-address-box'>
                  <span className='lead-details-box-address-label'>Endereço</span>
                  <span className='lead-details-box-address-desc'>Rua teste</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-address-number-box'>
                  <span className='lead-details-box-address-number-label'>Numero</span>
                  <span className='lead-details-box-address-number-desc'>N° 1230</span>
                </div>

                <div className='lead-details-box-complement-box'>
                  <span className='lead-details-box-complement-label'>Complemento</span>
                  <span className='lead-details-box-complement-desc'>Complemento teste</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-payment-date-box'>
                  <span className='lead-details-box-payment-date-label'>Data do pagamento</span>
                  <span className='lead-details-box-payment-date-desc'>25</span>
                </div>

                <div className='lead-details-box-payment-method-box'>
                  <span className='lead-details-box-payment-method-label'>Método de pagamento</span>
                  <span className='lead-details-box-payment-method-desc'>Boleto</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-bank-box'>
                  <span className='lead-details-box-bank-label'>Banco</span>
                  <span className='lead-details-box-bank-desc'>130</span>
                </div>

                <div className='lead-details-box-agency-box'>
                  <span className='lead-details-box-agency-label'>Agencia</span>
                  <span className='lead-details-box-agency-desc'>0687</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-bank-account-box'>
                  <span className='lead-details-box-bank-account-label'>Conta do banco</span>
                  <span className='lead-details-box-bank-account-desc'>1230-4</span>
                </div>

                <div className='lead-details-box-account-owner-box'>
                  <span className='lead-details-box-account-owner-label'>Dono da conta</span>
                  <span className='lead-details-box-account-owner-desc'>Nome teste</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-installation-date-box'>
                  <span className='lead-details-box-installation-date-label'>
                    Data da instalação - 1
                  </span>
                  <span className='lead-details-box-installation-date-desc'>30/05/2023</span>
                </div>

                <div className='lead-details-box-installation-date-box'>
                  <span className='lead-details-box-installation-date-label'>
                    Data da instalação - 2
                  </span>
                  <span className='lead-details-box-installation-date-desc'>30/05/2023</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-installation-period-box'>
                  <span className='lead-details-box-installation-period-label'>
                    Período da instalação
                  </span>
                  <span className='lead-details-box-installation-period-desc'>13/06/2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsBox;
