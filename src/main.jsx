import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import HomeAlternative from "./pages/HomeAlternative/HomeAlternative.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import CelPlans from "./pages/CelPlans/CelPlans.jsx";
import InternetPlans from "./pages/InternetPlans/InternetPlans.jsx";
import TVPlans from "./pages/TVPlans/TVPlans.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import Dashboard from "./pages/DashboardComponent/Dashboard.jsx";
import Providers from "./pages/Providers/Providers.jsx";
import Plans from "./pages/Plans/Plans.jsx";
import Leads from "./pages/Leads/Leads.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import "./scss/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/condominio",
    element: <HomeAlternative />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/planos/celular/:cep?",
    element: <CelPlans />,
  },
  {
    path: "/planos/banda-larga/:cep?",
    element: <InternetPlans />,
  },
  {
    path: "/planos/tv/:cep?",
    element: <TVPlans />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/painel-de-controle",
    element: <DashboardPage />,
    children: [
      {
        path: "/admin/painel-de-controle/",
        element: <Dashboard />,
      },
      {
        path: "/admin/painel-de-controle/operadoras",
        element: <Providers />,
      },
      {
        path: "/admin/painel-de-controle/planos",
        element: <Plans />,
      },
      {
        path: "/admin/painel-de-controle/clientes",
        element: <Leads />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
