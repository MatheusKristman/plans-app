const HomeHero = () => {
  return (
    <div className='wrapper'>
      <div className='hero-wrapper'>
        <div className='hero-info'>
          <h1 className='hero-title'>A Melhor Conexão Para Seu Condomínio</h1>
          <p className='hero-desc'>
            Conecte-se ao melhor da internet e desfrute de entretenimento excepcional com nossos
            planos de internet e TV especialmente desenvolvidos para condomínios, garantindo
            velocidade e diversão para todos os moradores.
          </p>
          <button type='button' className='hero-cta'>
            Encontre seu plano
          </button>
        </div>

        <div className='hero-image'>
          <div className='image-box'>
            <img src='/assets/images/alternative-hero-bg.png' alt='Comdomínio' className='image' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
