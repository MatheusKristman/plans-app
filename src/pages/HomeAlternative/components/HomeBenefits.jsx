const BenefitCard = ({ imgUrl, title, text }) => {
  return (
    <div className="benefits-card">
      <div className="benefits-image-box">
        <img src={imgUrl} alt="Benefício" className="benefits-image" />
      </div>

      <div className="benefits-info">
        <h4 className="benefits-title">{title}</h4>
        <p className="benefits-desc">{text}</p>
      </div>
    </div>
  );
};

const HomeBenefits = () => {
  return (
    <div id="benefits" className="benefits-container">
      <div className="benefits-wrapper wrapper">
        <BenefitCard
          imgUrl="/assets/icons/ballon-icon.svg"
          title="Consultoria especializada"
          text="Receba orientação personalizada para encontrar os melhores planos de diferentes operadoras que atendam às necessidades do seu condomínio."
        />
        <BenefitCard
          imgUrl="/assets/icons/list-icon.svg"
          title="Amplas opções de escolha"
          text="Tenha acesso a uma variedade de planos de diferentes operadoras, permitindo escolher a opção mais adequada para o seu condomínio."
        />
        <BenefitCard
          imgUrl="/assets/icons/wallet-icon.svg"
          title="Negociações vantajosas"
          text="Aproveite negociações exclusivas e condições especiais ao adquirir planos de revenda por meio do nosso serviço, garantindo o melhor custo-benefício."
        />
        <BenefitCard
          imgUrl="/assets/icons/gear-icon.svg"
          title="Simplifique o processo"
          text="Conte com nosso suporte para simplificar o processo de contratação de planos, poupando tempo e esforço para o condomínio."
        />
      </div>
    </div>
  );
};

export default HomeBenefits;
