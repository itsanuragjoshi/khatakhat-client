import Button from "./Button";

const ButtonToolbar = ({ props }) => {
  return (
    <div className="btnToolbar">
      {props?.map((button, index) => (
        <Button key={index} props={button} />
      ))}
    </div>
  );
};

export default ButtonToolbar;
