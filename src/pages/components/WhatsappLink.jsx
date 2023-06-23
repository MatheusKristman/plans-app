import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWhatsappStore from "../../stores/useWhatsappStore";
import { shallow } from "zustand/shallow";

const WhatsappLink = () => {
  const { isDescHovered, setDescHovered, unsetDescHovered } = useWhatsappStore(
    (state) => ({
      isDescHovered: state.isDescHovered,
      setDescHovered: state.setDescHovered,
      unsetDescHovered: state.unsetDescHovered,
    }),
    shallow
  );

  const descAnimation = useMemo(() => ({
    initial: { x: 50, y: "-50%", opacity: 0 },
    animate: { x: 0, y: "-50%", opacity: 1, transition: { duration: 0.3 } },
    exit: { x: 0, y: "-50%", opacity: 0, transition: { duration: 0.3 } },
  }));
  const containerAnimation = useMemo(() => ({
    initial: { y: -25, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <motion.div
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      className="whatsapp-container"
    >
      <a
        className="whatsapp-link"
        href={`${
          import.meta.env.VITE_WHATSAPP_BASE_API
        }Olá, gostaria de tirar uma dúvida sobre os planos disponíveis.`}
        target="_blank"
        onMouseOver={setDescHovered}
        onMouseLeave={unsetDescHovered}
        rel="noreferrer noopener"
      >
        <i className="fa-brands fa-whatsapp whatsapp-icon" />
      </a>

      <AnimatePresence>
        {isDescHovered && (
          <motion.p
            variants={window.innerWidth >= 1024 ? descAnimation : {}}
            initial="initial"
            animate="animate"
            exit="exit"
            key={isDescHovered}
            className="whatsapp-desc"
          >
            Tire sua dúvida aqui
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WhatsappLink;
