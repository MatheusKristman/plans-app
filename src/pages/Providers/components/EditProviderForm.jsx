import React, { useEffect } from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import useProviderStore from "../../../stores/useProviderStore";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import api from "../../../services/api";

const EditProviderForm = () => {
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
  );
  const {
    closeEditProviderForm,
    providerSelectedForEditing,
    setProviderSelectedForEditing,
    setIdSelectedForEditing,
    actualProviderLogo,
    setActualProviderLogo,
    providerData,
    setProviderData,
    resetProviderData,
    logoError,
    setLogoError,
    providerNameError,
    setProviderNameError,
    cepError,
    setCepError,
    submitting,
    setSubmit,
    unsetSubmit,
    isLoading,
    setLoading,
    unsetLoading,
    setProviders,
  } = useProviderStore((state) => ({
    closeEditProviderForm: state.closeEditProviderForm,
    providerSelectedForEditing: state.providerSelectedForEditing,
    setProviderSelectedForEditing: state.setProviderSelectedForEditing,
    setIdSelectedForEditing: state.setIdSelectedForEditing,
    actualProviderLogo: state.actualProviderLogo,
    setActualProviderLogo: state.setActualProviderLogo,
    providerData: state.providerData,
    setProviderData: state.setProviderData,
    resetProviderData: state.resetProviderData,
    logoError: state.logoError,
    setLogoError: state.setLogoError,
    providerNameError: state.providerNameError,
    setProviderNameError: state.setProviderNameError,
    cepError: state.cepError,
    setCepError: state.setCepError,
    submitting: state.submitting,
    setSubmit: state.setSubmit,
    unsetSubmit: state.unsetSubmit,
    isLoading: state.isLoading,
    setLoading: state.setLoading,
    unsetLoading: state.unsetLoading,
    setProviders: state.setProviders,
  }));

  const handleCloseForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeEditProviderForm();
      resetProviderData();
      setLogoError("");
      setProviderNameError("");
      setIdSelectedForEditing("");
      setProviderSelectedForEditing({});
    }, 800);
  };

  const handleXMLConvert = (event) => {
    setLoading();
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const ceps = parsedData.map((data) =>
          data.CEP.toString().length < 8
            ? "0" +
              data.CEP.toString().substring(0, data.CEP.toString().length - 3) +
              "-" +
              data.CEP.toString().substring(data.CEP.toString().length - 3)
            : data.CEP.toString().substring(0, data.CEP.toString().length - 3) +
              "-" +
              data.CEP.toString().substring(data.CEP.toString().length - 3),
        );
        setProviderData(ceps, "ceps");
        setCepError("");
      } catch (error) {
        console.error(error);
        setCepError("Ocorreu um erro durante a conversão, tente novamente");
      } finally {
        unsetLoading();
      }
    };

    reader.onerror = (error) => {
      setCepError("Ocorreu um erro na leitura do arquivo, tente novamente");
    };
  };

  const handleLogo = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setActualProviderLogo(URL.createObjectURL(file));
      setProviderData(file, "providerLogo");
      setLogoError("");
    } else {
      setLogoError("O arquivo selecionado não é uma imagem válida");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (providerData.providerName === "") {
      setProviderNameError("Campo Nome da Operadora é obrigatório");
    }

    if (providerData.providerName === "") {
      return;
    }

    setProviderNameError("");
    setLogoError("");
    setSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      const formData = new FormData();

      if (providerData.providerLogo) {
        formData.append("providerLogo", providerData.providerLogo);
      }

      formData.append("providerName", providerData.providerName);
      formData.append("providerId", providerSelectedForEditing._id);

      for (let i = 0; i < providerData.ceps.length; i++) {
        formData.append("locations[]", providerData.ceps[i]);
      }

      api
        .patch("/provider/edit", formData)
        .then((res) => {
          setProviders(res.data);
          setActualProviderLogo("");
          toast.success("Operadora editada com sucesso!", {
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
        .finally(() => {
          handleCloseForm();
          unsetSubmit();
        });
    };

    if (submitting) {
      submitData();
    }
  }, [submitting]);

  useEffect(() => {
    setProviderData(providerSelectedForEditing.providerName, "providerName");
    setProviderData(providerSelectedForEditing.locations, "ceps");
  }, [providerSelectedForEditing]);

  return (
    <div
      className={
        modalAnimation
          ? "edit-provider-form-overlay animate__animated animate__fast animate__fadeIn"
          : "edit-provider-form-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="edit-provider-form-container">
        <div className="edit-provider-form-wrapper">
          <div className="edit-provider-form-header">
            <button
              type="button"
              onClick={handleCloseForm}
              disabled={submitting}
              className="edit-provider-form-close-button"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="edit-provider-form-title">Editar Operadora</h3>
          </div>

          <div className="edit-provider-form-body">
            <form onSubmit={handleSubmit} className="edit-provider-form-form">
              <div className="edit-provider-form-logo-box">
                <span className="edit-provider-form-logo-title">Logo</span>
                <label
                  htmlFor="providerLogo"
                  className="edit-provider-form-logo-label"
                >
                  <img
                    src={
                      actualProviderLogo !== ""
                        ? actualProviderLogo
                        : `${import.meta.env.VITE_API_KEY}/assets/${
                            providerSelectedForEditing?.providerLogo
                          }`
                    }
                  />

                  <input
                    type="file"
                    id="providerLogo"
                    name="providerLogo"
                    onChange={handleLogo}
                    className="edit-provider-form-logo-input"
                  />
                </label>
                {logoError && (
                  <span className="edit-provider-form-error-message">
                    {logoError}
                  </span>
                )}
              </div>

              <div className="edit-provider-form-provider-name-box">
                <span className="edit-provider-form-provider-name-label">
                  Nome da operadora
                </span>

                <input
                  type="text"
                  autoCorrect="off"
                  autoComplete="off"
                  name="providerName"
                  onChange={(event) =>
                    setProviderData(event.target.value, "providerName")
                  }
                  defaultValue={providerData?.providerName}
                  value={providerData.providerName}
                  style={providerNameError ? { borderColor: "#ef5959" } : {}}
                  className="edit-provider-form-provider-name-input"
                />
                {providerNameError && (
                  <span className="edit-provider-form-error-message">
                    {providerNameError}
                  </span>
                )}
              </div>

              <div className="edit-provider-form-cep-box">
                <span className="edit-provider-form-cep-title">
                  Ceps de cobertura
                </span>

                <div className="edit-provider-form-cep-wrapper">
                  <label className="edit-provider-form-cep-label">
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    Converter lista XML
                    <input
                      type="file"
                      name="providerCepXML"
                      onChange={handleXMLConvert}
                      className="edit-provider-form-cep-xml-converter-input"
                    />
                  </label>

                  {isLoading && (
                    <img
                      src="/assets/icons/small-loading.gif"
                      className="edit-provider-form-cep-loading"
                    />
                  )}
                </div>

                <textarea
                  name="providerCep"
                  autoComplete="off"
                  autoCorrect="off"
                  defaultValue={providerData?.ceps?.join("\n")}
                  value={providerData?.ceps?.join("\n")}
                  style={cepError ? { borderColor: "#ef5959" } : {}}
                  className="edit-provider-form-cep-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="edit-provider-form-submit-button"
              >
                {submitting ? (
                  <>
                    <img
                      src="/assets/icons/submit-loading.gif"
                      className="edit-provider-form-submit-loading"
                    />
                    Salvar
                  </>
                ) : (
                  "Salvar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProviderForm;
