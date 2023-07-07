import { useMemo } from "react";
import { motion } from "framer-motion";

const HomeHero = () => {
  const titleAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const descAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const buttonAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <div className="wrapper">
      <div className="hero-wrapper">
        <motion.div
          transition={{ staggerChildren: 0.4 }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 1 }}
          className="hero-info"
        >
          <motion.h1 variants={titleAnimate} className="hero-title">
            A Melhor Conexão Para Seu Condomínio
          </motion.h1>
          <motion.p variants={descAnimate} className="hero-desc">
            Conecte-se ao melhor da internet e desfrute de entretenimento
            excepcional com nossos planos de internet e TV especialmente
            desenvolvidos para condomínios, garantindo velocidade e diversão
            para todos os moradores.
          </motion.p>
          <motion.button
            type="button"
            variants={buttonAnimate}
            className="hero-cta"
          >
            Encontre seu plano
          </motion.button>
        </motion.div>

        <div className="hero-image">
          <div className="image-box">
            <img
              src="/assets/images/alternative-hero-bg.png"
              alt="Comdomínio"
              className="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
