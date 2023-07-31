import { useMemo, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useAlternativeHomeStore from "../../../stores/useAlternativeHomeStore";
import { motion } from "framer-motion";

const FAQCard = ({ question, answer, isAnswerOpen, handleAnswer, id }) => {
  const faqRef = useRef(null);

  return (
    <div className="faq-box">
      <div
        style={isAnswerOpen ? { marginBottom: "25px" } : {}}
        onClick={() => handleAnswer(`answer${id}`)}
        className="faq-info"
      >
        <span className="faq-question">{question}</span>
        <button type="button" className="faq-button">
          <IoIosArrowDown />
        </button>
      </div>

      <div
        className="faq-answer-box"
        ref={faqRef}
        style={
          isAnswerOpen
            ? {
                maxHeight: `${faqRef.current?.scrollHeight + 30}px`,
                padding: "15px 60px 15px 15px",
              }
            : {
                maxHeight: "0px",
                padding: "0px 60px 0px 15px",
              }
        }
      >
        <span className="faq-answer">{answer}</span>
      </div>
    </div>
  );
};

const HomeFAQ = () => {
  const { answers, setAnswers } = useAlternativeHomeStore((state) => ({
    answers: state.answers,
    setAnswers: state.setAnswers,
  }));

  const faqAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  return (
    <motion.div
      transition={{ staggerChildren: 0.4 }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      id="faq"
      className="faq-container wrapper"
    >
      <motion.h2 variants={faqAnimation} className="faq-title">
        Um pouco mais sobre (Nome da empresa)
      </motion.h2>
      <motion.p variants={faqAnimation} className="faq-desc">
        Nosso objetivo é proporcionar a você uma experiência tranquila ao
        escolher e aproveitar os planos oferecidos pelas melhores operadoras do
        mercado.
      </motion.p>

      <motion.div variants={faqAnimation} className="faq-wrapper">
        <FAQCard
          question="Quais são os benefícios de contratar um plano de banda larga específico para condomínios?"
          answer="Os planos de banda larga específicos para condomínios oferecem maior velocidade de conexão, suporte técnico especializado, opções de personalização e acesso a serviços de entretenimento diversificados."
          isAnswerOpen={answers.answer1}
          handleAnswer={setAnswers}
          id={"1"}
        />
        <FAQCard
          question="Posso escolher entre diferentes operadoras ao contratar um plano de revenda para o meu condomínio?"
          answer="Sim, como revendedor, oferecemos planos de diferentes operadoras, permitindo que você escolha a melhor opção que atenda às necessidades do seu condomínio em termos de preço, cobertura e recursos."
          isAnswerOpen={answers.answer2}
          handleAnswer={setAnswers}
          id={"2"}
        />
        <FAQCard
          question="Quais são os requisitos técnicos para instalar um plano de banda larga no meu condomínio?"
          answer="Os requisitos técnicos para instalar um plano de banda larga podem variar, mas geralmente incluem disponibilidade de infraestrutura de fibra óptica ou cabo coaxial, um ponto de entrada de rede adequado no condomínio e a configuração de equipamentos como roteadores ou modems."
          isAnswerOpen={answers.answer3}
          handleAnswer={setAnswers}
          id={"3"}
        />
      </motion.div>
    </motion.div>
  );
};

export default HomeFAQ;
