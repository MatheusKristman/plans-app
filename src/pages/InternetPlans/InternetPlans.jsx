import React from "react";

import InternetPlansHeader from "./components/InternetPlansHeader";
import InternetPlansBody from "./components/InternetPlansBody";

const InternetPlans = () => {
  return (
    <div className="internet-plans-container">
      <InternetPlansHeader />
      <InternetPlansBody />
    </div>
  );
};

export default InternetPlans;
