import { useMemo } from "react";
import { motion } from "framer-motion";

const BenefitCard = ({ imgUrl, title, text, variant }) => {
  return (
    <motion.div
      variants={variant}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 1 }}
      className="benefits-card"
    >
      <div className="benefits-image-box">
        <img src={imgUrl} alt="Benefício" className="benefits-image" />
      </div>

      <div className="benefits-info">
        <h4 className="benefits-title">{title}</h4>
        <p className="benefits-desc">{text}</p>
      </div>
    </motion.div>
  );
};

const HomeBenefits = () => {
  const mobileBenefitsAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const desktopFirstHalfBenefitsAnimation = useMemo(() => ({
    offscreen: { x: -50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const desktopSecondHalfBenefitsAnimation = useMemo(() => ({
    offscreen: { x: 50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <div id="benefits" className="benefits-container">
      <div className="benefits-wrapper wrapper">
        <BenefitCard
          imgUrl="/assets/icons/ballon-icon.svg"
          title="Consultoria especializada"
          text="Receba orientação personalizada para encontrar os melhores planos de diferentes operadoras que atendam às necessidades do seu condomínio."
          variant={
            window.innerWidth < 1024 ? mobileBenefitsAnimation : desktopFirstHalfBenefitsAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/list-icon.svg"
          title="Amplas opções de escolha"
          text="Tenha acesso a uma variedade de planos de diferentes operadoras, permitindo escolher a opção mais adequada para o seu condomínio."
          variant={
            window.innerWidth < 1024 ? mobileBenefitsAnimation : desktopSecondHalfBenefitsAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/wallet-icon.svg"
          title="Negociações vantajosas"
          text="Aproveite negociações exclusivas e condições especiais ao adquirir planos de revenda por meio do nosso serviço, garantindo o melhor custo-benefício."
          variant={
            window.innerWidth < 1024 ? mobileBenefitsAnimation : desktopFirstHalfBenefitsAnimation
          }
        />
        <BenefitCard
          imgUrl="/assets/icons/gear-icon.svg"
          title="Simplifique o processo"
          text="Conte com nosso suporte para simplificar o processo de contratação de planos, poupando tempo e esforço para o condomínio."
          variant={
            window.innerWidth < 1024 ? mobileBenefitsAnimation : desktopSecondHalfBenefitsAnimation
          }
        />
      </div>
    </div>
  );
};

export default HomeBenefits;
