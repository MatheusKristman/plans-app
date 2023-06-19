import React, { useRef } from 'react';
import useCelPlansStore from '../../../stores/useCelPlansStore';
import useRegisterStore from '../../../stores/useRegisterStore';
import useGeneralStore from '../../../stores/useGeneralStore';
import { shallow } from 'zustand/shallow';

const Plan = ({
  id,
  providerLogo,
  title,
  franchise,
  unlimitedApps,
  unlimitedCall,
  cost,
  description,
}) => {
  const { idActiveToSeeMore, handleIdActiveToSeeMore } = useCelPlansStore(
    (state) => ({
      idActiveToSeeMore: state.idActiveToSeeMore,
      handleIdActiveToSeeMore: state.handleIdActiveToSeeMore,
    }),
    shallow
  );
  const { setPlanSelected, openRegisterForm, generateSteps } = useRegisterStore(
    (state) => ({
      setPlanSelected: state.setPlanSelected,
      openRegisterForm: state.openRegisterForm,
      generateSteps: state.generateSteps,
    }),
    shallow
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );

  const descriptionRef = useRef();

  const handleRegisterOpen = () => {
    setPlanSelected({
      logo: providerLogo,
      title,
      franchise,
      cost,
      id,
      type: 'cel',
    });
    generateSteps({ step1: true, step2: false, step3: false });
    openRegisterForm();
    activateModalAnimation();
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
            <div className='plan-benefits-franchise-box'>
              <span className='plan-benefits-franchise'>{franchise}</span>
            </div>

            <div className='plan-benefits-unlimited-apps-box'>
              <span className='plan-benefits-unlimited-apps-title'>Apps Ilimitados</span>

              <ul className='plan-benefits-unlimited-apps-list'>
                {unlimitedApps?.length > 2 ? (
                  <>
                    {unlimitedApps?.slice(0, 2).map((app, index) => (
                      <li key={`app-${index}`} className='plan-benefits-unlimited-apps-item'>
                        {app}
                      </li>
                    ))}
                    <li className='plan-benefits-unlimited-apps-item'>
                      +{unlimitedApps?.length - 2}
                    </li>
                  </>
                ) : unlimitedApps?.length !== 0 ? (
                  unlimitedApps?.map((app, index) => (
                    <li key={`app-${index}`} className='plan-benefits-unlimited-apps-item'>
                      {app}
                    </li>
                  ))
                ) : (
                  <li className='plan-benefits-unlimited-apps-item'>Não possui</li>
                )}
              </ul>
            </div>

            <div className='plan-benefits-unlimited-call-box'>
              <span className='plan-benefits-unlimited-call-title'>Ligações Ilimitadas</span>

              {unlimitedCall ? (
                <span className='plan-benefits-unlimited-call'>Possui</span>
              ) : (
                <span className='plan-benefits-unlimited-call'>Não possui</span>
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

          <button type='button' onClick={handleRegisterOpen} className='plan-acquire-button'>
            CONTRATAR
          </button>
        </div>

        <div className='plan-details-box'>
          <div className='plan-details-wrapper'>
            {description.length > 150 ? (
              <>
                <span
                  ref={descriptionRef}
                  className='plan-details-desc'
                  style={
                    idActiveToSeeMore === id
                      ? {
                          maxHeight: `${descriptionRef.current?.scrollHeight + 50}px`,
                          paddingBottom: '50px',
                        }
                      : { maxHeight: '100px', paddingBottom: '0px' }
                  }
                >
                  {description}
                </span>
                <button
                  type='button'
                  onClick={() => handleIdActiveToSeeMore(id)}
                  className='plan-details-expand-button'
                >
                  {idActiveToSeeMore === id ? 'Ler menos' : 'Ler mais'}
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
