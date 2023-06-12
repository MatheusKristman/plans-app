import React, { useRef, useEffect } from 'react';
import useInternetPlanStore from '../../../stores/useInternetPlansStore';
import { shallow } from 'zustand/shallow';

import Plan from './Plan';

const InternetPlansBody = () => {
  const {
    isFilterOpen,
    openFilterBox,
    closeFilterBox,
    internetPlans,
    sliceBegin,
    setSliceBegin,
    sliceEnd,
    setSliceEnd,
    filterValues,
    setFilterValues,
    handleTechnologyFilterOption,
    handleProviderFilterOption,
  } = useInternetPlanStore(
    (state) => ({
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
      internetPlans: state.internetPlans,
      sliceBegin: state.sliceBegin,
      setSliceBegin: state.setSliceBegin,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      filterValues: state.filterValues,
      setFilterValues: state.setFilterValues,
      handleTechnologyFilterOption: state.handleTechnologyFilterOption,
      handleProviderFilterOption: state.handleProviderFilterOption,
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

  const handleShowMore = () => {
    if (internetPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd(sliceEnd + 5);
    setSliceBegin(sliceBegin + 5);
  };

  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

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
                  onChange={(e) => setFilterValues('cep', e.target.value)}
                  value={filterValues.cep}
                  className='filter-form-cep-input'
                />
              </div>

              <div className='filter-form-cost-box'>
                <span className='filter-form-cost-title'>Preço</span>

                <label htmlFor='cost50' className='filter-form-cost-label'>
                  <input
                    id='cost50'
                    name='cost'
                    value={50}
                    onChange={(e) => setFilterValues('cost', e.target.value)}
                    type='radio'
                    className='filter-form-cost-input'
                  />
                  Até R$ 50,00
                </label>

                <label htmlFor='cost100' className='filter-form-cost-label'>
                  <input
                    id='cost100'
                    name='cost'
                    value={100}
                    onChange={(e) => setFilterValues('cost', e.target.value)}
                    type='radio'
                    className='filter-form-cost-input'
                  />
                  Até R$ 100,00
                </label>

                <label htmlFor='cost200' className='filter-form-cost-label'>
                  <input
                    id='cost200'
                    name='cost'
                    value={200}
                    onChange={(e) => setFilterValues('cost', e.target.value)}
                    type='radio'
                    className='filter-form-cost-input'
                  />
                  Até R$ 200,00
                </label>

                <label htmlFor='cost201' className='filter-form-cost-label'>
                  <input
                    id='cost201'
                    name='cost'
                    value={1000}
                    onChange={(e) => setFilterValues('cost', e.target.value)}
                    type='radio'
                    className='filter-form-cost-input'
                  />
                  Mais de R$ 200,00
                </label>
              </div>

              <div className='filter-form-download-box'>
                <span className='filter-form-download-title'>Velocidade de Internet</span>

                <label htmlFor='download15' className='filter-form-download-label'>
                  <input
                    type='radio'
                    id='download15'
                    name='download'
                    value='15GB'
                    onChange={(e) => setFilterValues('download', e.target.value)}
                    className='filter-form-download-input'
                  />
                  Até 15GB
                </label>

                <label htmlFor='download25' className='filter-form-download-label'>
                  <input
                    type='radio'
                    id='download25'
                    name='download'
                    value='25GB'
                    onChange={(e) => setFilterValues('download', e.target.value)}
                    className='filter-form-download-input'
                  />
                  Até 25GB
                </label>

                <label htmlFor='download50' className='filter-form-download-label'>
                  <input
                    type='radio'
                    id='download50'
                    name='download'
                    value='50GB'
                    onChange={(e) => setFilterValues('download', e.target.value)}
                    className='filter-form-download-input'
                  />
                  Até 50GB
                </label>

                <label htmlFor='download50More' className='filter-form-download-label'>
                  <input
                    type='radio'
                    id='download50More'
                    name='download'
                    value='1000GB'
                    onChange={(e) => setFilterValues('download', e.target.value)}
                    className='filter-form-download-input'
                  />
                  Mais de 50GB
                </label>
              </div>

              <div className='filter-form-plan-type-box'>
                <span className='filter-form-plan-type-title'>Conexão via</span>

                <label htmlFor='fibra' className='filter-form-plan-type-label'>
                  <input
                    type='checkbox'
                    id='fibra'
                    name='planType'
                    value='Fibra Ótica'
                    onChange={(e) => handleTechnologyFilterOption(e.target.value)}
                    className='filter-form-plan-type-input'
                  />
                  Fibra Ótica
                </label>

                <label htmlFor='metalico' className='filter-form-plan-type-label'>
                  <input
                    type='checkbox'
                    id='metalico'
                    name='planType'
                    value='Cabo Metálico'
                    onChange={(e) => handleTechnologyFilterOption(e.target.value)}
                    className='filter-form-plan-type-input'
                  />
                  Cabo Metálico
                </label>

                <label htmlFor='radio' className='filter-form-plan-type-label'>
                  <input
                    type='checkbox'
                    id='radio'
                    name='planType'
                    value='Via Rádio'
                    onChange={(e) => handleTechnologyFilterOption(e.target.value)}
                    className='filter-form-plan-type-input'
                  />
                  Via Rádio
                </label>

                <label htmlFor='satelite' className='filter-form-plan-type-label'>
                  <input
                    type='checkbox'
                    id='satelite'
                    name='planType'
                    value='Via Satélite'
                    onChange={(e) => handleTechnologyFilterOption(e.target.value)}
                    className='filter-form-plan-type-input'
                  />
                  Via Satélite
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
          <span className='result-status'>{internetPlans.length} Resultado</span>

          <div className='result-wrapper'>
            {internetPlans.length !== 0 ? (
              internetPlans
                .slice(sliceBegin, sliceEnd)
                .map((plan) => (
                  <Plan
                    key={plan._id}
                    providerLogo={plan.providerIcon}
                    title={plan.title}
                    download={plan.download}
                    benefits={plan.benefits}
                    technology={plan.technology}
                    cost={plan.cost}
                    description={plan.description}
                  />
                ))
            ) : (
              <span>Nenhum plano ativo no momento</span>
            )}
            {internetPlans.length > sliceEnd ? (
              <button type='button' onClick={handleShowMore} className='result-show-more-button'>
                MOSTRAR MAIS
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetPlansBody;
