import React, { useEffect } from "react";
import BenefitsLabel from "../../DashboardComponent/components/BenefitsLabel";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  cost: yup.string().required("Valor é obrigatório"),
  franchise: yup.string().required("Franquia de celular é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const EditCelPlanForm = () => {
  const {
    closeEditCelForm,
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
    planSelectedForEdit,
    idSelectedForEdit,
    setIdSelectedForEdit,
    defaultValuesForCelForm,
    isSubmitting,
    setToSubmit,
    cancelSubmit,
    setPlans,
    celResetInputs,
  } = usePlansStore(
    (state) => ({
      closeEditCelForm: state.closeEditCelForm,
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
      planSelectedForEdit: state.planSelectedForEdit,
      idSelectedForEdit: state.idSelectedForEdit,
      setIdSelectedForEdit: state.setIdSelectedForEdit,
      defaultValuesForCelForm: state.defaultValuesForCelForm,
      isSubmitting: state.isSubmitting,
      setToSubmit: state.setToSubmit,
      cancelSubmit: state.cancelSubmit,
      setPlans: state.setPlans,
      celResetInputs: state.celResetInputs,
    }),
    shallow,
  );
  const {
    deactivateModalAnimation,
    modalAnimation,
    benefits,
    resetBenefits,
    defaultBenefits,
  } = useGeneralStore(
    (state) => ({
      deactivateModalAnimation: state.deactivateModalAnimation,
      modalAnimation: state.modalAnimation,
      benefits: state.benefits,
      resetBenefits: state.resetBenefits,
      defaultBenefits: state.defaultBenefits,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: celTitle,
      cost: celCost,
      franchise: celFranchise,
      description: celDescription,
    },
  });

  const handleCloseForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      setIdSelectedForEdit("");
      resetBenefits();
      celResetInputs();
      closeEditCelForm();
    }, 800);
  };

  const onSubmit = (data) => {
    setToSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      const data = {
        id: idSelectedForEdit,
        title: celTitle,
        cost: Number(celCost.replace(",", ".")),
        franchise: celFranchise + celFranchiseUnit,
        unlimitedApps: benefits,
        unlimitedCall: celUnlimitedCall,
        planType: celPlanType,
        priority: celPriority,
        description: celDescription.split("\n"),
      };

      api
        .put("/plan/cel-plan/edit", data)
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
      defaultValuesForCelForm();
      defaultBenefits(planSelectedForEdit.unlimitedApps);
      setValue("title", planSelectedForEdit.title);
      setValue("cost", planSelectedForEdit.cost?.toFixed(2)?.replace(".", ","));
      setValue(
        "franchise",
        planSelectedForEdit.franchise?.substring(
          0,
          planSelectedForEdit.franchise?.length - 2,
        ),
      );
      setValue("description", planSelectedForEdit.description?.join("\n"));
    }
  }, [planSelectedForEdit]);

  return (
    <div
      className={
        modalAnimation
          ? "edit-cel-plan-overlay animate__animated animate__fast animate__fadeIn"
          : "edit-cel-plan-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="edit-cel-plan-container">
        <div className="edit-cel-plan-wrapper">
          <div className="edit-cel-plan-header">
            <button
              type="button"
              onClick={handleCloseForm}
              className="edit-cel-plan-close-button"
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

            <h3 className="edit-cel-plan-title">Editar plano</h3>
          </div>

          <div className="edit-cel-plan-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="edit-cel-plan-form"
            >
              <div className="edit-cel-plan-title-box">
                <span className="edit-cel-plan-title-label">Título</span>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  onChange={setCelTitle}
                  value={celTitle}
                  autoCorrect="off"
                  autoComplete="off"
                  style={errors.title ? { border: "2px solid #EF5959" } : {}}
                  className="edit-cel-plan-title-input"
                />
                {errors.title && (
                  <span className="edit-cel-plan-modal-error-form">
                    {errors.title?.message}
                  </span>
                )}
              </div>

              <div className="edit-cel-plan-cost-box">
                <span className="edit-cel-plan-cost-title">Valor</span>
                <input
                  {...register("cost")}
                  type="text"
                  name="cost"
                  onChange={setCelCost}
                  value={celCost}
                  style={errors.cost ? { border: "2px solid #ef5959" } : {}}
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-cel-plan-cost-input"
                />
                {errors.cost && (
                  <span className="edit-cel-plan-modal-error-form">
                    {errors.cost?.message}
                  </span>
                )}
              </div>

              <div className="edit-cel-plan-franchise-box">
                <span className="edit-cel-plan-franchise-title">
                  Franquia de cel
                </span>
                <input
                  {...register("franchise")}
                  type="text"
                  name="franchise"
                  onChange={setCelFranchise}
                  value={celFranchise}
                  style={
                    errors.franchise ? { border: "2px solid #ef5959" } : {}
                  }
                  autoCorrect="off"
                  autoComplete="off"
                  className="edit-cel-plan-franchise-input"
                />
                {errors.franchise && (
                  <span className="edit-cel-plan-modal-error-form">
                    {errors.franchise?.message}
                  </span>
                )}
                <div className="edit-cel-plan-franchise-unit-wrapper">
                  <label
                    htmlFor="franchiseMB"
                    className="edit-cel-plan-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseMB"
                      name="franchise"
                      onChange={setCelFranchiseUnit}
                      value="MB"
                      checked={celFranchiseUnit === "MB"}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-cel-plan-franchise-unit-input"
                    />
                    MB
                  </label>

                  <label
                    htmlFor="franchiseGB"
                    className="edit-cel-plan-franchise-unit-label"
                  >
                    <input
                      type="radio"
                      id="franchiseGB"
                      name="franchise"
                      onChange={setCelFranchiseUnit}
                      value="GB"
                      checked={celFranchiseUnit === "GB"}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-cel-plan-franchise-unit-input"
                    />
                    GB
                  </label>
                </div>
              </div>

              <div className="edit-cel-plan-unlimited-apps-box">
                <span className="edit-cel-plan-unlimited-apps-title">
                  Apps ilimitados
                </span>

                <div className="edit-cel-plan-unlimited-apps-options">
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

              <div className="edit-cel-plan-unlimited-call-box">
                <span className="edit-cel-plan-unlimited-call-title">
                  Ligação ilimitada
                </span>

                <div className="edit-cel-plan-unlimited-call-options">
                  <label
                    htmlFor="yes"
                    className="edit-cel-plan-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="unlimitedCall"
                      onChange={setCelUnlimitedCall}
                      value={true}
                      checked={celUnlimitedCall === true}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-cel-plan-unlimited-call-input"
                    />
                    Sim
                  </label>

                  <label
                    htmlFor="no"
                    className="edit-cel-plan-unlimited-call-label"
                  >
                    <input
                      type="radio"
                      id="no"
                      name="unlimitedCall"
                      onChange={setCelUnlimitedCall}
                      value={false}
                      checked={celUnlimitedCall === false}
                      autoCorrect="off"
                      autoComplete="off"
                      className="edit-cel-plan-unlimited-call-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="edit-cel-plan-plan-type-box">
                <span className="edit-cel-plan-plan-type-title">
                  Tipo do plano
                </span>
                <select
                  onChange={setCelPlanType}
                  value={celPlanType}
                  className="edit-cel-plan-plan-type-select"
                >
                  <option value="Controle">Controle</option>
                  <option value="Pós-pago">Pós-pago</option>
                  <option value="Pré-pago">Pré-pago</option>
                </select>
              </div>

              <div className="edit-cel-plan-priority-box">
                <span className="edit-cel-plan-priority-title">Prioridade</span>
                <select
                  name="priority"
                  onChange={setCelPriority}
                  value={celPriority}
                  className="edit-cel-plan-priority-select"
                >
                  <option className="edit-cel-plan-priority-option" value="1">
                    1
                  </option>
                  <option className="edit-cel-plan-priority-option" value="2">
                    2
                  </option>
                  <option className="edit-cel-plan-priority-option" value="3">
                    3
                  </option>
                  <option className="edit-cel-plan-priority-option" value="4">
                    4
                  </option>
                  <option className="edit-cel-plan-priority-option" value="5">
                    5
                  </option>
                  <option className="edit-cel-plan-priority-option" value="6">
                    6
                  </option>
                  <option className="edit-cel-plan-priority-option" value="7">
                    7
                  </option>
                  <option className="edit-cel-plan-priority-option" value="8">
                    8
                  </option>
                  <option className="edit-cel-plan-priority-option" value="9">
                    9
                  </option>
                  <option className="edit-cel-plan-priority-option" value="10">
                    10
                  </option>
                </select>
              </div>

              <div className="edit-cel-plan-description-box">
                <span className="edit-cel-plan-description-title">
                  Descrição
                </span>

                <textarea
                  {...register("description")}
                  name="description"
                  onChange={setCelDescription}
                  value={celDescription}
                  autoComplete="off"
                  autoCorrect="off"
                  style={
                    errors.description ? { border: "2px solid #ef5959" } : {}
                  }
                  className="edit-cel-plan-description-textarea"
                />
                {errors.description && (
                  <span className="edit-cel-plan-modal-error-form">
                    {errors.description?.message}
                  </span>
                )}
              </div>

              <button type="submit" className="edit-cel-plan-submit-button">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCelPlanForm;
