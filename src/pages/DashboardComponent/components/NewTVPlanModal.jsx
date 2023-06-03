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
  afterCost: yup.string(),
  periodToChangeCost: yup.string(),
  description: yup.string().required("Descrição é obrigatório"),
});

const NewTVPlanModal = () => {
  const {
    closeTVForm,
    allProviders,
    tvProviderId,
    setTVProviderId,
    tvTitle,
    setTVTitle,
    tvCost,
    setTVCost,
    tvCostChangesConfirmation,
    setTVCostChangesConfirmation,
    tvAfterCost,
    setTVAfterCost,
    tvPeriodToChangeCost,
    setTVPeriodToChangeCost,
    tvInstallationCost,
    setTVInstallationCost,
    tvDevices,
    setTVDevices,
    tvPriority,
    setTVPriority,
    tvDescription,
    setTVDescription,
    isSubmitting,
    setToSubmit,
    cancelSubmit,
    setActivePlans,
    setArchivedPlans,
    tvProviderError,
    setTVProviderError,
    unsetTVProviderError,
    tvInstallationCostError,
    setTVInstallationCostError,
    unsetTVInstallationCostError,
    tvResetInputs,
  } = useDashboardComponentStore(
    (state) => ({
      closeTVForm: state.closeTVForm,
      allProviders: state.allProviders,
      tvProviderId: state.tvProviderId,
      setTVProviderId: state.setTVProviderId,
      tvTitle: state.tvTitle,
      setTVTitle: state.setTVTitle,
      tvCost: state.tvCost,
      setTVCost: state.setTVCost,
      tvCostChangesConfirmation: state.tvCostChangesConfirmation,
      setTVCostChangesConfirmation: state.setTVCostChangesConfirmation,
      tvAfterCost: state.tvAfterCost,
      setTVAfterCost: state.setTVAfterCost,
      tvPeriodToChangeCost: state.tvPeriodToChangeCost,
      setTVPeriodToChangeCost: state.setTVPeriodToChangeCost,
      tvInstallationCost: state.tvInstallationCost,
      setTVInstallationCost: state.setTVInstallationCost,
      tvDevices: state.tvDevices,
      setTVDevices: state.setTVDevices,
      tvPriority: state.tvPriority,
      setTVPriority: state.setTVPriority,
      tvDescription: state.tvDescription,
      setTVDescription: state.setTVDescription,
      isSubmitting: state.isSubmitting,
      setToSubmit: state.setToSubmit,
      cancelSubmit: state.cancelSubmit,
      setActivePlans: state.setActivePlans,
      setArchivedPlans: state.setArchivedPlans,
      tvProviderError: state.tvProviderError,
      setTVProviderError: state.setTVProviderError,
      unsetTVProviderError: state.unsetTVProviderError,
      tvInstallationCostError: state.tvInstallationCostError,
      setTVInstallationCostError: state.setTVInstallationCostError,
      unsetTVInstallationCostError: state.unsetTVInstallationCostError,
      tvResetInputs: state.tvResetInputs,
    }),
    shallow
  );
  const { deactivateModalAnimation, modalAnimation, benefits, resetBenefits } =
    useGeneralStore((state) => ({
      deactivateModalAnimation: state.deactivateModalAnimation,
      modalAnimation: state.modalAnimation,
      benefits: state.benefits,
      resetBenefits: state.resetBenefits,
    }));

  const installationCostRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeTVForm();
    }, 800);
  };

  const onSubmit = (data) => {
    if (tvProviderId === "") {
      scrollTo(0, 0);
      setTVProviderError();
    }

    if (tvInstallationCost === "") {
      setTVInstallationCostError();
    }

    if (tvInstallationCost !== "" && tvProviderId !== "") {
      unsetTVProviderError();
      unsetTVInstallationCostError();
      setToSubmit();
    }
  };

  useEffect(() => {
    const submitData = () => {
      const data = {
        providerId: tvProviderId,
        title: tvTitle,
        cost: tvCost,
        afterCost: tvAfterCost,
        periodToChangeCost: tvPeriodToChangeCost,
        installationCost: tvInstallationCost,
        devicesQuant: tvDevices,
        benefits: benefits,
        priority: tvPriority,
        description: tvDescription,
      };

      api
        .post("/plan/tv-plan/new", data)
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
          tvResetInputs();
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
    console.log(tvProviderError);
    console.log(errors);
  }, [tvProviderError, errors]);

  return (
    <div
      className={
        modalAnimation
          ? "new-tv-plan-modal-overlay animate__animated animate__fast animate__fadeIn"
          : "new-tv-plan-modal-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-tv-plan-modal-container">
        <div className="new-tv-plan-modal-wrapper">
          <div className="new-tv-plan-modal-header">
            <button
              type="button"
              onClick={handleCloseModal}
              className="new-tv-plan-modal-close-button"
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

            <h3 className="new-tv-plan-modal-title">Novo Plano</h3>
          </div>

          <div className="new-tv-plan-modal-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="new-tv-plan-modal-form"
            >
              <div className="new-tv-plan-modal-provider-box">
                <span className="new-tv-plan-modal-provider-title">
                  Operadora
                </span>
                <div className="new-tv-plan-modal-provider-options">
                  {allProviders?.map((provider) => (
                    <label
                      key={provider._id}
                      htmlFor={provider._id}
                      style={
                        tvProviderId === provider._id
                          ? { pointerEvents: "none" }
                          : {}
                      }
                      className={
                        tvProviderId === provider._id
                          ? "new-tv-plan-modal-provider-label provider-selected"
                          : "new-tv-plan-modal-provider-label"
                      }
                    >
                      <div className="new-tv-plan-modal-provider-label-logo">
                        <img
                          src={`https://planos-backend.onrender.com/assets/${provider.providerLogo}`}
                          alt={provider.providerName}
                          className="new-tv-plan-modal-provider-image"
                        />
                      </div>
                      <input
                        name="tvProviderId"
                        onChange={setTVProviderId}
                        id={provider._id}
                        type="radio"
                        value={provider._id}
                        className="new-tv-plan-modal-provider-item"
                      />
                    </label>
                  ))}
                </div>
                {tvProviderError && (
                  <span
                    style={{ marginTop: "3px" }}
                    className="new-tv-plan-modal-error-form"
                  >
                    Operadora é obrigatório
                  </span>
                )}
              </div>

              <div className="new-tv-plan-modal-title-box">
                <span className="new-tv-plan-modal-title-label">Título</span>
                <input
                  {...register("title")}
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={setTVTitle}
                  value={tvTitle}
                  name="title"
                  style={errors.title ? { border: "2px solid #ef5959" } : {}}
                  className="new-tv-plan-modal-title-input"
                />
                {errors.title && (
                  <span className="new-tv-plan-modal-error-form">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="new-tv-plan-modal-cost-box">
                <span className="new-tv-plan-modal-cost-title">Valor</span>
                <input
                  {...register("cost")}
                  type="number"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={setTVCost}
                  value={tvCost}
                  name="cost"
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  className="new-tv-plan-modal-cost-input"
                />
                {errors.cost && (
                  <span className="new-tv-plan-modal-error-form">
                    {errors.cost.message}
                  </span>
                )}
              </div>

              <div className="new-tv-plan-modal-cost-changes-after-period-box">
                <span className="new-tv-plan-modal-cost-changes-after-period-title">
                  Valor muda depois de um período?
                </span>

                <div className="new-tv-plan-modal-cost-changes-after-period-options">
                  <label
                    htmlFor="yes"
                    className="new-tv-plan-modal-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      onChange={setTVCostChangesConfirmation}
                      value={true}
                      defaultChecked
                      id="yes"
                      name="costChangesAfterPeriod"
                      className="new-tv-plan-modal-cost-changes-after-period-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="new-tv-plan-modal-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      onChange={setTVCostChangesConfirmation}
                      value={false}
                      id="no"
                      name="costChangesAfterPeriod"
                      className="new-tv-plan-modal-cost-changes-after-period-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              {JSON.parse(tvCostChangesConfirmation) && (
                <>
                  <div className="new-tv-plan-modal-after-cost-box">
                    <span className="new-tv-plan-modal-after-cost-title">
                      Valor depois do período
                    </span>
                    <input
                      {...register("afterCost")}
                      type="number"
                      onChange={setTVAfterCost}
                      value={tvAfterCost}
                      name="afterCost"
                      style={
                        errors.afterCost ? { border: "2px solid #ef5959" } : {}
                      }
                      className="new-tv-plan-modal-after-cost-input"
                    />
                    {errors.afterCost && (
                      <span className="new-tv-plan-modal-error-form">
                        {errors.afterCost.message}
                      </span>
                    )}
                  </div>

                  <div className="new-tv-plan-modal-period-to-change-cost-box">
                    <span className="new-tv-plan-modal-period-to-change-cost-title">
                      A partir de qual mês?
                    </span>
                    <div className="new-tv-plan-modal-period-to-change-cost-wrapper">
                      <input
                        {...register("periodToChangeCost")}
                        type="number"
                        onChange={setTVPeriodToChangeCost}
                        value={tvPeriodToChangeCost}
                        name="periodToChangeCost"
                        style={
                          errors.periodToChangeCost
                            ? { border: "2px solid #ef5959" }
                            : {}
                        }
                        className="new-tv-plan-modal-period-to-change-cost-input"
                      />
                      <span className="new-tv-plan-modal-period-to-change-cost-tag">
                        °
                      </span>
                      {errors.periodToChangeCost && (
                        <span className="new-tv-plan-modal-error-form">
                          {errors.periodToChangeCost.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="new-tv-plan-modal-installation-cost-box">
                <span className="new-tv-plan-modal-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  type="number"
                  onChange={setTVInstallationCost}
                  value={tvInstallationCost}
                  disabled={installationCostRef.current?.checked}
                  name="installationCost"
                  style={
                    tvInstallationCostError
                      ? { border: "2px solid #ef5959" }
                      : {}
                  }
                  className="new-tv-plan-modal-installation-cost-input"
                />
                {tvInstallationCostError && (
                  <span className="new-tv-plan-modal-error-form">
                    Valor da instalação é obrigatório
                  </span>
                )}

                <label
                  htmlFor="freeInstallationCost"
                  className="new-tv-plan-modal-installation-cost-label"
                >
                  <input
                    type="checkbox"
                    id="freeInstallationCost"
                    ref={installationCostRef}
                    onChange={setTVInstallationCost}
                    name="installationCost"
                    className="new-tv-plan-modal-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="new-tv-plan-modal-devices-box">
                <span className="new-tv-plan-modal-devices-title">
                  Pontos de TV
                </span>
                <select
                  name="devices"
                  onChange={setTVDevices}
                  className="new-tv-plan-modal-devices-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="new-tv-plan-modal-benefits-box">
                <span className="new-tv-plan-modal-benefits-title">
                  Benefícios
                </span>
                <div className="new-tv-plan-modal-benefits-options">
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
                    imageAlt="DGO"
                    inputId="dgo"
                    value="DGO"
                  />
                </div>
              </div>

              <div className="new-tv-plan-modal-priority-box">
                <span className="new-tv-plan-modal-priority-title">
                  Prioridade
                </span>
                <select
                  name="priority"
                  onChange={setTVPriority}
                  className="new-tv-plan-modal-priority-select"
                >
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={1}
                  >
                    1
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={2}
                  >
                    2
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={3}
                  >
                    3
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={4}
                  >
                    4
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={5}
                  >
                    5
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={6}
                  >
                    6
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={7}
                  >
                    7
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={8}
                  >
                    8
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={9}
                  >
                    9
                  </option>
                  <option
                    className="new-tv-plan-modal-priority-option"
                    value={10}
                  >
                    10
                  </option>
                </select>
              </div>

              <div className="new-tv-plan-modal-description-box">
                <span className="new-tv-plan-modal-description-title">
                  Descrição
                </span>
                <textarea
                  {...register("description")}
                  name="description"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={setTVDescription}
                  value={tvDescription}
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-tv-plan-modal-description-textarea"
                />
                {errors.description && (
                  <span className="new-tv-plan-modal-error-form">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button type="submit" className="new-tv-plan-modal-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTVPlanModal;
