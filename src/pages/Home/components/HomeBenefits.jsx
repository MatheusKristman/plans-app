import React, { useMemo } from "react";
import { motion } from "framer-motion";

const BenefitCard = ({ imgUrl, title, text, variant }) => {
  return (
    <motion.div
      variants={variant}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      className="benefits-card"
    >
      <div className="benefits-image-box">
        <img src={imgUrl} alt="Beneficio" className="benefits-image" />
      </div>

      <div className="benefits-info">
        <h4 className="benefits-title">{title}</h4>
        <p className="benefits-desc">{text}</p>
      </div>
    </motion.div>
  );
};

const HomeBenefits = () => {
  const mobileBenefitAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));
  const desktopFirstHalfBenefitAnimation = useMemo(() => ({
    offscreen: { x: -50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { duration: 1 } },
  }));
  const desktopSecondHalfBenefitAnimation = useMemo(() => ({
    offscreen: { x: 50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <div id="benefits" className="benefits-container">
      <div className="benefits-wrapper wrapper">
        <BenefitCard
          imgUrl="/assets/icons/transparency-icon.png"
          title="Transparência"
          text="Temos parceria com diferentes marcas e somos muito transparentes com as informações para que você tenha o maior poder de escolha."
          variant={
            window.innerWidth < 1024
              ? mobileBenefitAnimation
              : desktopFirstHalfBenefitAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/wallet-icon.png"
          title="Economize"
          text="Economize tempo e dinheiro, compare serviços e escolha o que melhor se encaixa na sua vida."
          variant={
            window.innerWidth < 1024
              ? mobileBenefitAnimation
              : desktopSecondHalfBenefitAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/ease-icon.png"
          title="Facilidade de comparação"
          text="Não perca horas pesquisando planos e serviços! Nós reunimos todos em um só lugar para que você possa comparar preços e benefícios de forma rápida e fácil."
          variant={
            window.innerWidth < 1024
              ? mobileBenefitAnimation
              : desktopFirstHalfBenefitAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/time-icon.png"
          title="Poupe tempo"
          text="Mostramos somente os planos disponíveis na sua cidade."
          variant={
            window.innerWidth < 1024
              ? mobileBenefitAnimation
              : desktopSecondHalfBenefitAnimation
          }
        />
      </div>
    </div>
  );
};

export default HomeBenefits;
