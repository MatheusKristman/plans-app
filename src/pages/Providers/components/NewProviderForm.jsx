import React, { useEffect } from "react";
import useProviderStore from "../../../stores/useProviderStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import * as XLSX from "xlsx";
import api from "../../../services/api";
import { toast } from "react-toastify";

const NewProviderForm = () => {
  const {
    closeNewProviderForm,
    providerData,
    setProviderData,
    actualProviderLogo,
    setActualProviderLogo,
    cepError,
    setCepError,
    logoError,
    setLogoError,
    providerNameError,
    setProviderNameError,
    submitting,
    setSubmit,
    unsetSubmit,
    setProviders,
    resetProviderData,
    isLoading,
    setLoading,
    unsetLoading,
  } = useProviderStore(
    (state) => ({
      closeNewProviderForm: state.closeNewProviderForm,
      providerData: state.providerData,
      setProviderData: state.setProviderData,
      actualProviderLogo: state.actualProviderLogo,
      setActualProviderLogo: state.setActualProviderLogo,
      cepError: state.cepError,
      setCepError: state.setCepError,
      logoError: state.logoError,
      setLogoError: state.setLogoError,
      providerNameError: state.providerNameError,
      setProviderNameError: state.setProviderNameError,
      submitting: state.submitting,
      setSubmit: state.setSubmit,
      unsetSubmit: state.unsetSubmit,
      setProviders: state.setProviders,
      resetProviderData: state.resetProviderData,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      unsetLoading: state.unsetLoading,
    }),
    shallow,
  );
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow,
  );

  const handleCloseButton = () => {
    deactivateModalAnimation();

    resetProviderData();
    setLogoError("");
    setProviderNameError("");

    setTimeout(() => {
      closeNewProviderForm();
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

    if (providerData.providerLogo === null) {
      setLogoError("Imagem é obrigatória");
    }

    if (
      providerData.providerName === "" ||
      providerData.providerLogo === null
    ) {
      return;
    }

    setProviderNameError("");
    setLogoError("");
    setSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      const formData = new FormData();

      formData.append("providerLogo", providerData.providerLogo);
      formData.append("providerName", providerData.providerName);

      for (let i = 0; i < providerData.ceps.length; i++) {
        formData.append("locations[]", providerData.ceps[i]);
      }

      api
        .post("/provider/new", formData)
        .then((res) => {
          setProviders(res.data);
          setActualProviderLogo("");
          toast.success("Operadora criada com sucesso!", {
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
          handleCloseButton();
          unsetSubmit();
        });
    };

    if (submitting) {
      submitData();
    }
  }, [submitting]);

  return (
    <div
      className={
        modalAnimation
          ? "new-provider-form-overlay animate__animated animate__fast animate__fadeIn"
          : "new-provider-form-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-provider-form-container">
        <div className="new-provider-form-wrapper">
          <div className="new-provider-form-header">
            <button
              type="button"
              onClick={handleCloseButton}
              className="new-provider-form-close-button"
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

            <h3 className="new-provider-form-title">Nova Operadora</h3>
          </div>

          <div className="new-provider-form-body">
            <form onSubmit={handleSubmit} className="new-provider-form-form">
              <div className="new-provider-form-logo-box">
                <span className="new-provider-form-logo-title">Logo</span>
                <label
                  htmlFor="providerLogo"
                  className="new-provider-form-logo-label"
                >
                  {actualProviderLogo ? (
                    <img
                      src={actualProviderLogo}
                      alt="Provider Logo"
                      className="new-provider-form-provider-logo"
                    />
                  ) : (
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
                  )}

                  <input
                    type="file"
                    id="providerLogo"
                    name="providerLogo"
                    onChange={handleLogo}
                    className="new-provider-form-logo-input"
                  />
                </label>
                {logoError && (
                  <span className="new-provider-form-error-message">
                    {logoError}
                  </span>
                )}
              </div>

              <div className="new-provider-form-provider-name-box">
                <span className="new-provider-form-provider-name-label">
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
                  value={providerData.providerName}
                  style={providerNameError ? { borderColor: "#ef5959" } : {}}
                  className="new-provider-form-provider-name-input"
                />
                {providerNameError && (
                  <span className="new-provider-form-error-message">
                    {providerNameError}
                  </span>
                )}
              </div>

              <div className="new-provider-form-cep-box">
                <span className="new-provider-form-cep-title">
                  Ceps de cobertura
                </span>

                <div className="new-provider-form-cep-wrapper">
                  <label className="new-provider-form-cep-label">
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
                      onChange={handleXMLConvert}
                      name="providerCepXML"
                      className="new-provider-form-cep-xml-converter-input"
                    />
                  </label>

                  {isLoading && (
                    <img
                      src="/assets/icons/small-loading.gif"
                      className="new-provider-form-cep-loading"
                    />
                  )}
                </div>

                <textarea
                  name="providerCep"
                  autoComplete="off"
                  autoCorrect="off"
                  readOnly
                  value={providerData.ceps?.join("\n")}
                  style={cepError ? { borderColor: "#ef5959" } : {}}
                  className="new-provider-form-cep-textarea"
                />
                {cepError && (
                  <span className="new-provider-form-error-message">
                    {cepError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="new-provider-form-submit-button"
              >
                {submitting ? (
                  <img
                    src="/assets/icons/submit-loading.gif"
                    className="new-provider-form-submit-loading"
                  />
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

export default NewProviderForm;
