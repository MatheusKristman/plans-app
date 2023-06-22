import React, { useEffect, useLayoutEffect, useRef, useMemo } from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../services/api";

const DashboardPlanActiveStatus = () => {
  const {
    isStatusMenuOpen,
    openStatusMenu,
    closeStatusMenu,
    openInternetForm,
    openCelForm,
    openTVForm,
    activePlans,
  } = useDashboardComponentStore(
    (state) => ({
      isStatusMenuOpen: state.isStatusMenuOpen,
      openStatusMenu: state.openStatusMenu,
      closeStatusMenu: state.closeStatusMenu,
      openInternetForm: state.openInternetForm,
      openCelForm: state.openCelForm,
      openTVForm: state.openTVForm,
      activePlans: state.activePlans,
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

  const statusMenuAnimation = useMemo(() => ({
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -100, opacity: 0, transition: { duration: 0.5 } },
  }));

  const handleOpenStatusMenu = () => {
    openStatusMenu();
  };

  const handleOpenInternetForm = () => {
    openInternetForm();
    activateModalAnimation();
    closeStatusMenu();
  };

  const handleOpenCelForm = () => {
    openCelForm();
    activateModalAnimation();
    closeStatusMenu();
  };

  const handleOpenTVForm = () => {
    openTVForm();
    activateModalAnimation();
    closeStatusMenu();
  };

  useLayoutEffect(() => {
    const statusMenuHandler = (e) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(e.target) &&
        !e.target.classList.contains("dashboard-component-create-plan-btn")
      ) {
        closeStatusMenu();
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
      <span className="dashboard-component-status">
        Planos ativos: {activePlans.length}
      </span>
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

      <AnimatePresence>
        {isStatusMenuOpen && (
          <motion.div
            variants={statusMenuAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            ref={statusMenuRef}
            className="dashboard-component-plan-type-options"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPlanActiveStatus;
