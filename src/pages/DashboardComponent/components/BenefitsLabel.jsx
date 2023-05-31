import React from "react";
import useDashboardComponentStore from "../../../stores/useDashboardComponentStore";
import { shallow } from "zustand/shallow";

const BenefitsLabel = ({ htmlFor, imageSrc, imageAlt, inputId, value }) => {
  const { internetBenefits, setInternetBenefits } = useDashboardComponentStore(
    (state) => ({
      internetBenefits: state.internetBenefits,
      setInternetBenefits: state.setInternetBenefits,
    })
  );

  return (
    <label
      htmlFor={htmlFor}
      className={
        internetBenefits.includes(value)
          ? "benefits-label benefits-selected"
          : "benefits-label"
      }
    >
      <div className="benefits-logo-box">
        <img src={imageSrc} alt={imageAlt} className="benefits-logo" />
      </div>

      <input
        type="checkbox"
        id={inputId}
        name="benefits"
        onChange={() => setInternetBenefits(value)}
        className="benefits-checkbox"
      />
    </label>
  );
};

export default BenefitsLabel;
