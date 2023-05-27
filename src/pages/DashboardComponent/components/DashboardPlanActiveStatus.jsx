import React, { useEffect, useLayoutEffect, useRef, useMemo } from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { motion } from "framer-motion";

const DashboardPlanActiveStatus = () => {
  const {
    isStatusMenuOpen,
    openStatusMenu,
    closeStatusMenu,
    statusMenuAnimation,
    openStatusAnimation,
    closeStatusAnimation,
    openInternetForm,
    openCelForm,
    openTVForm,
  } = useDashboardComponentStore(
    (state) => ({
      isStatusMenuOpen: state.isStatusMenuOpen,
      openStatusMenu: state.openStatusMenu,
      closeStatusMenu: state.closeStatusMenu,
      statusMenuAnimation: state.statusMenuAnimation,
      openStatusAnimation: state.openStatusAnimation,
      closeStatusAnimation: state.closeStatusAnimation,
      openInternetForm: state.openInternetForm,
      openCelForm: state.openCelForm,
      openTVForm: state.openTVForm,
    }),
    shallow
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );

  const statusMenuRef = useRef();

  const handleOpenStatusMenu = () => {
    openStatusMenu();
    openStatusAnimation();
  };

  const handleOpenInternetForm = () => {
    openInternetForm();
    activateModalAnimation();
    closeStatusMenu();
    closeStatusAnimation();
  };

  const handleOpenCelForm = () => {
    openCelForm();
    activateModalAnimation();
    closeStatusMenu();
    closeStatusAnimation();
  };

  const handleOpenTVForm = () => {
    openTVForm();
    activateModalAnimation();
    closeStatusMenu();
    closeStatusAnimation();
  };

  useLayoutEffect(() => {
    const statusMenuHandler = (e) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(e.target) &&
        !e.target.classList.contains("dashboard-component-create-plan-btn")
      ) {
        closeStatusAnimation();

        setTimeout(() => {
          closeStatusMenu();
        }, 1000);
        return;
      }
    };

    document.addEventListener("mousedown", statusMenuHandler);

    return () => {
      document.removeEventListener("mousedown", statusMenuHandler);
    };
  }, []);

  return (
    <div className="dashboard-component-status-box">
      <span className="dashboard-component-status">Planos ativos: </span>
      <button
        className="dashboard-component-create-plan-btn"
        onClick={handleOpenStatusMenu}
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        NOVO PLANO
      </button>

      {/* TODO arrumar posiçao quando esta no mobile */}
      {isStatusMenuOpen && (
        <div
          ref={statusMenuRef}
          className={
            statusMenuAnimation
              ? "dashboard-component-plan-type-options animate__animated animate__fadeInDown animate__fast"
              : "dashboard-component-plan-type-options animate__animated animate__fadeOutUp animate__fast"
          }
        >
          <h4 className="dashboard-component-plan-type-title">
            Qual o tipo do plano?
          </h4>

          <ul className="dashboard-component-plan-type-buttons">
            <li
              onClick={handleOpenInternetForm}
              className="dashboard-component-plan-type-button"
            >
              Banda Larga
            </li>
            <li
              onClick={handleOpenCelForm}
              className="dashboard-component-plan-type-button"
            >
              Celular
            </li>
            <li
              onClick={handleOpenTVForm}
              className="dashboard-component-plan-type-button"
            >
              TV por assinatura
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPlanActiveStatus;
