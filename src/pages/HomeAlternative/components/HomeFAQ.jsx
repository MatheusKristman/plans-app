import { IoIosArrowDown } from "react-icons/io";

const FAQCard = ({ question, answer, id }) => {
  return (
    <div className="faq-box">
      <div className="faq-info">
        <span className="faq-question">{question}</span>
        <button type="button" className="faq-button">
          <IoIosArrowDown />
        </button>
      </div>

      <div className="faq-answer-box active-answer">
        <span className="faq-answer">{answer}</span>
      </div>
    </div>
  );
};

const HomeFAQ = () => {
  return (
    <div className="faq-container wrapper">
      <h2 className="faq-title">Um pouco mais sobre (Nome da empresa)</h2>
      <p className="faq-desc">
        Nosso objetivo é proporcionar a você uma experiência tranquila ao
        escolher e aproveitar os planos oferecidos pelas melhores operadoras do
        mercado.
      </p>

      <div className="faq-wrapper">
        <FAQCard
          question="Quais são os benefícios de contratar um plano de banda larga específico para condomínios?"
          answer="Os planos de banda larga específicos para condomínios oferecem maior velocidade de conexão, suporte técnico especializado, opções de personalização e acesso a serviços de entretenimento diversificados."
          id={"1"}
        />
        <FAQCard
          question="Posso escolher entre diferentes operadoras ao contratar um plano de revenda para o meu condomínio?"
          answer="Sim, como revendedor, oferecemos planos de diferentes operadoras, permitindo que você escolha a melhor opção que atenda às necessidades do seu condomínio em termos de preço, cobertura e recursos."
          id={"2"}
        />
        <FAQCard
          question="Quais são os requisitos técnicos para instalar um plano de banda larga no meu condomínio?"
          answer="Os requisitos técnicos para instalar um plano de banda larga podem variar, mas geralmente incluem disponibilidade de infraestrutura de fibra óptica ou cabo coaxial, um ponto de entrada de rede adequado no condomínio e a configuração de equipamentos como roteadores ou modems."
          id={"3"}
        />
      </div>
    </div>
  );
};

export default HomeFAQ;
