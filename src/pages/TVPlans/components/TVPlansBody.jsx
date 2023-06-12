import React, { useRef, useEffect } from 'react';
import useTVPlansStore from '../../../stores/useTVPlansStore';
import { shallow } from 'zustand/shallow';

import Plan from './Plan';

const TVPlansBody = () => {
  const { isFilterOpen, openFilterBox, closeFilterBox } = useTVPlansStore(
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
                <input type='text' name='cep' className='filter-form-cep-input' />
              </div>

              <div className='filter-form-cost-box'>
                <span className='filter-form-cost-title'>Preço</span>

                <label htmlFor='cost50' className='filter-form-cost-label'>
                  <input type='radio' id='cost50' name='cost' className='filter-form-cost-input' />
                  Até R$ 50,00
                </label>

                <label htmlFor='cost100' className='filter-form-cost-label'>
                  <input type='radio' id='cost100' name='cost' className='filter-form-cost-input' />
                  Até R$ 100,00
                </label>

                <label htmlFor='cost200' className='filter-form-cost-label'>
                  <input type='radio' id='cost200' name='cost' className='filter-form-cost-input' />
                  Até R$ 200,00
                </label>

                <label htmlFor='cost201' className='filter-form-cost-label'>
                  <input type='radio' id='cost201' name='cost' className='filter-form-cost-input' />
                  Mais de R$ 200,00
                </label>
              </div>

              <div className='filter-form-devices-box'>
                <span className='filter-form-devices-title'>Quantidade de dispositivos</span>

                <label htmlFor='device1' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device1'
                    name='devicesQuant'
                    className='filter-form-devices-input'
                  />
                  1 aparelho
                </label>

                <label htmlFor='device2' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device2'
                    name='devicesQuant'
                    className='filter-form-devices-input'
                  />
                  2 aparelhos
                </label>

                <label htmlFor='device3' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device3'
                    name='devicesQuant'
                    className='filter-form-devices-input'
                  />
                  3 aparelhos
                </label>

                <label htmlFor='device4' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device4'
                    name='devicesQuant'
                    className='filter-form-devices-input'
                  />
                  4 aparelhos
                </label>
              </div>

              {/* TODO criar layout para operadoras */}
              <div className='filter-form-provider-box'>
                <span className='filter-form-provider-title'>Operadoras</span>

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
              title='Claro TV 150 Canais'
              channelsQuant='150'
              benefits={['Whatsapp', 'Instagram', 'Telegram']}
              devicesQuant={2}
              cost={69.9}
              afterCost={79.9}
              periodToChangeCost={5}
              description='descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste descrição teste '
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPlansBody;
