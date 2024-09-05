import "./assets/global.css";

import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import store from "./redux/store.js";
import { ToastProvider } from "./common/context/ToastContext.jsx";

import PersistAuth from "./common/components/wrapper/PersistAuth.jsx";
import RequireAuthN from "./common/components/wrapper/RequireAuthN.jsx";
import RequireAuthZ from "./common/components/wrapper/RequireAuthZ.jsx";
import RedirectIfAuthenticated from "./common/components/wrapper/RedirectIfAuthenticated.jsx";
import Layout from "./Layout.jsx";
import Error from "./pages/error/error.jsx";
import Home from "./pages/home/home.jsx";

const SignIn = lazy(() => import("./pages/auth/signIn.jsx"));
const SignUp = lazy(() => import("./pages/auth/signUp.jsx"));
const SignOut = lazy(() => import("./pages/auth/signOut.jsx"));
const Orgs = lazy(() => import("./pages/organizations/orgs.jsx"));
const OrgNew = lazy(() => import("./pages/organizations/orgNew.jsx"));
const OrgEdit = lazy(() => import("./pages/organizations/orgEdit.jsx"));
const Users = lazy(() => import("./pages/users/users.jsx"));
const UserNew = lazy(() => import("./pages/users/userNew.jsx"));
const UserEdit = lazy(() => import("./pages/users/userEdit.jsx"));
const Customers = lazy(() => import("./pages/customers/customers.jsx"));
const CustomerNew = lazy(() => import("./pages/customers/customerNew.jsx"));
const CustomerEdit = lazy(() => import("./pages/customers/customerEdit.jsx"));
const Invoices = lazy(() => import("./pages/invoices/invoices.jsx"));
const InvoiceNew = lazy(() => import("./pages/invoices/invoiceNew.jsx"));
const InvoiceEdit = lazy(() => import("./pages/invoices/invoiceEdit.jsx"));
const Currencies = lazy(() => import("./pages/currencies/currencies.jsx"));
const CurrenciesNew = lazy(() =>
  import("./pages/currencies/currenciesNew.jsx")
);
const Dashboard = lazy(() => import("./pages/dashboard/dashboard.jsx"));

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const organizationRoutes = [
  { path: "/org/select", element: <Orgs /> },
  { path: "/org/new", element: <OrgNew /> },
  {
    path: "/settings/orgprofile",
    element: (
      <RequireAuthZ module="organizations" permission="read">
        <OrgEdit />
      </RequireAuthZ>
    ),
  },
];

const userRoutes = [
  {
    path: "/settings/users/new",
    element: (
      <RequireAuthZ module="users" permission="create">
        <UserNew />
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
        <UserEdit />
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
        <CustomerNew />
      </RequireAuthZ>
    ),
  },
  {
    path: "/customers/:customerId/edit",
    element: (
      <RequireAuthZ module="customers" permission="update">
        <CustomerEdit />
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
        <InvoiceNew />
      </RequireAuthZ>
    ),
  },
  {
    path: "/invoices/:invoiceId/edit",
    element: (
      <RequireAuthZ module="invoices" permission="update">
        <InvoiceEdit />
      </RequireAuthZ>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistAuth>
        <Layout />
      </PersistAuth>
    ),
    children: [
      { path: "/", element: <Home /> },
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
          { path: "/dashboard", element: <Dashboard /> },
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
