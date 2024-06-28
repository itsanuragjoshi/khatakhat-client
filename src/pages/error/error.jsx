import styles from "./error.module.css";

const Error = () => {
  return (
    <main>
      <div className="container">
        <div className={styles.errorContainer}>
          <h2>404 Not Found: This page you're looking for does not exist</h2>
        </div>
      </div>
    </main>
  );
};

export default Error;
