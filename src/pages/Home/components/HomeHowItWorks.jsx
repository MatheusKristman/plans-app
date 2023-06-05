import React from 'react';

const StepsCard = ({tag, title, desc}) => {
  return (
    <div className='how-it-works-card'>
      <span className='how-it-works-tag'>{tag}</span>
      <h4 className='how-it-works-card-title'>{title}</h4>
      <p className='how-it-works-desc'>{desc}</p>
    </div>
  );
};

const HomeHowItWorks = () => {
  return (
    <div className='how-it-works-container'>
      <div className='wrapper'>
        <h2 className='how-it-works-title'>Seu plano em apenas 3 passos</h2>

        <div className='how-it-works-wrapper'>
          <StepsCard
            tag={'1'}
            title={'Escolha um serviço'}
            desc={'Selecione sua cidade e encontre o melhor plano para você'}
          />
          <StepsCard
            tag={'2'}
            title={'Compare'}
            desc={'Utilize os filtros para facilitar a sua busca'}
          />
          <StepsCard
            tag={'3'}
            title={'Aproveite'}
            desc={'Selecione o plano que você gostou e entre em contato'}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHowItWorks;
