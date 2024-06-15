// import styles from './button.module.css';

const Button = (props) => {
    return (
        <button type={props.btnType} className={`btn ${props.btnClass}`}>{props.btnText}</button>

    );
};

export default Button;