import "./assets/global.css";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { ToastProvider } from "./common/context/ToastContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout.jsx";
import Error from "./pages/error/error.jsx";
import Loader from "./common/components/loader/Loader";
import RequireAuthentication from "./common/components/wrapper/RequireAuthentication.jsx";
import RequireAuthorisation from "./common/components/wrapper/RequireAuthorisation.jsx";
import PersistAuthentication from "./common/components/wrapper/PersistAuthentication.jsx";
import RedirectIfAuthenticated from "./common/components/wrapper/RedirectIfAuthenticated.jsx";

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

const organisationRoutes = [
  {
    path: "/org/new",
    element: (
      <RequireAuthorisation module="organisation" permission="create">
        <OrgprofileNew />
      </RequireAuthorisation>
    ),
  },
  {
    path: "/org",
    element: (
      <RequireAuthorisation module="organisation" permission="read">
        <OrgSelect />
      </RequireAuthorisation>
    ),
  },
  // {
  //   path: "/org/:orgId/dashboard",
  //   element: (
  //     <RequireAuthorisation module="organisation" permission="read">
  //       <Dashboard />
  //     </RequireAuthorisation>
  //   ),
  // },
  {
    path: "/org/:orgId/settings/orgProfile",
    element: (
      <RequireAuthorisation module="organisation" permission="read">
        <Orgprofile />
      </RequireAuthorisation>
    ),
  },
];

// const userRoutes = [
//   {
//     path: "/org/:orgId/settings/users",
//     element: (
//       <RequireAuthorisation module="user" permission="read">
//         <Users />
//       </RequireAuthorisation>
//     ),
//   },
//   {
//     path: "/org/:orgId/settings/users/new",
//     element: (
//       <RequireAuthorisation module="user" permission="create">
//         <UsersNew />
//       </RequireAuthorisation>
//     ),
//   },
//   {
//     path: "/org/:orgId/settings/users/:userId",
//     element: (
//       <RequireAuthorisation module="user" permission="read">
//         <UserDetails />
//       </RequireAuthorisation>
//     ),
//   },
//   {
//     path: "/org/:orgId/settings/users/:userId/edit",
//     element: (
//       <RequireAuthorisation module="user" permission="update">
//         <UserEdit />
//       </RequireAuthorisation>
//     ),
//   },
// ];

const currencyRoutes = [
  {
    path: "/org/:orgId/settings/currencies",
    element: (
      <RequireAuthorisation module="currency" permission="read">
        <Currencies />
      </RequireAuthorisation>
    ),
  },
  {
    path: "/org/:orgId/settings/currencies/new",
    element: (
      <RequireAuthorisation module="currency" permission="create">
        <CurrenciesNew />
      </RequireAuthorisation>
    ),
  },
  // {
  //   path: "/org/:orgId/settings/currencies/:currencyId/edit",
  //   element: (
  //     <RequireAuthorisation module="currency" permission="update">
  //       <CurrenciesEdit />
  //     </RequireAuthorisation>
  //   ),
  // },
];

const customerRoutes = [
  {
    path: "/org/:orgId/customers",
    element: (
      <RequireAuthorisation module="customer" permission="read">
        <Customers />
      </RequireAuthorisation>
    ),
  },
  {
    path: "/org/:orgId/customers/new",
    element: (
      <RequireAuthorisation module="customer" permission="create">
        <CustomersNew />
      </RequireAuthorisation>
    ),
  },
  // {
  //   path: "/org/:orgId/customers/:customerId",
  //   element: (
  //     <RequireAuthorisation module="customer" permission="read">
  //       <CustomerDetails />
  //     </RequireAuthorisation>
  //   ),
  // },
  {
    path: "/org/:orgId/customers/:customerId/edit",
    element: (
      <RequireAuthorisation module="customer" permission="update">
        <CustomersEdit />
      </RequireAuthorisation>
    ),
  },
];

// Combine all routes
const router = createBrowserRouter([
  {
    element: <PersistAuthentication />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        ),
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
              ...organisationRoutes,
              // ...userRoutes,
              ...currencyRoutes,
              ...customerRoutes,
            ],
          },
          { path: "*", element: <Error statusCode={404} /> },
        ],
      },
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
