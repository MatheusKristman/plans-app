import React, { useLayoutEffect, useRef, useMemo } from "react";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";
import { motion } from "framer-motion";

const PlansFilterBox = () => {
  const { plansFilter, handleFilter, closeFilterBox } = usePlansStore(
    (state) => ({
      plansFilter: state.plansFilter,
      handleFilter: state.handleFilter,
      closeFilterBox: state.closeFilterBox,
      plans: state.plans,
      setPlans: state.setPlans,
    }),
    shallow,
  );
  const filterBoxRef = useRef();

  const filterAnimation = useMemo(() => ({
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -100, opacity: 0 },
  }));

  useLayoutEffect(() => {
    const statusMenuHandler = (e) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(e.target) &&
        !e.target.classList.contains("plans-component-filter-button")
      ) {
        closeFilterBox();
        return;
      }
    };

    document.addEventListener("mousedown", statusMenuHandler);

    return () => {
      document.removeEventListener("mousedown", statusMenuHandler);
    };
  }, []);

  return (
    <motion.div
      variants={filterAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={filterBoxRef}
      className="filter-box-container"
    >
      <ul className="filter-box-wrapper">
        <li
          onClick={() => {
            handleFilter("recent");

            closeFilterBox();
          }}
          className={
            plansFilter.recent
              ? "filter-box-item filter-active"
              : "filter-box-item"
          }
        >
          Mais Recente
        </li>
        <li
          onClick={() => {
            handleFilter("old");

            closeFilterBox();
          }}
          className={
            plansFilter.old
              ? "filter-box-item filter-active"
              : "filter-box-item"
          }
        >
          Mais Antigo
        </li>
        <li
          onClick={() => {
            handleFilter("priorityCrescent");

            closeFilterBox();
          }}
          className={
            plansFilter.priorityCrescent
              ? "filter-box-item filter-active"
              : "filter-box-item"
          }
        >
          Prioridade Crescente
        </li>
        <li
          onClick={() => {
            handleFilter("priorityDecrescent");

            closeFilterBox();
          }}
          className={
            plansFilter.priorityDecrescent
              ? "filter-box-item filter-active"
              : "filter-box-item"
          }
        >
          Prioridade Decrescente
        </li>
      </ul>
    </motion.div>
  );
};

export default PlansFilterBox;
