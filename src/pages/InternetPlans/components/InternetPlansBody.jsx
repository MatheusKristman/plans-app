import React, { useRef, useEffect } from "react";
import useInternetPlanStore from "../../../stores/useInternetPlansStore"
import { shallow } from "zustand/shallow";

import Plan from "./Plan";

const InternetPlansBody = () => {
  const { isFilterOpen, openFilterBox, closeFilterBox } = useInternetPlanStore((state) => ({
    isFilterOpen: state.isFilterOpen,
    openFilterBox: state.openFilterBox,
    closeFilterBox: state.closeFilterBox,
  }), shallow);

  const filterRef = useRef();

  const handleFilterBoxButton = () => {
    if(isFilterOpen) {
      closeFilterBox();
      return;
    }

    openFilterBox();
  }

  return (
    <div className="body-container">
      <div className="body-wrapper wrapper">
        <div className="filter-form-container">
          <button type="button" onClick={handleFilterBoxButton} className="filter-form-button">
            Filtrar
          </button>

          <form ref={filterRef} style={isFilterOpen ? { maxHeight: `${filterRef.current.scrollHeight + 25}px` } : { maxHeight: "0px" }} className="filter-form-box">
            <div className="filter-form-wrapper">
              <div className="filter-form-cep-box">
                <span className="filter-form-cep-title">Cep</span>
                <input
                  type="text"
                  autoCorrect="off"
                  autoComplete="off"
                  className="filter-form-cep-input"
                />
              </div>

              <div className="filter-form-cost-box">
                <span className="filter-form-cost-title">Preço</span>

                <label htmlFor="cost50" className="filter-form-cost-label">
                  <input
                    id="cost50"
                    name="cost"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 50,00
                </label>

                <label htmlFor="cost100" className="filter-form-cost-label">
                  <input
                    id="cost100"
                    name="cost"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 100,00
                </label>

                <label htmlFor="cost200" className="filter-form-cost-label">
                  <input
                    id="cost200"
                    name="cost"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 200,00
                </label>

                <label htmlFor="cost201" className="filter-form-cost-label">
                  <input
                    id="cost201"
                    name="cost"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Mais de R$ 200,00
                </label>
              </div>

              <div className="filter-form-download-box">
                <span className="filter-form-download-title">
                  Velocidade de Internet
                </span>

                <label
                  htmlFor="download15"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download15"
                    name="download"
                    className="filter-form-download-input"
                  />
                  Até 15GB
                </label>

                <label
                  htmlFor="download25"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download25"
                    name="download"
                    className="filter-form-download-input"
                  />
                  Até 25GB
                </label>

                <label
                  htmlFor="download50"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download50"
                    name="download"
                    className="filter-form-download-input"
                  />
                  Até 50GB
                </label>

                <label
                  htmlFor="download50More"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download50More"
                    name="download"
                    className="filter-form-download-input"
                  />
                  Mais de 50GB
                </label>
              </div>

              <div className="filter-form-plan-type-box">
                <span className="filter-form-plan-type-title">Conexão via</span>

                <label htmlFor="fibra" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="fibra"
                    name="planType"
                    className="filter-form-plan-type-input"
                  />
                  Fibra Ótica
                </label>

                <label
                  htmlFor="metalico"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="metalico"
                    name="planType"
                    className="filter-form-plan-type-input"
                  />
                  Cabo Metálico
                </label>

                <label htmlFor="radio" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="radio"
                    name="planType"
                    className="filter-form-plan-type-input"
                  />
                  Via Rádio
                </label>

                <label
                  htmlFor="satelite"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="satelite"
                    name="planType"
                    className="filter-form-plan-type-input"
                  />
                  Via Satélite
                </label>
              </div>

              <div className="filter-form-provider-box">
                <span className="filter-form-provider-title">Operadora</span>

                <label htmlFor="claro" className="filter-form-provider-label">
                  <input
                    type="checkbox"
                    id="claro"
                    name="provider"
                    className="filter-form-provider-input"
                  />
                  Claro
                </label>

                <label htmlFor="tim" className="filter-form-provider-label">
                  <input
                    type="checkbox"
                    id="tim"
                    name="provider"
                    className="filter-form-provider-input"
                  />
                  Tim
                </label>

                <label htmlFor="vivo" className="filter-form-provider-label">
                  <input
                    type="checkbox"
                    id="vivo"
                    name="provider"
                    className="filter-form-provider-input"
                  />
                  Vivo
                </label>

                <label htmlFor="oi" className="filter-form-provider-label">
                  <input
                    type="checkbox"
                    id="oi"
                    name="provider"
                    className="filter-form-provider-input"
                  />
                  Oi
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled
              className="filter-form-submit-button"
            >
              Aplicar
            </button>
          </form>
        </div>

        <div className="result-box">
          <span className="result-status">1 Resultado</span>

          <div className="result-wrapper">
            <Plan
              providerLogo="claro.png"
              title="Claro Controle 25GB Fidelizado"
              download="25GB"
              benefits={["Whatsapp", "Instagram"]}
              technology="Fibra Ótica"
              cost={59.9}
              description="Descrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição testeDescrição teste"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetPlansBody;
