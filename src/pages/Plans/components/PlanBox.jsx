import React from "react";

const PlanBox = () => {
  return (
    <div className="plans-component-plan-container">
      <div className="plans-component-plan-wrapper">
        <div className="plans-component-plan-info">
          <div className="plans-component-image-title-box">
            <div className="plans-component-image-box">
              <img
                src="/assets/icons/claro.png"
                alt="Claro"
                className="plans-component-image"
              />
            </div>

            <h3 className="plans-component-plan-name">
              Claro Controle 25GB Fidelizado
            </h3>
          </div>

          <div className="plans-component-cost-box">
            <span className="plans-component-cost-value">R$ 49,90</span>
            <span className="plans-component-cost-desc">Valor</span>
          </div>

          <div className="plans-component-franchise-box">
            <span className="plans-component-franchise-value">25GB</span>
            <span className="plans-component-franchise-desc">Franquia</span>
          </div>

          <div className="plans-component-priority-box">
            <span className="plans-component-priority-value">1</span>
          </div>

          <div className="plans-component-contact-box">
            <span className="plans-component-contact-value">5</span>
            <span className="plans-component-contact-desc">Contato</span>
          </div>

          <div className="plans-component-created-at-box">
            <span className="plans-component-created-at-value">24/03/2023</span>
            <span className="plans-component-created-at-desc">Criado em</span>
          </div>
        </div>

        <div className="plans-component-plan-buttons">
          <button className="plans-component-edit-button">Editar</button>

          <button className="plans-component-details-button">
            Ver Detalhes
          </button>

          <button className="plans-component-archivate-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Arquivar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanBox;
