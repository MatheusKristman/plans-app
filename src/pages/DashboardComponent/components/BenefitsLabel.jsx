import React from "react";

const BenefitsLabel = ({ htmlFor, imageSrc, imageAlt, inputId }) => {
  return (
    <label htmlFor={htmlFor} className="benefits-label">
      <div className="benefits-logo-box">
        <img src={imageSrc} alt={imageAlt} className="benefits-logo" />
      </div>

      <input
        type="checkbox"
        id={inputId}
        name="benefits"
        className="benefits-checkbox"
      />
    </label>
  );
};

export default BenefitsLabel;
