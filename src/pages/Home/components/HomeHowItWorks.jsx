import React, { useMemo } from "react";
import { motion } from "framer-motion";

const StepsCard = ({ tag, title, desc }) => {
  const stepAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <motion.div variants={stepAnimation} className="how-it-works-card">
      <span className="how-it-works-tag">{tag}</span>
      <h4 className="how-it-works-card-title">{title}</h4>
      <p className="how-it-works-desc">{desc}</p>
    </motion.div>
  );
};

const HomeHowItWorks = () => {
  return (
    <div id="howItWorks" className="how-it-works-container">
      <div className="wrapper">
        <h2 className="how-it-works-title">Seu plano em apenas 3 passos</h2>

        <motion.div
          transition={{ staggerChildren: 0.3 }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          className="how-it-works-wrapper"
        >
          <StepsCard
            tag={"1"}
            title={"Escolha um serviço"}
            desc={"Selecione sua cidade e encontre o melhor plano para você"}
          />
          <StepsCard
            tag={"2"}
            title={"Compare"}
            desc={"Utilize os filtros para facilitar a sua busca"}
          />
          <StepsCard
            tag={"3"}
            title={"Aproveite"}
            desc={"Selecione o plano que você gostou e entre em contato"}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHowItWorks;
