import React from "react";
import useHomeStore from "../../../stores/useHomeStore";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const { isMobileNavOpen, openMobileNav, closeMobileNav } = useHomeStore(
    (state) => ({
      isMobileNavOpen: state.isMobileNavOpen,
      openMobileNav: state.openMobileNav,
      closeMobileNav: state.closeMobileNav,
    }),
  );

  const navigate = useNavigate();

  const handleMobileNav = () => {
    if (isMobileNavOpen) {
      closeMobileNav();
      return;
    }

    openMobileNav();
  };

  const redirectToHomeAlternative = () => {
    navigate("/condominio");
  };

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <div className="header-logo-box">
          <h1 className="header-logo">LOGO</h1>
        </div>

        <nav className="header-mobile-nav-menu">
          <button
            type="button"
            onClick={handleMobileNav}
            className="header-nav-button"
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <ul
            className={
              isMobileNavOpen
                ? "header-nav-list nav-active"
                : "header-nav-list nav-desactive"
            }
          >
            <li onClick={closeMobileNav} className="header-nav-item">
              <a href="#howItWorks">Como funciona</a>
            </li>
            <li onClick={closeMobileNav} className="header-nav-item">
              <a href="#benefits">Beneficios</a>
            </li>
            <li onClick={closeMobileNav} className="header-nav-item">
              <a href="#faq">FAQ</a>
            </li>
            <li className="header-nav-cta-item">
              <button
                type="button"
                onClick={redirectToHomeAlternative}
                className="header-nav-cta-button"
              >
                Para seu condomínio
              </button>
            </li>
          </ul>
        </nav>

        <nav className="header-nav-menu">
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <a href="#howItWorks">Como funciona</a>
            </li>
            <li className="header-nav-item">
              <a href="#benefits">Beneficios</a>
            </li>
            <li className="header-nav-item">
              <a href="#faq">FAQ</a>
            </li>
            <li className="header-nav-cta-item">
              <button
                type="button"
                onClick={redirectToHomeAlternative}
                className="header-nav-cta-button"
              >
                Para seu condomínio
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HomeHeader;
