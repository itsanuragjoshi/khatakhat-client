import { createContext, useState, useCallback } from "react";

// Create a context for managing toast notifications
const ToastContext = createContext(null);

// ToastProvider component to wrap application and provide toast functionality
export const ToastProvider = ({ children }) => {
  // State to manage current toast messages
  const [toastList, setToastList] = useState([]);

  // Function to show a toast message and automatically hide it after a timeout
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now(); // Unique ID for each toast message
    const newToast = { id, message, type };

    // Add new toast message to the state
    setToastList((prevList) => [...prevList, newToast]);

    // Set a timeout to remove the toast message after a specified duration
    const timeoutId = setTimeout(() => {
      setToastList((prevList) => prevList.filter((toast) => toast.id !== id));
    }, 3000); // Adjust timeout duration as needed

    // Return a function to clear the timeout if needed
    return () => clearTimeout(timeoutId);
  }, []);

  // Provide toast-related state and functions to context
  return (
    <ToastContext.Provider value={{ toastList, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Export ToastContext context
export default ToastContext;
