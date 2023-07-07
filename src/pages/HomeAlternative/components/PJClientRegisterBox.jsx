const PJClientRegisterBox = () => {
  return (
    <div className="client-register-overlay">
      <div className="client-register-box">
        <div className="client-register-wrapper">
          <div className="client-register-info">
            <h3 className="client-register-title">Faça sua solicitação</h3>

            <form className="client-register-form">
              <div className="client-register-name-box">
                <label htmlFor="name" className="client-register-name-label">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="client-register-name-input"
                />
              </div>

              <div className="client-register-role-box">
                <label htmlFor="role" className="client-register-role-label">
                  Cargo
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="client-register-role-input"
                />
              </div>

              <div className="client-register-inputs-wrapper">
                <div className="client-register-tel-box">
                  <label htmlFor="tel" className="client-register-tel-label">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    className="client-register-tel-input"
                  />
                </div>

                <div className="client-register-branch-box">
                  <label
                    htmlFor="branch"
                    className="client-register-branch-label"
                  >
                    Ramal
                  </label>
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    className="client-register-branch-input"
                  />
                </div>
              </div>

              <div className="client-register-email-box">
                <label htmlFor="email" className="client-register-email-label">
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="client-register-email-input"
                />
              </div>

              <button type="submit" className="client-register-submit-button">
                Solicitar Contato
              </button>
            </form>
          </div>
          <div className="client-register-image-box">
            <button type="button" className="client-register-close-button">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src="/assets/images/filter-box-animation.gif"
              alt="Faça sua solicitação"
              className="client-register-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PJClientRegisterBox;
