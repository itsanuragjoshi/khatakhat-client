import styles from "./form.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonToolbar from "../button/ButtonToolbar";
import axios from "axios";
import validator from "validator";
import useToastContext from "../../hooks/useToastContext";
import VisibilityOnIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import Loader from "../loader/Loader";

const FormUserSignin = ({ formId }) => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

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
      newErrors.userPassword =
        "Oops! It seems your email and password are in a disagreement. Give it another shot!";
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
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URI}/auth/signin`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // setInput(initialInputValues);
        setErrors(initialErrorValues);
        showToast(response?.data.success, "success");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        if (error.response?.data?.errors) {
          const backendErrors = error.response.data.errors.reduce(
            (acc, err) => {
              acc[err.field] = err.error;
              return acc;
            },
            {}
          );
          setErrors(backendErrors);
        } else {
          showToast(
            error.response?.data.error || "Something went wrong",
            "error"
          );
        }
      } finally {
        setLoading(false);
      }
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
      btnText: loading ? null : "Sign In",
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
        </fieldset>
      </form>

      {buttons && <ButtonToolbar props={buttons} />}

      <div className={styles.signinLink}>
        <p>Don&apos;t have a Khatakhat Account?</p>
        <Link to="/signup" className="btnLink">Sign Up</Link>
      </div>
    </>
  );
};

export default FormUserSignin;