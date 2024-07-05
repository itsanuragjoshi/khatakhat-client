import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./assets/global.css";
import { ToastProvider } from "./common/context/ToastContext.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./common/components/wrapper/PrivateRoute.jsx";
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
import PersistSignIn from "./common/components/wrapper/PersistSignIn.jsx";
import SignedIn from "./common/components/wrapper/SignedIn.jsx";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistSignIn>
        <Layout />
      </PersistSignIn>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/signin",
        element: (
          <SignedIn>
            <SignIn />
          </SignedIn>
        ),
      },
      {
        path: "/signup",
        element: (
          <SignedIn>
            <SignUp />
          </SignedIn>
        ),
      },
      {
        path: "/signout",
        element: (
          <PrivateRoute>
            <SignOut />
          </PrivateRoute>
        ),
      },
      { path: "/getstarted", element: <OrgprofileNew /> },
      {
        path: "/customers",
        element: (
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        ),
      },
      {
        path: "/customers/new",
        element: (
          <PrivateRoute>
            <CustomersNew />
          </PrivateRoute>
        ),
      },
      {
        path: "/customers/edit",
        element: (
          <PrivateRoute>
            <CustomersEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/orgprofile/:id",
        element: (
          <PrivateRoute>
            <Orgprofile />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/currencies/",
        element: (
          <PrivateRoute>
            <Currencies />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/currencies/new",
        element: (
          <PrivateRoute>
            <CurrenciesNew />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <Error /> },
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
