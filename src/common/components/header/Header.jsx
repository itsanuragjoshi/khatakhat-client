import styles from "./header.module.css";
import ButtonToolbar from "../button/ButtonToolbar";

const Header = ({ title, buttons }) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      {buttons && <ButtonToolbar props={buttons} />}
    </div>
  );
};

export default Header;
