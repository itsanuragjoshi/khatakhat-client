import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./assets/global.css";
import { ToastProvider } from "./common/context/ToastContext.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./common/components/protectedRoute/ProtectedRoute.jsx";
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

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/signout",
        element: (
          <ProtectedRoute>
            <SignOut />
          </ProtectedRoute>
        ),
      },
      { path: "/getstarted", element: <OrgprofileNew /> },
      {
        path: "/customers",
        element: (
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customers/new",
        element: (
          <ProtectedRoute>
            <CustomersNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customers/edit",
        element: (
          <ProtectedRoute>
            <CustomersEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/orgprofile/:id",
        element: (
          <ProtectedRoute>
            <Orgprofile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/currencies/",
        element: (
          <ProtectedRoute>
            <Currencies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/currencies/new",
        element: (
          <ProtectedRoute>
            <CurrenciesNew />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
