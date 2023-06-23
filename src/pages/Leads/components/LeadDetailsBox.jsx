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
  const { closeLeadDetailBox, clientSelectedForDetails, plans } = useLeadStore(
    (state) => ({
      closeLeadDetailBox: state.closeLeadDetailBox,
      clientSelectedForDetails: state.clientSelectedForDetails,
      plans: state.plans,
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
                  <span className='lead-details-box-name-desc'>
                    {clientSelectedForDetails.name}
                  </span>
                </div>

                <div className='lead-details-box-plan-box'>
                  <span className='lead-details-box-plan-label'>Plano</span>
                  <span className='lead-details-box-plan-desc'>
                    {plans.filter((plan) => plan._id === clientSelectedForDetails.plan)[0]?.title}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-rg-box'>
                  <span className='lead-details-box-rg-label'>RG</span>
                  <span className='lead-details-box-rg-desc'>{clientSelectedForDetails.rg}</span>
                </div>

                <div className='lead-details-box-cpf-box'>
                  <span className='lead-details-box-cpf-label'>CPF</span>
                  <span className='lead-details-box-cpf-desc'>{clientSelectedForDetails.cpf}</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-date-of-birth-box'>
                  <span className='lead-details-box-date-of-birth-label'>Data de nascimento</span>
                  <span className='lead-details-box-date-of-birth-desc'>
                    {clientSelectedForDetails.dateOfBirth}
                  </span>
                </div>

                <div className='lead-details-box-mother-name-box'>
                  <span className='lead-details-box-mother-name-label'>Nome da mãe</span>
                  <span className='lead-details-box-mother-name-desc'>
                    {clientSelectedForDetails.motherName}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-tel-box'>
                  <span className='lead-details-box-tel-label'>Telefone 1</span>
                  <span className='lead-details-box-tel-desc'>{clientSelectedForDetails.tel1}</span>
                </div>

                <div className='lead-details-box-tel-box'>
                  <span className='lead-details-box-tel-label'>Telefone 2</span>
                  <span className='lead-details-box-tel-desc'>{clientSelectedForDetails.tel2}</span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-state-box'>
                  <span className='lead-details-box-state-label'>Estado</span>
                  <span className='lead-details-box-state-desc'>
                    {clientSelectedForDetails.state}
                  </span>
                </div>

                <div className='lead-details-box-city-box'>
                  <span className='lead-details-box-city-label'>Cidade</span>
                  <span className='lead-details-box-city-desc'>
                    {clientSelectedForDetails.city}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-cep-box'>
                  <span className='lead-details-box-cep-label'>CEP</span>
                  <span className='lead-details-box-cep-desc'>{clientSelectedForDetails.cep}</span>
                </div>

                <div className='lead-details-box-address-box'>
                  <span className='lead-details-box-address-label'>Endereço</span>
                  <span className='lead-details-box-address-desc'>
                    {clientSelectedForDetails.address}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-address-number-box'>
                  <span className='lead-details-box-address-number-label'>Numero</span>
                  <span className='lead-details-box-address-number-desc'>
                    N° {clientSelectedForDetails.addressNumber}
                  </span>
                </div>

                <div className='lead-details-box-complement-box'>
                  <span className='lead-details-box-complement-label'>Complemento</span>
                  <span className='lead-details-box-complement-desc'>
                    {clientSelectedForDetails.complement || 'Não cadastrado'}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-payment-date-box'>
                  <span className='lead-details-box-payment-date-label'>Data do pagamento</span>
                  <span className='lead-details-box-payment-date-desc'>
                    {clientSelectedForDetails.paymentDate}
                  </span>
                </div>

                <div className='lead-details-box-payment-method-box'>
                  <span className='lead-details-box-payment-method-label'>Método de pagamento</span>
                  <span className='lead-details-box-payment-method-desc'>
                    {clientSelectedForDetails.paymentMethod}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-bank-box'>
                  <span className='lead-details-box-bank-label'>Banco</span>
                  <span className='lead-details-box-bank-desc'>
                    {clientSelectedForDetails.bank || 'Não cadastrado'}
                  </span>
                </div>

                <div className='lead-details-box-agency-box'>
                  <span className='lead-details-box-agency-label'>Agencia</span>
                  <span className='lead-details-box-agency-desc'>
                    {clientSelectedForDetails.agency || 'Não cadastrado'}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-bank-account-box'>
                  <span className='lead-details-box-bank-account-label'>Conta do banco</span>
                  <span className='lead-details-box-bank-account-desc'>
                    {clientSelectedForDetails.bankAccount || 'Não cadastrado'}
                  </span>
                </div>

                <div className='lead-details-box-account-owner-box'>
                  <span className='lead-details-box-account-owner-label'>Dono da conta</span>
                  <span className='lead-details-box-account-owner-desc'>
                    {clientSelectedForDetails.accountOwner || 'Não cadastrado'}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-installation-date-box'>
                  <span className='lead-details-box-installation-date-label'>
                    Data da instalação - 1
                  </span>
                  <span className='lead-details-box-installation-date-desc'>
                    {clientSelectedForDetails.installationDate1}
                  </span>
                </div>

                <div className='lead-details-box-installation-date-box'>
                  <span className='lead-details-box-installation-date-label'>
                    Data da instalação - 2
                  </span>
                  <span className='lead-details-box-installation-date-desc'>
                    {clientSelectedForDetails.installationDate2}
                  </span>
                </div>
              </div>

              <div className='lead-details-box-info'>
                <div className='lead-details-box-installation-period-box'>
                  <span className='lead-details-box-installation-period-label'>
                    Período da instalação
                  </span>
                  <span className='lead-details-box-installation-period-desc'>
                    {clientSelectedForDetails.installationPeriod}
                  </span>
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
