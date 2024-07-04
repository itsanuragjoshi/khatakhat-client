import styles from "./form.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonToolbar from "../button/ButtonToolbar";
import validator from "validator";
import useToastContext from "../../hooks/useToastContext";
import VisibilityOnIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import Loader from "../../components/loader/Loader";
import useAuth from "../../hooks/useAuth";

const FormUserSignup = ({ formId }) => {
  const { showToast } = useToastContext();
  const { signup } = useAuth();

  const initialInputValues = {
    userEmail: "",
    userPassword: "",
    userName: "",
  };

  const initialErrorValues = {
    userEmail: "",
    userPassword: "",
    userName: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;

    if (!input.userEmail) {
      isValid = false;
      newErrors.userEmail =
        "Oops! Looks like you forgot something. The email field is required.";
    } else if (!validator.isEmail(input.userEmail)) {
      isValid = false;
      newErrors.userEmail =
        "Oh no! This doesn't look like a valid email address. Please double-check.";
    }

    if (!input.userPassword) {
      isValid = false;
      newErrors.userPassword =
        "Oops! Looks like you forgot something. The password field is required.";
    } else if (!validator.isStrongPassword(input.userPassword)) {
      isValid = false;
      newErrors.userPassword = `Uh-oh! Your password needs to be stronger. It must be at least 8 characters long and include at least 1 lowercase letter (a-z), 1 uppercase letter (A-Z), 1 digit (0-9), and 1 special character (!, %, @, #).`;
    }

    if (!input.userName) {
      isValid = false;
      newErrors.userName =
        "Oops! Looks like you forgot something. The name field is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    setInput((prevInput) => ({ ...prevInput, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      await signup(
        input,
        setInput,
        setErrors,
        initialInputValues,
        initialErrorValues
      );
      setLoading(false);
    }
  };

  const handleToggleVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const buttons = [
    {
      btnIcon: loading ? <Loader /> : null,
      btnType: "submit",
      btnClass: "btnPrimary",
      btnText: loading ? null : "Sign Up",
      btnClick: handleSubmit,
      btnDisabled: loading,
    },
  ];

  return (
    <>
      <form id={formId} className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.formFieldset}>
          <div className={styles.formGroupBlock}>
            <label htmlFor="userEmail" className={styles.required}>
              Email
            </label>
            <input
              type="email"
              className={`${styles.formControl} ${
                errors.userEmail && styles.error
              }`}
              name="userEmail"
              id="userEmail"
              onChange={handleChange}
              value={input.userEmail}
              required
            />
            {errors.userEmail && (
              <span className={styles.error}>{errors.userEmail}</span>
            )}
          </div>

          <div className={styles.formGroupBlock}>
            <label htmlFor="userPassword" className={styles.required}>
              Password
            </label>
            <div className={styles.formInputGroup}>
              <span
                data-align="right"
                className={styles.visibilityToggle}
                onClick={handleToggleVisibility}
              >
                {showPassword ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`${styles.formControl} ${
                  errors.userPassword && styles.error
                }`}
                name="userPassword"
                id="userPassword"
                onChange={handleChange}
                value={input.userPassword}
                required
              />
            </div>
            {errors.userPassword && (
              <span className={styles.error}>{errors.userPassword}</span>
            )}
          </div>

          <div className={styles.formGroupBlock}>
            <label htmlFor="userName" className={styles.required}>
              Name
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.userName && styles.error
              }`}
              name="userName"
              id="userName"
              onChange={handleChange}
              value={input.userName}
              required
            />
            {errors.userName && (
              <span className={styles.error}>{errors.userName}</span>
            )}
          </div>
        </fieldset>
      </form>

      {buttons && <ButtonToolbar props={buttons} />}

      <div className={styles.signinLink}>
        <p>Have a Khatakhat Account?</p>
        <Link to="/signin" className="btnLink">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default FormUserSignup;
