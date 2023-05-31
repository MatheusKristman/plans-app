import React, { useEffect, useLayoutEffect, useRef } from "react";
import usePlansStore from "../../../stores/usePlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const PlansFilterBox = () => {
  const { plansFilter, handleFilter, closeFilterBox } = usePlansStore(
    (state) => ({
      plansFilter: state.plansFilter,
      handleFilter: state.handleFilter,
      closeFilterBox: state.closeFilterBox,
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
  const filterBoxRef = useRef();

  useEffect(() => {
    console.log(plansFilter);
  }, [plansFilter]);

  useLayoutEffect(() => {
    const statusMenuHandler = (e) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(e.target) &&
        !e.target.classList.contains("plans-component-filter-button")
      ) {
        deactivateModalAnimation();

        setTimeout(() => {
          closeFilterBox();
        }, 500);
        return;
      }
    };

    document.addEventListener("mousedown", statusMenuHandler);

    return () => {
      document.removeEventListener("mousedown", statusMenuHandler);
    };
  }, []);

  return (
    <div
      ref={filterBoxRef}
      className={
        modalAnimation
          ? "filter-box-container animate__animated animate__faster animate__fadeInDown"
          : "filter-box-container animate__animated animate__faster animate__fadeOutUp"
      }
    >
      <ul className="filter-box-wrapper">
        <li
          onClick={() => {
            handleFilter("recent");
            deactivateModalAnimation();

            setTimeout(() => {
              closeFilterBox();
            }, 500);
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
            deactivateModalAnimation();

            setTimeout(() => {
              closeFilterBox();
            }, 500);
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
            deactivateModalAnimation();

            setTimeout(() => {
              closeFilterBox();
            }, 500);
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
            deactivateModalAnimation();

            setTimeout(() => {
              closeFilterBox();
            }, 500);
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
    </div>
  );
};

export default PlansFilterBox;
