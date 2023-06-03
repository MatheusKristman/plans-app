import React, { useEffect, useRef } from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import BenefitsLabel from "./BenefitsLabel";

const schema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  cost: yup.string().required("Valor é obrigatório"),
  installationCost: yup.mixed().required("Valor da instalação é obrigatório"),
  download: yup.string().required("Velocidade de Download é obrigatório"),
  upload: yup.string().required("Velocidade de Upload é obrigatório"),
  franchiseLimit: yup.mixed().required("Franquia de Download é obrigatório"),
  technology: yup.string().required("Tecnologia do modem é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const NewInternetPlanModal = () => {
  const {
    closeInternetForm,
    allProviders,
    internetProviderId,
    setInternetProviderId,
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
    setActivePlans,
    setArchivedPlans,
    internetProviderError,
    setInternetProviderError,
    unsetInternetProviderError,
    internetResetInputs,
  } = useDashboardComponentStore(
    (state) => ({
      closeInternetForm: state.closeInternetForm,
      allProviders: state.allProviders,
      internetProviderId: state.internetProviderId,
      setInternetProviderId: state.setInternetProviderId,
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
      setActivePlans: state.setActivePlans,
      setArchivedPlans: state.setArchivedPlans,
      internetProviderError: state.internetProviderError,
      setInternetProviderError: state.setInternetProviderError,
      unsetInternetProviderError: state.unsetInternetProviderError,
      internetResetInputs: state.internetResetInputs,
    }),
    shallow
  );
  const { deactivateModalAnimation, modalAnimation, benefits, resetBenefits } =
    useGeneralStore(
      (state) => ({
        deactivateModalAnimation: state.deactivateModalAnimation,
        modalAnimation: state.modalAnimation,
        benefits: state.benefits,
        resetBenefits: state.resetBenefits,
      }),
      shallow
    );

  const installationCostCheckboxRef = useRef();
  const franchiseLimitRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    deactivateModalAnimation();
    internetResetInputs();
    resetBenefits();

    setTimeout(() => {
      closeInternetForm();
    }, 800);
  };

  const onSubmit = (data) => {
    if (internetProviderId === "") {
      scrollTo(0, 0);
      setInternetProviderError();
    }

    if (
      internetFranchiseLimit !== "" &&
      internetInstallationCost !== "" &&
      internetProviderId !== ""
    ) {
      unsetInternetProviderError();
      setToSubmit();
    }
  };

  useEffect(() => {
    const submitData = () => {
      console.log(internetTechnology);
      const data = {
        providerId: internetProviderId,
        title: internetTitle,
        cost: internetCost,
        installationCost: internetInstallationCost,
        download: internetDownload + internetDownloadUnit,
        upload: internetUpload + internetUploadUnit,
        franchiseLimit: internetFranchiseLimit,
        technology: internetTechnology,
        hasWifi: internetHasWifi,
        benefits: benefits,
        priority: internetPriority,
        description: internetDescription,
      };

      api
        .post("/plan/internet-plan/new", data)
        .then((res) => {
          setActivePlans(res.data.filter((plan) => !plan.archived));
          setArchivedPlans(res.data.filter((plan) => plan.archived));

          toast.success("Plano criado com sucesso!", {
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
          internetResetInputs();
          resetBenefits();
          cancelSubmit();
          handleCloseModal();
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
    console.log(internetDescription);
    console.log(typeof internetDescription);
  }, [internetDescription]);

  return (
    <div
      className={
        modalAnimation
          ? "new-internet-plan-modal-overlay animate__animated animate__fast animate__fadeIn"
          : "new-internet-plan-modal-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-internet-plan-modal-container">
        <div className="new-internet-plan-modal-wrapper">
          <div className="new-internet-plan-modal-header">
            <button
              type="button"
              className="new-internet-plan-modal-close-button"
              onClick={handleCloseModal}
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
            <h3 className="new-internet-plan-modal-title">Novo Plano</h3>
          </div>

          <div className="new-internet-plan-modal-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="new-internet-plan-modal-form"
            >
              <div className="new-internet-plan-modal-provider-box">
                <span className="new-internet-plan-modal-provider-title">
                  Operadora
                </span>
                <div className="new-internet-plan-modal-provider-options">
                  {allProviders?.map((provider) => (
                    <label
                      key={provider._id}
                      htmlFor={provider._id}
                      style={
                        internetProviderId === provider._id
                          ? { pointerEvents: "none" }
                          : {}
                      }
                      className={
                        internetProviderId === provider._id
                          ? "new-internet-plan-modal-provider-label provider-selected"
                          : "new-internet-plan-modal-provider-label"
                      }
                    >
                      <div className="new-internet-plan-modal-provider-label-logo">
                        <img
                          src={`https://planos-backend.onrender.com/assets/${provider.providerLogo}`}
                          alt={provider.providerName}
                          className="new-internet-plan-modal-provider-image"
                        />
                      </div>
                      <input
                        name="internetProviderId"
                        onChange={setInternetProviderId}
                        id={provider._id}
                        type="radio"
                        value={provider._id}
                        className="new-internet-plan-modal-provider-item"
                      />
                    </label>
                  ))}
                </div>
                {internetProviderError && (
                  <span
                    style={{ marginTop: "3px" }}
                    className="new-internet-plan-modal-error-form"
                  >
                    Operadora é obrigatório
                  </span>
                )}
              </div>

              <div className="new-internet-plan-modal-title-box">
                <span className="new-internet-plan-modal-title-label">
                  Título
                </span>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  onChange={setInternetTitle}
                  value={internetTitle}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.title ? { border: "2px solid #EF5959" } : {}}
                  className="new-internet-plan-modal-title-input"
                />
                {errors.title && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="new-internet-plan-modal-cost-box">
                <span className="new-internet-plan-modal-cost-title">
                  Valor
                </span>
                <input
                  {...register("cost")}
                  type="number"
                  name="cost"
                  onChange={setInternetCost}
                  value={internetCost}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  className="new-internet-plan-modal-cost-input"
                />
                {errors.cost && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.cost.message}
                  </span>
                )}
              </div>

              <div className="new-internet-plan-modal-installation-cost-box">
                <span className="new-internet-plan-modal-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  {...register("installationCost")}
                  type="number"
                  name="installationCost"
                  onChange={setInternetInstallationCost}
                  value={internetInstallationCost}
                  disabled={installationCostCheckboxRef.current?.checked}
                  autoCorrect="off"
                  autoComplete="off"
                  style={
                    errors.installationCost
                      ? { border: "2px solid #ef5959" }
                      : {}
                  }
                  className="new-internet-plan-modal-installation-cost-input"
                />
                {errors.installationCost && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.installationCost.message}
                  </span>
                )}
                <label className="new-internet-plan-modal-installation-cost-label">
                  <input
                    type="checkbox"
                    name="installationCost"
                    ref={installationCostCheckboxRef}
                    onChange={setInternetInstallationCost}
                    className="new-internet-plan-modal-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="new-internet-plan-modal-download-box">
                <span className="new-internet-plan-modal-download-title">
                  Velocidade de download
                </span>
                <input
                  {...register("download")}
                  type="number"
                  name="download"
                  onChange={setInternetDownload}
                  value={internetDownload}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.download ? { border: "2px solid #ef5959" } : {}}
                  className="new-internet-plan-modal-download-input"
                />
                {errors.download && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.download.message}
                  </span>
                )}

                <div className="new-internet-plan-modal-download-unit-wrapper">
                  <label
                    htmlFor="downloadMB"
                    className="new-internet-plan-modal-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadMB"
                      name="downloadUnit"
                      onChange={setInternetDownloadUnit}
                      value="MB"
                      checked={internetDownloadUnit === "MB"}
                      className="new-internet-plan-modal-download-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="downloadGB"
                    className="new-internet-plan-modal-download-unit-label"
                  >
                    <input
                      type="radio"
                      id="downloadGB"
                      name="downloadUnit"
                      onChange={setInternetDownloadUnit}
                      value="GB"
                      className="new-internet-plan-modal-download-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="new-internet-plan-modal-upload-box">
                <span className="new-internet-plan-modal-upload-title">
                  Velocidade de upload
                </span>
                <input
                  {...register("upload")}
                  type="number"
                  name="upload"
                  onChange={setInternetUpload}
                  value={internetUpload}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.upload ? { border: "2px solid #ef5959" } : {}}
                  className="new-internet-plan-modal-upload-input"
                />
                {errors.upload && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.upload.message}
                  </span>
                )}

                <div className="new-internet-plan-modal-upload-unit-wrapper">
                  <label
                    htmlFor="uploadMB"
                    className="new-internet-plan-modal-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadMB"
                      name="uploadUnit"
                      onChange={setInternetUploadUnit}
                      value="MB"
                      checked={internetUploadUnit === "MB"}
                      className="new-internet-plan-modal-upload-unit-input"
                    />
                    MB
                  </label>
                  <label
                    htmlFor="uploadGB"
                    className="new-internet-plan-modal-upload-unit-label"
                  >
                    <input
                      type="radio"
                      id="uploadGB"
                      name="uploadUnit"
                      onChange={setInternetUploadUnit}
                      value="GB"
                      className="new-internet-plan-modal-upload-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="new-internet-plan-modal-franchise-limit-box">
                <span className="new-internet-plan-modal-franchise-limit-title">
                  Franquia de download
                </span>
                <input
                  {...register("franchiseLimit")}
                  type="number"
                  name="franchiseLimit"
                  onChange={setInternetFranchiseLimit}
                  value={internetFranchiseLimit}
                  disabled={franchiseLimitRef.current?.checked}
                  autoCorrect="off"
                  autoComplete="off"
                  style={
                    errors.franchiseLimit ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-internet-plan-modal-franchise-limit-input"
                />
                {errors.franchiseLimit && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.franchiseLimit.message}
                  </span>
                )}
                <label className="new-internet-plan-modal-franchise-limit-label">
                  <input
                    type="checkbox"
                    name="franchiseLimit"
                    ref={franchiseLimitRef}
                    onChange={setInternetFranchiseLimit}
                    className="new-internet-plan-modal-franchise-limit-checkbox"
                  />
                  Franquia ilimitada
                </label>
              </div>

              <div className="new-internet-plan-modal-technology-box">
                <span className="new-internet-plan-modal-technology-title">
                  Tecnologia do modem
                </span>
                <select
                  {...register("technology")}
                  name="technology"
                  onChange={setInternetTechnology}
                  defaultValue="Fibra Ótica"
                  autoCorrect="off"
                  autoComplete="off"
                  style={
                    errors.technology ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-internet-plan-modal-technology-select"
                >
                  <option
                    className="new-internet-plan-modal-technology-option"
                    value="Fibra Ótica"
                  >
                    Fibra Ótica
                  </option>

                  <option
                    className="new-internet-plan-modal-technology-option"
                    value="Cabo metálico"
                  >
                    Cabo metálico
                  </option>

                  <option
                    className="new-internet-plan-modal-technology-option"
                    value="Via Rádio"
                  >
                    Via Rádio
                  </option>

                  <option
                    className="new-internet-plan-modal-technology-option"
                    value="Via Satélite"
                  >
                    Via Satélite
                  </option>
                </select>
                {errors.technology && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.technology.message}
                  </span>
                )}
              </div>

              <div className="new-internet-plan-modal-has-wifi-box">
                <span className="new-internet-plan-modal-has-wifi-title">
                  Wifi incluso
                </span>

                <div className="new-internet-plan-modal-has-wifi-options">
                  <label
                    htmlFor="yes"
                    className="new-internet-plan-modal-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="hasWifi"
                      onChange={setInternetHasWifi}
                      defaultChecked
                      value={true}
                      className="new-internet-plan-modal-has-wifi-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="new-internet-plan-modal-has-wifi-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="hasWifi"
                      onChange={setInternetHasWifi}
                      value={false}
                      className="new-internet-plan-modal-has-wifi-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="new-internet-plan-modal-benefits-box">
                <span className="new-internet-plan-modal-benefits-title">
                  Benefícios
                </span>

                <div className="new-internet-plan-modal-benefits-options">
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

              <div className="new-internet-plan-modal-priority-box">
                <span className="new-internet-plan-modal-priority-title">
                  Prioridade
                </span>
                <select
                  name="priority"
                  onChange={setInternetPriority}
                  className="new-internet-plan-modal-priority-select"
                >
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={1}
                  >
                    1
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={2}
                  >
                    2
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={3}
                  >
                    3
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={4}
                  >
                    4
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={5}
                  >
                    5
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={6}
                  >
                    6
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={7}
                  >
                    7
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={8}
                  >
                    8
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={9}
                  >
                    9
                  </option>
                  <option
                    className="new-internet-plan-modal-priority-option"
                    value={10}
                  >
                    10
                  </option>
                </select>
              </div>

              <div className="new-internet-plan-modal-description-box">
                <span className="new-internet-plan-modal-description-title">
                  Descrição
                </span>

                <textarea
                  {...register("description")}
                  name="description"
                  onChange={setInternetDescription}
                  value={internetDescription}
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-internet-plan-modal-description-textarea"
                />
                {errors.description && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="new-internet-plan-modal-submit-button"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInternetPlanModal;
