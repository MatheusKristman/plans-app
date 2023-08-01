import React from "react";
import useProviderStore from "../../../stores/useProviderStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ProviderBox = ({ providerLogo, providerName, plansQuant, id }) => {
  const {
    openDetailsBox,
    openEditProviderForm,
    setIdSelectedForDetails,
    setIdSelectedForEditing,
    setProviders,
  } = useProviderStore((state) => ({
    openDetailsBox: state.openDetailsBox,
    openEditProviderForm: state.openEditProviderForm,
    setIdSelectedForDetails: state.setIdSelectedForDetails,
    setIdSelectedForEditing: state.setIdSelectedForEditing,
    setProviders: state.setProviders,
  }));
  const { activateModalAnimation, setLoading, unsetLoading } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
      setLoading: state.setLoading,
      unsetLoading: state.unsetLoading,
    }),
  );

  const handleDetailsBoxOpen = (id) => {
    openDetailsBox();
    activateModalAnimation();
    setIdSelectedForDetails(id);
  };

  const handleEditFormOpen = (id) => {
    openEditProviderForm();
    activateModalAnimation();
    setIdSelectedForEditing(id);
  };

  const handleDeleteButton = (id) => {
    setLoading();
    api
      .delete(`/provider/delete/${id}`)
      .then((res) => {
        setProviders(res.data);
        toast.success("Operadora excluída com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => unsetLoading());
  };

  return (
    <div className="providers-component-provider-container">
      <div className="providers-component-provider-box">
        <div className="providers-component-info-box">
          <div className="providers-component-image-title-box">
            <div className="providers-component-image-box">
              <img
                src={`${import.meta.env.VITE_API_KEY}/assets/${providerLogo}`}
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
            type="button"
            onClick={() => handleDetailsBoxOpen(id)}
            className="providers-component-details-button"
          >
            Ver Detalhes
          </button>

          <button
            type="button"
            onClick={() => handleEditFormOpen(id)}
            className="providers-component-edit-button"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => handleDeleteButton(id)}
            className="providers-component-delete-button"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderBox;
