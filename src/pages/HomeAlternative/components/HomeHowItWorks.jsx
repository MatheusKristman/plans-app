const StepsCard = ({ tag, title, description }) => {
  return (
    <div className="how-it-works-card">
      <span className="how-it-works-tag">{tag}</span>
      <h4 className="how-it-works-card-title">{title}</h4>
      <p className="how-it-works-desc">{description}</p>
    </div>
  );
};

const HomeHowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <div className="wrapper">
        <h2 className="how-it-works-title">
          Seu aprimoramento em apenas 3 passos
        </h2>

        <div className="how-it-works-wrapper">
          <StepsCard
            tag={"1"}
            title={"Identifique"}
            description={"Analise as necessidades  do condomínio."}
          />
          <StepsCard
            tag={"2"}
            title={"Personalize"}
            description={"Entre em contato e escolha um plano personalizado."}
          />
          <StepsCard
            tag={"3"}
            title={"Desfrute"}
            description={
              "Aproveite uma conexão de alta velocidade e qualidade no condomínio."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHowItWorks;
