import React, { useState, useEffect } from 'react';
import { addDays, startOfMonth, startOfYear, subDays } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import { shallow } from 'zustand/shallow';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import useRegisterStore from '../../stores/useRegisterStore';

const PersonalDataForm = () => {
  return (
    <form className='personal-data-form'>
      <div className='personal-data-name-wrapper'>
        <label htmlFor='name' className='personal-data-label'>
          Nome Completo
          <input
            id='name'
            name='name'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>

        <label htmlFor='cpf' className='personal-data-label'>
          CPF
          <input
            id='cpf'
            name='cpf'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>
      </div>

      <div className='personal-data-wrapper'>
        <label htmlFor='rg' className='personal-data-label'>
          RG
          <input
            id='rg'
            name='rg'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>

        <label htmlFor='dateOfBirth' className='personal-data-label'>
          Data de Nascimento
          <input
            id='dateOfBirth'
            name='dateOfBirth'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>
      </div>

      <label htmlFor='motherName' className='personal-data-label'>
        Nome Completo da Mãe
        <input
          id='motherName'
          name='dateOfBirth'
          type='text'
          autoComplete='off'
          autoCorrect='off'
          className='personal-data-input'
        />
      </label>

      <div className='personal-data-wrapper'>
        <label htmlFor='tel1' className='personal-data-label'>
          Telefone 1
          <input
            id='tel1'
            name='tel1'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>

        <label htmlFor='tel2' className='personal-data-label'>
          Telefone 2
          <input
            id='tel2'
            name='tel2'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='personal-data-input'
          />
        </label>
      </div>
    </form>
  );
};

const AddressForm = () => {
  return (
    <form className='address-form'>
      <div className='address-wrapper'>
        <label htmlFor='state' className='address-label'>
          Estado
          <select id='state' name='state' className='address-select'>
            {/* TODO pegar estado e cidade da api */}
            <option value='Estado teste'>Estado teste</option>
          </select>
        </label>

        <label htmlFor='city' className='address-label'>
          Cidade
          <select id='city' name='city' className='address-select'>
            {/* TODO pegar estado e cidade da api */}
            <option value='Cidade teste'>Cidade teste</option>
          </select>
        </label>
      </div>

      <div className='address-cep-wrapper'>
        <label htmlFor='cep' className='address-label'>
          CEP
          <input
            id='cep'
            name='cep'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='address-input'
          />
        </label>

        <label htmlFor='address' className='address-label'>
          Endereço
          <input
            id='address'
            name='address'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='address-input'
          />
        </label>
      </div>

      <div className='address-num-wrapper'>
        <label htmlFor='addressNum' className='address-label'>
          Numero da Residencia
          <input
            id='addressNum'
            name='addressNum'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='address-input'
          />
        </label>

        <label htmlFor='complement' className='address-label'>
          Complemento
          <input
            id='complement'
            name='complement'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='address-input'
          />
        </label>
      </div>
    </form>
  );
};

const PaymentForm = () => {
  return (
    <form className='payment-form'>
      <div className='payment-wrapper'>
        <label htmlFor='paymentDay' className='payment-label'>
          Dia de pagamento
          <select id='paymentDay' name='paymentDay' className='payment-select'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </label>

        <div className='payment-method-box'>
          <span className='payment-method-title'>Forma de pagamento</span>

          <div className='payment-method-wrapper'>
            <label htmlFor='ticket' className='payment-method-label'>
              <input
                type='radio'
                id='ticket'
                name='paymentMethod'
                className='payment-method-input'
              />
              Boleto
            </label>

            <label htmlFor='debit' className='payment-method-label'>
              <input
                type='radio'
                id='debit'
                name='paymentMethod'
                className='payment-method-input'
              />
              Débito em conta
            </label>
          </div>
        </div>
      </div>

      <div className='payment-account-wrapper'>
        <label htmlFor='bank' className='payment-label'>
          Banco
          <input
            id='bank'
            name='bank'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='payment-input'
          />
        </label>

        <label htmlFor='agency' className='payment-label'>
          Agencia
          <input
            id='agency'
            name='agency'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='payment-input'
          />
        </label>

        <label htmlFor='bankAccount' className='payment-label'>
          Conta
          <input
            id='bankAccount'
            name='bankAccount'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            className='payment-input'
          />
        </label>
      </div>

      <label htmlFor='accountOwner' className='payment-label'>
        Titular da conta
        <input
          id='accountOwner'
          name='accountOwner'
          type='text'
          autoComplete='off'
          autoCorrect='off'
          className='payment-input'
        />
      </label>
    </form>
  );
};

