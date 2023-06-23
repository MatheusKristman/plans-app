import React from "react";
import useHomeStore from "../../../stores/useHomeStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";

const ProviderFilter = () => {
  const { providerValue, setProviderValue, isProviderAnimation } = useHomeStore(
    (state) => ({
      providerValue: state.providerValue,
      setProviderValue: state.setProviderValue,
      isProviderAnimation: state.isProviderAnimation,
    }),
    shallow
  );

  return (
    <div
      className={
        isProviderAnimation
          ? "home-filter-box-provider-box animate__animated animate__faster animate__fadeInLeft"
          : "home-filter-box-provider-box animate__animated animate__faster animate__fadeOutLeft"
      }
    >
      <span className="home-filter-box-provider-label">
        Precisa de qual serviço?
      </span>

      <select
        onChange={setProviderValue}
        defaultValue={providerValue}
        className="home-filter-box-provider-select"
      >
        <option value="banda-larga">Banda Larga</option>
        <option value="celular">Celular</option>
        <option value="tv">TV</option>
      </select>
    </div>
  );
};

const CepFilter = () => {
  const { cepValue, setCepValue, isCepAnimation } = useHomeStore(
    (state) => ({
      cepValue: state.cepValue,
      setCepValue: state.setCepValue,
      isCepAnimation: state.isCepAnimation,
    }),
    shallow
  );

  return (
    <div
      className={
        isCepAnimation
          ? "home-filter-box-cep-wrapper animate__animated animate__faster animate__fadeInRight"
          : "home-filter-box-cep-wrapper animate__animated animate__faster animate__fadeOutRight"
      }
    >
      <span className="home-filter-box-cep-title">Qual é o seu cep?</span>

      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        onChange={setCepValue}
        value={cepValue}
        maxLength="8"
        className="home-filter-box-cep-input"
      />
    </div>
  );
};

const HomeInitialFilterBox = () => {
  const {
    closeFilterBox,
    isProviderQuestionRendered,
    setProviderQuestionRendered,
    unsetProviderQuestionRendered,
    setProviderAnimation,
    unsetProviderAnimation,
    providerValue,
    isCepQuestionRendered,
    setCepQuestionRendered,
    unsetCepQuestionRendered,
    setCepAnimation,
    unsetCepAnimation,
    cepValue,
    resetCepValue,
  } = useHomeStore(
    (state) => ({
      closeFilterBox: state.closeFilterBox,
      isProviderQuestionRendered: state.isProviderQuestionRendered,
      setProviderQuestionRendered: state.setProviderQuestionRendered,
      unsetProviderQuestionRendered: state.unsetProviderQuestionRendered,
      setProviderAnimation: state.setProviderAnimation,
      unsetProviderAnimation: state.unsetProviderAnimation,
      providerValue: state.providerValue,
      isCepQuestionRendered: state.isCepQuestionRendered,
      setCepQuestionRendered: state.setCepQuestionRendered,
      unsetCepQuestionRendered: state.unsetCepQuestionRendered,
      setCepAnimation: state.setCepAnimation,
      unsetCepAnimation: state.unsetCepAnimation,
      cepValue: state.cepValue,
      resetCepValue: state.resetCepValue,
    }),
    shallow
  );
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow
  );

  const navigate = useNavigate();

  const handleFilterBoxClose = () => {
    deactivateModalAnimation();
    unsetCepAnimation();
    unsetProviderAnimation();
    resetCepValue();

    setTimeout(() => {
      if (isCepQuestionRendered) {
        unsetCepQuestionRendered();
      }

      if (isProviderQuestionRendered) {
        unsetProviderQuestionRendered();
      }

      closeFilterBox();
    }, 800);
  };

  const handleNext = () => {
    if (providerValue && !isCepQuestionRendered) {
      unsetProviderAnimation();

      setTimeout(() => {
        unsetProviderQuestionRendered();
        setCepQuestionRendered();
        setCepAnimation();
      }, 500);
    }

    if (cepValue.length === 9) {
      navigate(`/planos/${providerValue}/${cepValue}`);
      handleFilterBoxClose();
    }
  };

  const handleBack = (event) => {
    unsetCepAnimation();
    resetCepValue();
    event.target.classList.remove("animate__fadeIn");
    event.target.classList.add("animate__fadeOut");

    setTimeout(() => {
      unsetCepQuestionRendered();
      setProviderQuestionRendered();
      setProviderAnimation();
    }, 500);
  };

  return (
    <div
      className={
        modalAnimation
          ? "home-filter-box-overlay animate__animated animate__fast animate__fadeIn"
          : "home-filter-box-overlay animate__animated animate__fast animate__fadeOut"
      }
    >
      <div className="home-filter-box-container">
        <div className="home-filter-box-wrapper">
          <div className="home-filter-box-illustration-box">
            <button
              type="button"
              onClick={handleFilterBoxClose}
              className="home-filter-box-close-button"
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
              alt="Filter"
              className="home-filter-box-animation"
            />
          </div>

          <div className="home-filter-box-infos-box">
            <h5 className="home-filter-box-title">Antes de começar</h5>

            {isProviderQuestionRendered && <ProviderFilter />}
            {isCepQuestionRendered && <CepFilter />}

            <div className="home-filter-box-button-wrapper">
              <button
                type="button"
                onClick={handleNext}
                className="home-filter-box-submit-button"
              >
                Proximo
              </button>

              {isCepQuestionRendered && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="home-filter-box-back-button animate__animated animate__faster animate__fadeIn"
                >
                  Voltar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInitialFilterBox;
