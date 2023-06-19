import React, { useRef } from "react";
import useTVPlansStore from "../../../stores/useTVPlansStore";
import useRegisterStore from "../../../stores/useRegisterStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const Plan = ({
  id,
  providerLogo,
  title,
  installationCost,
  benefits,
  devicesQuant,
  cost,
  afterCost,
  periodToChangeCost,
  description,
}) => {
  const { idActiveToSeeMore, handleIdActiveToSeeMore } = useTVPlansStore(
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

  const handleRegisterButton = () => {
    setPlanSelected({
      logo: providerLogo,
      title,
      devicesQuant,
      cost,
      id,
      type: "tv",
    });
    generateSteps({ step1: true, step2: false, step3: false, step4: false });
    openRegisterForm();
    activateModalAnimation();
  };

  return (
    <div className="plan-box">
      <div className="plan-wrapper">
        <div className="plan-title-box">
          <div className="plan-provider-logo-box">
            <img
              src={`https://planos-backend.onrender.com/assets/${providerLogo}`}
              alt="claro"
              className="plan-provider-logo"
            />
          </div>

          <h5 className="plan-title">{title}</h5>
        </div>
        <div className="plan-benefits-wrapper">
          <div className="plan-benefits-box">
            <div className="plan-benefits-installation-cost-box">
              <span className="plan-benefits-installation-cost-title">
                Custo de instalação
              </span>
              <span className="plan-benefits-installation-cost-value">
                {installationCost}
              </span>
            </div>
            <div className="plan-benefits-benefit-box">
              <span className="plan-benefits-benefit-title">Benefícios</span>

              <ul className="plan-benefits-benefit-list">
                {benefits?.length > 2 ? (
                  <>
                    {benefits.slice(0, 2).map((benef, index) => (
                      <li
                        key={`benefit-${index}`}
                        className="plan-benefits-benefit-item"
                      >
                        {benef}
                      </li>
                    ))}
                    <li className="plan-benefits-benefit-item">
                      +{benefits.length - 2}
                    </li>
                  </>
                ) : benefits?.length !== 0 ? (
                  benefits.map((benef, index) => (
                    <li
                      key={`benefit-${index}`}
                      className="plan-benefits-benefit-item"
                    >
                      {benef}
                    </li>
                  ))
                ) : (
                  <li className="plan-benefits-benefit-item">Não possui</li>
                )}
              </ul>
            </div>
            <div className="plan-benefits-devices-box">
              <span className="plan-benefits-devices-quant">
                {devicesQuant}
              </span>
              <span className="plan-benefits-devices-label">
                {devicesQuant > 1 ? "Aparelhos" : "Aparelho"}
              </span>
            </div>
            <div className="plan-benefits-cost-box">
              <div className="plan-benefits-cost-wrapper">
                <span className="plan-benefits-cost-unit">R$</span>

                <span className="plan-benefits-cost-value">
                  {cost
                    .toFixed(2)
                    .toString()
                    .slice(0, cost.toFixed(2).toString().length - 3)}
                </span>

                <div className="plan-benefits-cost-decimal-wrapper">
                  <span className="plan-benefits-cost-decimal">
                    {cost
                      .toFixed(2)
                      .toString()
                      .substring(cost.toFixed(2).toString().length - 3)
                      .replace(".", ",")}
                  </span>
                  <span className="plan-benefits-cost-period">/mês</span>
                </div>
              </div>
              <span className="plan-benefits-cost-after-cost">
                R$ {afterCost} apos o {periodToChangeCost}° mês
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegisterButton}
            className="plan-benefits-acquire-button"
          >
            CONTRATAR
          </button>
        </div>

        <div className="plan-details-box">
          <div className="plan-details-wrapper">
            {description.length > 150 ? (
              <>
                <span
                  ref={descriptionRef}
                  className="plan-details-desc"
                  style={
                    idActiveToSeeMore === id
                      ? {
                          maxHeight: `${
                            descriptionRef.current?.scrollHeight + 50
                          }px`,
                          paddingBottom: "50px",
                        }
                      : { maxHeight: "100px", paddingBottom: "0px" }
                  }
                >
                  {description}
                </span>
                <button
                  type="button"
                  onClick={() => handleIdActiveToSeeMore(id)}
                  className="plan-details-expand-button"
                >
                  {idActiveToSeeMore === id ? "Ler menos" : "Ler mais"}
                </button>
              </>
            ) : (
              <span className="plan-details-desc">{description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
