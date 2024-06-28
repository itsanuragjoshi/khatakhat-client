import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/global.css";
import { ToastProvider } from "./common/context/ToastContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Customers from "./pages/customers/customers";
import CustomersNew from "./pages/customers/customersNew";
import Currencies from "./pages/currencies/currencies";
import CustomersEdit from "./pages/customers/customersEdit";
import CurrenciesNew from "./pages/currencies/currenciesNew";
import Orgprofile from "./pages/organisation/orgprofile";
import OrgprofileNew from "./pages/organisation/orgprofileNew";
import Error from "./pages/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/getstarted", element: <OrgprofileNew /> },
      { path: "/customers", element: <Customers /> },
      { path: "/customers/new", element: <CustomersNew /> },
      { path: "/customers/edit", element: <CustomersEdit /> },
      { path: "/settings/orgprofile/:id", element: <Orgprofile /> },
      { path: "/settings/currencies/", element: <Currencies /> },
      { path: "/settings/currencies/new", element: <CurrenciesNew /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>
);
