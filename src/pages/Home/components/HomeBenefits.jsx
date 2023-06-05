import React from 'react';

const BenefitCard = ({ imgUrl, title, text }) => {
  return (
    <div className='benefits-card'>
      <div className='benefits-image-box'>
        <img src={imgUrl} alt='Beneficio' className='benefits-image' />
      </div>

      <div className='benefits-info'>
        <h4 className='benefits-title'>{title}</h4>
        <p className='benefits-desc'>{text}</p>
      </div>
    </div>
  );
};

const HomeBenefits = () => {
  return (
    <div className='benefits-container'>
      <div className='benefits-wrapper wrapper'>
        <BenefitCard
          imgUrl='/assets/icons/transparency-icon.png'
          title='Transparência'
          text='Temos parceria com diferentes marcas e somos muito transparentes com as informações para que você tenha o maior poder de escolha.'
        />
        <BenefitCard
          imgUrl='/assets/icons/wallet-icon.png'
          title='Economize'
          text='Economize tempo e dinheiro, compare serviços e escolha o que melhor se encaixa na sua vida.'
        />
        <BenefitCard
          imgUrl='/assets/icons/ease-icon.png'
          title='Facilidade de comparação'
          text='Não perca horas pesquisando planos e serviços! Nós reunimos todos em um só lugar para que você possa comparar preços e benefícios de forma rápida e fácil.'
        />
        <BenefitCard
          imgUrl='/assets/icons/time-icon.png'
          title='Poupe tempo'
          text='Mostramos somente os planos disponíveis na sua cidade.'
        />
      </div>
    </div>
  );
};

export default HomeBenefits;
