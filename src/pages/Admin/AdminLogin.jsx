import React, { useEffect, useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import useAdminStore from "../../stores/useAdminStore";
import api from "../../services/api.js";

import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const {
    email,
    password,
    isEmailSelected,
    isEmailFilled,
    isPasswordSelected,
    isPasswordFilled,
    passwordViewType,
    submitting,
    setEmail,
    setPassword,
    emailFocused,
    emailBlurred,
    handleEmailFilled,
    passwordFocused,
    passwordBlurred,
    handlePasswordFilled,
    togglePasswordViewType,
    isSubmitting,
    isNotSubmitting,
    reset,
  } = useAdminStore(
    (state) => ({
      email: state.email,
      password: state.password,
      isEmailSelected: state.isEmailSelected,
      isEmailFilled: state.isEmailFilled,
      isPasswordSelected: state.isPasswordSelected,
      isPasswordFilled: state.isPasswordFilled,
      passwordViewType: state.passwordViewType,
      submitting: state.submitting,
      setEmail: state.setEmail,
      setPassword: state.setPassword,
      emailFocused: state.emailFocused,
      emailBlurred: state.emailBlurred,
      handleEmailFilled: state.handleEmailFilled,
      passwordFocused: state.passwordFocused,
      passwordBlurred: state.passwordBlurred,
      handlePasswordFilled: state.handlePasswordFilled,
      togglePasswordViewType: state.togglePasswordViewType,
      isSubmitting: state.isSubmitting,
      isNotSubmitting: state.isNotSubmitting,
      reset: state.reset,
    }),
    shallow
  );

  const schema = Yup.object({
    email: Yup.string().email("Email invalido").required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const imageAnimation = {
    offscreen: { y: -100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 1 },
    },
  };
  const infoAnimation = {
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const onSubmit = (data) => {
    isSubmitting();
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    handleEmailFilled();
    handlePasswordFilled();
    setValue("email", email);
    setValue("password", password);
  }, [email, password]);

  useEffect(() => {
    const submitData = () => {
      if (submitting) {
        const data = { email, password };

        api
          .post("/admin/login", data)
          .then((res) => {
            const token = res.data.token;

            localStorage.setItem("token", "Bearer " + token);
            navigate("/admin/painel-de-controle");
          })
          .catch((err) => {
            console.error(err);
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .finally(() => isNotSubmitting());
      }
    };

    submitData();
  }, [submitting]);

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (errors.password) {
      toast.error(errors.password.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [errors]);

  return (
    <div className="admin-container">
      <ToastContainer />

      <div className="info">
        <div className="info-wrapper">
          <div className="admin-header">
            <Link className="logo-box" to="/">
              <h1 className="logo">Logo</h1>
            </Link>
          </div>

          <motion.div
            transition={{ staggerChildren: 0.4 }}
            initial="offscreen"
            animate="onscreen"
            className="info-content"
          >
            <motion.h1 variants={infoAnimation} className="admin-title">
              Bem vindo
            </motion.h1>
            <motion.span variants={infoAnimation} className="admin-desc">
              Por favor insira suas credenciais
            </motion.span>

            <motion.form
              transition={{ staggerChildren: 0.4, delayChildren: 0.8 }}
              initial="offscreen"
              animate="onscreen"
              onSubmit={handleSubmit(onSubmit)}
              className="admin-form"
            >
              <motion.label
                variants={infoAnimation}
                htmlFor="email"
                className="email-box"
                style={errors.email ? { borderColor: "#EF4B4B" } : {}}
              >
                <div className="email-icon">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <span
                  className={
                    isEmailSelected || isEmailFilled
                      ? "email-placeholder active"
                      : "email-placeholder"
                  }
                >
                  E-mail
                </span>
                <input
                  {...register("email", { value: email })}
                  type="text"
                  autoCorrect="off"
                  autoComplete="off"
                  name="email"
                  id="email"
                  value={email}
                  onChange={setEmail}
                  onFocus={emailFocused}
                  onBlur={emailBlurred}
                  className="email-input"
                />
              </motion.label>

              <motion.label
                variants={infoAnimation}
                htmlFor="password"
                className="password-box"
                style={errors.password ? { borderColor: "#EF4B4B" } : {}}
              >
                <div className="password-icon">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <span
                  className={
                    isPasswordSelected || isPasswordFilled
                      ? "password-placeholder active"
                      : "password-placeholder"
                  }
                >
                  Senha
                </span>
                <input
                  {...register("password", { value: password })}
                  autoCorrect="off"
                  autoComplete="off"
                  name="password"
                  id="password"
                  type={passwordViewType}
                  value={password}
                  onFocus={passwordFocused}
                  onBlur={passwordBlurred}
                  onChange={setPassword}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={togglePasswordViewType}
                  className="toggle-view-password-btn"
                >
                  {passwordViewType === "password" ? (
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
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </motion.label>

              <motion.button
                variants={infoAnimation}
                type="submit"
                disabled={submitting}
                style={
                  submitting
                    ? { filter: "brightness(80%)", cursor: "default" }
                    : {}
                }
                className="submit-btn"
              >
                {submitting ? (
                  <>
                    ENTRANDO
                    <img
                      src="/assets/images/loading-sending.svg"
                      alt="Enviando"
                    />
                  </>
                ) : (
                  "ENTRAR"
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          <div className="admin-footer">
            <span>@ Logo 2023</span>
          </div>
        </div>
      </div>

      <div className="image-box">
        <motion.img
          variants={imageAnimation}
          initial="offscreen"
          animate="onscreen"
          src="/assets/images/admin-image.png"
          alt="Admin"
          className="image"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
