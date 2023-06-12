import React, { useRef } from 'react';
import useTVPlansStore from '../../../stores/useTVPlansStore';
import { shallow } from 'zustand/shallow';

const Plan = ({
  providerLogo,
  title,
  channelsQuant,
  benefits,
  devicesQuant,
  cost,
  afterCost,
  periodToChangeCost,
  description,
}) => {
  const { isSeeMoreOpen, activateSeeMore, deactivateSeeMore } = useTVPlansStore(
    (state) => ({
      isSeeMoreOpen: state.isSeeMoreOpen,
      activateSeeMore: state.activateSeeMore,
      deactivateSeeMore: state.deactivateSeeMore,
    }),
    shallow
  );
  const descriptionRef = useRef();

  const handleSeeMore = () => {
    if (isSeeMoreOpen) {
      deactivateSeeMore();
      return;
    }

    activateSeeMore();
  };

  return (
    <div className='plan-box'>
      <div className='plan-wrapper'>
        <div className='plan-title-box'>
          <div className='plan-provider-logo-box'>
            <img
              src={`https://planos-backend.onrender.com/assets/${providerLogo}`}
              alt='claro'
              className='plan-provider-logo'
            />
          </div>

          <h5 className='plan-title'>{title}</h5>
        </div>
        <div className='plan-benefits-wrapper'>
          <div className='plan-benefits-box'>
            <div className='plan-benefits-channels-box'>
              <span className='plan-benefits-channels-value'>
                <strong>{channelsQuant}</strong> Canais
              </span>
            </div>
            <div className='plan-benefits-benefit-box'>
              <span className='plan-benefits-benefit-title'>Benefícios</span>

              <ul className='plan-benefits-benefit-list'>
                {benefits?.length > 2 ? (
                  <>
                    {benefits.slice(0, 2).map((benef, index) => (
                      <li key={`benefit-${index}`} className='plan-benefits-benefit-item'>
                        {benef}
                      </li>
                    ))}
                    <li className='plan-benefits-benefit-item'>+{benefits.length - 2}</li>
                  </>
                ) : benefits?.length !== 0 ? (
                  benefits.map((benef, index) => (
                    <li key={`benefit-${index}`} className='plan-benefits-benefit-item'>
                      {benef}
                    </li>
                  ))
                ) : (
                  <li className='plan-benefits-benefit-item'>Não possui</li>
                )}
              </ul>
            </div>
            <div className='plan-benefits-devices-box'>
              <span className='plan-benefits-devices-quant'>{devicesQuant}</span>
              <span className='plan-benefits-devices-label'>Aparelhos</span>
            </div>
            <div className='plan-benefits-cost-box'>
              <div className='plan-benefits-cost-wrapper'>
                <span className='plan-benefits-cost-unit'>R$</span>

                <span className='plan-benefits-cost-value'>
                  {cost
                    .toFixed(2)
                    .toString()
                    .slice(0, cost.toFixed(2).toString().length - 3)}
                </span>

                <div className='plan-benefits-cost-decimal-wrapper'>
                  <span className='plan-benefits-cost-decimal'>
                    {cost
                      .toFixed(2)
                      .toString()
                      .substring(cost.toFixed(2).toString().length - 3)
                      .replace('.', ',')}
                  </span>
                  <span className='plan-benefits-cost-period'>/mês</span>
                </div>
              </div>
              <span className='plan-benefits-cost-after-cost'>
                R$ {afterCost} apos o {periodToChangeCost}° mês
              </span>
            </div>
          </div>

          <button type='button' className='plan-benefits-acquire-button'>
            CONTRATAR
          </button>
        </div>

        <div className='plan-details-box'>
          <div className='plan-details-wrapper'>
            <span
              ref={descriptionRef}
              className='plan-details-desc'
              style={
                isSeeMoreOpen
                  ? {
                      maxHeight: `${descriptionRef.current?.scrollHeight + 50}px`,
                      paddingBottom: '50px',
                    }
                  : { maxHeight: '100px', paddingBottom: '0px' }
              }
            >
              {description}
            </span>
            <button type='button' onClick={handleSeeMore} className='plan-details-expand-button'>
              {isSeeMoreOpen ? 'Ler menos' : 'Ler mais'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
