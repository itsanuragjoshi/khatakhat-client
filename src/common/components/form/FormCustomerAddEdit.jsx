import styles from "./form.module.css";
import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import ButtonToolbar from "../button/ButtonToolbar";
import Button from "../button/Button";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import MobileIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CopyIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useToastContext from "../../hooks/useToastContext";
import useCustomers from "../../hooks/useCustomers";
import Loader from "../loader/Loader";

const FormCustomerAddEdit = ({ data, formId, method, customerId }) => {
  const { createCustomers, updateCustomers } = useCustomers();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastContext();

  const initialInputValues = {
    customerType: "Business",
    customerName: "",
    customerDisplayName: "",
    customerEmail: "",
    customerWorkPhone: "",
    customerMobile: "",
    customerCurrency: {
      currencyCode: "",
      currencyName: "",
      currencySymbol: "",
    },
    customerGST: "No",
    customerGSTIN: "",
    customerPlaceOfSupply: "",
    customerBillingCountry: "",
    customerBillingAddress1: "",
    customerBillingAddress2: "",
    customerBillingCity: "",
    customerBillingState: "",
    customerBillingPincode: "",
    customerShippingCountry: "",
    customerShippingAddress1: "",
    customerShippingAddress2: "",
    customerShippingCity: "",
    customerShippingState: "",
    customerShippingPincode: "",
  };

  const initialErrorValues = {
    customerType: "",
    customerName: "",
    customerDisplayName: "",
    customerEmail: "",
    customerWorkPhone: "",
    customerMobile: "",
    customerCurrency: "",
    customerGST: "",
    customerGSTIN: "",
    customerPlaceOfSupply: "",
    customerBillingCountry: "",
    customerBillingAddress1: "",
    customerBillingAddress2: "",
    customerBillingCity: "",
    customerBillingState: "",
    customerBillingPincode: "",
    customerShippingCountry: "",
    customerShippingAddress1: "",
    customerShippingAddress2: "",
    customerShippingCity: "",
    customerShippingState: "",
    customerShippingPincode: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const { data: countries } = useFetchData("/countries", {}, "authN");
  const { data: currencies } = useFetchData("/currencies", {}, "authN");

  const { data: billingStates } = useFetchData(
    input.customerBillingCountry
      ? `/states/${encodeURIComponent(input.customerBillingCountry)}`
      : null,
    {},
    "authN"
  );

  const { data: shippingStates } = useFetchData(
    input.customerShippingCountry
      ? `/states/${encodeURIComponent(input.customerShippingCountry)}`
      : null,
    {},
    "authN"
  );

  const { data: gstStates } = useFetchData("/gstCodes", {}, "authN");

  useEffect(() => {
    if (data) {
      setInput((prevInput) => ({
        ...prevInput,
        ...data,
        customerType: data.customerType || "Business",
        customerGST: data.customerGST || "No",
        customerCurrency: {
          currencyCode: data.customerCurrency?.currencyCode || "",
          currencyName: data.customerCurrency?.currencyName || "",
          currencySymbol: data.customerCurrency?.currencySymbol || "",
        },
      }));
    }
  }, [data, formId]);

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;

    if (!input.customerType) {
      isValid = false;
      newErrors.customerType = "Customer Type is required.";
    }

    if (!input.customerDisplayName) {
      isValid = false;
      newErrors.customerDisplayName = "Customer Display Name is required.";
    }

    if (
      input.customerEmail &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.customerEmail)
    ) {
      isValid = false;
      newErrors.customerEmail = "Invalid email format.";
    }

    if (
      input.customerWorkPhone &&
      !/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/.test(
        input.customerWorkPhone
      )
    ) {
      isValid = false;
      newErrors.customerWorkPhone =
        "Invalid phone number format. Please enter + CountryCode NationalNumber.";
    }

    if (
      input.customerMobile &&
      !/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/.test(
        input.customerMobile
      )
    ) {
      isValid = false;
      newErrors.customerMobile =
        "Invalid mobile number format. Please enter + CountryCode NationalNumber.";
    }

    if (input.customerGST === "Yes") {
      if (!input.customerGSTIN) {
        isValid = false;
        newErrors.customerGSTIN = "GSTIN/UIN is required.";
      } else if (
        !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(
          input.customerGSTIN
        )
      ) {
        isValid = false;
        newErrors.customerGSTIN = "Invalid GSTIN format.";
      }

      if (!input.customerPlaceOfSupply) {
        isValid = false;
        newErrors.customerPlaceOfSupply = "Place of Supply is required.";
      }
    }

    if (
      input.customerBillingPincode &&
      !/^(?!.*[ -\s])([a-zA-Z0-9]+(?: [-\s]?[a-zA-Z0-9]+)*)(?!.*[ -\s])$/.test(
        input.customerBillingPincode
      )
    ) {
      isValid = false;
      newErrors.customerBillingPincode =
        "Invalid pincode / zip code / postal code format.";
    }

    if (
      input.customerShippingPincode &&
      !/^(?!.*[ -\s])([a-zA-Z0-9]+(?: [-\s]?[a-zA-Z0-9]+)*)(?!.*[ -\s])$/.test(
        input.customerShippingPincode
      )
    ) {
      isValid = false;
      newErrors.customerShippingPincode =
        "Invalid pincode / zip code / postal code format.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    if (name === "customerCurrency") {
      const selectedCurrency = currencies?.find(
        (currency) => currency.currencyCode === value
      );
      setInput((prevInput) => ({
        ...prevInput,
        customerCurrency: {
          currencyCode: selectedCurrency?.currencyCode,
          currencyName: selectedCurrency?.currencyName,
          currencySymbol: selectedCurrency?.currencySymbol,
        },
      }));
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: finalValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (key === "customerCurrency") {
          formData.append(
            "customerCurrency",
            JSON.stringify({
              currencyCode: input.customerCurrency.currencyCode,
              currencyName: input.customerCurrency.currencyName,
              currencySymbol: input.customerCurrency.currencySymbol,
            })
          );
        } else {
          formData.append(key, value);
        }
      });

      setIsLoading(true);
      if (method === "POST") {
        await createCustomers(
          formData,
          setInput,
          setErrors,
          initialInputValues,
          initialErrorValues
        );
        setIsLoading(false);
      } else if (method === "PUT") {
        await updateCustomers(
          customerId,
          formData,
          setErrors,
          initialErrorValues
        );
        setIsLoading(false);
      }
    } else {
      showToast("Validation failed: Invalid or missing data");
    }
  };

  const handleReset = () => {
    setInput(initialInputValues);
    setErrors(initialErrorValues);
  };

  const copyBillingToShipping = () => {
    setInput((prevInput) => ({
      ...prevInput,
      customerShippingCountry: prevInput.customerBillingCountry,
      customerShippingAddress1: prevInput.customerBillingAddress1,
      customerShippingAddress2: prevInput.customerBillingAddress2,
      customerShippingCity: prevInput.customerBillingCity,
      customerShippingState: prevInput.customerBillingState,
      customerShippingPincode: prevInput.customerBillingPincode,
    }));
  };

  const buttons = [
    {
      btnIcon: isLoading ? <Loader /> : null,
      btnType: "submit",
      btnClass: "btnPrimary",
      btnText: isLoading ? null : "Save",
      btnClick: handleSubmit,
      btnDisabled: isLoading,
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
          <div>
            <legend>Basic Information</legend>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerType" className={styles.required}>
              Customer Type
            </label>
            <div className={styles.formGroupInline}>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="customerType"
                  id="customerTypeBusiness"
                  value="Business"
                  onChange={handleChange}
                  checked={input.customerType === "Business"}
                  required
                />
                <label htmlFor="customerTypeBusiness">Business</label>
              </div>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="customerType"
                  id="customerTypeIndividual"
                  value="Individual"
                  onChange={handleChange}
                  checked={input.customerType === "Individual"}
                />
                <label htmlFor="customerTypeIndividual">Individual</label>
              </div>
            </div>
            {errors.customerType && (
              <span className={styles.error}>{errors.customerType}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerName && styles.error
              }`}
              name="customerName"
              id="customerName"
              onChange={handleChange}
              value={input.customerName}
            />
            {errors.customerName && (
              <span className={styles.error}>{errors.customerName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerDisplayName" className={styles.required}>
              Customer Display Name
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerDisplayName && styles.error
              }`}
              name="customerDisplayName"
              id="customerDisplayName"
              onChange={handleChange}
              value={input.customerDisplayName}
              required
            />
            {errors.customerDisplayName && (
              <span className={styles.error}>{errors.customerDisplayName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerEmail">Customer Email</label>
            <div className={styles.formInputGroup}>
              <span data-align="left">
                <EmailIcon />
              </span>
              <input
                type="email"
                name="customerEmail"
                id="customerEmail"
                className={`${styles.formControl} ${
                  errors.customerEmail && styles.error
                }`}
                placeholder="Email Address"
                onChange={handleChange}
                value={input.customerEmail}
              />
            </div>
            {errors.customerEmail && (
              <span className={styles.error}>{errors.customerEmail}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Customer Phone</label>
            <div className={styles.formGroupInline}>
              <div className={styles.formInputGroup}>
                <span data-align="left">
                  <PhoneIcon />
                </span>
                <input
                  type="tel"
                  name="customerWorkPhone"
                  id="customerWorkPhone"
                  className={`${styles.formControl} ${
                    errors.customerWorkPhone && styles.error
                  }`}
                  placeholder="Work Phone"
                  onChange={handleChange}
                  value={input.customerWorkPhone}
                />
              </div>
              <div className={styles.formInputGroup}>
                <span data-align="left">
                  <MobileIcon />
                </span>
                <input
                  type="tel"
                  name="customerMobile"
                  id="customerMobile"
                  className={`${styles.formControl} ${
                    errors.customerMobile && styles.error
                  }`}
                  placeholder="Mobile"
                  onChange={handleChange}
                  value={input.customerMobile}
                />
              </div>
            </div>
            {errors.customerWorkPhone && (
              <span className={styles.error}>{errors.customerWorkPhone}</span>
            )}
            {errors.customerMobile && (
              <span className={styles.error}>{errors.customerMobile}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerCurrency" className={styles.required}>
              Currency
            </label>
            <select
              name="customerCurrency"
              id="customerCurrency"
              className={`${styles.formControl} ${
                errors.customerCurrency && styles.error
              }`}
              onChange={handleChange}
              value={input.customerCurrency.currencyCode}
              required
            >
              <option value="" disabled>
                Select Currency
              </option>
              {currencies?.map(({ currencyCode, currencyName }) => (
                <option key={currencyCode} value={currencyCode}>
                  {`${currencyCode} - ${currencyName}`}
                </option>
              ))}
            </select>
            {errors.customerCurrency && (
              <span className={styles.error}>{errors.customerCurrency}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerGST" className={styles.required}>
              Is GST Registered?
            </label>
            <div className={styles.formGroupInline}>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="customerGST"
                  id="gstTreatmentYes"
                  value="Yes"
                  onChange={handleChange}
                  checked={input.customerGST === "Yes"}
                  required
                />
                <label htmlFor="gstTreatmentYes">Yes</label>
              </div>
              <div className={styles.formCheck}>
                <input
                  type="radio"
                  name="customerGST"
                  id="gstTreatmentNo"
                  value="No"
                  onChange={handleChange}
                  checked={input.customerGST === "No"}
                />
                <label htmlFor="gstTreatmentNo">No</label>
              </div>
            </div>
            {errors.customerGST && (
              <span className={styles.error}>{errors.customerGST}</span>
            )}
          </div>
          {/* Conditionally render GSTIN/UIN and Place of Supply inputs */}
          {input.customerGST === "Yes" && ( // Hide when 'No' is selected
            <>
              <div className={styles.formGroup}>
                <label htmlFor="customerGSTIN" className={styles.required}>
                  GSTIN / UIN
                </label>
                <input
                  type="text"
                  className={`${styles.formControl} ${
                    errors.customerGSTIN && styles.error
                  }`}
                  name="customerGSTIN"
                  id="customerGSTIN"
                  maxLength={15}
                  onChange={handleChange}
                  value={input.customerGSTIN}
                  required
                />
                {errors.customerGSTIN && (
                  <span className={styles.error}>{errors.customerGSTIN}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label
                  htmlFor="customerPlaceOfSupply"
                  className={styles.required}
                >
                  Place of Supply
                </label>
                <select
                  name="customerPlaceOfSupply"
                  id="customerPlaceOfSupply"
                  onChange={handleChange}
                  value={input.customerPlaceOfSupply}
                  required
                >
                  <option value="" disabled>
                    Select Place of Supply
                  </option>
                  {gstStates?.map(({ stateName, stateCode, gstCode }) => (
                    <option key={gstCode} value={stateName}>
                      {`[${stateCode}] - ${stateName}`}
                    </option>
                  ))}
                </select>
                {errors.customerPlaceOfSupply && (
                  <span className={styles.error}>
                    {errors.customerPlaceOfSupply}
                  </span>
                )}
              </div>
            </>
          )}
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <div>
            <legend>Billing Address</legend>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="customerBillingCountry">Country</label>
            <select
              name="customerBillingCountry"
              id="customerBillingCountry"
              onChange={handleChange}
              value={input.customerBillingCountry}
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
            {errors.customerBillingCountry && (
              <span className={styles.error}>
                {errors.customerBillingCountry}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerBillingAddress1">Address</label>
            <div className={styles.formGroupBlock}>
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.customerBillingAddress1 && styles.error
                }`}
                name="customerBillingAddress1"
                id="customerBillingAddress1"
                placeholder="Flat/Building Number"
                onChange={handleChange}
                value={input.customerBillingAddress1}
              />
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.customerBillingAddress2 && styles.error
                }`}
                name="customerBillingAddress2"
                id="customerBillingAddress2"
                placeholder="Area/Locality"
                onChange={handleChange}
                value={input.customerBillingAddress2}
              />
            </div>
            {errors.customerBillingAddress1 && (
              <span className={styles.error}>
                {errors.customerBillingAddress1}
              </span>
            )}
            {errors.customerBillingAddress2 && (
              <span className={styles.error}>
                {errors.customerBillingAddress2}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerBillingCity">City</label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerBillingCity && styles.error
              }`}
              name="customerBillingCity"
              id="customerBillingCity"
              maxLength={15}
              onChange={handleChange}
              value={input.customerBillingCity}
            />
            {errors.customerBillingCity && (
              <span className={styles.error}>{errors.customerBillingCity}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerBillingState">State</label>
            <select
              name="customerBillingState"
              id="customerBillingState"
              onChange={handleChange}
              value={input.customerBillingState}
            >
              <option value="" disabled>
                Select State
              </option>
              {billingStates?.map(({ stateCode, stateName }) => (
                <option key={stateCode} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {errors.customerBillingState && (
              <span className={styles.error}>
                {errors.customerBillingState}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerBillingPincode">Pincode</label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerBillingPincode && styles.error
              }`}
              name="customerBillingPincode"
              id="customerBillingPincode"
              onChange={handleChange}
              value={input.customerBillingPincode}
            />
            {errors.customerBillingPincode && (
              <span className={styles.error}>
                {errors.customerBillingPincode}
              </span>
            )}
          </div>
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <div>
            <legend>
              <span>Shipping Address</span>
              <span>
                <Button
                  props={{
                    btnType: "button",
                    btnClass: "btnLink",
                    btnIcon: <CopyIcon />,
                    btnText: "Copy Billing Address",
                    btnClick: (e) => {
                      e.preventDefault();
                      copyBillingToShipping();
                    },
                  }}
                />
              </span>
            </legend>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="customerShippingCountry">Country</label>
            <select
              name="customerShippingCountry"
              id="customerShippingCountry"
              onChange={handleChange}
              value={input.customerShippingCountry}
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
            {errors.customerShippingCountry && (
              <span className={styles.error}>
                {errors.customerShippingCountry}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerShippingAddress1">Address</label>
            <div className={styles.formGroupBlock}>
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.customerShippingAddress1 && styles.error
                }`}
                name="customerShippingAddress1"
                id="customerShippingAddress1"
                placeholder="Flat/Building Number"
                onChange={handleChange}
                value={input.customerShippingAddress1}
              />
              <input
                type="text"
                className={`${styles.formControl} ${
                  errors.customerShippingAddress2 && styles.error
                }`}
                name="customerShippingAddress2"
                id="customerShippingAddress2"
                placeholder="Area/Locality"
                onChange={handleChange}
                value={input.customerShippingAddress2}
              />
            </div>
            {errors.customerShippingAddress1 && (
              <span className={styles.error}>
                {errors.customerShippingAddress1}
              </span>
            )}
            {errors.customerShippingAddress2 && (
              <span className={styles.error}>
                {errors.customerShippingAddress2}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerShippingCity">City</label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerShippingCity && styles.error
              }`}
              name="customerShippingCity"
              id="customerShippingCity"
              maxLength={15}
              onChange={handleChange}
              value={input.customerShippingCity}
            />
            {errors.customerShippingCity && (
              <span className={styles.error}>
                {errors.customerShippingCity}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerShippingState">State</label>
            <select
              name="customerShippingState"
              id="customerShippingState"
              onChange={handleChange}
              value={input.customerShippingState}
            >
              <option value="" disabled>
                Select State
              </option>
              {shippingStates?.map(({ stateCode, stateName }) => (
                <option key={stateCode} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {errors.customerShippingState && (
              <span className={styles.error}>
                {errors.customerShippingState}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerShippingPincode">Pincode</label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.customerShippingPincode && styles.error
              }`}
              name="customerShippingPincode"
              id="customerShippingPincode"
              onChange={handleChange}
              value={input.customerShippingPincode}
            />
            {errors.customerShippingPincode && (
              <span className={styles.error}>
                {errors.customerShippingPincode}
              </span>
            )}
          </div>
        </fieldset>
        {buttons && <ButtonToolbar props={buttons} />}
      </form>
    </>
  );
};

export default FormCustomerAddEdit;
