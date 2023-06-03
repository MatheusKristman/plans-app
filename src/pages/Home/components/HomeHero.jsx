import React from "react";

const HomeHero = () => {
  return (
    <div className="wrapper">
      <div className="hero-wrapper">
        <div className="hero-info">
          <h1 className="hero-title">Economize Tempo e Dinheiro</h1>
          <span className="hero-desc">
            Encontre os melhores planos da sua cidade com ótimos preços e
            facilidade.
          </span>
          <button type="button" className="hero-cta">
            Encontre seu plano
          </button>
        </div>
        <div className="hero-image">
          <div className="image-box">
            <img
              src="/assets/images/phone.svg"
              alt="Telefone"
              className="image-phone"
            />
            <img
              src="/assets/images/top-phone-box.svg"
              alt="Dica 1"
              className="image-top-box"
            />
            <img
              src="/assets/images/bottom-phone-box.svg"
              alt="Dica 2"
              className="image-bottom-box"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
