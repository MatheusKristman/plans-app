import React from "react";

const InternetPlanBox = () => {
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
              Claro Banda Larga 250MB
            </h3>
          </div>

          <div className="plans-component-cost-box">
            <span className="plans-component-cost-value">R$ 79,90</span>
            <span className="plans-component-cost-desc">Valor</span>
          </div>

          <div className="plans-component-download-box">
            <span className="plans-component-download-value">250MB</span>
            <span className="plans-component-download-desc">
              Velocidade de download
            </span>
          </div>

          <div className="plans-component-upload-box">
            <span className="plans-component-upload-value">100MB</span>
            <span className="plans-component-upload-desc">
              Velocidade de upload
            </span>
          </div>

          <div className="plans-component-priority-box">
            <div className="plans-component-priority-polygon">
              <span className="plans-component-priority-value">1</span>
            </div>
            <span className="plans-component-priority-desc">Prioridade</span>
          </div>

          <div className="plans-component-contact-box">
            <span className="plans-component-contact-value">5</span>
            <span className="plans-component-contact-desc">Contatos</span>
          </div>

          <div className="plans-component-total-box">
            <span className="plans-component-total-value">R$ 100,00</span>
            <span className="plans-component-total-desc">Total</span>
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

export default InternetPlanBox;
