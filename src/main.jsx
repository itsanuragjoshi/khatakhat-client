import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/global.css";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./common/context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
