import React, { useRef } from 'react';
import useInternetPlanStore from '../../../stores/useInternetPlansStore';
import { shallow } from 'zustand/shallow';

const Plan = ({ providerLogo, title, download, benefits, technology, cost, description }) => {
  const {
    isSeeMoreOpen,
    activateSeeMore,
    deactivateSeeMore,
    isFilterOpen,
    openFilterBox,
    closeFilterBox,
  } = useInternetPlanStore(
    (state) => ({
      isSeeMoreOpen: state.isSeeMoreOpen,
      activateSeeMore: state.activateSeeMore,
      deactivateSeeMore: state.deactivateSeeMore,
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
    }),
    shallow
  );

  const descriptionRef = useRef();

  const handleDescriptionVisualization = () => {
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
              alt={providerLogo?.slice(providerLogo.length - 4)}
              className='plan-provider-logo'
            />
          </div>

          <h5 className='plan-title'>{title}</h5>
        </div>

        <div className='plan-benefits-wrapper'>
          <div className='plan-benefits-box'>
            <div className='plan-benefits-download-box'>
              <span className='plan-benefits-download'>{download}</span>
            </div>

            <div className='plan-benefits-benefits-box'>
              <span className='plan-benefits-benefits-title'>Benefícios</span>

              <ul className='plan-benefits-benefits-list'>
                {benefits?.length > 2 ? (
                  <>
                    {benefits?.slice(0, 2).map((app, index) => (
                      <li key={`app-${index}`} className='plan-benefits-benefits-item'>
                        {app}
                      </li>
                    ))}
                    <li className='plan-benefits-benefits-item'>+{benefits?.length - 2}</li>
                  </>
                ) : benefits?.length !== 0 ? (
                  benefits?.map((app, index) => (
                    <li key={`app-${index}`} className='plan-benefits-benefits-item'>
                      {app}
                    </li>
                  ))
                ) : (
                  <li key={`app-${index}`} className='plan-benefits-benefits-item'>
                    Não possui
                  </li>
                )}
              </ul>
            </div>

            <div className='plan-benefits-technology-box'>
              <span className='plan-benefits-technology-title'>Tecnologia do modem</span>

              {technology ? (
                <span className='plan-benefits-technology'>Possui</span>
              ) : (
                <span className='plan-benefits-technology'>Não possui</span>
              )}
            </div>

            <div className='plan-benefits-cost-box'>
              <span className='plan-benefits-cost-unit'>R$</span>

              <span className='plan-benefits-cost-value'>
                {cost
                  .toFixed(2)
                  .toString()
                  .slice(0, cost.toFixed(2).toString().length - 3)}
              </span>

              <div className='plan-benefits-cost-wrapper'>
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
          </div>

          <button type='button' className='plan-acquire-button'>
            CONTRATAR
          </button>
        </div>

        <div className='plan-details-box'>
          <div className='plan-details-wrapper'>
            {description.length > 150 ? (
              <>
                <span
                  ref={descriptionRef}
                  style={
                    isSeeMoreOpen
                      ? {
                          maxHeight: `${descriptionRef.current?.scrollHeight + 50}px`,
                          paddingBottom: '50px',
                        }
                      : { maxHeight: '100px', paddingBottom: '0px' }
                  }
                  className='plan-details-desc'
                >
                  {description}
                </span>
                <button
                  type='button'
                  onClick={handleDescriptionVisualization}
                  className='plan-details-expand-button'
                >
                  {isSeeMoreOpen ? 'Ler menos' : 'Ler mais'}
                </button>
              </>
            ) : (
              <span className='plan-details-desc'>{description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
