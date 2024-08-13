import { useEffect } from "react";
import styles from "./tableInvoice.module.css";
import Button from "../button/Button";
import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const TableInvoice = ({
  invoiceItemsDefault,
  invoiceItems,
  handleItemChange,
  addNewItemRow,
  deleteItemRow,
  currencyCode,
}) => {
  // Function to adjust the height of the textarea
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
  };

  // Calculate amount based on quantity, rate, discount, and tax
  const calculateAmount = (quantity, rate, discount, discountType, tax) => {
    let qty = parseFloat(quantity) || 1;
    let rt = parseFloat(rate) || 0;
    let dsc = parseFloat(discount) || 0;
    let tx = parseFloat(tax) || 0;
    let amount = qty * rt;

    if (discountType === "percentage") {
      amount -= (amount * dsc) / 100;
    } else {
      amount -= dsc;
    }

    // Add tax
    amount += (amount * tx) / 100;

    return amount.toFixed(2); // Return formatted amount
  };

  // Function to update the amount when necessary fields change
  const updateAmount = (index) => {
    const item = invoiceItems[index];
    const newAmount = calculateAmount(
      item.quantity,
      item.rate,
      item.discount,
      item.discountType,
      item.tax
    );
    handleItemChange(index, "amount", newAmount);
  };

  // Hook to adjust height on initial render
  useEffect(() => {
    invoiceItems.forEach((item, index) => {
      const textarea = document.getElementById(`item-textarea-${index}`);
      if (textarea) {
        adjustTextareaHeight(textarea);
      }
    });
  }, [invoiceItems]);

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Item</th>
            <th className={styles.th}>HSN/SAC</th>
            <th className={`${styles.th} textRight`}>Quantity</th>
            <th className={`${styles.th} textRight`}>Rate</th>
            <th className={`${styles.th} textCenter`}>Discount</th>
            <th className={styles.th}>Tax (%)</th>
            <th className={`${styles.th} textRight`}>Amount</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.td}>
                <textarea
                  id={`item-textarea-${index}`} // Unique ID for each textarea
                  className={styles.textarea}
                  value={item.item}
                  onChange={(e) => {
                    handleItemChange(index, "item", e.target.value);
                    adjustTextareaHeight(e.target); // Adjust height on change
                  }}
                  rows={1} // Set initial row size
                />
              </td>
              <td className={styles.td}>
                <input
                  type="text"
                  className={`${styles.input} textRight`}
                  value={item.hsnSac}
                  onChange={(e) =>
                    handleItemChange(index, "hsnSac", e.target.value)
                  }
                />
              </td>
              <td className={styles.td}>
                <input
                  type="text"
                  className={`${styles.input} textRight`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  onBlur={(e) => {
                    const newValue =
                      parseFloat(e.target.value) ||
                      invoiceItemsDefault.quantity;
                    handleItemChange(index, "quantity", newValue);
                    updateAmount(index);
                  }}
                />
              </td>
              <td className={styles.td}>
                <input
                  type="text"
                  className={`${styles.input} textRight`}
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", e.target.value)
                  }
                  onBlur={(e) => {
                    const newValue =
                      parseFloat(e.target.value) || invoiceItemsDefault.rate;
                    handleItemChange(index, "rate", newValue);
                    updateAmount(index);
                  }}
                />
              </td>
              <td className={styles.td}>
                <div className={styles.discountContainer}>
                  <input
                    type="text"
                    className={`${styles.input} textRight`}
                    value={item.discount}
                    onChange={(e) =>
                      handleItemChange(index, "discount", e.target.value)
                    }
                    onBlur={(e) => {
                      const newValue =
                        parseFloat(e.target.value) ||
                        invoiceItemsDefault.discount;
                      handleItemChange(index, "discount", newValue);
                      updateAmount(index);
                    }}
                  />
                  <select
                    className={styles.select}
                    value={item.discountType}
                    onChange={(e) => {
                      handleItemChange(index, "discountType", e.target.value);
                      updateAmount(index);
                    }}
                  >
                    <option value="percentage">%</option>
                    <option value="amount">{currencyCode}</option>
                  </select>
                </div>
              </td>
              <td className={styles.td}>
                <input
                  type="text"
                  className={styles.input}
                  value={item.tax}
                  onChange={(e) =>
                    handleItemChange(index, "tax", e.target.value)
                  }
                  onBlur={(e) => {
                    const newValue =
                      parseFloat(e.target.value) || invoiceItemsDefault.tax;
                    handleItemChange(index, "tax", newValue);
                    updateAmount(index);
                  }}
                />
              </td>
              <td className={styles.td}>
                <div className={`${styles.text} textRight`}>{item.amount}</div>
              </td>
              <td className={styles.td}>
                <Button
                  props={{
                    btnIcon: <DeleteIcon />,
                    btnType: "button",
                    btnClass: "btnDanger",
                    btnText: "Delete",
                    btnClick: () => deleteItemRow(index),
                    btnDisabled: invoiceItems.length === 1, // Disable button if only one item
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addRowButton}>
        <Button
          props={{
            btnIcon: <AddIcon />,
            btnType: "button",
            btnClass: "btnLink",
            btnText: "Add New Row",
            btnClick: (e) => {
              e.preventDefault();
              addNewItemRow();
            },
          }}
        />
      </div>
    </>
  );
};

export default TableInvoice;
