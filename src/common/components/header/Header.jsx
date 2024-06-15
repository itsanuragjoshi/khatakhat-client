import styles from './header.module.css';

const Header = (props) => {
    return (
        <div className={styles.header}>
            <h1 className="title">{props.title}</h1>
            <div className="actions">
            </div>
        </div>
    );
};

export default Header;