import styles from "./modal.module.css";

const Modal = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBackdrop}></div>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
