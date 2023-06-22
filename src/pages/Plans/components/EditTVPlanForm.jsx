import React, { useRef, useEffect } from "react";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import BenefitsLabel from "../../DashboardComponent/components/BenefitsLabel";

const schema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  cost: yup.string().required("Valor é obrigatório"),
  installationCost: yup.string().required("Valor de instalação é obrigatório"),
  afterCost: yup.string(),
  periodToChangeCost: yup.string(),
  description: yup.string().required("Descrição é obrigatório"),
});

const EditTVPlanForm = () => {
  const {
    closeEditTVForm,
    planSelectedForDetails,
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
    defaultValuesForTVForm,
    tvInstallationCostError,
    setTVInstallationCostError,
    unsetTVInstallationCostError,
    isSubmitting,
    setToSubmit,
    cancelSubmit,
    idSelectedForDetails,
    setIdSelectedForDetails,
    setPlans,
    tvResetInputs,
  } = usePlansStore(
    (state) => ({
      closeEditTVForm: state.closeEditTVForm,
      planSelectedForDetails: state.planSelectedForDetails,
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
      defaultValuesForTVForm: state.defaultValuesForTVForm,
      tvInstallationCostError: state.tvInstallatioCostError,
      setTVInstallationCostError: state.setTVInstallationCostError,
      unsetTVInstallationCostError: state.unsetTVInstallationCostError,
      isSubmitting: state.isSubmitting,
      setToSubmit: state.setToSubmit,
      cancelSubmit: state.cancelSubmit,
      idSelectedForDetails: state.idSelectedForDetails,
      setIdSelectedForDetails: state.setIdSelectedForDetails,
      setPlans: state.setPlans,
      tvResetInputs: state.tvResetInputs,
    }),
    shallow
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
    shallow
  );

  const installationCostCheckboxRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: tvTitle,
      cost: tvCost,
      afterCost: tvAfterCost,
      periodToChangeCost: tvPeriodToChangeCost,
      description: tvDescription,
    },
  });

  const handleCloseForm = () => {
    deactivateModalAnimation();
    tvResetInputs();
    resetBenefits();
    setIdSelectedForDetails("");

    setTimeout(() => {
      closeEditTVForm();
    }, 800);
  };

  const onSubmit = (data) => {
    console.log(data);

    setToSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      const data = {
        id: idSelectedForDetails,
        title: tvTitle,
        cost: Number(tvCost.replace(",", ".")),
        afterCost: Number(tvAfterCost.replace(",", ".")) || null,
        periodToChangeCost: tvPeriodToChangeCost,
        installationCost: tvInstallationCost,
        devicesQuant: tvDevices,
        benefits: benefits,
        priority: tvPriority,
        description: tvDescription,
      };

      api
        .put("/plan/tv-plan/edit", data)
        .then((res) => {
          console.log("res: ", res.data);
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
          handleCloseForm();
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
    if (planSelectedForDetails) {
      defaultValuesForTVForm();
      defaultBenefits(planSelectedForDetails.benefits);
      setValue("title", tvTitle);
      setValue("cost", tvCost);
      setValue("installationCost", tvInstallationCost);
      setValue("afterCost", tvAfterCost);
      setValue("periodToChangeCost", tvPeriodToChangeCost);
      setValue("description", tvDescription);
    }
  }, [planSelectedForDetails]);

  useEffect(() => {
    console.log(tvDescription);
    console.log("typeof: ", typeof tvDescription);
  }, [tvDescription]);

  return (
    <div
      className={
        modalAnimation
          ? "edit-tv-plan-overlay animate__animated animate__fast animate__fadeIn"
          : "edit-tv-plan-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="edit-tv-plan-container">
        <div className="edit-tv-plan-wrapper">
          <div className="edit-tv-plan-header">
            <button
              type="button"
              onClick={handleCloseForm}
              className="edit-tv-plan-close-button"
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

            <h3 className="edit-tv-plan-title">Editar Plano</h3>
          </div>

          <div className="edit-tv-plan-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="edit-tv-plan-form"
            >
              <div className="edit-tv-plan-title-box">
                <span className="edit-tv-plan-title-label">Título</span>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  onChange={setTVTitle}
                  value={tvTitle}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.title ? { border: "2px solid #EF5959" } : {}}
                  className="edit-tv-plan-title-input"
                />
                {errors.title && (
                  <span className="edit-tv-plan-modal-error-form">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="edit-tv-plan-cost-box">
                <span className="edit-tv-plan-cost-title">Valor</span>
                <input
                  {...register("cost")}
                  type="text"
                  name="cost"
                  onChange={setTVCost}
                  value={tvCost}
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  className="edit-tv-plan-cost-input"
                />
                {errors.cost && (
                  <span className="edit-tv-plan-modal-error-form">
                    {errors.cost.message}
                  </span>
                )}
              </div>

              <div className="edit-tv-plan-cost-changes-after-period-box">
                <span className="edit-tv-plan-cost-changes-after-period-title">
                  Valor muda depois de um período?
                </span>

                <div className="edit-tv-plan-cost-changes-after-period-options">
                  <label
                    htmlFor="yes"
                    className="edit-tv-plan-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="costChangesAfterPeriod"
                      onChange={setTVCostChangesConfirmation}
                      checked={tvCostChangesConfirmation === true}
                      value={true}
                      className="edit-tv-plan-cost-changes-after-period-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="edit-tv-plan-cost-changes-after-period-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="costChangesAfterPeriod"
                      onChange={setTVCostChangesConfirmation}
                      checked={tvCostChangesConfirmation === false}
                      value={false}
                      className="edit-tv-plan-cost-changes-after-period-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              {tvCostChangesConfirmation && (
                <>
                  <div className="edit-tv-plan-after-cost-box">
                    <span className="edit-tv-plan-after-cost-title">
                      Valor depois do período
                    </span>
                    <input
                      {...register("afterCost")}
                      type="text"
                      name="afterCost"
                      onChange={setTVAfterCost}
                      value={tvAfterCost}
                      style={
                        errors.afterCost ? { border: "2px solid #ef5959" } : {}
                      }
                      className="edit-tv-plan-after-cost-input"
                    />
                    {errors.afterCost && (
                      <span className="edit-tv-plan-modal-error-form">
                        {errors.afterCost.message}
                      </span>
                    )}
                  </div>

                  <div className="edit-tv-plan-period-to-change-cost-box">
                    <span className="edit-tv-plan-period-to-change-cost-title">
                      A partir de qual mês?
                    </span>
                    <div className="edit-tv-plan-period-to-change-cost-wrapper">
                      <input
                        {...register("periodToChangeCost")}
                        type="text"
                        name="periodToChangeCost"
                        onChange={setTVPeriodToChangeCost}
                        value={tvPeriodToChangeCost}
                        style={
                          errors.periodToChangeCost
                            ? { border: "2px solid #ef5959" }
                            : {}
                        }
                        className="edit-tv-plan-period-to-change-cost-input"
                      />
                      <span className="edit-tv-plan-period-to-change-cost-tag">
                        °
                      </span>
                      {errors.periodToChangeCost && (
                        <span className="edit-tv-plan-modal-error-form">
                          {errors.periodToChangeCost.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="edit-tv-plan-installation-cost-box">
                <span className="edit-tv-plan-installation-cost-title">
                  Valor da instalação
                </span>
                <input
                  {...register("installationCost")}
                  type="text"
                  name="installationCost"
                  onChange={setTVInstallationCost}
                  value={tvInstallationCost}
                  disabled={installationCostCheckboxRef.current?.checked}
                  style={
                    errors.installationCost
                      ? { border: "2px solid #ef5959" }
                      : {}
                  }
                  className="edit-tv-plan-installation-cost-input"
                />
                {errors.installationCost && (
                  <span className="edit-tv-plan-modal-error-form">
                    {errors.installationCost?.message}
                  </span>
                )}

                <label
                  htmlFor="freeInstallationCost"
                  className="edit-tv-plan-installation-cost-label"
                >
                  <input
                    ref={installationCostCheckboxRef}
                    type="checkbox"
                    id="freeInstallationCost"
                    name="installationCost"
                    onChange={setTVInstallationCost}
                    checked={tvInstallationCost === "Grátis"}
                    className="edit-tv-plan-installation-cost-checkbox"
                  />
                  Instalação grátis
                </label>
              </div>

              <div className="edit-tv-plan-devices-box">
                <span className="edit-tv-plan-devices-title">Pontos de TV</span>
                <select
                  name="devices"
                  onChange={setTVDevices}
                  value={tvDevices}
                  className="edit-tv-plan-devices-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="edit-tv-plan-benefits-box">
                <span className="edit-tv-plan-benefits-title">Benefícios</span>
                <div className="edit-tv-plan-benefits-options">
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

              <div className="edit-tv-plan-priority-box">
                <span className="edit-tv-plan-priority-title">Prioridade</span>
                <select
                  name="priority"
                  onChange={setTVPriority}
                  value={tvPriority}
                  className="edit-tv-plan-priority-select"
                >
                  <option className="edit-tv-plan-priority-option" value="1">
                    1
                  </option>
                  <option className="edit-tv-plan-priority-option" value="2">
                    2
                  </option>
                  <option className="edit-tv-plan-priority-option" value="3">
                    3
                  </option>
                  <option className="edit-tv-plan-priority-option" value="4">
                    4
                  </option>
                  <option className="edit-tv-plan-priority-option" value="5">
                    5
                  </option>
                  <option className="edit-tv-plan-priority-option" value="6">
                    6
                  </option>
                  <option className="edit-tv-plan-priority-option" value="7">
                    7
                  </option>
                  <option className="edit-tv-plan-priority-option" value="8">
                    8
                  </option>
                  <option className="edit-tv-plan-priority-option" value="9">
                    9
                  </option>
                  <option className="edit-tv-plan-priority-option" value="10">
                    10
                  </option>
                </select>
              </div>

              <div className="edit-tv-plan-description-box">
                <span className="edit-tv-plan-description-title">
                  Descrição
                </span>
                <textarea
                  {...register("description")}
                  name="description"
                  onChange={setTVDescription}
                  value={tvDescription}
                  autoCorrect="off"
                  autoComplete="off"
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="edit-tv-plan-description-textarea"
                />
                {errors.description && (
                  <span className="edit-tv-plan-modal-error-form">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button type="submit" className="edit-tv-plan-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTVPlanForm;
