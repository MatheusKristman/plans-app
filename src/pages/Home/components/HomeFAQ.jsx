import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useHomeStore from '../../../stores/useHomeStore';

const FAQCard = ({ question, answer, isAnswerOpen, handleAnswer, id }) => {
  return (
    <div className='faq-box'>
      <div
        className='faq-info'
        style={isAnswerOpen ? { marginBottom: '25px' } : {}}
        onClick={() => handleAnswer(`answer${id}`)}
      >
        <span className='faq-question'>{question}</span>
        <button className='faq-button'>
          <IoIosArrowDown />
        </button>
      </div>

      <div
        className={
          isAnswerOpen ? 'faq-answer-box active-answer' : 'faq-answer-box desactive-answer'
        }
      >
        <span className='faq-answer'>{answer}</span>
      </div>
    </div>
  );
};

const HomeFAQ = () => {
  const { answers, setAnswers } = useHomeStore((state) => ({
    answers: state.answers,
    setAnswers: state.setAnswers,
  }));

  return (
    <div id='faq' className='faq-container wrapper'>
      <h2 className='faq-title'>Um pouco mais sobre (Nome da empresa)</h2>
      <p className='faq-desc'>
        Somos um comparador de ofertas de serviços financeiros e de telecom. Utilizando nossa
        ferramenta, você encontra planos de celular.
      </p>

      <div className='faq-wrapper'>
        <FAQCard
          question='Preciso pagar para usar?'
          answer='Não. somos uma plataforma 100% gratuita que te permite comparar ofertas e descobrir quais são as melhores operadoras e opções de preços da sua cidade.'
          isAnswerOpen={answers.answer1}
          handleAnswer={setAnswers}
          id={'1'}
        />
        <FAQCard
          question='(nome da empresa) é uma operadora?'
          answer='O (nome da empresa) não é uma operadora, nem está vinculado a nenhum provedor. Nossa plataforma é 100% transparente em seu comparador de planos para que o usuário escolha o que é melhor para o seu perfil de consumidor.'
          isAnswerOpen={answers.answer2}
          handleAnswer={setAnswers}
          id={'2'}
        />
        <FAQCard
          question='Como saber se o plano que quero esta disponível na minha cidade?'
          answer='No comparador de planos do (nome da empresa), basta informar a cidade e conferir todos os planos disponíveis em sua localidade, tanto de operadoras nacionais quanto regionais.'
          isAnswerOpen={answers.answer3}
          handleAnswer={setAnswers}
          id={'3'}
        />
      </div>
    </div>
  );
};

export default HomeFAQ;
