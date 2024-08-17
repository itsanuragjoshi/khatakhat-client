import { useContext } from "react";
import ToastContext from "../context/ToastContext.jsx";

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw Error("useToastContext must be used inside a ToastContextProvider");
  }
  return context;
};

export default useToastContext;
