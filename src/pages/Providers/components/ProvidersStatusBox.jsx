import React from "react";
import useProviderStore from "../../../stores/useProviderStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const ProvidersStatusBox = () => {
  const { openNewProviderForm } = useProviderStore(
    (state) => ({
      openNewProviderForm: state.openNewProviderForm,
    }),
    shallow
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );

  const handleNewProviderOpen = () => {
    openNewProviderForm();
    activateModalAnimation();
  };

  return (
    <div className="providers-component-status-container">
      <h3 className="providers-component-mobile-title">Operadoras</h3>

      <div className="providers-component-status-wrapper">
        <span className="providers-component-status">Operadoras: </span>

        <button
          type="button"
          onClick={handleNewProviderOpen}
          className="providers-component-new-provider-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          NOVA OPERADORA
        </button>
      </div>
    </div>
  );
};

export default ProvidersStatusBox;
