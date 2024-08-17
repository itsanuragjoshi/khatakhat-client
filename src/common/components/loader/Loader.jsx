import styles from "./loader.module.css";

import Spinner from "../../../assets/spinner.svg?react";

const Loader = () => {
  return (
    <>
      <div className={styles.loader}>
        <Spinner />
      </div>
    </>
  );
};

export default Loader;
