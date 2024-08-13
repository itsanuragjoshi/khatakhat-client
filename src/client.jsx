import "./assets/global.css";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { ToastProvider } from "./common/context/ToastContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout.jsx";
import Error from "./pages/error/error.jsx";
import PersistAuth from "./common/components/wrapper/PersistAuth.jsx";
import RequireAuthN from "./common/components/wrapper/RequireAuthN.jsx";
import RequireAuthZ from "./common/components/wrapper/RequireAuthZ.jsx";
import RedirectIfAuthenticated from "./common/components/wrapper/RedirectIfAuthenticated.jsx";

// Lazy-loaded components
const SignIn = lazy(() => import("./pages/auth/signIn.jsx"));
const SignUp = lazy(() => import("./pages/auth/signUp.jsx"));
const SignOut = lazy(() => import("./pages/auth/signOut.jsx"));

const Organizations = lazy(() => import("./pages/organizations/organizations.jsx"));
const OrganizationNew = lazy(() => import("./pages/organizations/organizationNew.jsx"));
const OrganizationEdit = lazy(() => import("./pages/organizations/organizationEdit.jsx"));

const Users = lazy(() => import("./pages/users/users.jsx"));
const UsersNew = lazy(() => import("./pages/users/usersNew.jsx"));
const UsersEdit = lazy(() => import("./pages/users/usersEdit.jsx"));

const Customers = lazy(() => import("./pages/customers/customers.jsx"));
const CustomersNew = lazy(() => import("./pages/customers/customersNew.jsx"));
const CustomersEdit = lazy(() => import("./pages/customers/customersEdit.jsx"));

const Invoices = lazy(() => import("./pages/invoices/invoices.jsx"));
const InvoicesNew = lazy(() => import("./pages/invoices/invoicesNew.jsx"));
const InvoicesEdit = lazy(() => import("./pages/invoices/invoicesEdit.jsx"));

const Currencies = lazy(() => import("./pages/currencies/currencies.jsx"));
const CurrenciesNew = lazy(() =>
  import("./pages/currencies/currenciesNew.jsx")
);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const organizationRoutes = [
  { path: "/org/select", element: <Organizations /> },
  { path: "/org/new", element: <OrganizationNew /> },
  {
    path: "/settings/orgprofile",
    element: (
      <RequireAuthZ module="organizations" permission="read">
        <OrganizationEdit />
      </RequireAuthZ>
    ),
  },
];

const userRoutes = [
  {
    path: "/settings/users/new",
    element: (
      <RequireAuthZ module="users" permission="create">
        <UsersNew />
      </RequireAuthZ>
    ),
  },
  {
    path: "/settings/users",
    element: (
      <RequireAuthZ module="users" permission="read">
        <Users />
      </RequireAuthZ>
    ),
  },
  {
    path: "/settings/users/:userRoleId/edit",
    element: (
      <RequireAuthZ module="users" permission="update">
        <UsersEdit />
      </RequireAuthZ>
    ),
  },
];

const currencyRoutes = [
  {
    path: "/org/:orgId/settings/currencies",
    element: (
      <RequireAuthZ module="currencies" permission="read">
        <Currencies />
      </RequireAuthZ>
    ),
  },
  {
    path: "/org/:orgId/settings/currencies/new",
    element: (
      <RequireAuthZ module="currencies" permission="create">
        <CurrenciesNew />
      </RequireAuthZ>
    ),
  },
];

const customerRoutes = [
  {
    path: "/customers",
    element: (
      <RequireAuthZ module="customers" permission="read">
        <Customers />
      </RequireAuthZ>
    ),
  },
  {
    path: "/customers/new",
    element: (
      <RequireAuthZ module="customers" permission="create">
        <CustomersNew />
      </RequireAuthZ>
    ),
  },
  {
    path: "/customers/:customerId/edit",
    element: (
      <RequireAuthZ module="customers" permission="update">
        <CustomersEdit />
      </RequireAuthZ>
    ),
  },
];

const invoiceRoutes = [
  {
    path: "/invoices",
    element: (
      <RequireAuthZ module="invoices" permission="read">
        <Invoices />
      </RequireAuthZ>
    ),
  },
  {
    path: "/invoices/new",
    element: (
      <RequireAuthZ module="invoices" permission="create">
        <InvoicesNew />
      </RequireAuthZ>
    ),
  },
  {
    path: "/invoices/:customerId/edit",
    element: (
      <RequireAuthZ module="invoices" permission="update">
        <InvoicesEdit />
      </RequireAuthZ>
    ),
  },
];

// Combine all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistAuth>
        <Layout />
      </PersistAuth>
    ),
    children: [
      {
        element: <RedirectIfAuthenticated />,
        children: [
          { path: "/signin", element: <SignIn /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },
      { path: "/error403", element: <Error statusCode={403} /> },
      {
        element: <RequireAuthN />,
        children: [
          { path: "/signout", element: <SignOut /> },
          ...organizationRoutes,
          ...userRoutes,
          ...currencyRoutes,
          ...customerRoutes,
          ...invoiceRoutes,
        ],
      },
      { path: "*", element: <Error statusCode={404} /> },
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
