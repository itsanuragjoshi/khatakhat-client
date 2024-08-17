import styles from "./form.module.css";
import invoiceStyles from "./formInvoice.module.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useToastContext from "../../hooks/useToastContext";
import useFetchData from "../../hooks/useFetchData";
import useInvoice from "../../hooks/useInvoice";

import ButtonToolbar from "../button/ButtonToolbar";
import Loader from "../loader/Loader";
import TableInvoice from "../table/TableInvoice";

import { getCurrentDate } from "../../../utils/dateUtils";

const FormInvoice = ({ data, formId, method, invoiceId }) => {
  const navigate = useNavigate();
  const { createInvoice, updateInvoice } = useInvoice();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastContext();

  const invoiceItemsDefault = {
    item: "",
    hsnSac: "",
    quantity: "1.00",
    rate: "0.00",
    discount: "0.00",
    discountType: "percentage",
    tax: "0.00",
    amount: "0.00",
  };

  const initialInputValues = {
    customerId: "",
    invoiceNumber: "",
    invoiceDate: getCurrentDate(),
    invoiceDueDate: getCurrentDate(),
    invoiceItems: [invoiceItemsDefault],
    invoiceSubTotal: "0.00",
    invoiceRoundOff: "0.00",
    invoiceTotalAmount: "0.00",
    customerNotes: "",
  };

  const initialErrorValues = {
    customerId: "",
    invoiceNumber: "",
  };

  const [input, setInput] = useState(initialInputValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const { data: customersByOrg } = useFetchData(
    "/customers/byOrg",
    { orgId },
    "authZ"
  );

  const { data: customerData } = useFetchData(
    selectedCustomerId ? `/customers/${selectedCustomerId}` : null,
    { orgId },
    "authZ"
  );

  useEffect(() => {
    if (data) {
      setInput((prevInput) => ({
        ...prevInput,
        ...data,
        invoiceItems: data.invoiceItems || [invoiceItemsDefault],
      }));
      setSelectedCustomerId(data.customerId || "");
    }
  }, [data, formId]);

  const handleItemChange = (index, field, value) => {
    const newInvoiceItems = [...input.invoiceItems];
    newInvoiceItems[index][field] = value;
    setInput((prevInput) => ({ ...prevInput, invoiceItems: newInvoiceItems }));
  };

  const addNewItemRow = () => {
    setInput((prevInput) => ({
      ...prevInput,
      invoiceItems: [...prevInput.invoiceItems, invoiceItemsDefault],
    }));
  };

  const deleteItemRow = (index) => {
    setInput((prevInput) => ({
      ...prevInput,
      invoiceItems: prevInput.invoiceItems.filter((_, i) => i !== index),
    }));
  };

  const handleValidation = () => {
    const newErrors = { ...initialErrorValues };
    let isValid = true;

    if (!input.customerId) {
      isValid = false;
      newErrors.customerId = "Customer selection is required.";
    }

    if (!input.invoiceNumber) {
      isValid = false;
      newErrors.invoiceNumber = "Invoice Number is required.";
    }

    if (!input.invoiceDate) {
      isValid = false;
      newErrors.invoiceDate = "Invoice Date is required.";
    } else if (isNaN(new Date(input.invoiceDate).getTime())) {
      isValid = false;
      newErrors.invoiceDate = "Invalid Invoice Date.";
    }

    if (!input.invoiceDueDate) {
      isValid = false;
      newErrors.invoiceDueDate = "Due Date is required.";
    } else if (isNaN(new Date(input.invoiceDueDate).getTime())) {
      isValid = false;
      newErrors.invoiceDueDate = "Invalid Due Date.";
    }

    input.invoiceItems.forEach((item, index) => {
      if (!item.item) {
        isValid = false;
        if (!newErrors.invoiceItems) {
          newErrors.invoiceItems = [];
        }
        newErrors.invoiceItems[index] = "Item is required.";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    setInput((prevInput) => ({ ...prevInput, [name]: finalValue }));

    if (name === "customerId") {
      setInput((prevInput) => ({ ...prevInput, customerId: value }));
      setSelectedCustomerId(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("orgId", orgId);
      Object.entries(input).forEach(([key, value]) => {
        if (key === "invoiceItems") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      setIsLoading(true);
      if (method === "POST") {
        await createInvoice(
          formData,
          setInput,
          setErrors,
          initialInputValues,
          initialErrorValues
        );
        setIsLoading(false);
        navigate("/invoices", { replace: true });
      } else if (method === "PUT") {
        await updateInvoice(invoiceId, formData, setErrors, initialErrorValues);
        setIsLoading(false);
        navigate("/invoices", { replace: true });
      }
    } else {
      showToast("Validation failed: Invalid or missing data");
    }
  };

  const handleReset = () => {
    setInput(initialInputValues);
    setErrors(initialErrorValues);
    navigate(-1);
  };

  useEffect(() => {
    const calculateTotals = () => {
      let sum = 0;

      input.invoiceItems.forEach((item) => {
        sum += parseFloat(item.amount) || 0;
      });

      const roundedSum = Math.round(sum);
      const roundOffValue = (roundedSum - sum).toFixed(2);

      setInput((prevInput) => ({
        ...prevInput,
        invoiceSubTotal: sum.toFixed(2),
        invoiceRoundOff: roundOffValue,
        invoiceTotalAmount: roundedSum.toFixed(2),
      }));
    };

    calculateTotals();
  }, [input.invoiceItems]);

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
            <legend>Customer Information</legend>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="customerId" className={styles.required}>
              Customer Name
            </label>
            <select
              name="customerId"
              id="customerId"
              className={`${styles.formControl} ${
                errors.customerId && styles.error
              }`}
              onChange={handleChange}
              value={input.customerId}
              required
            >
              <option value="" disabled>
                Select a Customer
              </option>
              {customersByOrg?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.customerName}
                </option>
              ))}
            </select>
            {errors.customerId && (
              <span className={styles.error}>{errors.customerId}</span>
            )}
          </div>
          {customerData?.customerName && (
            <div className={invoiceStyles.customerInfo}>
              <>
                <div className={invoiceStyles.column}>
                  <h4>Billing Address</h4>
                  {customerData?.customerBillingAddress1 && (
                    <div>{customerData?.customerBillingAddress1}</div>
                  )}
                  {customerData?.customerBillingAddress2 && (
                    <div>{customerData?.customerBillingAddress2}</div>
                  )}
                  {customerData?.customerBillingCity && (
                    <div>{customerData?.customerBillingCity}</div>
                  )}
                  {(customerData?.customerBillingState ||
                    customerData?.customerBillingPincode) && (
                    <div>
                      {customerData?.customerBillingState}{" "}
                      {customerData?.customerBillingPincode}
                    </div>
                  )}
                  {customerData?.customerBillingCountry && (
                    <div>{customerData?.customerBillingCountry}</div>
                  )}
                </div>
                <div className={invoiceStyles.column}>
                  <h4>Shipping Address</h4>
                  {customerData?.customerShippingAddress1 && (
                    <div>{customerData?.customerShippingAddress1}</div>
                  )}
                  {customerData?.customerShippingAddress2 && (
                    <div>{customerData?.customerShippingAddress2}</div>
                  )}
                  {customerData?.customerShippingCity && (
                    <div>{customerData?.customerShippingCity}</div>
                  )}
                  {(customerData?.customerShippingState ||
                    customerData?.customerShippingPincode) && (
                    <div>
                      {customerData?.customerShippingState}{" "}
                      {customerData?.customerShippingPincode}
                    </div>
                  )}
                  {customerData?.customerShippingCountry && (
                    <div>{customerData?.customerShippingCountry}</div>
                  )}
                </div>
                <div className={invoiceStyles.column}>
                  <h4>Other Information</h4>
                  {customerData?.customerCurrency && (
                    <div>
                      Currency: {customerData?.customerCurrency?.currencyName}
                    </div>
                  )}
                  {customerData?.customerGST === "Yes" && (
                    <>
                      <div>GSTIN / UIN: {customerData?.customerGSTIN}</div>
                      <div>
                        Place of Supply: {customerData?.customerPlaceOfSupply}
                      </div>
                    </>
                  )}
                </div>
              </>
            </div>
          )}
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <div>
            <legend>Invoice Details</legend>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="invoiceNumber" className={styles.required}>
              Invoice Number
            </label>
            <input
              type="text"
              className={`${styles.formControl} ${
                errors.invoiceNumber && styles.error
              }`}
              name="invoiceNumber"
              id="invoiceNumber"
              onChange={handleChange}
              value={input.invoiceNumber}
              required
            />
            {errors.invoiceNumber && (
              <span className={styles.error}>{errors.invoiceNumber}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="invoiceDate" className={styles.required}>
              Invoice Date
            </label>
            <input
              type="date"
              className={`${styles.formControl} ${
                errors.invoiceDate && styles.error
              }`}
              name="invoiceDate"
              id="invoiceDate"
              onChange={handleChange}
              value={input.invoiceDate}
              required
            />
            {errors.invoiceDate && (
              <span className={styles.error}>{errors.invoiceDate}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="invoiceDueDate" className={styles.required}>
              Due Date
            </label>
            <input
              type="date"
              className={`${styles.formControl} ${
                errors.invoiceDueDate && styles.error
              }`}
              name="invoiceDueDate"
              id="invoiceDueDate"
              onChange={handleChange}
              value={input.invoiceDueDate}
              required
            />
            {errors.invoiceDueDate && (
              <span className={styles.error}>{errors.invoiceDueDate}</span>
            )}
          </div>
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <div>
            <legend>
              <span>Invoice Items</span>
            </legend>
          </div>
          <TableInvoice
            invoiceItemsDefault={invoiceItemsDefault}
            invoiceItems={input.invoiceItems}
            handleItemChange={handleItemChange}
            addNewItemRow={addNewItemRow}
            deleteItemRow={deleteItemRow}
            currencyCode={customerData?.customerCurrency?.currencyCode || "$"}
          />
        </fieldset>
        <div className={invoiceStyles.row}>
          <fieldset
            className={`${styles.formFieldset} ${invoiceStyles.column}`}
          >
            <div className={styles.formGroupBlock}>
              <label className={styles.label}>Customer Notes</label>
              <textarea
                className={styles.formControl}
                name="customerNotes"
                id="customerNotes"
                rows={5}
                value={input.customerNotes}
                onChange={handleChange}
              ></textarea>
              <small>Will be displayed on the invoice</small>
            </div>
          </fieldset>

          <fieldset
            className={`${styles.formFieldset} ${invoiceStyles.column} ${invoiceStyles.total}`}
          >
            <div className={styles.formGroup}>
              <label className={styles.label}>Sum Total</label>
              <div className={`${styles.th} textRight`}>
                {input.invoiceSubTotal}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Round Off</label>
              <div className={`${styles.th} textRight`}>
                {input.invoiceRoundOff}
              </div>
            </div>
            <hr />
            <div className={styles.formGroup}>
              <label className={`${styles.label} fontXL fontBold`}>
                Total Amount (in{" "}
                {customerData?.customerCurrency?.currencyCode || "$"})
              </label>
              <div className={`${styles.th} textRight fontXL fontBold`}>
                {input.invoiceTotalAmount}
              </div>
            </div>
          </fieldset>
        </div>

        <ButtonToolbar props={buttons} />
      </form>
    </>
  );
};

export default FormInvoice;
