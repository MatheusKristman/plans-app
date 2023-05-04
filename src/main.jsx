import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { PlansProvider } from "./contexts/Plans/PlansProvider";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import Dashboard from "./pages/Dashboard";
import HirePlan from "./pages/HirePlan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  { path: "/hireplan", element: <HirePlan /> },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlansProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PlansProvider>
    </AuthProvider>
  </React.StrictMode>
);
