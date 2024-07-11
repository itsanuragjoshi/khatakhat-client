import "./assets/global.css";
import React, { Suspense, lazy } from "react";
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
import Error from "./pages/error/error.jsx";
import Loader from "./common/components/loader/Loader";

// Lazy-loaded components
const Customers = lazy(() => import("./pages/customers/customers.jsx"));
const CustomersNew = lazy(() => import("./pages/customers/customersNew.jsx"));
const Currencies = lazy(() => import("./pages/currencies/currencies.jsx"));
const CustomersEdit = lazy(() => import("./pages/customers/customersEdit.jsx"));
const CurrenciesNew = lazy(() =>
  import("./pages/currencies/currenciesNew.jsx")
);
const Orgprofile = lazy(() => import("./pages/organisation/orgprofile.jsx"));
const OrgprofileNew = lazy(() =>
  import("./pages/organisation/orgprofileNew.jsx")
);
const SignIn = lazy(() => import("./pages/user/signIn.jsx"));
const SignUp = lazy(() => import("./pages/user/signUp.jsx"));
const SignOut = lazy(() => import("./pages/user/signOut.jsx"));
const OrgSelect = lazy(() => import("./pages/organisation/orgSelect.jsx"));

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
              {
                path: "/signin",
                element: (
                  <Suspense fallback={<Loader />}>
                    <SignIn />
                  </Suspense>
                ),
              },
              {
                path: "/signup",
                element: (
                  <Suspense fallback={<Loader />}>
                    <SignUp />
                  </Suspense>
                ),
              },
            ],
          },
          {
            element: <RequireAuthentication />,
            children: [
              {
                path: "/createOrg",
                element: (
                  <Suspense fallback={<Loader />}>
                    <OrgprofileNew />
                  </Suspense>
                ),
              },
              {
                path: "/selectOrg",
                element: (
                  <Suspense fallback={<Loader />}>
                    <OrgSelect />
                  </Suspense>
                ),
              },
              {
                path: "/signout",
                element: (
                  <Suspense fallback={<Loader />}>
                    <SignOut />
                  </Suspense>
                ),
              },
              {
                path: "/customers",
                element: (
                  <Suspense fallback={<Loader />}>
                    <Customers />
                  </Suspense>
                ),
              },
              {
                path: "/customers/new",
                element: (
                  <Suspense fallback={<Loader />}>
                    <CustomersNew />
                  </Suspense>
                ),
              },
              {
                path: "/customers/edit",
                element: (
                  <Suspense fallback={<Loader />}>
                    <CustomersEdit />
                  </Suspense>
                ),
              },
              {
                path: "/settings/orgprofile/:id",
                element: (
                  <Suspense fallback={<Loader />}>
                    <Orgprofile />
                  </Suspense>
                ),
              },
              {
                path: "/settings/currencies",
                element: (
                  <Suspense fallback={<Loader />}>
                    <Currencies />
                  </Suspense>
                ),
              },
              {
                path: "/settings/currencies/new",
                element: (
                  <Suspense fallback={<Loader />}>
                    <CurrenciesNew />
                  </Suspense>
                ),
              },
            ],
          },
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
