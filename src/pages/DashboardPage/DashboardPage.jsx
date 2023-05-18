import React from "react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <h1>DashboardPage</h1>
      <Outlet />
    </div>
  );
};

export default DashboardPage;
