// CUSTOM HOOK FOR ACCESSING TOAST CONTEXT

// Import dependencies
import { useContext } from "react";

// Import context
import ToastContext from "../context/ToastContext.jsx";

// Define useToastContext custom hook
const useToastContext = () => {
  // Retrieve toast context using useContext hook
  const context = useContext(ToastContext);

  // Throw an error if context is not available
  if (!context) {
    throw Error("useToastContext must be used inside a ToastContextProvider");
  }

  // Return toast context
  return context;
};

// Export useToastContext custom hook
export default useToastContext;
