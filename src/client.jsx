import "./assets/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { ToastProvider } from "./common/context/ToastContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout.jsx";
import RequireAuthentication from "./common/components/wrapper/RequireAuthentication.jsx";
import KeepAuthenticated from "./common/components/wrapper/KeepAuthenticated.jsx";
import RedirectIfAuthenticated from "./common/components/wrapper/RedirectIfAuthenticated.jsx";

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
import SignOut from "./pages/user/signOut.jsx";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    element: <KeepAuthenticated />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <RedirectIfAuthenticated />,
            children: [
              { path: "/signin", element: <SignIn /> },
              { path: "/signup", element: <SignUp /> },
            ],
          },
          {
            element: <RequireAuthentication />,
            children: [
              { path: "/signout", element: <SignOut /> },
              { path: "/customers", element: <Customers /> },
              { path: "/customers/new", element: <CustomersNew /> },
              { path: "/customers/edit", element: <CustomersEdit /> },
              { path: "/settings/orgprofile/:id", element: <Orgprofile /> },
              { path: "/settings/currencies", element: <Currencies /> },
              { path: "/settings/currencies/new", element: <CurrenciesNew /> },
            ],
          },
          { path: "/getstarted", element: <OrgprofileNew /> },
          { path: "*", element: <Error statusCode={404} /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </Provider>
  // </React.StrictMode>
);
