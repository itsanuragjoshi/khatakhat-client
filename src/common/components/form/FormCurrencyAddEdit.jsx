import styles from "./form.module.css";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import ButtonToolbar from "../button/ButtonToolbar";

const FormCurrencyAddEdit = ({ initialInputValues, formId }) => {
  const initialErrorValues = {
    currencyCode: "",
    currencyName: "",
    currencySymbol: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;

    if (input.currencyCode === "") {
      isValid = false;
      newErrors.currencyCode = "Currency Code is required.";
    }

    if (!input.currencyName) {
      isValid = false;
      newErrors.currencyName = "Currency Name is required.";
    }

    if (!input.currencySymbol) {
      isValid = false;
      newErrors.currencySymbol = "Currency Symbol is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "currencyCode") {
      const selectedCurrency = currencies.find(
        (currency) => currency.currencyCode === value
      );
      if (selectedCurrency) {
        setInput((prevInput) => ({
          ...prevInput,
          currencyCode: selectedCurrency.currencyCode,
          currencyName: selectedCurrency.currencyName,
          currencySymbol: selectedCurrency.currencySymbol,
        }));
      }
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });
      setInput(initialInputValues);
      setErrors(initialErrorValues);
    } else {
      // console.log("Validation failed");
    }
  };

  const handleReset = () => {
    setInput(initialInputValues);
    setErrors(initialErrorValues);
  };

  const { data: currencies } = useFetchData("/currencies");

  const buttons = [
    {
      btnType: "submit",
      btnClass: "btnPrimary",
      btnText: "Save",
      btnClick: handleSubmit,
    },
    {
      btnType: "reset",
      btnClass: "btnSecondary",
      btnText: "Cancel",
      btnClick: handleReset,
    },
  ];

  return (
    <>
      <form id={formId} className={styles.form}>
        <fieldset className={styles.formFieldset}>
          <div className={styles.formGroup}>
            <label htmlFor="currencyCode" className={styles.required}>
              Currency Code
            </label>
            <select
              name="currencyCode"
              id="currencyCode"
              className={`${styles.formControl} ${
                errors.currencyCode && styles.error
              }`}
              onChange={handleChange}
              value={input.currencyCode}
              required
            >
              <option value="" disabled>
                Select
              </option>
              {currencies?.map(({ currencyCode, currencyName }) => (
                <option key={currencyCode} value={currencyCode}>
                  {`${currencyCode} - ${currencyName}`}
                </option>
              ))}
            </select>
            {errors.currencyCode && (
              <span className={styles.error}>{errors.currencyCode}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="currencyName" className={styles.required}>
              Currency Name
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.currencyName && styles.error
              }`}
              name="currencyName"
              id="currencyName"
              onChange={handleChange}
              value={input.currencyName}
              required
            />
            {errors.currencyName && (
              <span className={styles.error}>{errors.currencyName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="currencySymbol" className={styles.required}>
              Currency Symbol
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.currencySymbol && styles.error
              }`}
              name="currencySymbol"
              id="currencySymbol"
              onChange={handleChange}
              value={input.currencySymbol}
              required
            />
            {errors.currencySymbol && (
              <span className={styles.error}>{errors.currencySymbol}</span>
            )}
          </div>
        </fieldset>
        {buttons && <ButtonToolbar props={buttons} />}
      </form>
    </>
  );
};

export default FormCurrencyAddEdit;
