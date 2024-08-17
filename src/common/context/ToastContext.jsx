import { createContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToastList((prevList) => [...prevList, newToast]);

    const timeoutId = setTimeout(() => {
      setToastList((prevList) => prevList.filter((toast) => toast.id !== id));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ToastContext.Provider value={{ toastList, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
