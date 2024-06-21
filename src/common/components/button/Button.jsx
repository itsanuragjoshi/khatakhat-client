const Button = ({ props }) => {
  return (
    <button
      type={props.btnType}
      className={`btn ${props.btnClass}`}
      onClick={props.btnClick}
      aria-label={props.btnText}
      title={props.btnText}
    >
      {props.btnIcon}
      {props.btnText}
    </button>
  );
};

export default Button;
