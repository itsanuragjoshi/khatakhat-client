import Header from "../../common/components/header/Header";
import FormCurrencyAddEdit from "../../common/components/form/FormCurrencyAddEdit";

const CurrenciesNew = () => {
  const initialInputValues = {
    currencyCode: "",
    currencyName: "",
    currencySymbol: "",
  };

  return (
    <>
      <Header title="New Currency" />
      <main className="currenciesNew">
        <FormCurrencyAddEdit
          initialInputValues={initialInputValues}
          formId="formCurrenciesAdd"
        />
      </main>
    </>
  );
};

export default CurrenciesNew;
