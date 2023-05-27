import React from "react";

const LeadBox = () => {
  return (
    <div className="leads-component-lead-box">
      <div className="leads-component-lead-wrapper">
        <div className="leads-component-info-box">
          <div className="leads-component-image-title-box">
            <div className="leads-component-image-box">
              <img
                src="/assets/icons/claro.png"
                alt="Claro"
                className="leads-component-image"
              />
            </div>

            <div className="leads-component-lead-name-box">
              <h3 className="leads-component-lead-name">Nome teste</h3>
              <span className="leads-component-lead-name-desc">Nome</span>
            </div>
          </div>

          <div className="leads-component-tel1-box">
            <span className="leads-component-tel1-value">(11) 12345-6789</span>
            <span className="leads-component-tel1-desc">Telefone 1</span>
          </div>

          {/* opcional */}
          <div className="leads-component-tel2-box">
            <span className="leads-component-tel2-value">(11) 23456-7890</span>
            <span className="leads-component-tel2-desc">Telefone 2</span>
          </div>

          <div className="leads-component-cpf-box">
            <span className="leads-component-cpf-value">123.456.789-01</span>
            <span className="leads-component-cpf-desc">CPF</span>
          </div>

          <div className="leads-component-date-of-birth-box">
            <span className="leads-component-date-of-birth-value">
              10/01/1983
            </span>
            <span className="leads-component-date-of-birth-desc">
              Data de nascimento
            </span>
          </div>

          <div className="leads-component-plan-box">
            <span className="leads-component-plan-value">
              Claro Controle 25GB Fidelizado
            </span>
            <span className="leads-component-plan-desc">Plano</span>
          </div>

          <div className="leads-component-contact-at-box">
            <span className="leads-component-contact-at-value">23/02/2023</span>
            <span className="leads-component-contact-at-desc">
              Data do contato
            </span>
          </div>
        </div>

        <div className="leads-component-button-wrapper">
          <button type="button" className="leads-component-details-button">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadBox;
