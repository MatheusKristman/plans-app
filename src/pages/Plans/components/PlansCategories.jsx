import React from "react";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";

const PlansCategories = () => {
  const { planCategory, handleCategory } = usePlansStore(
    (state) => ({
      planCategory: state.planCategory,
      handleCategory: state.handleCategory,
    }),
    shallow,
  );

  return (
    <div className="plans-component-categories-container">
      <div className="plans-component-categories-all-wrapper">
        <button
          className="plans-component-categories-all-button"
          onClick={() => handleCategory("all")}
          style={planCategory.all ? { pointerEvents: "none" } : {}}
        >
          Todos
        </button>
        <div
          className={
            planCategory.all
              ? "plans-component-categories-line active"
              : "plans-component-categories-line desactive"
          }
        />
      </div>

      <div className="plans-component-categories-internet-wrapper">
        <button
          className="plans-component-categories-internet-button"
          onClick={() => handleCategory("internet")}
          style={planCategory.internet ? { pointerEvents: "none" } : {}}
        >
          Banda Larga
        </button>
        <div
          className={
            planCategory.internet
              ? "plans-component-categories-line active"
              : "plans-component-categories-line desactive"
          }
        />
      </div>

      <div className="plans-component-categories-cel-wrapper">
        <button
          className="plans-component-categories-cel-button"
          onClick={() => handleCategory("cel")}
          style={planCategory.cel ? { pointerEvents: "none" } : {}}
        >
          Móvel
        </button>
        <div
          className={
            planCategory.cel
              ? "plans-component-categories-line active"
              : "plans-component-categories-line desactive"
          }
        />
      </div>

      <div className="plans-component-categories-tv-wrapper">
        <button
          className="plans-component-categories-tv-button"
          onClick={() => handleCategory("tv")}
          style={planCategory.tv ? { pointerEvents: "none" } : {}}
        >
          TV por assinatura
        </button>
        <div
          className={
            planCategory.tv
              ? "plans-component-categories-line active"
              : "plans-component-categories-line desactive"
          }
        />
      </div>
    </div>
  );
};

export default PlansCategories;
