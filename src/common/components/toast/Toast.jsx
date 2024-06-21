// Import dependencies
import styles from "./toast.module.css";
import SuccessIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import ErrorIcon from "@mui/icons-material/CancelOutlined";

// Define icons for different toast types
const icons = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

// Define Toast component to display toast messages
const Toast = ({ toastList }) => {
  // Render the toast messages
  return (
    <div className={styles.toastContainer}>
      {toastList.map((toast, index) => (
        <div
          key={index}
          className={`${styles.toast} ${styles.show} ${styles[toast.type]}`}
        >
          <span className={styles.icon}>{icons[toast.type]}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

// Export Toast component
export default Toast;
