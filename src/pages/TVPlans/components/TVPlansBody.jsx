import React, { useRef, useEffect, useMemo } from 'react';
import useTVPlansStore from '../../../stores/useTVPlansStore';
import { shallow } from 'zustand/shallow';
import api from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

import Plan from './Plan';

const TVPlansBody = () => {
  const {
    isFilterOpen,
    openFilterBox,
    closeFilterBox,
    tvPlans,
    setTvPlans,
    filteredTvPlans,
    setFilteredTvPlans,
    sliceBegin,
    setSliceBegin,
    sliceEnd,
    setSliceEnd,
    filterValues,
    setFilterValues,
    handleProviderFilterOption,
    providers,
    submittingFilter,
    setSubmittingFilter,
    unsetSubmittingFilter,
    validFilterOptions,
    setValidFilterOptions,
    unsetValidFilterOptions,
  } = useTVPlansStore(
    (state) => ({
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
      tvPlans: state.tvPlans,
      setTvPlans: state.setTvPlans,
      filteredTvPlans: state.filteredTvPlans,
      setFilteredTvPlans: state.setFilteredTvPlans,
      sliceBegin: state.sliceBegin,
      setSliceBegin: state.setSliceBegin,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      filterValues: state.filterValues,
      setFilterValues: state.setFilterValues,
      handleProviderFilterOption: state.handleProviderFilterOption,
      providers: state.providers,
      submittingFilter: state.submittingFilter,
      setSubmittingFilter: state.setSubmittingFilter,
      unsetSubmittingFilter: state.unsetSubmittingFilter,
      validFilterOptions: state.validFilterOptions,
      setValidFilterOptions: state.setValidFilterOptions,
      unsetValidFilterOptions: state.unsetValidFilterOptions,
    }),
    shallow
  );

  const filterRef = useRef();

  const filterAnimation = {
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  const handleFilterBoxButton = () => {
    if (isFilterOpen) {
      closeFilterBox();
      return;
    }

    openFilterBox();
  };

  const handleShowMore = () => {
    if (tvPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd(sliceEnd + 5);
    setSliceBegin(sliceBegin + 5);
  };

  const handleSubmitFilterButton = (event) => {
    event.preventDefault();

    setSubmittingFilter();
  };

  useEffect(() => {
    if (
      filterValues.cep !== '' &&
      filterValues.cep.length === 9 &&
      filterValues.cost !== 0 &&
      filterValues.devicesQuant !== 0
    ) {
      setValidFilterOptions();
    }
  }, [filterValues]);

  useEffect(() => {
    const submitData = () => {
      const data = {
        cep: filterValues.cep,
        provider: filterValues.provider,
        cost: filterValues.cost,
        devicesQuant: filterValues.devicesQuant,
      };

      api
        .post('plan/tv-plan/filter', data)
        .then((res) => setFilteredTvPlans(res.data))
        .catch((err) => console.error(err))
        .finally(() => {
          unsetSubmittingFilter();
          unsetValidFilterOptions();
          setTvPlans([]);
          setSliceBegin(0);
          setSliceEnd(5);
        });
    };

    if (submittingFilter) {
      submitData();
    }
  }, [submittingFilter]);

  useEffect(() => {
    console.log(filteredTvPlans);
  }, [filteredTvPlans]);

  return (
    <div className='body-container'>
      <div className='body-wrapper wrapper'>
        <div className='filter-form-container'>
          <button type='button' onClick={handleFilterBoxButton} className='filter-form-button'>
            Filtrar
          </button>

          <motion.form
            variants={window.innerWidth >= 1024 ? filterAnimation : {}}
            initial='offscreen'
            animate='onscreen'
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
                  name='cep'
                  autoCorrect='off'
                  autoComplete='off'
                  onChange={(event) => {
                    let cep = event.target.value.replace(/\D/g, '');

                    if (cep.length === 8) {
                      cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
                    }

                    setFilterValues('cep', cep);
                  }}
                  value={filterValues.cep}
                  maxLength='8'
                  className='filter-form-cep-input'
                />
              </div>

              <div className='filter-form-cost-box'>
                <span className='filter-form-cost-title'>Preço</span>

                <label htmlFor='cost50' className='filter-form-cost-label'>
                  <input
                    type='radio'
                    id='cost50'
                    name='cost'
                    value={50}
                    onChange={(e) => setFilterValues('cost', Number(e.target.value))}
                    className='filter-form-cost-input'
                  />
                  Até R$ 50,00
                </label>

                <label htmlFor='cost100' className='filter-form-cost-label'>
                  <input
                    type='radio'
                    id='cost100'
                    name='cost'
                    value={100}
                    onChange={(e) => setFilterValues('cost', Number(e.target.value))}
                    className='filter-form-cost-input'
                  />
                  Até R$ 100,00
                </label>

                <label htmlFor='cost150' className='filter-form-cost-label'>
                  <input
                    type='radio'
                    id='cost150'
                    name='cost'
                    value={150}
                    onChange={(e) => setFilterValues('cost', Number(e.target.value))}
                    className='filter-form-cost-input'
                  />
                  Até R$ 150,00
                </label>

                <label htmlFor='cost250' className='filter-form-cost-label'>
                  <input
                    type='radio'
                    id='cost250'
                    name='cost'
                    value={250}
                    onChange={(e) => setFilterValues('cost', Number(e.target.value))}
                    className='filter-form-cost-input'
                  />
                  Até R$ 250,00
                </label>
              </div>

              <div className='filter-form-devices-box'>
                <span className='filter-form-devices-title'>Quantidade de dispositivos</span>

                <label htmlFor='device1' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device1'
                    name='devicesQuant'
                    value={1}
                    onChange={(e) => setFilterValues('devicesQuant', Number(e.target.value))}
                    className='filter-form-devices-input'
                  />
                  1 aparelho
                </label>

                <label htmlFor='device2' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device2'
                    name='devicesQuant'
                    value={2}
                    onChange={(e) => setFilterValues('devicesQuant', Number(e.target.value))}
                    className='filter-form-devices-input'
                  />
                  2 aparelhos
                </label>

                <label htmlFor='device3' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device3'
                    name='devicesQuant'
                    value={3}
                    onChange={(e) => setFilterValues('devicesQuant', Number(e.target.value))}
                    className='filter-form-devices-input'
                  />
                  3 aparelhos
                </label>

                <label htmlFor='device4' className='filter-form-devices-label'>
                  <input
                    type='radio'
                    id='device4'
                    name='devicesQuant'
                    value={4}
                    onChange={(e) => setFilterValues('devicesQuant', Number(e.target.value))}
                    className='filter-form-devices-input'
                  />
                  4 aparelhos
                </label>
              </div>

              <div className='filter-form-provider-box'>
                <span className='filter-form-provider-title'>Operadoras</span>

                {providers.map((provider, index) => (
                  <label
                    key={`provider-${index}`}
                    htmlFor={provider}
                    className='filter-form-provider-label'
                  >
                    <input
                      type='checkbox'
                      id={provider}
                      name='provider'
                      value={provider}
                      onChange={(event) => handleProviderFilterOption(event.target.value)}
                      className='filter-form-provider-input'
                    />
                    {provider}
                  </label>
                ))}
              </div>
            </div>

            <button
              type='submit'
              onClick={handleSubmitFilterButton}
              disabled={!validFilterOptions}
              className='filter-form-submit-button'
            >
              Aplicar
            </button>
          </motion.form>
        </div>

        <div className='result-box'>
          <span className='result-status'>
            {tvPlans.length !== 0 ? tvPlans.length : filteredTvPlans.length} Resultado(s)
          </span>

          <div className='result-wrapper'>
            <AnimatePresence>
              {filteredTvPlans.length !== 0 ? (
                filteredTvPlans
                  .slice(sliceBegin, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      installationCost={plan.installationCost}
                      benefits={plan.benefits}
                      devicesQuant={plan.devicesQuant}
                      cost={plan.cost}
                      afterCost={plan.afterCost}
                      periodToChangeCost={plan.periodToChangeCost}
                      description={plan.description}
                    />
                  ))
              ) : tvPlans.length !== 0 ? (
                tvPlans
                  .slice(sliceBegin, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      installationCost={plan.installationCost}
                      benefits={plan.benefits}
                      devicesQuant={plan.devicesQuant}
                      cost={plan.cost}
                      afterCost={plan.afterCost}
                      periodToChangeCost={plan.periodToChangeCost}
                      description={plan.description}
                    />
                  ))
              ) : (
                <span className='result-not-found-message'>Nenhum plano encontrado</span>
              )}
            </AnimatePresence>
            {tvPlans.length > sliceEnd ? (
              <button type='button' onClick={handleShowMore} className='result-show-more-button'>
                MOSTRAR MAIS
              </button>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPlansBody;
