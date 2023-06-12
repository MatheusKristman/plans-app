import React, { useEffect } from "react";
import useHomeStore from "../../stores/useHomeStore" 
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";

const Footer = () => {
  const { footerMessage, setFooterMessage } = useHomeStore(
    (state) => ({
      footerMessage: state.footerMessage,
      setFooterMessage: state.setFooterMessage,
    }),
    shallow
  );

  const handleSubmitMessage = () => {
    console.log(footerMessage.length);

    if (footerMessage.length > 100) {
      window.location.assign(
        `${import.meta.env.VITE_WHATSAPP_BASE_API}${footerMessage}`
      );
    } else {
      toast.error("Mensagem precisa ter acima de 100 caracteres", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    console.log(footerMessage);
  }, [footerMessage]);

  return (
    <div className="home-footer-container">
      <div className="home-footer-wrapper wrapper">
        <div className="home-footer-above">
          <div className="home-footer-info-box">
            <h1 className="home-footer-logo">Logo</h1>

            <span className="home-footer-desc">
              Encontrado o plano perfeito com facilidade e praticidade
            </span>
          </div>

          <nav className="home-footer-nav">
            <ul className="home-footer-list">
              <li className="home-footer-item">
                <a href="#howItWorks">Como funciona</a>
              </li>
              <li className="home-footer-item">
                <a href="#benefits">Benefícios</a>
              </li>
              <li className="home-footer-item">
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>

          <div className="home-footer-support-box">
            <h4 className="home-footer-support-title">Suporte</h4>

            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              onChange={setFooterMessage}
              value={footerMessage}
              className="home-footer-support-input"
              placeholder="Digite sua duvida aqui..."
            />

            <button
              type="button"
              onClick={handleSubmitMessage}
              className="home-footer-support-button"
            >
              Enviar
            </button>
          </div>
        </div>

        <div className="home-footer-below">
          <div className="home-footer-dev-logo-box">
            <img src="/assets/icons/mk-logo.svg" alt="MK-Dev" />
          </div>

          <span className="home-footer-copyright">
            © Copyright - 2023 - nome da empresa
          </span>

          <div className="home-footer-agency-logo-box">
            <span className="home-footer-agency-logo">Logo Agencia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
