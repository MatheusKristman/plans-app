import React from "react";
import usePlansStore from "../../../stores/usePlansStore";
import { shallow } from "zustand/shallow";
import { AnimatePresence } from "framer-motion";

import PlansFilterBox from "./PlansFilterBox";

const PlansStatusBox = () => {
  const { isFilterBoxOpen, openFilterBox, plans } = usePlansStore(
    (state) => ({
      isFilterBoxOpen: state.isFilterBoxOpen,
      openFilterBox: state.openFilterBox,
      plans: state.plans,
    }),
    shallow,
  );

  const activePlans = plans.filter((plan) => !plan.archived);

  const handleFilterBoxOpen = () => {
    openFilterBox();
  };

  return (
    <div className="plans-component-status-box">
      <AnimatePresence>
        {isFilterBoxOpen && <PlansFilterBox key={isFilterBoxOpen} />}
      </AnimatePresence>

      <span className="plans-component-status">
        Planos ativos: {activePlans.length}
      </span>

      <button
        onClick={handleFilterBoxOpen}
        className="plans-component-filter-button"
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
        Filtrar
      </button>
    </div>
  );
};

export default PlansStatusBox;
