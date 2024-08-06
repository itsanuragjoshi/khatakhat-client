import styles from "./form.module.css";
import { useEffect, useState } from "react";
import ButtonToolbar from "../button/ButtonToolbar";
import validator from "validator";
import VisibilityOnIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import Loader from "../loader/Loader";
import generatePassword from "../../../utils/generatePassword";
import useFetchData from "../../hooks/useFetchData";
import useUsers from "../../hooks/useUsers";
import { useSelector } from "react-redux";

const FormUserAddEdit = ({ data, formId, method, userRoleId }) => {
  const { createUsers, updateUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = method === "PUT";

  const initialInputValues = {
    roleName: "Staff",
    userEmail: "",
    userPassword: "",
    userName: "",
  };

  const initialErrorValues = {
    roleName: "",
    userEmail: "",
    userPassword: "",
    userName: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data) {
      setInput((prevInput) => ({
        ...prevInput,
        ...data,
      }));
    }
  }, [data, formId]);

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;
    if (!input.roleName) {
      isValid = false;
      newErrors.roleName = "Select a role from the list.";
    }
    if (!input.userEmail) {
      isValid = false;
      newErrors.userEmail =
        "Oops! Looks like you forgot something. The email field is required.";
    } else if (!validator.isEmail(input.userEmail)) {
      isValid = false;
      newErrors.userEmail =
        "Oh no! This doesn't look like a valid email address. Please double-check.";
    }

    if (!input.userPassword && !isEditMode) {
      isValid = false;
      newErrors.userPassword =
        "Oops! Looks like you forgot something. The password field is required.";
    } else if (!validator.isStrongPassword(input.userPassword) && !isEditMode) {
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
      const formData = new FormData();
      // Conditionally append data based on mode
      formData.append("roleName", input.roleName);
      formData.append("userEmail", input.userEmail);
      formData.append("userName", input.userName);

      if (!isEditMode) {
        formData.append("userPassword", input.userPassword);
      }

      setIsLoading(true);
      if (method === "POST") {
        await createUsers(
          formData,
          setInput,
          setErrors,
          initialInputValues,
          initialErrorValues
        );
      } else if (method === "PUT") {
        await updateUsers(userRoleId, formData, setErrors, initialErrorValues);
      }
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setInput((prevInput) => ({ ...prevInput, userPassword: password }));
  };

  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: roles } = useFetchData("/roles", { orgId }, "authZ");

  const buttons = [
    {
      btnIcon: isLoading ? <Loader /> : null,
      btnType: "submit",
      btnClass: "btnPrimary",
      btnText: isLoading ? null : isEditMode ? "Save Changes" : "Add User",
      btnClick: handleSubmit,
      btnDisabled: isLoading,
    },
  ];

  return (
    <>
      <form id={formId} className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.formFieldset}>
          <div className={styles.formGroupBlock}>
            <label htmlFor="roleName" className={styles.required}>
              Role
            </label>
            <select
              name="roleName"
              id="roleName"
              className={`${styles.formControl} ${
                errors.roleName && styles.error
              }`}
              onChange={handleChange}
              value={input.roleName}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles?.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.roleName && (
              <span className={styles.error}>{errors.roleName}</span>
            )}
          </div>

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
              disabled={isEditMode}
              required
            />
            {errors.userEmail && (
              <span className={styles.error}>{errors.userEmail}</span>
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
              disabled={isEditMode}
              required
            />
            {errors.userName && (
              <span className={styles.error}>{errors.userName}</span>
            )}
          </div>

          {!isEditMode && (
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
              <button
                type="button"
                onClick={handleGeneratePassword}
                className={`btnLink ${styles.alignSelfEnd}`}
              >
                Generate Password
              </button>
              {errors.userPassword && (
                <span className={styles.error}>{errors.userPassword}</span>
              )}
            </div>
          )}
        </fieldset>
        {buttons && <ButtonToolbar props={buttons} />}
      </form>
    </>
  );
};

export default FormUserAddEdit;
