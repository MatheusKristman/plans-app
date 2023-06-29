import React from "react";

const DashboardPlanBox = ({
  providerIconPath,
  planTitle,
  contactValue,
  totalValue,
  createdValue,
  archivedValue,
}) => {
  return (
    <div className="dashboard-plan-box">
      <div className="dashboard-plan-wrapper">
        <div className="dashboard-plan-image-title-wrapper">
          <div className="dashboard-plan-image-box">
            <img
              src={`${import.meta.env.VITE_API_KEY}/assets/${providerIconPath}`}
              alt="Operadora"
              className="dashboard-plan-image"
            />
          </div>

          <h3 className="dashboard-plan-title">{planTitle}</h3>
        </div>

        <div className="dashboard-plan-details-wrapper">
          <div className="dashboard-plan-contact-box">
            <span className="dashboard-plan-contact-value">{contactValue}</span>
            <span className="dashboard-plan-contact-placeholder">Contato</span>
          </div>

          <div className="dashboard-plan-total-box">
            <span className="dashboard-plan-total-value">
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </span>
            <span className="dashboard-plan-total-placeholder">Total</span>
          </div>

          <div className="dashboard-plan-created-box">
            <span className="dashboard-plan-created-value">{createdValue}</span>
            <span className="dashboard-plan-created-placeholder">
              Criado em
            </span>
          </div>

          {archivedValue ? (
            <div className="dashboard-plan-archived-date-box">
              <span className="dashboard-plan-archived-date-value">
                {archivedValue}
              </span>
              <span className="dashboard-plan-archived-date-placeholder">
                Arquivado em
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardPlanBox;