const InstallationForm = () => {
  const [firstDate, setFirstDate] = useState(addDays(new Date(), 1));
  const [secondDate, setSecondDate] = useState(addDays(firstDate, 1));

  return (
    <form className='installation-form'>
      <div className='installation-date-wrapper'>
        <label htmlFor='installationDate1' className='installation-label'>
          Data para instalação
          <ReactDatePicker
            id='installationDate1'
            name='installationDate1'
            className='installation-input'
            selected={firstDate}
            onChange={(date) => setFirstDate(date)}
            minDate={addDays(new Date(), 1)}
            excludeDates={[secondDate]}
            dateFormat='dd/MM/yyyy'
            placeholderText='Selecione a primeira data de instalação'
          />
        </label>

        <label htmlFor='installationDate2' className='installation-label'>
          Data para instalação reserva <small>(caso a primeira visita não aconteça)</small>
          <ReactDatePicker
            id='installationDate2'
            name='installationDate2'
            className='installation-input'
            selected={secondDate}
            onChange={(date) => setSecondDate(date)}
            minDate={addDays(new Date(), 1)}
            excludeDates={[firstDate]}
            dateFormat='dd/MM/yyyy'
            placeholderText='Selecione uma segunda data de instalação caso a primeira visita não aconteça'
          />
        </label>
      </div>

      <div className='installation-period-wrapper'>
        <label htmlFor='installationPeriod1' className='installation-label'>
          Selecione o período da primeira data de instalação
          <select
            id='installationPeriod1'
            name='installationPeriod1'
            className='installation-select'
          >
            <option value='manha'>Período manhã (8h às 12h)</option>
            <option value='tarde'>Período tarde (12h às 18h)</option>
          </select>
        </label>

        <label htmlFor='installationPeriod2' className='installation-label'>
          Selecione o período da segunda data de instalação
          <select
            id='installationPeriod2'
            name='installationPeriod2'
            className='installation-select'
          >
            <option value='manha'>Período manhã (8h às 12h)</option>
            <option value='tarde'>Período tarde (12h às 18h)</option>
          </select>
        </label>
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const { closeRegisterForm, isRegisterFormOpen } = useRegisterStore(
    (state) => ({
      closeRegisterForm: state.closeRegisterForm,
      isRegisterFormOpen: state.isRegisterFormOpen,
    }),
    shallow
  );

  useEffect(() => {
    if (isRegisterFormOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'unset';
    }
  }, [isRegisterFormOpen]);

  return (
    <div className='register-form-overlay'>
      <div className='register-form-container'>
        <div className='register-form-illustration-box'>
          <button type='button' className='register-form-close-button'>
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

          <h2 className='register-form-title'>Confirme seus dados</h2>
        </div>

        <div className='register-form-body'>
          <div className='register-form-progress-box'>
            <div className='register-form-progress-step'>
              <span className='register-form-progress-ball actual-progress'>1</span>
              <span className='register-form-progress-desc'>Dados pessoais</span>
            </div>

            <div className='register-form-progress-line' />

            <div className='register-form-progress-step'>
              <span className='register-form-progress-ball'>2</span>
              <span className='register-form-progress-desc'>Endereço</span>
            </div>

            <div className='register-form-progress-line' />

            <div className='register-form-progress-step'>
              <span className='register-form-progress-ball'>3</span>
              <span className='register-form-progress-desc'>Forma de pagamento</span>
            </div>

            {/* se tiver instalação */}
            <div className='register-form-progress-line' />

            <div className='register-form-progress-step'>
              <span className='register-form-progress-ball'>4</span>
              <span className='register-form-progress-desc'>Instalação</span>
            </div>
          </div>

          <div className='register-form-info-box'>
            <PersonalDataForm />
            {/* <AddressForm /> */}
            {/* <PaymentForm /> */}
            {/* <InstallationForm /> */}

            <button type='button' className='register-form-button'>
              {/* ou fazer pedido quando for o ultimo form */}
              Proximo
            </button>
          </div>

          <div className='register-form-plan-wrapper'>
            <div className='register-form-plan-box'>
              <span className='register-form-plan-title'>Resumo do pedido</span>

              <div className='register-form-plan-details-container'>
                <div className='register-form-plan-details-box'>
                  <div className='register-form-plan-provider-icon-box'>
                    <img
                      src={`https://planos-backend.onrender.com/assets/claro.png`}
                      alt='claro'
                      className='register-form-plan-provider-icon'
                    />
                  </div>

                  <div className='register-form-plan-details-infos-box'>
                    <span className='register-form-plan-details-infos-plan-title'>
                      Plano Controle
                    </span>
                    <span className='register-form-plan-details-infos-plan-detail'>25GB</span>
                  </div>
                </div>

                <span className='register-form-plan-price'>R$ 49,90/mês</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

//TODO criar funcionalidades para mudar o form de acordo com as etapas e mudar a sinalização das etapas, o form de instalação só é valido para tvplans e internetplans
