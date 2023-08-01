import { useEffect } from "react";
import useAlternativeHomeStore from "../../../stores/useAlternativeHomeStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object({
  name: yup
    .string()
    .required("O campo Nome é obrigatório")
    .test(
      "has-full-name",
      "O campo Nome Completo deve conter um nome e um sobrenome",
      (value) => {
        if (!value) {
          return;
        }

        const names = value.trim().split(" ");
        return names.length >= 2;
      },
    ),
  role: yup.string().required("O campo cargo é obrigatório"),
  tel: yup
    .string()
    .required("O campo Telefone é obrigatório")
    .min(14, "Telefone Incorreto"),
  branch: yup.string(),
  email: yup
    .string()
    .email("E-mail incorreto")
    .required("O campo E-mail é obrigatório"),
});

const PJClientRegisterBox = () => {
  const {
    closeFormBox,
    data,
    setData,
    isSubmitting,
    setSubmit,
    unsetSubmit,
    isLoading,
    setLoading,
    unsetLoading,
  } = useAlternativeHomeStore((state) => ({
    closeFormBox: state.closeFormBox,
    data: state.data,
    setData: state.setData,
    isSubmitting: state.isSubmitting,
    setSubmit: state.setSubmit,
    unsetSubmit: state.unsetSubmit,
    isLoading: state.isLoading,
    setLoading: state.setLoading,
    unsetLoading: state.unsetLoading,
  }));
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const closeForm = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeFormBox();
    }, 800);
  };

  const handleTelValue = (e) => {
    const tel = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");

    setData(tel, "tel");
  };

  const handleBranchValue = (e) => {
    const branch = e.target.value.replace(/\D/g, "");

    setData(branch, "branch");
  };

  const onSubmit = (data) => {
    setSubmit();
  };

  useEffect(() => {
    const submitData = () => {
      setLoading();

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("tel", data.tel);
      formData.append("branch", data.branch);
      formData.append("email", data.email);

      setTimeout(() => {
        unsetLoading();
        unsetSubmit();
      }, 3000);
    };

    if (isSubmitting) {
      submitData();
    }
  }, [isSubmitting]);

  return (
    <div
      className={
        modalAnimation
          ? "client-register-overlay animate__animated animate__fast animate__fadeIn"
          : "client-register-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="client-register-box">
        <div className="client-register-wrapper">
          <div className="client-register-info">
            <h3 className="client-register-title">Faça sua solicitação</h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="client-register-form"
            >
              <div className="client-register-name-box">
                <label htmlFor="name" className="client-register-name-label">
                  Nome
                </label>
                <input
                  {...register("name")}
                  type="text"
                  value={data.name}
                  onChange={(e) => setData(e.target.value, "name")}
                  name="name"
                  id="name"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.name && { borderColor: "#ef5959" }}
                  className="client-register-name-input"
                />
                {errors.name && (
                  <span className="client-register-error-message">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="client-register-role-box">
                <label htmlFor="role" className="client-register-role-label">
                  Cargo
                </label>
                <input
                  {...register("role")}
                  type="text"
                  value={data.role}
                  onChange={(e) => setData(e.target.value, "role")}
                  name="role"
                  id="role"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.role && { borderColor: "#ef5959" }}
                  className="client-register-role-input"
                />
                {errors.role && (
                  <span className="client-register-error-message">
                    {errors.role?.message}
                  </span>
                )}
              </div>

              <div className="client-register-inputs-wrapper">
                <div className="client-register-tel-box">
                  <label htmlFor="tel" className="client-register-tel-label">
                    Telefone
                  </label>
                  <input
                    {...register("tel")}
                    type="text"
                    value={data.tel}
                    onChange={handleTelValue}
                    name="tel"
                    id="tel"
                    autoComplete="off"
                    autoCorrect="off"
                    style={errors.tel && { borderColor: "#ef5959" }}
                    className="client-register-tel-input"
                  />
                  {errors.tel && (
                    <span className="client-register-error-message">
                      {errors.tel?.message}
                    </span>
                  )}
                </div>

                <div className="client-register-branch-box">
                  <label
                    htmlFor="branch"
                    className="client-register-branch-label"
                  >
                    Ramal
                  </label>
                  <input
                    {...register("branch")}
                    type="text"
                    value={data.branch}
                    onChange={handleBranchValue}
                    name="branch"
                    id="branch"
                    autoComplete="off"
                    autoCorrect="off"
                    style={errors.branch && { borderColor: "#ef5959" }}
                    className="client-register-branch-input"
                  />
                  {errors.branch && (
                    <span className="client-register-error-message">
                      {errors.branch?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="client-register-email-box">
                <label htmlFor="email" className="client-register-email-label">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  type="text"
                  value={data.email}
                  onChange={(e) => setData(e.target.value, "email")}
                  name="email"
                  id="email"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.email && { borderColor: "#ef5959" }}
                  className="client-register-email-input"
                />
                {errors.email && (
                  <span className="client-register-error-message">
                    {errors.email?.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="client-register-submit-button"
              >
                {isLoading ? "Solicitando..." : "Solicitar Contato"}
              </button>
            </form>
          </div>
          <div className="client-register-image-box">
            <button
              type="button"
              onClick={closeForm}
              className="client-register-close-button"
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
            <img
              src="/assets/images/filter-box-animation.gif"
              alt="Faça sua solicitação"
              className="client-register-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PJClientRegisterBox;
