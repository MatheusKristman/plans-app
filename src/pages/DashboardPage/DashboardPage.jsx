import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import api from "../../services/api.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { shallow } from "zustand/shallow";

import useDashboardPageStore from "../../stores/useDashboardPageStore.js";

const DashboardPage = () => {
  const { id, setId, isMenuOpen, openMenu, closeMenu, size, setSize } =
    useDashboardPageStore(
      (state) => ({
        id: state.id,
        setId: state.setId,
        isMenuOpen: state.isMenuOpen,
        openMenu: state.openMenu,
        closeMenu: state.closeMenu,
        size: state.size,
        setSize: state.setSize,
      }),
      shallow
    );

  const navigate = useNavigate();
  const location = useLocation();

  const menu = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setId("");
  };

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const menuHandler = (e) => {
      if (!menu.current.contains(e.target) && window.innerWidth < 1024) {
        closeMenu();
        return;
      }
    };

    document.addEventListener("mousedown", menuHandler);

    return () => {
      document.removeEventListener("mousedown", menuHandler);
    };
  }, []);

  /*useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);
    api
      .get('/admin/is-admin', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setId(res.data.token.token);
      })
      .catch((err) => {
        console.error(err);
        navigate('/admin');
      });
  }, []);*/

  useEffect(() => {
    function handleMenuOnWindowChange() {
      if (size >= 1024) {
        openMenu();
        return;
      }

      if (window.innerWidth >= 1024) {
        openMenu();
        return;
      }

      closeMenu();
    }

    handleMenuOnWindowChange();
  }, [size]);

  useEffect(() => {
    const handleScrollOnMenuOpen = () => {
      if (isMenuOpen && window.innerWidth <= 1024) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "unset";
      }
    };

    handleScrollOnMenuOpen();
  }, [isMenuOpen]);

  return (
    <div className="dashboard-wrapper">
      <div
        ref={menu}
        className={
          isMenuOpen
            ? "dashboard-menu-container menu-active"
            : "dashboard-menu-container menu-desactive"
        }
      >
        <div className="dashboard-menu">
          <div className="dashboard-menu-header">
            <Link to="/">
              <h1 className="dashboard-menu-logo">Logo</h1>
            </Link>

            <button className="dashboard-menu-close-btn" onClick={closeMenu}>
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
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <div className="dashboard-menu-body">
            <nav className="dashboard-menu-nav">
              <ul>
                <li
                  className={
                    location.pathname === "/admin/painel-de-controle"
                      ? "selected"
                      : ""
                  }
                >
                  <Link
                    to="/admin/painel-de-controle"
                    className="dashboard-menu-item"
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
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/admin/painel-de-controle/operadoras"
                      ? "selected"
                      : ""
                  }
                >
                  <Link
                    to="/admin/painel-de-controle/operadoras"
                    className="dashboard-menu-item"
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
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                      />
                    </svg>
                    Operadoras
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/admin/painel-de-controle/planos"
                      ? "selected"
                      : ""
                  }
                >
                  <Link
                    to="/admin/painel-de-controle/planos"
                    className="dashboard-menu-item"
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
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    Planos
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/admin/painel-de-controle/clientes"
                      ? "selected"
                      : ""
                  }
                >
                  <Link
                    to="/admin/painel-de-controle/clientes"
                    className="dashboard-menu-item"
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
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    Clientes
                  </Link>
                </li>
              </ul>
            </nav>

            <Link to="/admin" onClick={handleLogout} className="logout-btn">
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Sair
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardPage;
