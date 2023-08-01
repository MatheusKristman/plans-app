import React from "react";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";

const BenefitsLabel = ({ htmlFor, imageSrc, imageAlt, inputId, value }) => {
  const { benefits, setBenefits } = useGeneralStore(
    (state) => ({
      benefits: state.benefits,
      setBenefits: state.setBenefits,
    }),
    shallow,
  );

  return (
    <label
      htmlFor={htmlFor}
      className={
        benefits?.includes(value)
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
        onChange={() => setBenefits(value)}
        className="benefits-checkbox"
      />
    </label>
  );
};

export default BenefitsLabel;
