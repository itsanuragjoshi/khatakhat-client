import styles from "./error.module.css";

const errors = {
  404: {
    title: "404 Not Found",
    message: "The page you're looking for does not exist.",
  },
  403: {
    title: "403 Forbidden",
    message: "You don't have permission to access this resource.",
  },
  401: {
    title: "401 Unauthorized",
    message: "Access is denied due to invalid credentials.",
  },
};

const Error = ({ statusCode }) => {
  const error = errors[statusCode] || {
    title: "Unknown Error",
    message: "An unknown error occurred.",
  };

  return (
    <main>
      <div className={styles.errorContainer}>
        <h1>{error.title}</h1>
        <h2>{error.message}</h2>
      </div>
    </main>
  );
};

export default Error;
