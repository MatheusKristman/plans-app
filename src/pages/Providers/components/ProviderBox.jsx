import React from "react";
import useProviderStore from "../../../stores/useProviderStore";
import useGeneralStore from "../../../stores/useGeneralStore";

const ProviderBox = ({ providerLogo, providerName, plansQuant, id }) => {
  const { openDetailsBox, openEditProviderForm } = useProviderStore(
    (state) => ({
      openDetailsBox: state.openDetailsBox,
      openEditProviderForm: state.openEditProviderForm,
    })
  );
  const { activateModalAnimation } = useGeneralStore((state) => ({
    activateModalAnimation: state.activateModalAnimation,
  }));

  const handleDetailsBoxOpen = () => {
    openDetailsBox();
    activateModalAnimation();
  };

  const handleEditFormOpen = () => {
    openEditProviderForm();
    activateModalAnimation();
  };

  return (
    <div className="providers-component-provider-container">
      <div className="providers-component-provider-box">
        <div className="providers-component-info-box">
          <div className="providers-component-image-title-box">
            <div className="providers-component-image-box">
              {/* TDO mudar depois para receber do servidor */}
              <img
                src={`/assets/icons/${providerLogo}`}
                alt={providerName}
                className="providers-component-image"
              />
            </div>

            <h2 className="providers-component-provider-name">
              {providerName}
            </h2>
          </div>

          <div className="providers-component-registered-box">
            <span className="providers-component-registered-value">
              {plansQuant}
            </span>
            <span className="providers-component-registered-desc">
              Planos cadastrados
            </span>
          </div>
        </div>

        <div className="providers-component-buttons-box">
          <button
            onClick={handleDetailsBoxOpen}
            className="providers-component-details-button"
          >
            Ver Detalhes
          </button>

          <button
            onClick={handleEditFormOpen}
            className="providers-component-edit-button"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderBox;
