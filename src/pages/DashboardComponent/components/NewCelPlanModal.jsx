import React, { useEffect } from "react";
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
  franchise: yup.string().required("Franquia de celular é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const NewCelPlanModal = () => {
  const {
    closeCelForm,
    allProviders,
    celProviderId,
    setCelProviderId,
    celTitle,
    setCelTitle,
    celCost,
    setCelCost,
    celFranchise,
    setCelFranchise,
    celFranchiseUnit,
    setCelFranchiseUnit,
    celUnlimitedCall,
    setCelUnlimitedCall,
    celPlanType,
    setCelPlanType,
    celPriority,
    setCelPriority,
    celDescription,
    setCelDescription,
    celProviderError,
    setCelProviderError,
    unsetCelProviderError,
    isSubmitting,
    setToSubmit,
    cancelSubmit,
    setActivePlans,
    setArchivedPlans,
    celResetInputs,
  } = useDashboardComponentStore(
    (state) => ({
      closeCelForm: state.closeCelForm,
      allProviders: state.allProviders,
      celProviderId: state.celProviderId,
      setCelProviderId: state.setCelProviderId,
      celTitle: state.celTitle,
      setCelTitle: state.setCelTitle,
      celCost: state.celCost,
      setCelCost: state.setCelCost,
      celFranchise: state.celFranchise,
      setCelFranchise: state.setCelFranchise,
      celFranchiseUnit: state.celFranchiseUnit,
      setCelFranchiseUnit: state.setCelFranchiseUnit,
      celUnlimitedCall: state.celUnlimitedCall,
      setCelUnlimitedCall: state.setCelUnlimitedCall,
      celPlanType: state.celPlanType,
      setCelPlanType: state.setCelPlanType,
      celPriority: state.celPriority,
      setCelPriority: state.setCelPriority,
      celDescription: state.celDescription,
      setCelDescription: state.setCelDescription,
      celProviderError: state.celProviderError,
      setCelProviderError: state.setCelProviderError,
      unsetCelProviderError: state.unsetCelProviderError,
      isSubmitting: state.isSubmitting,
      setToSubmit: state.setToSubmit,
      cancelSubmit: state.cancelSubmit,
      setActivePlans: state.setActivePlans,
      setArchivedPlans: state.setArchivedPlans,
      celResetInputs: state.celResetInputs,
    }),
    shallow
  );
  const { deactivateModalAnimation, modalAnimation, resetBenefits, benefits } =
    useGeneralStore(
      (state) => ({
        deactivateModalAnimation: state.deactivateModalAnimation,
        modalAnimation: state.modalAnimation,
        resetBenefits: state.resetBenefits,
        benefits: state.benefits,
      }),
      shallow
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    deactivateModalAnimation();
    resetBenefits();
    celResetInputs();

    setTimeout(() => {
      closeCelForm();
    }, 800);
  };

  const onSubmit = (data) => {
    if (celProviderId === "") {
      scrollTo(0, 0);
      setCelProviderError();
    }

    if (celProviderId !== "") {
      unsetCelProviderError();
      setToSubmit();
    }
  };

  useEffect(() => {
    const submitData = () => {
      const data = {
        providerId: celProviderId,
        title: celTitle,
        cost: Number(celCost.replace(",", ".")),
        franchise: celFranchise + celFranchiseUnit,
        unlimitedApps: benefits,
        unlimitedCall: celUnlimitedCall,
        planType: celPlanType,
        priority: celPriority,
        description: celDescription,
      };

      api
        .post("/plan/cel-plan/new", data)
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
          celResetInputs();
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
    console.log(celDescription);
    console.log("typeof: ", typeof celDescription);
  }, [celDescription]);

  return (
    <div
      className={
        modalAnimation
          ? "new-cel-plan-modal-overlay animate__animated animate__fast animate__fadeIn"
          : "new-cel-plan-modal-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="new-cel-plan-modal-container">
        <div className="new-cel-plan-modal-wrapper">
          <div className="new-cel-plan-modal-header">
            <button
              type="button"
              onClick={handleCloseModal}
              className="new-cel-plan-modal-close-button"
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

            <h3 className="new-cel-plan-modal-title">Novo Plano</h3>
          </div>

          <div className="new-cel-plan-modal-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="new-cel-plan-modal-form"
            >
              <div className="new-cel-plan-modal-provider-box">
                <span className="new-cel-plan-modal-provider-title">
                  Operadora
                </span>
                <div className="new-cel-plan-modal-provider-options">
                  {allProviders?.map((provider) => (
                    <label
                      key={provider._id}
                      htmlFor={provider._id}
                      style={
                        celProviderId === provider._id
                          ? { pointerEvents: "none" }
                          : {}
                      }
                      className={
                        celProviderId === provider._id
                          ? "new-cel-plan-modal-provider-label provider-selected"
                          : "new-cel-plan-modal-provider-label"
                      }
                    >
                      <div className="new-cel-plan-modal-provider-label-logo">
                        <img
                          src={`https://planos-backend.onrender.com/assets/${provider.providerLogo}`}
                          alt={provider.providerName}
                          className="new-cel-plan-modal-provider-image"
                        />
                      </div>
                      <input
                        name="celProviderId"
                        onChange={setCelProviderId}
                        id={provider._id}
                        type="radio"
                        value={provider._id}
                        className="new-cel-plan-modal-provider-item"
                      />
                    </label>
                  ))}
                </div>
                {celProviderError && (
                  <span
                    style={{ marginTop: "3px" }}
                    className="new-cel-plan-modal-error-form"
                  >
                    Operadora é obrigatório
                  </span>
                )}
              </div>

              <div className="new-cel-plan-modal-title-box">
                <span className="new-cel-plan-modal-title-label">Título</span>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={setCelTitle}
                  value={celTitle}
                  style={errors.title ? { border: "2px solid #ef5959" } : {}}
                  className="new-cel-plan-modal-title-input"
                />
                {errors.title && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="new-cel-plan-modal-cost-box">
                <span className="new-cel-plan-modal-cost-title">Valor</span>
                <input
                  {...register("cost")}
                  type="text"
                  name="cost"
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={setCelCost}
                  value={celCost}
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  className="new-cel-plan-modal-cost-input"
                />
                {errors.cost && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.cost.message}
                  </span>
                )}
              </div>

              <div className="new-cel-plan-modal-franchise-box">
                <span className="new-cel-plan-modal-franchise-title">
                  Franquia de celular
                </span>
                <input
                  {...register("franchise")}
                  type="text"
                  name="franchise"
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={setCelFranchise}
                  value={celFranchise}
                  style={
                    errors.franchise ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-cel-plan-modal-franchise-input"
                />
                {errors.franchise && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.franchise.message}
                  </span>
                )}
                <div className="new-cel-plan-modal-franchise-unit-wrapper">
                  <label
                    htmlFor="franchiseMB"
                    className="new-cel-plan-modal-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseMB"
                      name="franchise"
                      onChange={setCelFranchiseUnit}
                      value="MB"
                      defaultChecked
                      className="new-cel-plan-modal-franchise-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="franchiseGB"
                    className="new-cel-plan-modal-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseGB"
                      name="franchise"
                      onChange={setCelFranchiseUnit}
                      value="GB"
                      className="new-cel-plan-modal-franchise-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="new-cel-plan-modal-unlimited-apps-box">
                <span className="new-cel-plan-modal-unlimited-apps-title">
                  Apps ilimitados
                </span>

                <div className="new-cel-plan-modal-unlimited-apps-options">
                  <BenefitsLabel
                    htmlFor="whatsapp"
                    imageSrc="/assets/icons/whatsapp.png"
                    imageAlt="Whatsapp"
                    inputId="whatsapp"
                    value="Whatsapp"
                  />
                  <BenefitsLabel
                    htmlFor="telegram"
                    imageSrc="/assets/icons/telegram.png"
                    imageAlt="Telegram"
                    inputId="telegram"
                    value="Telegram"
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
                    htmlFor="messenger"
                    imageSrc="/assets/icons/messenger.png"
                    imageAlt="Messenger"
                    inputId="messenger"
                    value="Messenger"
                  />
                  <BenefitsLabel
                    htmlFor="twitter"
                    imageSrc="/assets/icons/twitter.png"
                    imageAlt="Twitter"
                    inputId="twitter"
                    value="Twitter"
                  />
                  <BenefitsLabel
                    htmlFor="waze"
                    imageSrc="/assets/icons/waze.png"
                    imageAlt="Waze"
                    inputId="waze"
                    value="Waze"
                  />
                  <BenefitsLabel
                    htmlFor="cabify"
                    imageSrc="/assets/icons/cabify.png"
                    imageAlt="Cabify"
                    inputId="cabify"
                    value="Cabify"
                  />
                  <BenefitsLabel
                    htmlFor="easyTaxi"
                    imageSrc="/assets/icons/easy-taxi.png"
                    imageAlt="Easy Taxi"
                    inputId="easyTaxi"
                    value="Easy Taxi"
                  />
                  <BenefitsLabel
                    htmlFor="moovit"
                    imageSrc="/assets/icons/moovit.png"
                    imageAlt="Moovit"
                    inputId="moovit"
                    value="Moovit"
                  />
                  <BenefitsLabel
                    htmlFor="tikTok"
                    imageSrc="/assets/icons/tik-tok.png"
                    imageAlt="TikTok"
                    inputId="tikTok"
                    value="TikTok"
                  />
                  <BenefitsLabel
                    htmlFor="netflix"
                    imageSrc="/assets/icons/netflix.png"
                    imageAlt="Netflix"
                    inputId="netflix"
                    value="Netflix"
                  />
                  <BenefitsLabel
                    htmlFor="youtube"
                    imageSrc="/assets/icons/youtube.png"
                    imageAlt="Youtube"
                    inputId="youtube"
                    value="Youtube"
                  />
                  <BenefitsLabel
                    htmlFor="claroMusica"
                    imageSrc="/assets/icons/claro-musica.png"
                    imageAlt="Claro Música"
                    inputId="claroMusica"
                    value="Claro Música"
                  />
                </div>
              </div>

              <div className="new-cel-plan-modal-unlimited-call-box">
                <span className="new-cel-plan-modal-unlimited-call-title">
                  Ligação ilimitada
                </span>

                <div className="new-cel-plan-modal-unlimited-call-options">
                  <label
                    htmlFor="yes"
                    className="new-cel-plan-modal-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      onChange={setCelUnlimitedCall}
                      value={true}
                      defaultChecked
                      name="unlimitedCall"
                      className="new-cel-plan-modal-unlimited-call-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="new-cel-plan-modal-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      onChange={setCelUnlimitedCall}
                      value={false}
                      name="unlimitedCall"
                      className="new-cel-plan-modal-unlimited-call-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="new-cel-plan-modal-plan-type-box">
                <span className="new-cel-plan-modal-plan-type-title">
                  Tipo do plano
                </span>
                <select
                  onChange={setCelPlanType}
                  className="new-cel-plan-modal-plan-type-select"
                >
                  <option value="Controle">Controle</option>
                  <option value="Pós-pago">Pós-pago</option>
                  <option value="Pré-pago">Pré-pago</option>
                </select>
              </div>

              <div className="new-cel-plan-modal-priority-box">
                <span className="new-cel-plan-modal-priority-title">
                  Prioridade
                </span>
                <select
                  name="priority"
                  onChange={setCelPriority}
                  className="new-cel-plan-modal-priority-select"
                >
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={1}
                  >
                    1
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={2}
                  >
                    2
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={3}
                  >
                    3
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={4}
                  >
                    4
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={5}
                  >
                    5
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={6}
                  >
                    6
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={7}
                  >
                    7
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={8}
                  >
                    8
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={9}
                  >
                    9
                  </option>
                  <option
                    className="new-cel-plan-modal-priority-option"
                    value={10}
                  >
                    10
                  </option>
                </select>
              </div>

              <div className="new-cel-plan-modal-description-box">
                <span className="new-cel-plan-modal-description-title">
                  Descrição
                </span>

                <textarea
                  {...register("description")}
                  name="description"
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={setCelDescription}
                  value={celDescription}
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="new-cel-plan-modal-description-textarea"
                />
                {errors.description && (
                  <span className="new-internet-plan-modal-error-form">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="new-cel-plan-modal-submit-button"
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

export default NewCelPlanModal;
