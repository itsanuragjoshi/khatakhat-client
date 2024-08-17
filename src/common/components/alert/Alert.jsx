import styles from "./alert.module.css";

import InfoIcon from "@mui/icons-material/InfoOutlined";

const InfoMessage = ({ type, message }) => {
  let icon;

  if (type === "info") {
    icon = <InfoIcon />;
  }

  return (
    <div className={styles.alert}>
      {icon}
      {message}
    </div>
  );
};

export default InfoMessage;
