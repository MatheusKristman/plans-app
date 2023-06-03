import React from "react";
import useLeadStore from "../../../stores/useLeadStore";

const LeadsStatusBox = () => {
  const { clientsPF } = useLeadStore((state) => ({
    clientsPF: state.clientsPF,
  }));

  return (
    <>
      <h3 className="leads-component-mobile-title">Clientes</h3>

      <div className="leads-component-status-box">
        <span className="leads-component-status">
          Contatos: {clientsPF.length}
        </span>
      </div>
    </>
  );
};

export default LeadsStatusBox;
