import React, { useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import BenefitsLabel from "../../DashboardComponent/components/BenefitsLabel";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import submitLoading from "../../../../public/assets/icons/submit-loading.gif";
import api from "../../../services/api";

const schema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  cost: yup.string().required("Valor é obrigatório"),
  installationCost: yup.string().required("Valor da instalação é obrigatório"),
  download: yup.string().required("Velocidade de Download é obrigatório"),
  upload: yup.string().required("Velocidade de Upload é obrigatório"),
  franchise: yup.string().required("Franquia de internet é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const EditInternetPlanForm = () => {
  const {
    closeEditInternetForm,
    planSelectedForEdit,
    internetTitle,
    setInternetTitle,
    internetCost,
    setInternetCost,
    internetInstallationCost,
    setInternetInstallationCost,
    internetDownload,
    setInternetDownload,
    internetDownloadUnit,
    setInternetDownloadUnit,
    internetUpload,
    setInternetUpload,
    internetUploadUnit,
    setInternetUploadUnit,
    internetFranchiseLimit,
    setInternetFranchiseLimit,
    internetTechnology,
    setInternetTechnology,
    internetHasWifi,
    setInternetHasWifi,
    internetPriority,
    setInternetPriority,
    internetDescription,
    setInternetDescription,
    isSubmitting,
    setToSubmit,
    cancelSubmit,
    defaultValuesForInternetForm,
    idSelectedForEdit,
    setIdSelectedForEdit,
    internetResetInputs,
    setPlans,
  } = usePlansStore(
    (state) => ({
      closeEditInternetForm: state.closeEditInternetForm,
      planSelectedForEdit: state.planSelectedForEdit,
      internetTitle: state.internetTitle,
      setInternetTitle: state.setInternetTitle,
      internetCost: state.internetCost,
      setInternetCost: state.setInternetCost,
      internetInstallationCost: state.internetInstallationCost,
      setInternetInstallationCost: state.setInternetInstallationCost,
      internetDownload: state.internetDownload,
      setInternetDownload: state.setInternetDownload,
      internetDownloadUnit: state.internetDownloadUnit,
      setInternetDownloadUnit: state.setInternetDownloadUnit,
      internetUpload: state.internetUpload,
      setInternetUpload: state.setInternetUpload,
      internetUploadUnit: state.internetUploadUnit,
      setInternetUploadUnit: state.setInternetUploadUnit,
      internetFranchiseLimit: state.internetFranchiseLimit,
      setInternetFranchiseLimit: state.setInternetFranchiseLimit,
      internetTechnology: state.internetTechnology,
      setInternetTechnology: state.setInternetTechnology,
      internetHasWifi: state.internetHasWifi,
      setInternetHasWifi: state.setInternetHasWifi,
      internetPriority: state.internetPriority,
      setInternetPriority: state.setInternetPriority,
      internetDescription: state.internetDescription,
      setInternetDescription: state.setInternetDescription,
      isSubmitting: state.isSubmitting,
      setToSubmit: state.setToSubmit,
      cancelSubmit: state.cancelSubmit,
      defaultValuesForInternetForm: state.defaultValuesForInternetForm,
      idSelectedForEdit: state.idSelectedForEdit,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
      internetResetInputs: state.internetResetInputs,
      setPlans: state.setPlans,
    }),
    shallow,
  );
  const {
    modalAnimation,
    deactivateModalAnimation,
    defaultBenefits,
    benefits,
    resetBenefits,
  } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
      defaultBenefits: state.defaultBenefits,
      benefits: state.benefits,
      resetBenefits: state.resetBenefits,
    }),
    shallow,
  );

  const installationCostCheckboxRef = useRef();
  const franchiseLimitRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: internetTitle,
      cost: internetCost,
      download: internetDownload,
      upload: internetUpload,
      technology: internetTechnology,
      description: internetDescription,
    },
  });

  const handleCloseForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeEditInternetForm();
      resetBenefits();
      internetResetInputs();
      setIdSelectedForEdit("");
    }, 800);
  };

  const onSubmit = (data) => {
    setToSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      const data = {
        id: idSelectedForEdit,
        title: internetTitle,
        cost: Number(internetCost.replace(",", ".")),
        installationCost: internetInstallationCost,
        download: internetDownload + internetDownloadUnit,
        upload: internetUpload + internetUploadUnit,
        franchiseLimit: internetFranchiseLimit,
        technology: internetTechnology,
        hasWifi: internetHasWifi,
        benefits: benefits,
        priority: internetPriority,
        description: internetDescription.split("\n"),
      };

      api
        .put("/plan/internet-plan/edit", data)
        .then((res) => {
          setPlans(res.data);

          toast.success("Plano editado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          handleCloseForm();
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
          cancelSubmit();
        });
    };

    const checkSubmit = () => {
      if (isSubmitting) {
        submitData();
      }
    };

    checkSubmit();
  }, [isSubmitting]);

  useEffect(() => {
    if (planSelectedForEdit.hasOwnProperty("_id")) {
      defaultValuesForInternetForm();
      defaultBenefits(planSelectedForEdit.benefits);
      setValue("title", planSelectedForEdit.title);
      setValue("cost", planSelectedForEdit.cost?.toFixed(2).replace(".", ","));
      setValue("installationCost", planSelectedForEdit.installationCost);
      setValue(
        "download",
        planSelectedForEdit.download?.substring(
          0,
          planSelectedForEdit.download?.length - 2,
        ),
      );
      setValue(
        "upload",
        planSelectedForEdit.upload?.substring(
          0,
          planSelectedForEdit.upload?.length - 2,
        ),
      );
      setValue("franchise", planSelectedForEdit.franchiseLimit);
      setValue("description", planSelectedForEdit.description?.join("\n"));
    }
  }, [planSelectedForEdit]);

  useEffect(() => {
    if (internetInstallationCost === "Grátis") {
      setValue("installationCost", "Grátis");
    }

    if (internetFranchiseLimit === "Ilimitado") {
      setValue("franchise", "Ilimitado");
    }
  }, [internetInstallationCost, internetFranchiseLimit]);

  return (
    <div
      className={
        modalAnimation
          ? "edit-internet-plan-overlay animate__animated animate__fast animate__fadeIn"
          : "edit-internet-plan-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="edit-internet-plan-container">
        <div className="edit-internet-plan-wrapper">
          <div className="edit-internet-plan-header">
            <button
              type="button"
              onClick={handleCloseForm}
              disabled={isSubmitting}
              className="edit-internet-plan-close-button"
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
            <h3 className="edit-internet-plan-title">Editar Plano</h3>
          </div>

          <div className="edit-internet-plan-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="edit-internet-plan-form"
            >
              <div className="edit-internet-plan-title-box">
                <span className="edit-internet-plan-title-label">Título</span>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  onChange={setInternetTitle}
                  value={internetTitle}
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.title ? { border: "2px solid #EF5959" } : {}}
                  className="edit-internet-plan-title-input"
                />
                {errors.title && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="edit-internet-plan-cost-box">
                <span className="edit-internet-plan-cost-title">Valor</span>
                <input
                  {...register("cost")}
                  type="text"
                  name="cost"
                  onChange={setInternetCost}
                  value={internetCost}
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-internet-plan-cost-input"
                />
                {errors.cost && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.cost.message}
                  </span>
                )}
              </div>

              <div className="edit-internet-plan-installation-cost-box">
                <span className="edit-internet-plan-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  {...register("installationCost")}
                  type="text"
                  name="installationCost"
                  onChange={(event) => {
                    setInternetInstallationCost(event);
                    setValue("installationCost", event.target.value);
                  }}
                  value={internetInstallationCost}
                  disabled={installationCostCheckboxRef.current?.checked}
                  style={
                    errors.installationCost
                      ? { border: "2px solid #ef5959" }
                      : {}
                  }
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-internet-plan-installation-cost-input"
                />
                {errors.installationCost && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.installationCost?.message}
                  </span>
                )}
                <label
                  htmlFor="freeInstallationCost"
                  className="edit-internet-plan-installation-cost-label"
                >
                  <input
                    type="checkbox"
                    name="installationCost"
                    id="freeInstallationCost"
                    onChange={(event) => {
                      setInternetInstallationCost(event);

                      if (event.target.checked) {
                        setValue("installationCost", "Grátis");
                      } else {
                        setValue("installationCost", "");
                      }
                    }}
                    autoCorrect="off"
                    autoComplete="off"
                    ref={installationCostCheckboxRef}
                    checked={internetInstallationCost === "Grátis"}
                    className="edit-internet-plan-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="edit-internet-plan-download-box">
                <span className="edit-internet-plan-download-title">
                  Velocidade de download
                </span>

                <input
                  {...register("download")}
                  type="text"
                  name="download"
                  onChange={setInternetDownload}
                  value={internetDownload}
                  style={errors.download ? { border: "2px solid #ef5959" } : {}}
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-internet-plan-download-input"
                />
                {errors.download && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.download.message}
                  </span>
                )}

                <div className="edit-internet-plan-download-unit-wrapper">
                  <label
                    htmlFor="downloadMB"
                    className="edit-internet-plan-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadMB"
                      name="downloadUnit"
                      onChange={setInternetDownloadUnit}
                      value="MB"
                      checked={internetDownloadUnit === "MB"}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-internet-plan-download-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="downloadGB"
                    className="edit-internet-plan-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadGB"
                      name="downloadUnit"
                      onChange={setInternetDownloadUnit}
                      value="GB"
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-internet-plan-download-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-upload-box">
                <span className="edit-internet-plan-upload-title">
                  Velocidade de upload
                </span>

                <input
                  {...register("upload")}
                  type="text"
                  name="upload"
                  onChange={setInternetUpload}
                  value={internetUpload}
                  style={errors.upload ? { border: "2px solid #ef5959" } : {}}
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-internet-plan-upload-input"
                />
                {errors.upload && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.upload.message}
                  </span>
                )}

                <div className="edit-internet-plan-upload-unit-wrapper">
                  <label
                    htmlFor="uploadMB"
                    className="edit-internet-plan-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadMB"
                      name="uploadUnit"
                      onChange={setInternetUploadUnit}
                      value="MB"
                      checked={internetUploadUnit === "MB"}
                      autoComplete="off"
                      autoCorrect="off"
                      className="edit-internet-plan-upload-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="uploadGB"
                    className="edit-internet-plan-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadGB"
                      name="uploadUnit"
                      onChange={setInternetUploadUnit}
                      value="GB"
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-internet-plan-upload-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-franchise-limit-box">
                <span className="edit-internet-plan-franchise-limit-title">
                  Franquia de download
                </span>

                <input
                  {...register("franchise")}
                  type="text"
                  name="franchiseLimit"
                  onChange={(event) => {
                    setInternetFranchiseLimit(event);
                    setValue("franchise", event.target.value);
                  }}
                  value={internetFranchiseLimit}
                  disabled={franchiseLimitRef.current?.checked}
                  style={
                    errors.franchise ? { border: "2px solid #ef5959" } : {}
                  }
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-internet-plan-franchise-limit-input"
                />
                {errors.franchise && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.franchise?.message}
                  </span>
                )}

                <label
                  htmlFor="unlimitedFranchise"
                  className="edit-internet-plan-franchise-limit-label"
                >
                  <input
                    type="checkbox"
                    id="unlimitedFranchise"
                    name="franchiseLimit"
                    ref={franchiseLimitRef}
                    onChange={(event) => {
                      setInternetFranchiseLimit(event);

                      if (event.target.checked) {
                        setValue("franchise", "Ilimitado");
                      } else {
                        setValue("franchise", "");
                      }
                    }}
                    checked={internetFranchiseLimit === "Ilimitado"}
                    autoCorrect="off"
                    autoComplete="off"
                    className="edit-internet-plan-franchise-limit-checkbox"
                  />
                  Franquia ilimitada
                </label>
              </div>

              <div className="edit-internet-plan-technology-box">
                <span className="edit-internet-plan-technology-title">
                  Tecnologia do modem
                </span>

                <select
                  {...register("technology")}
                  name="technology"
                  onChange={setInternetTechnology}
                  value={internetTechnology}
                  style={
                    errors.technology ? { border: "2px solid #ef5959" } : {}
                  }
                  className="edit-internet-plan-technology-select"
                >
                  <option value="Fibra Ótica">Fibra Ótica</option>

                  <option value="Cabo Metálico">Cabo Metálico</option>

                  <option value="Via Rádio">Via Rádio</option>

                  <option value="Via Satélite">Via Satélite</option>
                </select>
                {errors.technology && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.technology.message}
                  </span>
                )}
              </div>

              <div className="edit-internet-plan-has-wifi-box">
                <span className="edit-internet-plan-has-wifi-title">
                  Wifi incluso?
                </span>

                <div className="edit-internet-plan-has-wifi-wrapper">
                  <label
                    htmlFor="yes"
                    className="edit-internet-plan-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="hasWifi"
                      onChange={setInternetHasWifi}
                      defaultChecked
                      value={true}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-internet-plan-has-wifi-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="edit-internet-plan-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="hasWifi"
                      onChange={setInternetHasWifi}
                      value={false}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-internet-plan-has-wifi-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="edit-internet-plan-benefits-box">
                <span className="edit-internet-plan-benefits-title">
                  Benefícios
                </span>
                <div className="edit-internet-plan-benefits-options">
                  <BenefitsLabel
                    htmlFor="audiobookTim"
                    imageSrc="/assets/icons/audiobook-tim.png"
                    imageAlt="Audiobook Tim"
                    inputId="audiobookTim"
                    value="Audiobook Tim"
                  />
                  <BenefitsLabel
                    htmlFor="babbel"
                    imageSrc="/assets/icons/babbel.png"
                    imageAlt="Babbel"
                    inputId="babbel"
                    value="Babbel"
                  />
                  <BenefitsLabel
                    htmlFor="bandNews"
                    imageSrc="/assets/icons/band-news.png"
                    imageAlt="Band News"
                    inputId="bandNews"
                    value="Band News"
                  />
                  <BenefitsLabel
                    htmlFor="bandSports"
                    imageSrc="/assets/icons/band-sports.png"
                    imageAlt="Band Sports"
                    inputId="bandSports"
                    value="Band Sports"
                  />
                  <BenefitsLabel
                    htmlFor="paramountChannel"
                    imageSrc="/assets/icons/paramount-channel.png"
                    imageAlt="Paramount Channel"
                    inputId="paramountChannel"
                    value="Paramount Channel"
                  />
                  <BenefitsLabel
                    htmlFor="timGames"
                    imageSrc="/assets/icons/tim-games.png"
                    imageAlt="Tim Games"
                    inputId="timGames"
                    value="Tim Games"
                  />
                  <BenefitsLabel
                    htmlFor="bancah"
                    imageSrc="/assets/icons/bancah.png"
                    imageAlt="Bancah"
                    inputId="bancah"
                    value="Bancah"
                  />
                  <BenefitsLabel
                    htmlFor="timSegurancaDigital"
                    imageSrc="/assets/icons/tim-seguranca-digital.png"
                    imageAlt="Tim Segurança Digital"
                    inputId="timSegurancaDigital"
                    value="Tim Segurança Digital"
                  />
                  <BenefitsLabel
                    htmlFor="instagram"
                    imageSrc="/assets/icons/instagram.png"
                    imageAlt="Instagram"
                    inputId="instagram"
                    value="Instagram"
                  />
                  <BenefitsLabel
                    htmlFor="facebook"
                    imageSrc="/assets/icons/facebook.png"
                    imageAlt="Facebook"
                    inputId="facebook"
                    value="Facebook"
                  />
                  <BenefitsLabel
                    htmlFor="twitter"
                    imageSrc="/assets/icons/twitter.png"
                    imageAlt="Twitter"
                    inputId="twitter"
                    value="Twitter"
                  />
                  <BenefitsLabel
                    htmlFor="whatsapp"
                    imageSrc="/assets/icons/whatsapp.png"
                    imageAlt="Whatsapp"
                    inputId="whatsapp"
                    value="Whatsapp"
                  />
                  <BenefitsLabel
                    htmlFor="waze"
                    imageSrc="/assets/icons/waze.png"
                    imageAlt="Waze"
                    inputId="waze"
                    value="Waze"
                  />
                  <BenefitsLabel
                    htmlFor="skeeloAudiobooks"
                    imageSrc="/assets/icons/skeelo-audiobooks.png"
                    imageAlt="Skeelo Audiobooks"
                    inputId="skeeloAudiobooks"
                    value="Skeelo Audiobooks"
                  />
                  <BenefitsLabel
                    htmlFor="funKids"
                    imageSrc="/assets/icons/funkids.png"
                    imageAlt="FunKids"
                    inputId="funKids"
                    value="FunKids"
                  />
                  <BenefitsLabel
                    htmlFor="ubookJornais"
                    imageSrc="/assets/icons/ubook-jornais.png"
                    imageAlt="Ubook Jornais"
                    inputId="ubookJornais"
                    value="Ubook Jornais"
                  />
                  <BenefitsLabel
                    htmlFor="estadioTntSports"
                    imageSrc="/assets/icons/estadio-tnt-sports.png"
                    imageAlt="Estadio TNT Sports"
                    inputId="estadioTntSports"
                    value="Estadio TNT Sports"
                  />
                  <BenefitsLabel
                    htmlFor="newCoPlus"
                    imageSrc="/assets/icons/new-co-plus.png"
                    imageAlt="New Co+"
                    inputId="newCoPlus"
                    value="New Co+"
                  />
                  <BenefitsLabel
                    htmlFor="lionsgatePlus"
                    imageSrc="/assets/icons/lionsgate-plus.png"
                    imageAlt="Lionsgate+"
                    inputId="lionsgatePlus"
                    value="Lionsgate+"
                  />
                  <BenefitsLabel
                    htmlFor="clubeDeRevistas"
                    imageSrc="/assets/icons/clube-de-revistas.png"
                    imageAlt="Clube de Revistas"
                    inputId="clubeDeRevistas"
                    value="Clube de Revistas"
                  />
                  <BenefitsLabel
                    htmlFor="oiPlay"
                    imageSrc="/assets/icons/oi-play.png"
                    imageAlt="Oi Play"
                    inputId="oiPlay"
                    value="Oi Play"
                  />
                  <BenefitsLabel
                    htmlFor="oiExpert"
                    imageSrc="/assets/icons/oi-expert.png"
                    imageAlt="Oi Expert"
                    inputId="oiExpert"
                    value="Oi Expert"
                  />
                  <BenefitsLabel
                    htmlFor="mcafee"
                    imageSrc="/assets/icons/mcafee.png"
                    imageAlt="McAfee"
                    inputId="mcafee"
                    value="McAfee"
                  />
                  <BenefitsLabel
                    htmlFor="playKids"
                    imageSrc="/assets/icons/playkids.png"
                    imageAlt="PlayKids"
                    inputId="playKids"
                    value="PlayKids"
                  />
                  <BenefitsLabel
                    htmlFor="dgo"
                    imageSrc="/assets/icons/dgo.png"
                    imageAlt="GBO"
                    inputId="dgo"
                    value="GBO"
                  />
                </div>
              </div>

              <div className="edit-internet-plan-priority-box">
                <span className="edit-internet-plan-priority-title">
                  Prioridade
                </span>

                <select
                  name="priority"
                  onChange={setInternetPriority}
                  value={internetPriority}
                  className="edit-internet-plan-priority-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="edit-internet-plan-description-box">
                <span className="edit-internet-plan-description-title">
                  Descrição
                </span>
                <textarea
                  {...register("description")}
                  name="description"
                  onChange={setInternetDescription}
                  value={internetDescription}
                  autoCorrect="off"
                  autoComplete="off"
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="edit-internet-plan-description-textarea"
                />
                {errors.description && (
                  <span className="edit-internet-plan-modal-error-form">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="edit-internet-plan-submit-button"
              >
                {isSubmitting ? (
                  <>
                    <img
                      src={submitLoading}
                      alt="loading"
                      className="edit-internet-plan-loading-submit"
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

export default EditInternetPlanForm;
