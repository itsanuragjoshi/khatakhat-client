import styles from "./form.module.css";
import useFetchData from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonToolbar from "../button/ButtonToolbar";
import axios from "axios";
import useToastContext from "../../hooks/useToastContext";

const FormOrgProfileAddEdit = ({ data, formId, method, orgId }) => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const initialInputValues = {
    orgName: "",
    orgIndustry: "",
    orgBaseCurrency: "",
    orgGST: "No",
    orgGSTIN: "",
    orgCountry: "",
    orgAddress1: "",
    orgAddress2: "",
    orgCity: "",
    orgState: "",
    orgPincode: "",
  };

  const initialErrorValues = {
    orgName: "",
    orgIndustry: "",
    orgBaseCurrency: "",
    orgGST: "",
    orgGSTIN: "",
    orgCountry: "",
    orgAddress1: "",
    orgAddress2: "",
    orgCity: "",
    orgState: "",
    orgPincode: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);

  useEffect(() => {
    if (data) {
      setInput((prevInput) => ({
        ...prevInput,
        ...data,
        orgGST: data.orgGST || "No",
      }));
    }
  }, [data, formId]);

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;

    if (!input.orgName) {
      isValid = false;
      newErrors.orgName = "Organisation Name is required.";
    }
    if (!input.orgIndustry) {
      isValid = false;
      newErrors.orgIndustry = "Select your industry type from the list.";
    }
    if (!input.orgCountry) {
      isValid = false;
      newErrors.orgCountry = "Select a location from the list.";
    }
    if (!input.orgBaseCurrency) {
      isValid = false;
      newErrors.orgBaseCurrency = "Select a base currency.";
    }

    if (input.orgGST === "Yes") {
      if (!input.orgGSTIN) {
        isValid = false;
        newErrors.orgGSTIN = "GSTIN/UIN is required.";
      } else if (
        !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(
          input.orgGSTIN
        )
      ) {
        isValid = false;
        newErrors.orgGSTIN = "Invalid GSTIN format.";
      }
    }

    if (
      input.orgPincode &&
      !/^(?!.*[ -\s])([a-zA-Z0-9]+(?: [-\s]?[a-zA-Z0-9]+)*)(?!.*[ -\s])$/.test(
        input.orgPincode
      )
    ) {
      isValid = false;
      newErrors.orgPincode = "Invalid pincode / zip code / postal code format.";
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
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });
      try {
        let response;
        if (method === "POST") {
          response = await axios.post(
            `${import.meta.env.VITE_APP_API_URI}/org`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setInput(initialInputValues);
          setErrors(initialErrorValues);
          showToast(response?.data.success, "success");
          navigate("/dashboard", { replace: true });
        } else if (method === "PUT") {
          response = await axios.put(
            `${import.meta.env.VITE_APP_API_URI}/org/${orgId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          showToast(response?.data.success, "success");
          navigate(window.location.pathname);
        }
      } catch (error) {
        showToast(error.response?.data.error, "error");
      }
    } else {
      showToast(
        "Hold on! There are a few fields that need your attention.",
        "error"
      );
    }
  };

  const handleReset = () => {
    setInput(initialInputValues);
    setErrors(initialErrorValues);
  };

  const { data: countries } = useFetchData(
    `${import.meta.env.VITE_APP_API_URI}/countries`
  );
  const { data: industries } = useFetchData(
    `${import.meta.env.VITE_APP_API_URI}/industries`
  );
  const { data: currencies } = useFetchData(
    `${import.meta.env.VITE_APP_API_URI}/currencies`
  );

  const { data: states } = useFetchData(
    input.orgCountry
      ? `${import.meta.env.VITE_APP_API_URI}/states/${encodeURIComponent(
          input.orgCountry
        )}`
      : null
  );

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
            <label htmlFor="orgName" className={styles.required}>
              Organisation Name
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.orgName && styles.error
              }`}
              name="orgName"
              id="orgName"
              onChange={handleChange}
              value={input.orgName}
              required
            />
            {errors.orgName && (
              <span className={styles.error}>{errors.orgName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="orgIndustry" className={styles.required}>
              Industry
            </label>
            <select
              name="orgIndustry"
              id="orgIndustry"
              className={`${styles.formControl} ${
                errors.orgIndustry && styles.error
              }`}
              onChange={handleChange}
              value={input.orgIndustry}
              required
            >
              <option value="" disabled>
                Select Industry
              </option>
              {industries?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.orgIndustry && (
              <span className={styles.error}>{errors.orgIndustry}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="orgCountry" className={styles.required}>
              Location
            </label>
            <select
              name="orgCountry"
              id="orgCountry"
              className={`${styles.formControl} ${
                errors.orgName && styles.error
              }`}
              onChange={handleChange}
              value={input.orgCountry}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries?.map(({ countryCode, countryName }) => (
                <option key={countryCode} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
            {errors.orgCountry && (
              <span className={styles.error}>{errors.orgCountry}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="orgAddress1">Address</label>
            <div className={styles.formGroupBlock}>
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.orgAddress1 && styles.error
                }`}
                name="orgAddress1"
                id="orgAddress1"
                placeholder="Flat/Building Number"
                onChange={handleChange}
                value={input.orgAddress1}
              />
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.orgAddress2 && styles.error
                }`}
                name="orgAddress2"
                id="orgAddress2"
                placeholder="Area/Locality"
                onChange={handleChange}
                value={input.orgAddress2}
              />
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.orgCity && styles.error
                }`}
                name="orgCity"
                id="orgCity"
                maxLength={15}
                placeholder="City"
                onChange={handleChange}
                value={input.orgCity}
              />
              <select
                name="orgState"
                id="orgState"
                onChange={handleChange}
                value={input.orgState}
              >
                <option value="" disabled>
                  Select State
                </option>
                {states?.map(({ stateCode, stateName }) => (
                  <option key={stateCode} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.orgPincode && styles.error
                }`}
                name="orgPincode"
                id="orgPincode"
                placeholder="Pincode"
                onChange={handleChange}
                value={input.orgPincode}
              />
            </div>
            {errors.orgAddress1 && (
              <span className={styles.error}>{errors.orgAddress1}</span>
            )}
            {errors.orgAddress2 && (
              <span className={styles.error}>{errors.orgAddress2}</span>
            )}
            {errors.orgCity && (
              <span className={styles.error}>{errors.orgCity}</span>
            )}
            {errors.orgState && (
              <span className={styles.error}>{errors.orgState}</span>
            )}
            {errors.orgPincode && (
              <span className={styles.error}>{errors.orgPincode}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="orgGST" className={styles.required}>
              Is GST Registered?
            </label>
            <div className={styles.formGroupInline}>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="orgGST"
                  id="gstTreatmentYes"
                  value="Yes"
                  onChange={handleChange}
                  checked={input.orgGST === "Yes"}
                  required
                />
                <label htmlFor="gstTreatmentYes">Yes</label>
              </div>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="orgGST"
                  id="gstTreatmentNo"
                  value="No"
                  onChange={handleChange}
                  checked={input.orgGST === "No"}
                />
                <label htmlFor="gstTreatmentNo">No</label>
              </div>
            </div>
            {errors.orgGST && (
              <span className={styles.error}>{errors.orgGST}</span>
            )}
          </div>
          {/* Conditionally render GSTIN/UIN and Place of Supply inputs */}
          {input.orgGST === "Yes" && ( // Hide when 'No' is selected
            <>
              <div className={styles.formGroup}>
                <label htmlFor="orgGSTIN" className={styles.required}>
                  GSTIN / UIN
                </label>
                <input
                  type="text"
                  className={`${styles.formControl} ${
                    errors.orgGSTIN && styles.error
                  }`}
                  name="orgGSTIN"
                  id="orgGSTIN"
                  maxLength={15}
                  onChange={handleChange}
                  value={input.orgGSTIN}
                  required
                />
                {errors.orgGSTIN && (
                  <span className={styles.error}>{errors.orgGSTIN}</span>
                )}
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="orgBaseCurrency" className={styles.required}>
              Base Currency
            </label>
            <select
              name="orgBaseCurrency"
              id="orgBaseCurrency"
              className={`${styles.formControl} ${
                errors.orgName && styles.error
              }`}
              onChange={handleChange}
              value={input.orgBaseCurrency}
              required
            >
              <option value="" disabled>
                Select Currency
              </option>
              {currencies?.map(({ currencyCode, currencyName }) => (
                <option key={currencyCode} value={currencyName}>
                  {`${currencyCode} - ${currencyName}`}
                </option>
              ))}
            </select>
            {errors.orgBaseCurrency && (
              <span className={styles.error}>{errors.orgBaseCurrency}</span>
            )}
          </div>
        </fieldset>
      </form>

      {buttons && <ButtonToolbar props={buttons} />}
    </>
  );
};

export default FormOrgProfileAddEdit;
