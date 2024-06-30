import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./assets/global.css";
import { ToastProvider } from "./common/context/ToastContext.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Customers from "./pages/customers/customers.jsx";
import CustomersNew from "./pages/customers/customersNew.jsx";
import Currencies from "./pages/currencies/currencies.jsx";
import CustomersEdit from "./pages/customers/customersEdit.jsx";
import CurrenciesNew from "./pages/currencies/currenciesNew.jsx";
import Orgprofile from "./pages/organisation/orgprofile.jsx";
import OrgprofileNew from "./pages/organisation/orgprofileNew.jsx";
import Error from "./pages/error/error.jsx";
import SignIn from "./pages/user/signIn.jsx";
import SignUp from "./pages/user/signUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
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
