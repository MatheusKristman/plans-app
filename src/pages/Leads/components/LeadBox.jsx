import React from 'react';
import useGeneralStore from '../../../stores/useGeneralStore';
import useLeadStore from '../../../stores/useLeadStore';
import usePlansStore from '../../../stores/usePlansStore';
import { shallow } from 'zustand/shallow';

const LeadBox = ({
  accountOwner,
  address,
  addressNumber,
  bank,
  agency,
  bankAccount,
  cep,
  city,
  complement,
  cpf,
  dateOfBirth,
  installationDate1,
  installationDate2,
  installationPeriod,
  motherName,
  name,
  paymentDate,
  paymentMethod,
  plan,
  rg,
  state,
  tel1,
  tel2,
  clientId,
}) => {
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );
  const { openLeadDetailBox, plans, setIdSelectedForDetails } = useLeadStore(
    (state) => ({
      openLeadDetailBox: state.openLeadDetailBox,
      plans: state.plans,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
    }),
    shallow
  );

  const handleOpenDetailBox = () => {
    openLeadDetailBox();
    activateModalAnimation();
    setIdSelectedForDetails(clientId);
  };

  return (
    <div className='leads-component-lead-box'>
      <div className='leads-component-lead-wrapper'>
        <div className='leads-component-info-box'>
          <div className='leads-component-lead-name-box'>
            <h3 className='leads-component-lead-name'>{name}</h3>
            <span className='leads-component-lead-name-desc'>Nome</span>
          </div>

          <div className='leads-component-tel1-box'>
            <span className='leads-component-tel1-value'>{tel1}</span>
            <span className='leads-component-tel1-desc'>Telefone 1</span>
          </div>

          {/* opcional */}
          <div className='leads-component-tel2-box'>
            <span className='leads-component-tel2-value'>{tel2}</span>
            <span className='leads-component-tel2-desc'>Telefone 2</span>
          </div>

          <div className='leads-component-cpf-box'>
            <span className='leads-component-cpf-value'>{cpf}</span>
            <span className='leads-component-cpf-desc'>CPF</span>
          </div>

          <div className='leads-component-date-of-birth-box'>
            <span className='leads-component-date-of-birth-value'>{dateOfBirth}</span>
            <span className='leads-component-date-of-birth-desc'>Data de nascimento</span>
          </div>

          <div className='leads-component-plan-box'>
            <span className='leads-component-plan-value'>{plan}</span>
            <span className='leads-component-plan-desc'>Plano</span>
          </div>

          <div className='leads-component-contact-at-box'>
            <span className='leads-component-contact-at-value'>23/02/2023</span>
            <span className='leads-component-contact-at-desc'>Data do contato</span>
          </div>
        </div>

        <div className='leads-component-button-wrapper'>
          <button
            type='button'
            onClick={handleOpenDetailBox}
            className='leads-component-details-button'
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadBox;
