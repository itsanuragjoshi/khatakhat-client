const Button = (props) => {
    return (
        <button type={props.btnType} className={`btn ${props.btnClass}`} onClick={props.btnClick}>{props.btnText}</button>

    );
};

export default Button;