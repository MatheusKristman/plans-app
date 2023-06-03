import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

import useDashboardPageStore from "../../stores/useDashboardPageStore.js";

const DashboardHeader = ({ pageName, searchPlaceholder }) => {
  const { openMenu, closeMenu, setSearchValue, searchValue } =
    useDashboardPageStore(
      (state) => ({
        openMenu: state.openMenu,
        closeMenu: state.closeMenu,
        setSearchValue: state.setSearchValue,
        searchValue: state.searchValue,
      }),
      shallow
    );

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="dashboard-component-header">
      <button
        onClick={openMenu}
        type="button"
        className="dashboard-component-menu-btn"
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

      <h2 className="header-title">{pageName}</h2>

      <label htmlFor="search" className="search-box">
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          name="search"
          placeholder={searchPlaceholder}
          onChange={setSearchValue}
          value={searchValue}
          className="search-input"
        />
      </label>

      <span className="dashboard-admin-tag">Admin</span>
    </div>
  );
};

export default DashboardHeader;
