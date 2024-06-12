import styles from "./footer.module.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <pre>
        <span>KhataKhat © {currentYear}, </span>
        <span>Developed with ❤️ by </span>
        <a
          href="https://github.com/itsanuragjoshi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anurag Joshi
        </a>
      </pre>
    </footer>
  );
};

export default Footer
