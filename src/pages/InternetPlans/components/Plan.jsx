import React from "react";

const Plan = ({
  providerLogo,
  title,
  download,
  unlimitedApps,
  unlimitedCall,
  cost,
  description,
}) => {
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
            <div className="plan-benefits-download-box">
              <span className="plan-benefits-download">{download}</span>
            </div>

            <div className="plan-benefits-unlimited-apps-box">
              <span className="plan-benefits-unlimited-apps-title">
                Apps Ilimitados
              </span>

              <ul className="plan-benefits-unlimited-apps-list">
                {unlimitedApps.length !== 0 ? (
                  unlimitedApps.map((app) => (
                    <li className="plan-benefits-unlimited-apps-item">{app}</li>
                  ))
                ) : (
                  <li className="plan-benefits-unlimited-apps-item">
                    Não possui
                  </li>
                )}
              </ul>
            </div>

            <div className="plan-benefits-unlimited-call-box">
              <span className="plan-benefits-unlimited-call-title">
                Ligações Ilimitadas
              </span>

              {unlimitedCall ? (
                <span className="plan-benefits-unlimited-call">Possui</span>
              ) : (
                <span className="plan-benefits-unlimited-call">Não possui</span>
              )}
            </div>

            <div className="plan-benefits-cost-box">
              <span className="plan-benefits-cost-unit">R$</span>

              <span className="plan-benefits-cost-value">
                {cost
                  .toFixed(2)
                  .toString()
                  .slice(0, cost.toFixed(2).toString().length - 3)}
              </span>

              <div className="plan-benefits-cost-wrapper">
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
          </div>

          <button type="button" className="plan-acquire-button">
            CONTRATAR
          </button>
        </div>

        <div className="plan-details-box">
          <div className="plan-details-wrapper">
            <span className="plan-details-desc">{description}</span>
            <button type="button" className="plan-details-expand-button">
              Ler mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
