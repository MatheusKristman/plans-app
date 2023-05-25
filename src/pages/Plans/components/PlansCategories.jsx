import React from "react";

const PlansCategories = () => {
  return (
    <div className="plans-component-categories-container">
      <div className="plans-component-categories-all-wrapper">
        <button className="plans-component-categories-all-button">Todos</button>
        <div className="plans-component-categories-line active" />
      </div>

      <div className="plans-component-categories-internet-wrapper">
        <button className="plans-component-categories-internet-button">
          Banda Larga
        </button>
        <div className="plans-component-categories-line desactive" />
      </div>

      <div className="plans-component-categories-cel-wrapper">
        <button className="plans-component-categories-cel-button">Movel</button>
        <div className="plans-component-categories-line desactive" />
      </div>

      <div className="plans-component-categories-tv-wrapper">
        <button className="plans-component-categories-tv-button">TV</button>
        <div className="plans-component-categories-line desactive" />
      </div>
    </div>
  );
};

export default PlansCategories;
