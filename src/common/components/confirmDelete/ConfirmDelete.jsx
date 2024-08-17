import Modal from "../modal/Modal";
import styles from "./confirmDelete.module.css";
import ButtonToolbar from "../button/ButtonToolbar";
import WarningIcon from "@mui/icons-material/WarningOutlined";

const ConfirmDelete = ({ message, onDelete, onCancel }) => {
  const buttons = [
    {
      btnType: "submit",
      btnClass: "btnPrimary",
      btnText: "Delete",
      btnClick: onDelete,
    },
    {
      btnType: "reset",
      btnClass: "btnSecondary",
      btnText: "Cancel",
      btnClick: onCancel,
    },
  ];

  return (
    <Modal onClose={onCancel}>
      <div className={styles.confirmDelete}>
        <div className={styles.message}>
          <span className={styles.icon}><WarningIcon /></span>
          <span>{message}</span>
        </div>
        {buttons && <ButtonToolbar props={buttons} />}
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
