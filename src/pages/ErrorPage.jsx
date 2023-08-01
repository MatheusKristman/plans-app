import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  return (
    <div id="error-page" className="error-page-container">
      <div className="error-page-header">
        <h1 className="error-page-logo">LOGO</h1>
      </div>

      <div className="error-page-info">
        <h1 className="error-page-title">Oops!</h1>
        <p className="error-page-text">Ocorreu um erro.</p>
        <button onClick={() => navigate("/")} className="error-page-button">
          Clique aqui para voltar
        </button>
      </div>

      <div className="error-page-footer">
        <h1 className="error-page-copy">Nome do site © 2023</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
