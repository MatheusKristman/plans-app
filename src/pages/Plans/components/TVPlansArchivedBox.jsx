import React from "react";

const TVPlansArchivedBox = () => {
  return (
    <div className="plans-component-archived-plan-container">
      <div className="plans-component-archived-plan-wrapper">
        <div className="plans-component-archived-plan-info">
          <div className="plans-component-image-title-box">
            <div className="plans-component-image-box">
              <img
                src="/assets/icons/claro.png"
                alt="Claro"
                className="plans-component-image"
              />
            </div>

            <h3 className="plans-component-plan-name">Claro TV 150 Canais</h3>
          </div>

          <div className="plans-component-cost-box">
            <span className="plans-component-cost-value">R$ 39,90</span>
            <span className="plans-component-cost-desc">Valor</span>
          </div>

          <div className="plans-component-devices-box">
            <span className="plans-component-devices-value">2</span>
            <span className="plans-component-devices-desc">Pontos de tv</span>
          </div>

          <div className="plans-component-priority-box">
            <div className="plans-component-priority-polygon">
              <span className="plans-component-priority-value">1</span>
            </div>
            <span className="plans-component-priority-desc">Prioridade</span>
          </div>

          <div className="plans-component-contact-box">
            <span className="plans-component-contact-value">5</span>
            <span className="plans-component-contact-desc">Contato</span>
          </div>

          <div className="plans-component-total-box">
            <span className="plans-component-total-value">R$ 100,00</span>
            <span className="plans-component-total-desc">Total</span>
          </div>

          <div className="plans-component-created-at-box">
            <span className="plans-component-created-at-value">24/03/2023</span>
            <span className="plans-component-created-at-desc">Criado em</span>
          </div>

          <div className="plans-component-archived-at-box">
            <span className="plans-component-archived-at-value">
              28/03/2023
            </span>
            <span className="plans-component-archived-at-desc">
              Arquivado em
            </span>
          </div>
        </div>

        <div className="plans-component-archived-plan-buttons">
          <button className="plans-component-restore-button">
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Restaurar
          </button>

          <button className="plans-component-details-button">
            Ver Detalhes
          </button>

          <button className="plans-component-delete-button">
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVPlansArchivedBox;
