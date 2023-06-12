import React, { useRef, useEffect } from 'react';
import useCelPlansStore from '../../../stores/useCelPlansStore';
import { shallow } from 'zustand/shallow';

import Plan from './Plan';

const CelPlansBody = () => {
  const { isFilterOpen, openFilterBox, closeFilterBox } = useCelPlansStore(
    (state) => ({
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
    }),
    shallow
  );

  const filterRef = useRef();

  const handleFilterBoxButton = () => {
    if (isFilterOpen) {
      closeFilterBox();
      return;
    }

    openFilterBox();
  };

  useEffect(() => {
    console.log(filterRef.current?.scrollHeight);
  }, [filterRef]);

  return (
    <div className='body-container'>
      <div className='body-wrapper wrapper'>
        <div className='filter-form-container'>
          <button type='button' onClick={handleFilterBoxButton} className='filter-form-button'>
            Filtrar
          </button>

          <form
            ref={filterRef}
            style={
              isFilterOpen
                ? { maxHeight: `${filterRef.current.scrollHeight + 25}px` }
                : { maxHeight: '0px' }
            }
            className='filter-form-box'
          >
            <div className='filter-form-wrapper'>
              <div className='filter-form-cep-box'>
                <span className='filter-form-cep-title'>Cep</span>
                <input
                  type='text'
                  autoCorrect='off'
                  autoComplete='off'
                  className='filter-form-cep-input'
                />
              </div>

              <div className='filter-form-cost-box'>
                <span className='filter-form-cost-title'>Preço</span>

                <label htmlFor='cost50' className='filter-form-cost-label'>
                  <input id='cost50' name='cost' type='radio' className='filter-form-cost-input' />
                  Até R$ 50,00
                </label>

                <label htmlFor='cost100' className='filter-form-cost-label'>
                  <input id='cost100' name='cost' type='radio' className='filter-form-cost-input' />
                  Até R$ 100,00
                </label>

                <label htmlFor='cost200' className='filter-form-cost-label'>
                  <input id='cost200' name='cost' type='radio' className='filter-form-cost-input' />
                  Até R$ 200,00
                </label>
                <label htmlFor='cost201' className='filter-form-cost-label'>
                  <input id='cost201' name='cost' type='radio' className='filter-form-cost-input' />
                  Mais de R$ 200,00
                </label>
              </div>

              <div className='filter-form-franchise-box'>
                <span className='filter-form-franchise-title'>Franquia de internet</span>

                <label htmlFor='5gb' className='filter-form-franchise-label'>
                  <input
                    type='radio'
                    id='5gb'
                    name='franchise'
                    className='filter-form-franchise-input'
                  />
                  Até 5GB
                </label>

                <label htmlFor='15gb' className='filter-form-franchise-label'>
                  <input
                    type='radio'
                    id='15gb'
                    name='franchise'
                    className='filter-form-franchise-input'
                  />
                  Até 15GB
                </label>

                <label htmlFor='25gb' className='filter-form-franchise-label'>
                  <input
                    type='radio'
                    id='25gb'
                    name='franchise'
                    className='filter-form-franchise-input'
                  />
                  Até 25GB
                </label>

                <label htmlFor='25gbMore' className='filter-form-franchise-label'>
                  <input
                    type='radio'
                    id='25gbMore'
                    name='franchise'
                    className='filter-form-franchise-input'
                  />
                  Mais de 25GB
                </label>
              </div>

              <div className='filter-form-plan-type-box'>
                <span className='filter-form-plan-type-title'>Tipo do plano</span>

                <label htmlFor='controle' className='filter-form-plan-type-label'>
                  <input
                    type='radio'
                    id='controle'
                    name='planType'
                    className='filter-form-plan-type-input'
                  />
                  Controle
                </label>

                <label htmlFor='posPago' className='filter-form-plan-type-label'>
                  <input
                    type='radio'
                    id='posPago'
                    name='planType'
                    className='filter-form-plan-type-input'
                  />
                  Pós-pago
                </label>

                <label htmlFor='prePago' className='filter-form-plan-type-label'>
                  <input
                    type='radio'
                    id='prePago'
                    name='planType'
                    className='filter-form-plan-type-input'
                  />
                  Pré-pago
                </label>
              </div>

              <div className='filter-form-provider-box'>
                <span className='filter-form-provider-title'>Operadora</span>

                <label htmlFor='claro' className='filter-form-provider-label'>
                  <input
                    type='checkbox'
                    id='claro'
                    name='provider'
                    className='filter-form-provider-input'
                  />
                  Claro
                </label>

                <label htmlFor='tim' className='filter-form-provider-label'>
                  <input
                    type='checkbox'
                    id='tim'
                    name='provider'
                    className='filter-form-provider-input'
                  />
                  Tim
                </label>

                <label htmlFor='vivo' className='filter-form-provider-label'>
                  <input
                    type='checkbox'
                    id='vivo'
                    name='provider'
                    className='filter-form-provider-input'
                  />
                  Vivo
                </label>

                <label htmlFor='oi' className='filter-form-provider-label'>
                  <input
                    type='checkbox'
                    id='oi'
                    name='provider'
                    className='filter-form-provider-input'
                  />
                  Oi
                </label>
              </div>
            </div>

            <button type='submit' disabled className='filter-form-submit-button'>
              Aplicar
            </button>
          </form>
        </div>

        <div className='result-box'>
          <span className='result-status'>1 Resultado</span>

          <div className='result-wrapper'>
            <Plan
              providerLogo='claro.png'
              title='Claro Controle 25GB Fidelizado'
              franchise='25GB'
              unlimitedApps={['Whatsapp', 'Instagram', 'Telegram']}
              unlimitedCall={true}
              cost={59.9}
              description='Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste Descrição teste '
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelPlansBody;
